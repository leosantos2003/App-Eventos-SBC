"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-provider";

export default function RedirectPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.is_staff) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/user/dashboard");
    }
  }, [user, loading, router]);

  return <p>Carregando...</p>;
}
