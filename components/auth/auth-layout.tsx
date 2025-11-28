"use client";
import { AuthProvider, useAuth } from "@/contexts/auth-provider";
import { useRouter } from "next/navigation";

export function AuthLayout({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean; }) {
  return (
    <AuthProvider>
      <RequireAuth adminOnly={adminOnly}>{children}</RequireAuth>
    </AuthProvider>
  );
}

function RequireAuth({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean; }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <p>Carregando...</p>;
  if (!user) {
    router.replace("/login");
    return;
  }

  if (adminOnly && !user.is_staff) {
    return <p>Acesso Negado</p>
  } else {
    return children;
  }
}
