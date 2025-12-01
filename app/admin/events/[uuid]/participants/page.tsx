"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeftIcon, 
  Eye, 
  Download,
  User,
  Mail,
  Phone,
  CreditCard,
  CalendarDays,
  BedDouble,
  FileText
} from "lucide-react";

export interface Participant {
  id: number;
  userName: string;
  userCategory: string;
  userEmail: string;
  userPhone: string;
  userCpf: string;
  checkinDate: string;
  checkoutDate: string;
  roomType: string;
  specialRequests?: string;
  status: "Aprovada"; 
}

const MOCK_PARTICIPANTS: Participant[] = [
  {
    id: 10,
    userName: "Ana Kami",
    userCategory: "Diretoria",
    userEmail: "ana@email.com",
    userPhone: "(51) 99999-8888",
    userCpf: "123.456.789-00",
    checkinDate: "2025-11-20",
    checkoutDate: "2025-11-25",
    roomType: "Single",
    specialRequests: "Andar baixo, próximo ao elevador.",
    status: "Aprovada",
  },
  {
    id: 11,
    userName: "Joel",
    userCategory: "Membro X",
    userEmail: "joel@university.edu",
    userPhone: "(51) 98888-7777",
    userCpf: "987.654.321-11",
    checkinDate: "2025-11-21",
    checkoutDate: "2025-11-24",
    roomType: "Double",
    status: "Aprovada",
  },
  {
    id: 12,
    userName: "Carlos Eduardo Silva",
    userCategory: "Diretoria",
    userEmail: "carlos.edu@sbc.org.br",
    userPhone: "(11) 97777-6666",
    userCpf: "456.789.000-22",
    checkinDate: "2025-11-19",
    checkoutDate: "2025-11-25",
    roomType: "Single",
    specialRequests: "Dieta sem glúten.",
    status: "Aprovada",
  },
];

export default function ParticipantsPage() {
  const params = useParams();
  const eventId = params.id;

  const [participants] = useState<Participant[]>(MOCK_PARTICIPANTS);
  const [selected, setSelected] = useState<Participant | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);


  const openDetails = (participant: Participant) => {
    setSelected(participant);
    setIsDetailsOpen(true);
  };

  // Função exportar
  const handleExportSingle = (participant: Participant) => {
    
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <Link href={`/admin/events/${eventId}`}>
          <Button variant="outline" size="icon">
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lista de Participantes</h1>
          <p className="text-muted-foreground text-sm">
            {participants.length} confirmados
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {participants.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground bg-gray-50">
            Nenhum participante confirmado ainda.
          </div>
        ) : (
          participants.map((p) => (
            <Card key={p.id} className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4 hover:shadow-md transition-shadow">
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg border border-green-200">
                  {p.userName.substring(0,2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-lg leading-tight">{p.userName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="font-normal text-xs">
                      {p.userCategory}
                    </Badge>
                    <span className="text-xs text-muted-foreground hidden sm:inline-block">
                        • Check-in: {p.checkinDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-auto flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => openDetails(p)}
                  className="w-full sm:w-auto gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Ver Detalhes
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Ficha do Participante
            </DialogTitle>
            <DialogDescription>
              Dados completos e informações de hospedagem.
            </DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="space-y-6 py-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" /> Nome Completo
                    </span>
                    <p className="text-sm font-medium">{selected.userName}</p>
                </div>
                <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <CreditCard className="h-3 w-3" /> CPF
                    </span>
                    <p className="text-sm font-medium">{selected.userCpf}</p>
                </div>
                <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" /> E-mail
                    </span>
                    <p className="text-sm font-medium">{selected.userEmail}</p>
                </div>
                <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" /> Telefone
                    </span>
                    <p className="text-sm font-medium">{selected.userPhone}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <BedDouble className="h-4 w-4 text-primary" /> Dados da Reserva
                </h4>
                <div className="bg-muted/50 p-4 rounded-lg grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="block text-xs text-muted-foreground mb-1">Entrada (Check-in)</span>
                        <div className="flex items-center gap-2 font-medium">
                            <CalendarDays className="h-3 w-3" /> {selected.checkinDate}
                        </div>
                    </div>
                    <div>
                        <span className="block text-xs text-muted-foreground mb-1">Saída (Check-out)</span>
                        <div className="flex items-center gap-2 font-medium">
                            <CalendarDays className="h-3 w-3" /> {selected.checkoutDate}
                        </div>
                    </div>
                    <div className="col-span-2">
                        <span className="block text-xs text-muted-foreground mb-1">Tipo de Quarto</span>
                        <span className="font-medium bg-background px-2 py-1 rounded border inline-block">
                            {selected.roomType}
                        </span>
                    </div>
                </div>
              </div>

              {selected.specialRequests && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" /> Observações Especiais
                    </h4>
                    <div className="p-3 border border-yellow-200 bg-yellow-50 text-yellow-800 text-sm rounded-md">
                        {selected.specialRequests}
                    </div>
                  </div>
              )}

            </div>
          )}

          <DialogFooter className="sm:justify-between gap-2">
            <Button variant="ghost" onClick={() => setIsDetailsOpen(false)}>
                Fechar
            </Button>
            
            {selected && (
                <Button 
                    className="gap-2 bg-blue-600 hover:bg-blue-700 text-white" 
                    onClick={() => handleExportSingle(selected)}
                >
                    <Download className="h-4 w-4" />
                    Exportar Dados
                </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}