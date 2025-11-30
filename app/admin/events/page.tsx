'use client'

import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, PlusCircle } from "lucide-react";
import { getAllEvents } from "@/lib/api/events";
import { useEffect, useState } from "react";
import { Event } from "@/types/index";
import { getEventStatus } from "@/lib/utils";
import { formatDatePtBr } from "@/lib/utils";

export default function AdminDashboard() {
  const [eventList, setEventList] = useState<Event[]>([]);

  useEffect(() => {
    getAllEvents().then(events => setEventList(events));
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Eventos</h1>
          <p className="text-muted-foreground mt-1">
            Eventos cadastrados no sistema.
          </p>
        </div>

        <Button asChild>
          <Link href="/admin/events/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Criar Novo Evento
          </Link>
        </Button>
      </div>

      {eventList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventList.map((event) => {
            const status = getEventStatus(event.start_date, event.end_date);

            return (
              <Card
                key={event.uuid}
                className="flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <Badge
                      variant="secondary"
                      className={`text-xs font-normal ${status.color}`}
                    >
                      {status.label}
                    </Badge>
                  </div>
                  <CardTitle
                    className="line-clamp-2 text-xl leading-tight"
                    title={event.name}
                  >
                    {event.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-primary shrink-0" />
                      <span>
                        {formatDatePtBr(event.start_date)} -{" "}
                        {formatDatePtBr(event.end_date)}
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPinIcon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div className="line-clamp-1">
                        <span className="font-medium text-foreground/80">
                          {event.place.name}
                        </span>
                        <span className="block text-xs">
                          {event.place.city}/{event.place.state}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-end gap-2 pt-2">
                  <Button variant="secondary" asChild className="w-full">
                    <Link href={`/admin/events/${event.uuid}`}>
                      Gerenciar Evento
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-lg text-center bg-gray-50/50">
          <p className="text-lg text-muted-foreground mb-4">
            Nenhum evento encontrado.
          </p>
          <Button variant="outline" asChild>
            <Link href="/admin/events/new">Crie o primeiro para começar!</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
