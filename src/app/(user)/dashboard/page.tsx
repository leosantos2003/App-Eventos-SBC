// src/app/(user)/dashboard/page.tsx
import { EventCard } from '@/components/EventCard';
import { getEvents } from '@/services/eventService';
import { Evento } from '@/types';

export default async function DashboardPage() {
  // A busca de dados é feita no servidor antes de renderizar a página
  const eventos: Evento[] = await getEvents();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Eventos Disponíveis (Usuário - UC5)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos.map((evento) => (
          <EventCard key={evento.id} evento={evento} />
        ))}
      </div>
    </main>
  );
}