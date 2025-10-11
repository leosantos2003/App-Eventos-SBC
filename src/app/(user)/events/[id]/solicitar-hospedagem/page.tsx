import Link from 'next/link';
import { getEventById } from '@/services/eventService';
import { SolicitarHospedagemForm } from '@/components/SolicitarHospedagemForm';

interface PageProps {
  params: { id: string };
}

export default async function SolicitarHospedagemPage({ params }: PageProps) {
  const evento = await getEventById(params.id);

  if (!evento) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">Evento não encontrado.</h1>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Solicitar hospedagem - {evento.nome}</h1>
      <p className="text-lg text-gray-700">Para solicitar hospedagem para este evento, preencha o formulário abaixo.</p>

      {/* Formulário simples de solicitação - migrado para componente */}
      <SolicitarHospedagemForm eventId={params.id} />
      <div className="mt-4">
        <Link href={`/events/${params.id}`} className="py-2 px-4 border rounded-lg">Voltar</Link>
      </div>
    </main>
  );
}
