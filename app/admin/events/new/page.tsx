import { Metadata } from "next";
import EventForm from "@/components/EventForm"; 
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Link } from "lucide-react";

export const metadata: Metadata = {
  title: "Criar Novo Evento | Admin SBC",
  description: "Página para cadastro de novos eventos da SBC",
};

export default function CreateEventPage() {
  return (
    <AuthLayout>
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="mb-6">
            <Button variant="ghost" asChild className="pl-0 hover:pl-2 transition-all text-muted-foreground">
              <Link href={`/admin/events`}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Voltar para Dashboard
              </Link>
            </Button>
          </div>
        <EventForm />
      </div>
    </AuthLayout>
  );
}