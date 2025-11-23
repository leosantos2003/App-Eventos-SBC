import Link from "next/link";
import { notFound } from "next/navigation";

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
  Clock,
  DollarSign,
  CalendarClock,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

import { NewEvent } from "@/types/";

const MOCK_EVENTO: NewEvent = {
  id: 1,
  name: "Congresso Brasileiro de Software 2025",
  startDate: new Date("2025-10-20T00:00:00"), 
  endDate: new Date("2025-10-24T00:00:00"),   
  local: {
    id: 1,
    nome: "Centro de Convenções PUCRS",
    rua: "Av. Ipiranga, 6681",
    cidade: "Porto Alegre",
    estado: "RS",
    pais: "Brasil",
    complemento: "Prédio 40"
  },
  description: `O CBSoft é um dos principais eventos da Sociedade Brasileira de Computação.
  
  O evento contará com trilhas de Engenharia de Software, Sistemas de Informação e diversas palestras internacionais.
  
  Contamos com a presença de todos os associados.`,
  finalRequestDate: new Date("2025-10-10T00:00:00"),
  
  valores: {
    diretoria: { individual: 150, duplo: 250, convidado: 100, diariasCobertas: 4 },
    conselho: { individual: 100, duplo: 200, convidado: 80, diariasCobertas: 3 },
    comissaoEdu: { individual: 0, duplo: 0, convidado: 0, diariasCobertas: 0 },
    secretarioRegional: { individual: 0, duplo: 0, convidado: 0, diariasCobertas: 0 },
    cooComissaoEsp: { individual: 0, duplo: 0, convidado: 0, diariasCobertas: 0 },
    outros: { individual: 500, duplo: 800, convidado: 400, diariasCobertas: 0 },
  }
};

async function getEventByIdMock(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return { ...MOCK_EVENTO, id: Number(id) };
}

function getEventStatus(start: Date, end: Date) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const startZero = new Date(start); startZero.setHours(0,0,0,0);
  const endZero = new Date(end); endZero.setHours(0,0,0,0);

  if (now > endZero) {
    return { label: "Encerrado", color: "bg-gray-100 text-gray-600", icon: CheckCircle2 };
  }
  if (now >= startZero && now <= endZero) {
    return { label: "Em Andamento", color: "bg-green-100 text-green-700", icon: Clock };
  }
  return { label: "Em Breve", color: "bg-blue-100 text-blue-700", icon: CalendarClock };
}

const formatCategoria = (key: string) => {
  const map: Record<string, string> = {
    diretoria: "Diretoria",
    conselho: "Conselho",
    comissaoEdu: "Comissão de Educação",
    secretarioRegional: "Secretário Regional",
    cooComissaoEsp: "Coord. Comissão Especial",
    outros: "Outros",
  };
  return map[key] || key;
};

const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
};

interface EventDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function EventDetailsPage({ params }: EventDetailsPageProps) {
  const event = await getEventByIdMock(params.id);
  if (!event) {
    notFound();
  }

  const status = getEventStatus(event.startDate, event.endDate);
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
              <span>{formatDate(event.startDate)} até {formatDate(event.endDate)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPinIcon className="h-4 w-4" />
              <span>
                {event.local.nome} • {event.local.cidade}/{event.local.estado}
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
                        <p>{event.local.nome}</p>
                        <p>{event.local.rua}{event.local.complemento ? `, ${event.local.complemento}` : ''}</p>
                        <p>{event.local.cidade} - {event.local.estado}, {event.local.pais}</p>
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
                                {Object.entries(event.valores).map(([key, val]) => (
                                    <tr key={key} className="hover:bg-gray-50/50">
                                        <td className="px-4 py-3 font-medium text-gray-700">{formatCategoria(key)}</td>
                                        <td className="px-4 py-3">R$ {val.individual.toFixed(2)}</td>
                                        <td className="px-4 py-3">R$ {val.duplo.toFixed(2)}</td>
                                        <td className="px-4 py-3">R$ {val.convidado.toFixed(2)}</td>
                                        <td className="px-4 py-3 font-bold text-green-700 bg-green-50/30 text-center">
                                            {val.diariasCobertas}
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
                    <span className="font-medium">{formatDate(event.startDate)}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2 border-blue-100">
                    <span className="text-muted-foreground">Término</span>
                    <span className="font-medium">{formatDate(event.endDate)}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                    <span className="text-muted-foreground flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 text-orange-500" />
                        Limite Pedidos
                    </span>
                    <span className="font-bold text-orange-700">{formatDate(event.finalRequestDate)}</span>
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
                <Link href={`/admin/eventos/${event.id}/editar`}>
                  <Edit className="mr-3 h-4 w-4 text-blue-600" />
                  Editar Evento
                </Link>
              </Button>

              <Button asChild variant="outline" className="justify-start h-12 w-full hover:bg-purple-50 hover:text-purple-700 border-gray-200">
                <Link href={`/admin/eventos/${event.id}/participantes`}>
                  <Users className="mr-3 h-4 w-4 text-purple-600" />
                  Participantes
                </Link>
              </Button>

              <Button asChild variant="outline" className="justify-start h-12 w-full hover:bg-orange-50 hover:text-orange-700 border-gray-200 group">
                <Link href={`/admin/eventos/${event.id}/solicitacoes`} className="flex justify-between w-full items-center">
                  <div className="flex items-center">
                    <ClipboardList className="mr-3 h-4 w-4 text-orange-600" />
                    Solicitações
                  </div>
                </Link>
              </Button>

              <Separator className="my-2" />

              <Button className="justify-start h-12 w-full bg-slate-900 hover:bg-slate-800 text-white">
                <Link href={`/admin/eventos/${event.id}/relatorio`} className="flex items-center w-full">
                    <FileBarChart className="mr-3 h-4 w-4" />
                    Relatório Final
                </Link>
              </Button>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}