"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { events, addRequest } from "@/lib/data";
import { ModeToggle } from "@/components/mode-toggle";
import { Header } from "@/components/ui/header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeftIcon } from "lucide-react";

export default function RequestRoomPage({
  params,
}: {
  params: { eventId: string };
}) {
  const router = useRouter();
  const eventId = parseInt(params.eventId, 10);
  const event = events.find((e) => e.id === eventId);
  const userId = 1; // Simula o ID do usuário logado

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newRequestData = {
      userId: userId,
      eventId: eventId,
      checkinDate: formData.get("checkin-date") as string,
      checkoutDate: formData.get("checkout-date") as string,
      roomType: formData.get("room-type") as string,
      specialRequests: formData.get("special-requests") as string,
    };

    addRequest(newRequestData);

    alert("Solicitação de hospedagem enviada com sucesso!");
    router.push("/dashboard");
  };

  if (!event) {
    return (
      <main className="flex items-center justify-center min-h-screen p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Evento não encontrado.</h1>
          <Button variant="link" asChild className="mt-4">
            <Link href="/dashboard">Voltar para o painel</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ChevronLeftIcon />
          </Button>
        </Link>
      </div>

      <div className="grow flex flex-col items-center justify-center">
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>{event.name}</CardTitle>
            <p className="mb-6 text-muted-foreground text-sm">
              Solicitação de hospedagem
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="checkin-date">Data de check-in</Label>
                    <Input
                      type="date"
                      id="checkin-date"
                      name="checkin-date"
                      required
                    />
                  </div>
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="checkout-date">Data de check-out</Label>
                    <Input
                      type="date"
                      id="checkout-date"
                      name="checkout-date"
                      required
                    />
                  </div>
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="room-type">Tipo de quarto</Label>
                  <Select id="room-type" name="room-type" required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="duplo">Duplo</SelectItem>
                      <SelectItem value="suite">Suíte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="special-requests">Observações</Label>
                  <Textarea
                    id="special-requests"
                    name="special-requests"
                    placeholder="Ex: Acessibilidade para cadeirantes, etc."
                  />
                </div>
                <div className="pt-4">
                  <Button type="submit" className="w-full">
                    Enviar solicitação
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
