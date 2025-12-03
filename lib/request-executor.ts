import { Routes } from "@/config/routes";
import { logoutUser } from "./api/auth";

export async function executeRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem("access");
  let res = await sendRequest(path, init, token || undefined);

  if (!res.ok) {
    if (res.status === 401 && token) {
      const newToken = await refreshAccessToken();
      localStorage.setItem("access", newToken);
      res = await sendRequest(path, init, newToken);

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `HTTP ${res.status}`);
      }
      
    } else {
      const text = await res.text().catch(() => "");
      throw new Error(text || `HTTP ${res.status}`);
    }
  }
  return res.headers.get("content-type")?.includes("application/json")
    ? (await res.json())
    : ((await res.text()) as unknown as T);
}

async function sendRequest(path: string, init?: RequestInit, token?: string): Promise<Response> {
  return await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...init,
  });
}

async function refreshAccessToken(): Promise<string> {
  const refreshToken = localStorage.getItem("refresh");
  if (!refreshToken) {
    alert("Sessão expirada. Por favor, faça login novamente.");
    logoutUser();
    return Promise.reject("No refresh token available");
  }

  const res = await fetch(Routes.refreshToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!res.ok) {
    alert("Sessão expirada. Por favor, faça login novamente.");
    logoutUser();
    return Promise.reject("Failed to refresh token");
  }
  return await res.json().then((data) => data.access as string);
};