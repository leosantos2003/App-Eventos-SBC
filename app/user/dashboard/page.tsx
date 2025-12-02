"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "@/app/user/dashboard/CardsEventos.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronLeftIcon, MapPinIcon } from "lucide-react";
import { useAuth } from "@/contexts/auth-provider";
import { Event } from "@/types/index";
import { getAllEvents } from "@/lib/api/events";
import { formatDatePtBr } from "@/lib/utils";

export default function UserDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (authLoading || loading) return <p className="p-8">Carregando...</p>;
  if (!user) return <p className="p-8">Não autenticado</p>;

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
          Os seguintes eventos estão disponíveis. Escolha um para interagir.
        </p>
      </div>

      {events.length > 0 ? (
        <div className="cardsContainer">
          {events.map((event) => (
            <div className="card" key={event.uuid}>
              <Card>
                <CardHeader>
                  <CardTitle>{event.name}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{formatDatePtBr(event.start_date)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{event.place.name}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </CardContent>
                <CardFooter className="justify-end">
                  <Link href={`/user/dashboard/${event.uuid}`} passHref>
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