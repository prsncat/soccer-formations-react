const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  let data = {};

  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  }

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export function signup(payload) {
  return request('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function login(payload) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function logout() {
  return request('/api/auth/logout', {
    method: 'POST',
  });
}

export function getMe() {
  return request('/api/auth/me');
}

export function refreshSession() {
  return request('/api/auth/refresh', {
    method: 'POST',
  });
}

export function verifyEmail(token) {
  return request(`/api/auth/verify-email?token=${encodeURIComponent(token)}`);
}