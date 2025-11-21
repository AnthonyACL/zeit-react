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

/*  
    Endpoints disponibles:
    
http://127.0.0.1:8000/api/login

http://127.0.0.1:8000/api/users

http://127.0.0.1:8000/api/users/1/profile-image

http://127.0.0.1:8000/api/users/options

http://127.0.0.1:8000/api/work-teams

http://127.0.0.1:8000/api/usercreate

http://127.0.0.1:8000/api/projects

http://127.0.0.1:8000/api/projects/2

http://127.0.0.1:8000/api/projects

http://127.0.0.1:8000/api/projects/1

*/
