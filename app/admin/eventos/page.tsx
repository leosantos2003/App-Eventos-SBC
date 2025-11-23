import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, PlusCircle } from "lucide-react";

import { events } from "@/lib/data"; //tmp

async function getAllEvents() {
  //Busca eventos
  return events;
}

export default async function AdminDashboard() {

  const eventsList = await getAllEvents();

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
          <Link href="/admin/eventos/novo">
            <PlusCircle className="mr-2 h-4 w-4" />
            Criar Novo Evento
          </Link>
        </Button>
      </div>

      {eventsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsList.map((event) => (
            <Card key={event.id} className="flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="line-clamp-1" title={event.name}>
                    {event.name}
                </CardTitle>
                
                <div className="flex flex-col gap-2 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-primary" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {event.description}
                </p>
              </CardContent>

              <CardFooter className="flex justify-end gap-2 pt-2">
                <Button variant="secondary" asChild className="w-full">
                  <Link href={`/admin/eventos/${event.id}`}>
                    Gerenciar Evento
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-lg text-center">
            <p className="text-lg text-muted-foreground mb-4">Nenhum evento encontrado.</p>
            <Button variant="outline" asChild>
                <Link href="/admin/eventos/novo">Começar criando o primeiro</Link>
            </Button>
        </div>
      )}
    </div>
  );
}