import { useEffect } from "react";
import { useRouter } from "next/router";
import { Routes } from './routes'

export interface LoginPayload {
  email: string;
  password: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

export async function loginUser(payload: LoginPayload): Promise<TokenResponse> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/`, {
const res = await fetch(Routes.token, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Erro ao fazer login");
  }

  return await res.json();
}

export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) router.push("/login");
  }, [router]);
}