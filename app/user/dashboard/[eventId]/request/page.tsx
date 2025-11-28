import Link from "next/link";
import { Button } from "@/components/ui/button";
import { events } from "@/lib/data";
import RequestForm from "./RequestForm";

export default async function RequestRoomPage({
  params,
}: {
  params: { eventId: string };
}) {
  const awaitedParams = (await params) as { eventId: string };

  const eventId = parseInt(awaitedParams.eventId, 10);
  if (isNaN(eventId)) {
    return (
      <main className="flex items-center justify-center min-h-screen p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">ID do evento inválido.</h1>
          <Button variant="link" asChild className="mt-4">
            <Link href="/dashboard">Voltar para o painel</Link>
          </Button>
        </div>
      </main>
    );
  }

  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return (
      <main className="flex items-center justify-center min-h-screen p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Evento não encontrado.</h1>
          <Button variant="link" asChild className="mt-4">
            <Link href="/dashboard">Voltar para o painel</Link>
          </Button>
        </div>
      </main>
    );
  }

  // Renderiza o componente cliente que contém o formulário e hooks
  return <RequestForm event={event} eventId={eventId} />;
}
