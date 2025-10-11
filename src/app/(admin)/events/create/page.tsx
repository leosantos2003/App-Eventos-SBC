// src/app/(admin)/events/create/page.tsx
import { EventForm } from '@/components/EventForm';

export default function CreateEventPage() {
  return (
    <main className="p-8">
      <div className="flex items-center gap-4 mb-6 flex-col sm:flex-row">
        <img src="/SBC_icon.png" alt="Ícone SBC" className="w-24 h-24 object-contain" />
        <h1 className="text-2xl font-bold">Criar Novo Evento (Admin - UC9)</h1>
      </div>
      <EventForm />
    </main>
  );
}