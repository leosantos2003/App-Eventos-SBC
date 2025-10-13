"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { events, addRequest } from "@/lib/data";

import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';

export default function RequestRoomPage() {
  const router = useRouter(); // Inicializa o router
  const event = events.find(e => e.id === 101);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newRequestData = {
      // Simula o ID do usuário logado e do evento atual
      userId: 1,
      eventId: 101,
      checkinDate: formData.get('checkin-date') as string,
      checkoutDate: formData.get('checkout-date') as string,
      roomType: formData.get('room-type') as string,
      specialRequests: formData.get('special-requests') as string,
    };

    addRequest(newRequestData);

    alert("Solicitação de hospedagem enviada com sucesso para validação do administrador!");
    router.push('/dashboard'); // Redireciona o usuário para o painel
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="bg-primary text-primary-foreground px-4 lg:px-6 h-14 flex items-center justify-between shadow">
        <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
          <span className="font-semibold text-lg">SBC Eventos</span>
        </Link>
        <ModeToggle />
      </header>

    <main className="flex items-center justify-center min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto w-full">
        <Card>
          <CardHeader>
            Formulário de Solicitação de Hospedagem
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              Evento: <span className="font-semibold text-foreground">{event?.name}</span>
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="checkin-date">Data de Check-in</Label>
                  <Input type="date" id="checkin-date" name="checkin-date" required />
                </div>
                <div>
                  <Label htmlFor="checkout-date">Data de Check-out</Label>
                  <Input type="date" id="checkout-date" name="checkout-date" required />
                </div>
              </div>

              <div>
                <Label htmlFor="room-type">Tipo de Quarto</Label>
                <select id="room-type" name="room-type" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required>
                  <option value="">Selecione uma opção</option>
                  <option value="Individual">Individual</option>
                  <option value="Duplo">Duplo</option>
                  <option value="Suíte">Suíte</option>
                </select>
              </div>

              <div>
                <Label htmlFor="special-requests">Necessidades Específicas / Observações</Label>
                <Textarea id="special-requests" name="special-requests" placeholder="Ex: Acessibilidade para cadeirantes, preferência por andar alto, etc." />
              </div>
              
              <div className="pt-4">
                <Button type="submit" className="w-full">
                  Enviar Solicitação
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
    </div>
  );
}