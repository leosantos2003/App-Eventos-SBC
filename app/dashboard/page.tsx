import Link from 'next/link'; // Importe o Link
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"; // Importe o Button
import { events, users, userEvents } from "@/lib/data";

import { ModeToggle } from '@/components/mode-toggle';

// Simula a busca de dados para o usuário logado (ID 1)
const getUserEventData = (userId: number) => {
  const user = users.find(u => u.id === userId);
  const userEventLink = userEvents.find(ue => ue.userId === userId);
  const event = events.find(e => e.id === userEventLink?.eventId);
  return { user, event };
}

export default function UserDashboard() {
  const { user, event } = getUserEventData(1); // Simula o usuário logado

  if (!user || !event) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">Nenhum evento encontrado para você.</h1>
      </main>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="bg-primary text-primary-foreground px-4 lg:px-6 h-14 flex items-center justify-between shadow">
        <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
          <span className="font-semibold text-lg">SBC Eventos</span>
        </Link>
        <ModeToggle />
      </header>

    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Olá, {user.name}!</h1>
        <p className="text-gray-600 mb-8">Você foi convidado para o seguinte evento. Aqui estão os detalhes:</p>
        
        <Card>
          <CardHeader><CardTitle>{event.name}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p><strong>Data:</strong> {event.date}</p>
              <p><strong>Local:</strong> {event.location}</p>
              <p><strong>Descrição:</strong> {event.description}</p>
            </div>
            <div className="border-t mt-6 pt-6 flex justify-end">
              <Link href="/dashboard/request" passHref>
                <Button>Solicitar Hospedagem</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
    </div>
  );
}