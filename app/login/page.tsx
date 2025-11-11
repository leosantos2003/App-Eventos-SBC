"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeftIcon } from "lucide-react";
import { loginUser } from '../api/auth'
import { FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export default function GuestLoginPage() {
  const router = useRouter();

  async function onLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // impede reload
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    try {
      const response = await loginUser({ email, password });

      if (response.access && response.refresh) {
        localStorage.setItem("access", response.access);
        localStorage.setItem("refresh", response.refresh);
        router.push("/dashboard");
      }
    } catch (error: any) {
      alert("Falha na autenticação");
    }
  }

  return (
    <div>
      <div className="mb-4">
        <Link href="/">
          <Button variant="outline" size="icon">
            <ChevronLeftIcon />
          </Button>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center grow">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login como Convidado</CardTitle>
            <CardDescription>
              Insira seus dados para acessar o painel de eventos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onLogin}
              // action="/dashboard" // Redireciona para o dashboard após o "login"
              className="space-y-6"
            >
              {/* Campos de Input agrupados */}
              <div className="space-y-4">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="convidado@sbc.com"
                    required
                  />
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    required
                  />
                </div>
              </div>

              {/* Botões de Ação agrupados */}
              <div className="flex flex-col gap-3 pt-2">
                <Button type="submit" className="w-full">
                  Entrar
                </Button>

                {/* BOTÃO "CRIAR UMA CONTA" ADICIONADO */}
                <Link href="/register" passHref className="w-full">
                  <Button variant="outline" className="w-full">
                    Criar uma conta
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
