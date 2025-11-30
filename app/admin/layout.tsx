"use client";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AuthLayout adminOnly>{children}</AuthLayout>;
}
