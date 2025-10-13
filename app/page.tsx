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
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          SBC - Sistema de Gestão de Eventos
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-center text-gray-600">Selecione o perfil para continuar:</p>
          <div className="flex flex-col space-y-4">
            <Link href="/dashboard" passHref>
              <Button className="w-full">Entrar como Convidado (Ana Cláudia)</Button>
            </Link>
            <Link href="/admin/dashboard" passHref>
              <Button className="w-full bg-gray-700 hover:bg-gray-800">Entrar como Administrador (Fernando)</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}