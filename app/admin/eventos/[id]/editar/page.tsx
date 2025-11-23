import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import EventForm from "@/components/EventForm";

const MOCK_DB = [
  {
    id: 1,
    name: "Congresso Brasileiro de Software 2025",
    startDate: "2025-10-20",
    endDate: "2025-10-24",
    local: "Centro de Convenções PUCRS, Porto Alegre",
    description: "O CBSoft é um dos principais eventos...",
    finalRequestDate: "2025-10-10",
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

async function getEventById(id: string) {
  return MOCK_DB.find(e => e.id === Number(id));
}

interface EditEventPageProps {
  params: {
    id: string;
  };
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Button variant="ghost" asChild className="pl-0 hover:pl-2 transition-all text-muted-foreground">
          <Link href={`/admin/eventos/${params.id}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar para Detalhes
          </Link>
        </Button>
      </div>

      <EventForm initialData={event} />
      
    </div>
  );
}