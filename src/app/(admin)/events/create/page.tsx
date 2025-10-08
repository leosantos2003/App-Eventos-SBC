// src/app/(admin)/events/create/page.tsx
import { EventForm } from '@/components/EventForm';

export default function CreateEventPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Criar Novo Evento (Admin - UC9)</h1>
      <EventForm />
    </main>
  );
}