// services/authService.ts
import { apiFetch } from "./apiService";

interface LoginResponse {
  token: string;
  user: { id: number; email: string };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const data = await apiFetch<LoginResponse>("login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem("token", data.token);
  return data;
}
