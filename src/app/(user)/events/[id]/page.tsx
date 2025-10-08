// src/app/(user)/events/[id]/page.tsx
import { getEventById } from '@/services/eventService';

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
      <h1 className="text-3xl font-bold mb-4">{evento.nome}</h1>
      <p className="text-lg text-gray-700"><strong>Data:</strong> {new Date(evento.data).toLocaleDateString()}</p>
      <p className="text-lg text-gray-700"><strong>Local:</strong> {evento.local}</p>
      <p className="mt-4">{evento.descricao}</p>
      
      {/* Este botão é um placeholder para a funcionalidade da Etapa 3 */}
      <button className="mt-6 py-2 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">
        Solicitar Hospedagem
      </button>
    </main>
  );
}