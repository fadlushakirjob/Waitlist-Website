let rawHost = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');
if (rawHost && !rawHost.startsWith('http://') && !rawHost.startsWith('https://')) {
  rawHost = `https://${rawHost}`;
}
const API_BASE = rawHost ? `${rawHost}/api/waitlist` : '/api/waitlist';

export async function joinWaitlist(data) {
  try {
    const response = await fetch(`${API_BASE}/join/`, {
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
    const response = await fetch(`${API_BASE}/contact/`, {
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
    const response = await fetch(`${API_BASE}/stats/`);
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
    const response = await fetch(`${API_BASE}/districts/`);
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
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.district) params.append('district', filters.district);
  if (filters.date_from) params.append('date_from', filters.date_from);
  if (filters.date_to) params.append('date_to', filters.date_to);

  const url = `${API_BASE}/admin/registrations/?${params.toString()}`;
  const response = await fetch(url, {
    headers: {
      'X-Admin-Key': adminKey,
    },
  });

  const result = await response.json();
  return {
    ok: response.ok,
    status: response.status,
    data: result,
  };
}

export function getAdminExportCSVUrl(adminKey, filters = {}) {
  const params = new URLSearchParams();
  params.append('admin_key', adminKey);
  if (filters.search) params.append('search', filters.search);
  if (filters.district) params.append('district', filters.district);
  return `${API_BASE}/admin/export-csv/?${params.toString()}`;
}

export async function deleteAdminRegistration(adminKey, id) {
  const response = await fetch(`${API_BASE}/admin/registrations/${id}/`, {
    method: 'DELETE',
    headers: {
      'X-Admin-Key': adminKey,
    },
  });
  return await response.json();
}
