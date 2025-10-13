"use client"; // Necessário para usar hooks e eventos como onSubmit

import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { events } from "@/lib/data"; // Usamos os dados mockados para obter o nome do evento

export default function RequestRoomPage() {
  // Simula a busca do evento do usuário
  const event = events.find(e => e.id === 101);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Impede o recarregamento da página
    // Na Etapa 3, aqui ocorreria a lógica de envio dos dados.
    // Para a Etapa 2, mostramos um alerta como confirmação.
    alert("Solicitação de hospedagem enviada com sucesso para validação do administrador!");
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            Formulário de Solicitação de Hospedagem
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-gray-600">
              Evento: <span className="font-semibold">{event?.name}</span>
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="checkin-date">Data de Check-in</Label>
                  <Input type="date" id="checkin-date" required />
                </div>
                <div>
                  <Label htmlFor="checkout-date">Data de Check-out</Label>
                  <Input type="date" id="checkout-date" required />
                </div>
              </div>

              <div>
                <Label htmlFor="room-type">Tipo de Quarto</Label>
                <select id="room-type" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  <option value="">Selecione uma opção</option>
                  <option value="single">Individual</option>
                  <option value="double">Duplo</option>
                  <option value="suite">Suíte</option>
                </select>
              </div>

              <div>
                <Label htmlFor="special-requests">Necessidades Específicas / Observações</Label>
                <Textarea id="special-requests" placeholder="Ex: Acessibilidade para cadeirantes, preferência por andar alto, etc." />
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
  );
}