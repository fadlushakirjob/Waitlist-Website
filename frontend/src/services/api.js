export function getBackendBase() {
  const custom = (localStorage.getItem('tz_backend_url') || '').trim().replace(/\/+$/, '');
  if (custom) {
    return custom.startsWith('http://') || custom.startsWith('https://') ? custom : `https://${custom}`;
  }
  let rawHost = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');
  if (rawHost) {
    return rawHost.startsWith('http://') || rawHost.startsWith('https://') ? rawHost : `https://${rawHost}`;
  }
  return '';
}

export function getApiBase() {
  const host = getBackendBase();
  return host ? `${host}/api/waitlist` : '/api/waitlist';
}

export function setCustomBackendUrl(url) {
  if (url && url.trim()) {
    let clean = url.trim().replace(/\/+$/, '');
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = `https://${clean}`;
    }
    localStorage.setItem('tz_backend_url', clean);
  } else {
    localStorage.removeItem('tz_backend_url');
  }
}

export async function pingBackend(customUrl = '') {
  try {
    let host = (customUrl || getBackendBase()).trim().replace(/\/+$/, '');
    if (host && !host.startsWith('http://') && !host.startsWith('https://')) {
      host = `https://${host}`;
    }
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
  try {
    const response = await fetch(`${getApiBase()}/join/`, {
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
  } catch (err) {
    return {
      ok: false,
      status: 500,
      data: {
        success: false,
        message: 'Could not connect to server. Please check your internet connection.',
      },
    };
  }
}

export async function sendContactInquiry(data) {
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
  } catch (err) {
    return {
      ok: false,
      status: 500,
      data: {
        success: false,
        message: 'Could not connect to server.',
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

export async function getAdminRegistrations(adminKey, filters = {}) {
  try {
    const cleanKey = (adminKey || '').trim();
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
