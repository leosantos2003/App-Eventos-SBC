"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, ChevronLeftIcon } from "lucide-react";
import { getEventByUUID } from "@/lib/api/events";
import { Event } from "@/types/index";
import { formatDate } from "@/lib/utils";

export default function EventDetailsPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = use(params);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEventByUUID(uuid)
      .then(setEvent)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [uuid]);

  if (loading) return <div className="p-8">Carregando...</div>;

  if (!event) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">Evento não encontrado.</h1>
        <div className="mt-4">
          <Link href="/user/dashboard">
            <Button variant="outline">Voltar ao painel</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-4">
        <Link href="/user/dashboard">
          <Button variant="outline" size="icon">
            <ChevronLeftIcon />
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{event.name}</CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="h-4 w-4" />
              <span>{formatDate(event.start_date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPinIcon className="h-4 w-4" />
              <span>{event.place.name}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{event.description}</p>
        </CardContent>
        <CardFooter className="justify-end">
          <Link href={`/user/dashboard/${event.uuid}/request`} passHref>
            <Button>Solicitar hospedagem</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}