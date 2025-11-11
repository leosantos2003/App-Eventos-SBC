import Link from "next/link";
import "@/app/dashboard/CardsEventos.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { events, users, userEvents } from "@/lib/data";
import {
  Calendar,
  CalendarIcon,
  ChevronLeftIcon,
  MapPin,
  MapPinIcon,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Header } from "@/components/ui/header";

// Função para buscar todos os eventos de um usuário
const getUserEventsData = (userCpf: number) => {
  const user = users.find((u) => u.cpf === userCpf);
  const userEventLinks = userEvents.filter((ue) => ue.userId === userCpf);
  const userEventsDetails = userEventLinks
    .map((link) => {
      return events.find((event) => event.id === link.eventId);
    })
    .filter((event) => event !== undefined);

  return { user, userEvents: userEventsDetails as typeof events };
};

export default function UserDashboard() {
  const userId = 1; // Simula o ID do usuário logado
  const { user, userEvents } = getUserEventsData(userId);

  if (!user) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">Usuário não encontrado.</h1>
      </main>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <Link href="/">
          <Button variant="outline" size="icon">
            <ChevronLeftIcon />
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl mb-2 font-semibold tracking-tight">
          Olá, {user.name}!
        </h1>
        <p className="text-muted-foreground">
          Você foi convidado para os seguintes eventos. Escolha um para
          interagir.
        </p>
      </div>

      {userEvents.length > 0 ? (
        <div className="cardsContainer">
          {userEvents.map((event) => (
            <div className="card" key={event.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{event.name}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </CardContent>
                <CardFooter className="justify-end">
                  <Link href={`/dashboard/${event.id}`} passHref>
                    <Button>Mais Informações</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <Card className="text-center p-10">
          <p className="text-muted-foreground">
            Você ainda não foi convidado para nenhum evento.
          </p>
        </Card>
      )}
    </div>
  );
}
