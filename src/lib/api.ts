const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "ziptrip_token";
let tokenProvider: (() => Promise<string | null>) | null = null;

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  method?: Method;
  token?: string | null;
  data?: unknown;
}

const getAuthHeader = (token?: string | null) =>
  token ? { Authorization: `Bearer ${token}` } : {};

export const saveToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);
export const loadToken = () => localStorage.getItem(TOKEN_KEY);
export const setTokenProvider = (fn: () => Promise<string | null>) => {
  tokenProvider = fn;
};

export const request = async <T>(
  path: string,
  { method = "GET", data, token }: RequestOptions = {}
): Promise<T> => {
  const bearer = token ?? (tokenProvider ? await tokenProvider() : loadToken());
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(bearer),
    },
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = payload?.message || "Request failed";
    throw new Error(message);
  }
  return payload as T;
};

// Auth APIs
export const apiAuth = {
  register: (data: { email: string; password: string; name?: string }) =>
    request<{ token: string; user: any }>("/auth/register", { method: "POST", data }),
  login: (data: { email: string; password: string }) =>
    request<{ token: string; user: any }>("/auth/login", { method: "POST", data }),
  me: (token?: string | null) => request<{ user: any }>("/auth/me", { token }),
};

// Itinerary APIs
export const apiItineraries = {
  list: () => request<any[]>("/itineraries"),
  create: (data: any) => request<any>("/itineraries", { method: "POST", data }),
  update: (id: string, data: any) => request<any>(`/itineraries/${id}`, { method: "PUT", data }),
  remove: (id: string) => request(`/itineraries/${id}`, { method: "DELETE" }),
};

// Assistant API (stub)
export const apiAssistant = {
  ask: (message: string) =>
    request<{ reply: string }>("/assistant", { method: "POST", data: { message } }),
};

