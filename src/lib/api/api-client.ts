import { ApiError } from './api.error';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? '';

const buildQuery = (params?: Record<string, unknown>) => {
  if (!params) return '';
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) query.append(key, String(value));
  });
  const qs = query.toString();
  return qs ? `?${qs}` : '';
};

const apiFetch = async <T>(
  url: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: unknown;
    params?: Record<string, unknown>;
    token?: string;
  } = {},
): Promise<T> => {
  const { method = 'GET', body, params, token } = options;

  const headers: Record<string, string> = {};
  if (body && !(body instanceof FormData)) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BACKEND_URL}${url}${buildQuery(params)}`, {
    method,
    headers,
    body: body
      ? body instanceof FormData
        ? body
        : JSON.stringify(body)
      : undefined,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new ApiError(error.message, error.code, error.details, res.status);
  }

  if (res.status === 204) return undefined as T;

  return (await res.json()).data;
};

export const apiClient = {
  get: <T>(url: string, params?: Record<string, unknown>, token?: string) =>
    apiFetch<T>(url, { params, token }),
  post: <T>(url: string, body?: unknown, token?: string) =>
    apiFetch<T>(url, { method: 'POST', body, token }),
  patch: <T>(url: string, body?: unknown, token?: string) =>
    apiFetch<T>(url, { method: 'PATCH', body, token }),
  put: <T>(url: string, body?: unknown, token?: string) =>
    apiFetch<T>(url, { method: 'PUT', body, token }),
  delete: <T>(url: string, token?: string) =>
    apiFetch<T>(url, { method: 'DELETE', token }),
};
