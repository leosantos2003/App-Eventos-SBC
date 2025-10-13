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
import { ModeToggle } from '@/components/mode-toggle';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="bg-primary text-primary-foreground px-4 lg:px-6 h-14 flex items-center justify-between shadow">
        <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
          <span className="font-semibold text-lg">SBC Eventos</span>
        </Link>
        <ModeToggle />
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>
              Bem-vindo ao Sistema de Gestão de Eventos
            </CardTitle>
            <CardDescription>
              Selecione o perfil para continuar:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <Link href="/dashboard" passHref>
                <Button className="w-full">Entrar como Convidado</Button>
              </Link>
              <Link href="/admin/dashboard" passHref>
                <Button variant="secondary" className="w-full">Entrar como Administrador</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}