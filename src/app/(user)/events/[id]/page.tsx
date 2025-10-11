// src/app/(user)/events/[id]/page.tsx
import { getEventById } from '@/services/eventService';
import Link from 'next/link';

interface PageProps {
  params: { id: string };
}

export default async function EventDetailsPage({ params }: PageProps) {
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
      <div className="flex items-center gap-4 mb-6 flex-col sm:flex-row">
        <img src="/SBC_icon.png" alt="Ícone SBC" className="w-24 h-24 object-contain" />
        <h1 className="text-3xl font-bold mb-4">{evento.nome}</h1>
      </div>
      <p className="text-lg text-gray-700"><strong>Data:</strong> {new Date(evento.data).toLocaleDateString()}</p>
      <p className="text-lg text-gray-700"><strong>Local:</strong> {evento.local}</p>
      <p className="mt-4">{evento.descricao}</p>
      
      {/* Link para a página de solicitar hospedagem */}
      <Link
        href={`/events/${params.id}/solicitar-hospedagem`}
        className="mt-6 inline-block py-2 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
      >
        Solicitar Hospedagem
      </Link>
    </main>
  );
}