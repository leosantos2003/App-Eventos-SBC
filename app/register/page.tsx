import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeftIcon } from "lucide-react";

export default function RegisterPage() {
  return (
    <div>
      <div className="mb-4">
        <Link href="/login">
          <Button variant="outline" size="icon">
            <ChevronLeftIcon />
          </Button>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center grow">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Criar uma Conta</CardTitle>
            <CardDescription>
              Insira seus dados para se cadastrar no sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action="/login" // Redireciona de volta ao login após o cadastro
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="seu@email.com"
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
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="confirm-password">Confirmar Senha</Label>
                  <Input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Cadastrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
