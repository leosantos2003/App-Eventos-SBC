"use client";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
