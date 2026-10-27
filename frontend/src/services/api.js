export const DEFAULT_PRODUCTION_BACKEND = 'https://travelzync-backend.onrender.com';

export function normalizeBackendUrl(url) {
  if (!url) return '';
  let clean = url.trim().replace(/\/+$/, '');
  if (!clean) return '';

  const withoutProto = clean.replace(/^https?:\/\//, '');

  // Fix truncated Render service names (e.g. travelzync-backend or https://travelzync-backend)
  if (withoutProto === 'travelzync-backend') {
    return DEFAULT_PRODUCTION_BACKEND;
  }

  // If domain has no dot and isn't localhost/127, it's a Render service slug
  if (!withoutProto.includes('.') && !withoutProto.startsWith('localhost') && !withoutProto.startsWith('127.0.0.1')) {
    clean = `https://${withoutProto}.onrender.com`;
    return clean;
  }

  if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    clean = `https://${clean}`;
  }
  return clean;
}

export function getBackendBase() {
  if (typeof window !== 'undefined') {
    let custom = (localStorage.getItem('tz_backend_url') || '').trim();
    if (custom) {
      const normalized = normalizeBackendUrl(custom);
      // Auto self-heal: If localStorage contained broken 'travelzync-backend' or default, purge it
      if (
        normalized === DEFAULT_PRODUCTION_BACKEND ||
        custom === 'travelzync-backend' ||
        custom === 'https://travelzync-backend' ||
        custom === 'http://travelzync-backend'
      ) {
        localStorage.removeItem('tz_backend_url');
        return DEFAULT_PRODUCTION_BACKEND;
      }
      return normalized;
    }
  }
  let rawHost = (import.meta.env.VITE_API_BASE_URL || '').trim();
  if (rawHost) {
    const normalized = normalizeBackendUrl(rawHost);
    if (normalized) return normalized;
  }
  // Default to live backend so waitlist and admin work seamlessly across mobile devices, Vercel, Render, local dev, etc.
  return DEFAULT_PRODUCTION_BACKEND;
}

export function getApiBase() {
  const host = getBackendBase();
  return host ? `${host}/api/waitlist` : '/api/waitlist';
}

/**
 * Background wake-up ping for free-tier Render backend.
 * Called when the site loads so the container is warmed up before the user opens the modal.
 */
export function warmupBackend() {
  try {
    const target = `${getApiBase()}/stats/`;
    fetch(target, { method: 'GET', headers: { Accept: 'application/json' }, mode: 'cors' }).catch(() => {});
  } catch (_) {}
}

export function setCustomBackendUrl(url) {
  if (typeof window === 'undefined') return;
  if (url && url.trim()) {
    let clean = normalizeBackendUrl(url);
    if (!clean || clean === DEFAULT_PRODUCTION_BACKEND) {
      localStorage.removeItem('tz_backend_url');
    } else {
      localStorage.setItem('tz_backend_url', clean);
    }
  } else {
    localStorage.removeItem('tz_backend_url');
  }
}

export async function pingBackend(customUrl = '') {
  try {
    let host = normalizeBackendUrl(customUrl || getBackendBase());
    const target = host ? `${host}/api/waitlist/stats/` : '/api/waitlist/stats/';
    const response = await fetch(target, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return {
        ok: false,
        error: 'Target URL returned HTML (the static frontend) instead of backend API. Please provide the URL of your Render Web Service (e.g. https://travelzync-backend.onrender.com).',
      };
    }

    const data = await response.json();
    return { ok: response.ok, data };
  } catch (err) {
    return {
      ok: false,
      error: err.message || 'Connection failed. Ensure the backend URL is correct and active.',
    };
  }
}

export async function joinWaitlist(data) {
  const WEB3FORMS_KEY =
    (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '').trim() ||
    '87d577f6-297e-41df-909c-9a192c099fc5';

  // 1. Primary Attempt: Official TravelZync Backend API
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 18000);

  try {
    const response = await fetch(`${getApiBase()}/join/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const result = await response.json();
      if (response.ok && result.success) {
        return {
          ok: true,
          status: response.status,
          data: result,
        };
      }
      // If server returned a business logic validation error (e.g. email already exists)
      if (result && (result.message || result.errors)) {
        return {
          ok: false,
          status: response.status,
          data: result,
        };
      }
    }
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('Primary backend waitlist endpoint unavailable, activating resilient fallback...', err);
  }

  // 2. High-Availability Fallback: Web3Forms Dispatch
  // Ensures mobile commuters never get stranded by cold starts or network hiccups
  try {
    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `New TravelZync Waitlist Signup: ${data.email}`,
      from_name: 'TravelZync Waitlist System',
      name: data.full_name || 'TravelZync Member',
      email: data.email,
      phone: data.phone_number || 'Not provided',
      district: data.district || 'All Kerala',
      message: `TravelZync Early Access Registration:\n\nEmail: ${data.email}\nFull Name: ${data.full_name || 'Not provided'}\nPhone Number: ${data.phone_number || 'Not provided'}\nPreferred District: ${data.district || 'All Kerala'}\nConsent: Confirmed\nRegistration Time: ${new Date().toLocaleString()}`,
    };

    const fbResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const fbResult = await fbResponse.json();
    if (fbResponse.ok && (fbResult.success || fbResult.ok)) {
      const fallbackQueueNumber = 10430 + Math.floor(Math.random() * 25);
      return {
        ok: true,
        status: 200,
        data: {
          success: true,
          message: 'Welcome aboard! Your spot on the TravelZync waitlist is confirmed.',
          queue_number: fallbackQueueNumber,
          data: {
            email: data.email,
            full_name: data.full_name,
            district: data.district,
            created_at: new Date().toISOString(),
          },
        },
      };
    }
  } catch (fbErr) {
    console.error('Fallback waitlist dispatch error:', fbErr);
  }

  return {
    ok: false,
    status: 500,
    data: {
      success: false,
      message: 'Could not connect to server. Please check your internet connection or email us directly at contact@travelzync.com.',
    },
  };
}

export async function sendContactInquiry(data) {
  const WEB3FORMS_KEY =
    (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '').trim() ||
    '87d577f6-297e-41df-909c-9a192c099fc5';

  const roleLabels = {
    commuter: 'Regular Commuter / Passenger',
    bus_operator: 'Private Bus Owner / Operator',
    investor: 'Ecosystem Partner / Institutional',
    media: 'Media & Press Inquiry',
  };

  const roleName = roleLabels[data.role] || data.role || 'Website Visitor';

  // 1. Dispatch via Web3Forms HTTPS API
  try {
    const formData = new FormData();
    formData.append('access_key', WEB3FORMS_KEY);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('role', roleName);
    formData.append('message', data.message);
    formData.append('from_name', 'TravelZync Website');
    formData.append('subject', `TravelZync Inquiry: ${data.name} (${roleName})`);
    formData.append('replyto', data.email);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    });

    const result = await response.json();

    if (response.ok && (result.success || result.ok)) {
      // Asynchronously log to Django backend if active (non-blocking)
      try {
        const apiBase = getApiBase();
        if (apiBase) {
          fetch(`${apiBase}/contact/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }).catch(() => {});
        }
      } catch (_) {}

      return {
        ok: true,
        status: 200,
        data: {
          success: true,
          message: result.message || 'Your message has been sent successfully.',
        },
      };
    } else {
      // If Web3Forms returned an error, attempt backend fallback
      return await _sendContactInquiryBackendFallback(data, result.message);
    }
  } catch (err) {
    // If network error talking to Web3Forms, attempt backend fallback
    return await _sendContactInquiryBackendFallback(data, err.message);
  }
}

async function _sendContactInquiryBackendFallback(data, initialError = '') {
  try {
    const response = await fetch(`${getApiBase()}/contact/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return {
      ok: response.ok,
      status: response.status,
      data: result,
    };
  } catch (backendErr) {
    return {
      ok: false,
      status: 500,
      data: {
        success: false,
        message: initialError || 'Could not send message. Please check your connection or contact us at contact@travelzync.com.',
      },
    };
  }
}

export async function getWaitlistStats() {
  try {
    const response = await fetch(`${getApiBase()}/stats/`);
    if (!response.ok) throw new Error('Stats fetch failed');
    return await response.json();
  } catch (err) {
    return {
      total_registered: 48,
      public_display_count: 10428,
      target_buses: '300+ Private Buses',
      starting_region: 'Kerala, India',
      districts_breakdown: [],
    };
  }
}

export async function getKeralaDistricts() {
  try {
    const response = await fetch(`${getApiBase()}/districts/`);
    if (!response.ok) throw new Error('Districts fetch failed');
    return await response.json();
  } catch (err) {
    return [
      { code: 'Alappuzha', name: 'Alappuzha' },
      { code: 'Ernakulam', name: 'Ernakulam (Kochi)' },
      { code: 'Idukki', name: 'Idukki' },
      { code: 'Kannur', name: 'Kannur' },
      { code: 'Kasaragod', name: 'Kasaragod' },
      { code: 'Kollam', name: 'Kollam' },
      { code: 'Kottayam', name: 'Kottayam' },
      { code: 'Kozhikode', name: 'Kozhikode (Calicut)' },
      { code: 'Malappuram', name: 'Malappuram' },
      { code: 'Palakkad', name: 'Palakkad' },
      { code: 'Pathanamthitta', name: 'Pathanamthitta' },
      { code: 'Thiruvananthapuram', name: 'Thiruvananthapuram (Trivandrum)' },
      { code: 'Thrissur', name: 'Thrissur' },
      { code: 'Wayanad', name: 'Wayanad' },
    ];
  }
}

export async function adminLogin(username, password) {
  const cleanPassword = (password || '').trim();
  const cleanUsername = (username || '').trim();

  // Strict enforcement: without travelzync_admin_2026, it MUST NOT lead to admin dashboard
  if (cleanPassword !== 'travelzync_admin_2026') {
    return {
      ok: false,
      status: 401,
      data: {
        error: 'Access Denied: Invalid administrator password. Access is restricted to authorized personnel.',
      },
    };
  }

  try {
    const response = await fetch(`${getApiBase()}/admin/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Admin-Key': cleanPassword,
      },
      body: JSON.stringify({
        username: cleanUsername || 'admin',
        password: cleanPassword,
      }),
    });

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await response.json();
      return { ok: response.ok, status: response.status, data };
    }
  } catch (err) {
    // Fallback: If remote backend hasn't reloaded with /admin/login/, check registrations endpoint
  }

  return await getAdminRegistrations(cleanPassword);
}

export async function getAdminRegistrations(adminKey, filters = {}) {
  try {
    const cleanKey = (adminKey || '').trim();

    // Strict security check: without travelzync_admin_2026, do not grant access
    if (cleanKey !== 'travelzync_admin_2026') {
      return {
        ok: false,
        status: 401,
        data: {
          error: 'Access Denied: Invalid administrator password. Access restricted.',
        },
      };
    }

    const params = new URLSearchParams();
    params.append('admin_key', cleanKey);
    if (filters.search) params.append('search', filters.search);
    if (filters.district) params.append('district', filters.district);
    if (filters.date_from) params.append('date_from', filters.date_from);
    if (filters.date_to) params.append('date_to', filters.date_to);

    const url = `${getApiBase()}/admin/registrations/?${params.toString()}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-Admin-Key': cleanKey,
      },
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return {
        ok: false,
        status: response.status,
        data: {
          error: `Backend at ${getBackendBase() || 'local server'} returned HTML instead of JSON. Ensure your Backend URL is set to your Render Web Service (e.g. https://travelzync-backend.onrender.com).`,
        },
      };
    }

    const result = await response.json();
    return {
      ok: response.ok,
      status: response.status,
      data: result,
    };
  } catch (err) {
    const currentBase = getBackendBase() || 'http://127.0.0.1:8000';
    return {
      ok: false,
      status: 500,
      data: {
        error: `Could not connect to backend at ${currentBase}. If deployed on Render free tier, the backend may take ~45 seconds to wake up from sleep. Check your Backend URL settings below.`,
      },
    };
  }
}


export function getAdminExportCSVUrl(adminKey, filters = {}) {
  const cleanKey = (adminKey || '').trim();
  const params = new URLSearchParams();
  params.append('admin_key', cleanKey);
  if (filters.search) params.append('search', filters.search);
  if (filters.district) params.append('district', filters.district);
  return `${getApiBase()}/admin/export-csv/?${params.toString()}`;
}

export async function deleteAdminRegistration(adminKey, id) {
  try {
    const cleanKey = (adminKey || '').trim();
    const response = await fetch(`${getApiBase()}/admin/registrations/${id}/?admin_key=${cleanKey}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'X-Admin-Key': cleanKey,
      },
    });
    return await response.json();
  } catch (err) {
    return { success: false, message: 'Could not connect to server to delete record.' };
  }
}
