"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-provider";

export default function RedirectPage({ isRoot = false }: { isRoot?: boolean; }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  // const isRoot = useParams().isLoading as unknown as boolean;

  useEffect(() => {
    if (loading && !isRoot) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.is_staff) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/user/dashboard");
    }
  }, [user, loading, router, isRoot]);

  return <p>Carregando...</p>;
}
