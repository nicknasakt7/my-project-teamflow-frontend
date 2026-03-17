import { serverEnv } from '../config/env.validation';
import { ApiError } from './api.error';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
};
const BACKEND_URL = serverEnv.BACKEND_URL;

export const apiFetch = async <T>(
  url: string,
  options: RequestOptions = {},
): Promise<T> => {
  const { method = 'GET', body } = options;

  const headers: Record<string, string> = {};
  if (body && !(body instanceof FormData))
    headers['Content-type'] = 'application/json';
  //jwt

  const config: RequestInit = {
    method,
    body: body
      ? body instanceof FormData
        ? body
        : JSON.stringify(body)
      : undefined,
    headers,
  };
  const res = await fetch(`${BACKEND_URL}${url}`, config);
  if (!res.ok) {
    const error = await res.json();
    console.log('error', error);
    throw new ApiError(error.message, error.code, error.details);
  }
  return (await res.json()).data;
};

const get = <T>(url: string) => apiFetch<T>(url);
const post = <T>(url: string, body?: unknown) =>
  apiFetch<T>(url, { method: 'POST', body });
const put = <T>(url: string, body?: unknown) =>
  apiFetch<T>(url, { method: 'PUT', body });
const patch = <T>(url: string, body?: unknown) =>
  apiFetch<T>(url, { method: 'PATCH', body });
const del = <T>(url: string, body?: unknown) =>
  apiFetch<T>(url, { method: 'DELETE' });

export const api = {
  get,
  post,
  put,
  patch,
  delete: del,
};
