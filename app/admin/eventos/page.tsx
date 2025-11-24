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
import { CalendarIcon, MapPinIcon, PlusCircle, Clock, CheckCircle2, CalendarClock } from "lucide-react";

import { NewEvent } from "@/types/";

const MOCK_EVENTS: NewEvent[] = [
  {
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
    description: "O CBSoft é um dos principais eventos da Sociedade Brasileira de Computação, reunindo pesquisadores e praticantes...",
    finalRequestDate: new Date("2025-10-10T00:00:00"),
    valores: {
        diretoria: { individual: 150, duplo: 250, convidado: 100, diariasCobertas: 4 },
        conselho: { individual: 100, duplo: 200, convidado: 80, diariasCobertas: 3 },
        comissaoEdu: { individual: 0, duplo: 0, convidado: 0, diariasCobertas: 0 },
        secretarioRegional: { individual: 0, duplo: 0, convidado: 0, diariasCobertas: 0 },
        cooComissaoEsp: { individual: 0, duplo: 0, convidado: 0, diariasCobertas: 0 },
        outros: { individual: 500, duplo: 800, convidado: 400, diariasCobertas: 0 },
    }
  },
  {
    id: 2,
    name: "Simpósio Brasileiro de Redes (SBRC) 2025",
    startDate: new Date("2025-05-15T00:00:00"),
    endDate: new Date("2025-05-19T00:00:00"),
    local: {
        id: 2,
        nome: "Centro de Eventos do Ceará",
        rua: "Av. Washington Soares, 999",
        cidade: "Fortaleza",
        estado: "CE",
        pais: "Brasil",
        complemento: ""
    },
    description: "O SBRC é o evento anual da SBC para a área de redes de computadores e sistemas distribuídos.",
    finalRequestDate: new Date("2025-05-01T00:00:00"),
    valores: {
        diretoria: { individual: 150, duplo: 250, convidado: 100, diariasCobertas: 4 },
        conselho: { individual: 100, duplo: 200, convidado: 80, diariasCobertas: 3 },
        comissaoEdu: { individual: 0, duplo: 0, convidado: 0, diariasCobertas: 0 },
        secretarioRegional: { individual: 0, duplo: 0, convidado: 0, diariasCobertas: 0 },
        cooComissaoEsp: { individual: 0, duplo: 0, convidado: 0, diariasCobertas: 0 },
        outros: { individual: 500, duplo: 800, convidado: 400, diariasCobertas: 0 },
    }
  }
];

async function getAllEvents() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return MOCK_EVENTS;
}

const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

function getEventStatus(start: Date, end: Date) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const startZero = new Date(start); startZero.setHours(0,0,0,0);
    const endZero = new Date(end); endZero.setHours(0,0,0,0);
  
    if (now > endZero) return { label: "Encerrado", color: "text-gray-500 bg-gray-100" };
    if (now >= startZero && now <= endZero) return { label: "Em Andamento", color: "text-green-700 bg-green-100" };
    return { label: "Em Breve", color: "text-blue-700 bg-blue-100" };
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
          {eventsList.map((event) => {
            const status = getEventStatus(event.startDate, event.endDate);
            
            return (
                <Card key={event.id} className="flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-2 mb-2">
                         <Badge variant="secondary" className={`text-xs font-normal ${status.color}`}>
                             {status.label}
                         </Badge>
                    </div>
                    <CardTitle className="line-clamp-2 text-xl leading-tight" title={event.name}>
                        {event.name}
                    </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-primary shrink-0" />
                            <span>{formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <MapPinIcon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <div className="line-clamp-1">
                                <span className="font-medium text-foreground/80">{event.local.nome}</span>
                                <span className="block text-xs">{event.local.cidade}/{event.local.estado}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end gap-2 pt-2">
                    <Button variant="secondary" asChild className="w-full">
                        <Link href={`/admin/eventos/${event.id}`}>
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
            <p className="text-lg text-muted-foreground mb-4">Nenhum evento encontrado.</p>
            <Button variant="outline" asChild>
                <Link href="/admin/eventos/novo">Começar criando o primeiro</Link>
            </Button>
        </div>
      )}
    </div>
  );
}