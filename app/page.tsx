import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { Header } from "@/components/ui/header";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center grow">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Bem-vindo ao Sistema de Gestão de Eventos</CardTitle>
          <CardDescription>Selecione um perfil para continuar.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <Link href="/dashboard" passHref>
              <Button className="w-full">Entrar como convidado</Button>
            </Link>
            <Link href="/admin/dashboard" passHref>
              <Button variant="secondary" className="w-full">
                Entrar como administrador
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
