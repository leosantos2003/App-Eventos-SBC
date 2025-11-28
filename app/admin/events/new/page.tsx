import { Metadata } from "next";
import EventForm from "@/components/EventForm"; 

export const metadata: Metadata = {
  title: "Criar Novo Evento | Admin SBC",
  description: "Página para cadastro de novos eventos da SBC",
};

export default function CreateEventPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <EventForm />
    </div>
  );
}