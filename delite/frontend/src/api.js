export const API_BASE = 'http://localhost:4000/api';

export function getAuthToken() {
	return localStorage.getItem('token') || '';
}

export async function api(path, opts = {}) {
	const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
	const token = getAuthToken();
	if (token) headers.Authorization = `Bearer ${token}`;
	const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
	const data = await res.json().catch(() => ({}));
	if (!res.ok) throw new Error(data.error || 'Request failed');
	return data;
}
