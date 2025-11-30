'use client'

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  MapPinIcon,
  Edit,
  Users,
  ClipboardList,
  FileBarChart,
  ChevronLeft,
  DollarSign,
  CalendarClock,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Event } from "@/types/index";
import { getEventByUUID } from "@/lib/api/events";
import { getEventStatus } from "@/lib/utils";
import { formatDatePtBr } from "@/lib/utils";
import { createEmptyEvent } from "@/lib/utils";
import { RoleLabels } from "@/constants/roles";

export default function EventDetailsPage() {
  const uuid = useParams().uuid as string;
  const [event, setEvent] = useState<Event>(createEmptyEvent());

  useEffect(() => {
    getEventByUUID(uuid).then(event => {
      setEvent(event);
    }).catch((err) => {
      console.log(err);
      notFound();
    });
  }, [uuid]);

  const status = getEventStatus(event.start_date, event.end_date);
  const StatusIcon = status.icon;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      
      <div className="mb-6">
        <Button variant="ghost" asChild className="pl-0 hover:pl-2 transition-all text-muted-foreground">
          <Link href="/admin/dashboard">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{event.name}</h1>
            
            <Badge variant="secondary" className={`${status.color} hover:${status.color}`}>
                <StatusIcon className="w-3 h-3 mr-1" /> {status.label}
            </Badge>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground text-sm">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="h-4 w-4" />
              <span>{formatDatePtBr(event.start_date)} até {formatDatePtBr(event.end_date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPinIcon className="h-4 w-4" />
              <span>
                {event.place.name} • {event.place.city}/{event.place.state}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
            
            <Card>
                <CardHeader>
                    <CardTitle>Sobre o Evento</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="leading-relaxed text-gray-700 whitespace-pre-line">
                        {event.description}
                    </p>
                    
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm border">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                            <MapPinIcon className="h-4 w-4" /> Localização 
                        </h4>
                        <p>{event.place.name}</p>
                        <p>{event.place.street}{event.place.complement ? `, ${event.place.complement}` : ''}</p>
                        <p>{event.place.city}/{event.place.state}, {event.place.country}</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        Tabela de Custos e Cobertura
                    </CardTitle>
                    <CardDescription>Valores e diárias cobertas pela SBC por categoria.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 font-medium border-b">
                                <tr>
                                    <th className="px-4 py-3 min-w-[150px]">Categoria</th>
                                    <th className="px-4 py-3">Individual</th>
                                    <th className="px-4 py-3">Duplo</th>
                                    <th className="px-4 py-3">Convidado</th>
                                    <th className="px-4 py-3 bg-green-50 text-green-700">Cob. (Dias)</th>
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
          
          <Card className="shadow-sm border-blue-100 bg-blue-50/20">
            <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                    <CalendarClock className="h-4 w-4 text-blue-600" />
                    Cronograma do Evento
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm">
                <div className="flex justify-between items-center border-b pb-2 border-blue-100">
                    <span className="text-muted-foreground">Início</span>
                    <span className="font-medium">{formatDatePtBr(event.start_date)}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2 border-blue-100">
                    <span className="text-muted-foreground">Término</span>
                    <span className="font-medium">{formatDatePtBr(event.end_date)}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                    <span className="text-muted-foreground flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 text-orange-500" />
                        Limite Pedidos
                    </span>
                    <span className="font-bold text-orange-700">{formatDatePtBr(event.confirmation_limit_date)}</span>
                </div>
            </CardContent>
          </Card>

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
}