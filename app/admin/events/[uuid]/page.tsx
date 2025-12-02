'use client'

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Edit,
  Users,
  ClipboardList,
  FileBarChart,
  DollarSign,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Event } from "@/types/index";
import { getEventByUUID } from "@/lib/api/events";
import { createEmptyEvent } from "@/lib/utils";
import { RoleLabels } from "@/constants/index";
import EventNotFound from "@/components/events/EventNotFound";
import EventTitle from "@/components/events/EventTitle";
import BackButton from "@/components/BackButton";
import EventGeneralInfo from "@/components/events/EventGeneralInfo";
import EventSchedule from "@/components/events/EventSchedule";

export default function EventDetailsPage() {
  const uuid = useParams().uuid as string;
  const [event, setEvent] = useState<Event | null>(createEmptyEvent());

  useEffect(() => {
    getEventByUUID(uuid).then(event => {
      setEvent(event);
    }).catch((err) => {
      console.log(err);
      setEvent(null);
    });
  }, [uuid]);
  
  if (event) {
    return (
      <div className="max-w-6xl mx-auto py-10 px-4">
        <BackButton route="/admin/events" />
        <EventTitle event={event} isAdmin />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <EventGeneralInfo event={event} />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Tabela de Custos e Cobertura
                </CardTitle>
                <CardDescription>Valores e noites cobertas pela SBC por categoria.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b">
                      <tr>
                        <th className="px-4 py-3 min-w-[150px]">Categoria</th>
                        <th className="px-4 py-3">Individual</th>
                        <th className="px-4 py-3">Duplo</th>
                        <th className="px-4 py-3">Com Convidado</th>
                        <th className="px-4 py-3 bg-green-50 text-green-700">Cob. (Noites)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {event.role_costs.map((cost) => (
                        <tr key={cost.role} className="hover:bg-gray-50/50">
                          <td className="px-4 py-3 font-medium text-gray-700">{RoleLabels[cost.role]}</td>
                          <td className="px-4 py-3">R$ {cost.individual}</td>
                          <td className="px-4 py-3">R$ {cost.double}</td>
                          <td className="px-4 py-3">R$ {cost.guest}</td>
                          <td className="px-4 py-3 font-bold text-green-700 bg-green-50/30 text-center">
                            {cost.days_covered}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <EventSchedule event={event} />

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Painel de Gestão</CardTitle>
                <CardDescription>Ações administrativas</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                
                <Button asChild variant="outline" className="justify-start h-12 w-full hover:bg-blue-50 hover:text-blue-700 border-gray-200">
                  <Link href={`/admin/events/${event.uuid}/edit`}>
                    <Edit className="mr-3 h-4 w-4 text-blue-600" />
                    Editar Evento
                  </Link>
                </Button>

                <Button asChild variant="outline" className="justify-start h-12 w-full hover:bg-purple-50 hover:text-purple-700 border-gray-200">
                  <Link href={`/admin/events/${event.uuid}/participants`}>
                    <Users className="mr-3 h-4 w-4 text-purple-600" />
                    Participantes
                  </Link>
                </Button>

                <Button asChild variant="outline" className="justify-start h-12 w-full hover:bg-orange-50 hover:text-orange-700 border-gray-200 group">
                  <Link href={`/admin/events/${event.uuid}/requests`} className="flex justify-between w-full items-center">
                    <div className="flex items-center">
                      <ClipboardList className="mr-3 h-4 w-4 text-orange-600" />
                      Solicitações
                    </div>
                  </Link>
                </Button>

                <Separator className="my-2" />

                <Button className="justify-start h-12 w-full bg-slate-900 hover:bg-slate-800 text-white">
                    <FileBarChart className="mr-3 h-4 w-4" />
                    Relatório Final
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  } else {
    return <EventNotFound route="/admin/events" />;
  }
}