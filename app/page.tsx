import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            SBC - Sistema de Gestão de Eventos
          </CardTitle>
          <CardDescription>
            Selecione o perfil para continuar:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Link href="/dashboard" passHref>
              <Button type="submit" className="w-full">Entrar como Convidado</Button>
            </Link>
            <Link href="/admin/dashboard" passHref>
              <Button className="w-full">Entrar como Administrador</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}