// services/authService.ts ( Versión mock data)
import { MOCK_USERS, User } from "@/data/mockData";

interface LoginResponse {
  token: string;
  user: Omit<User, 'password'>;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const foundUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        const fakeToken = `mock-token-${foundUser.id}-${Date.now()}`;
        const { password, ...userWithoutPassword } = foundUser;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", fakeToken);
          localStorage.setItem("user", JSON.stringify(userWithoutPassword)); 
        }

        resolve({
          token: fakeToken,
          user: userWithoutPassword,
        });

      } else {
        reject(new Error("Credenciales inválidas"));
      }
    }, 800);
  });
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}

export function getCurrentUser(): Omit<User, 'password'> | null {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
  }
  return null;
}



// services/authService.ts   ( Versión Api)
// import { apiFetch } from "./apiService";

// interface LoginResponse {
//   token: string;
//   user: { id: number; email: string };
// }

// export async function login(email: string, password: string): Promise<LoginResponse> {
//   const data = await apiFetch<LoginResponse>("login", {
//     method: "POST",
//     body: JSON.stringify({ email, password }),
//   });
//   localStorage.setItem("token", data.token);
//   return data;
// }
