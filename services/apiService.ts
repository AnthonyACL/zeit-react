// services/apiService.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}/${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json() as Promise<T>;
}
