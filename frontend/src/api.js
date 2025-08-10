const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, opts);
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!res.ok) {
    const errorMsg = data?.error || data?.message || res.statusText || 'Unknown error';
    throw new Error(errorMsg);
  }

  return data;
}


export async function getEvents() {
  return request('/events');
}

export async function registerAttendee(payload) {
  return request('/attendees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

export async function getAttendeesForEvent(eventId) {
  return request(`/attendees/${eventId}`);
}

export function ticketUrl(ticketCode) {
  return `${API_BASE}/tickets/${ticketCode}`;
}

export async function adminLogin(email, password) {
  return request('/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
}

export async function createEvent(event) {
  return request('/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(event)
  });
}

export async function createEventWithImage(formData) {
  return request('/events', {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
    },
    body: formData, 
  });
}

export async function checkIn(ticketCode) {
  return request('/attendees/checkin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ ticketCode })
  });
}

export function csvExportUrl(eventId) {
  return `${API_BASE}/attendees/export/${eventId}?token=${localStorage.getItem('token')}`;
}
