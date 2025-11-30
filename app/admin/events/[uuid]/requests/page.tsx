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
import { 
  ChevronLeftIcon, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Pencil,
  CalendarDays,
  User,
  BedDouble,
  FileText
} from "lucide-react";
import { AuthLayout } from "@/components/auth/auth-layout";

export interface Request {
  id: number; 
  userId: number;
  eventId: number;
  checkinDate: string;
  checkoutDate: string;
  roomType: string;
  specialRequests: string;
  status: "Pendente" | "Aprovada" | "Rejeitada";
  
  userName: string;
  userCategory: string;
  userEmail: string;
}

const MOCK_REQUESTS: Request[] = [
  {
    id: 1,
    userId: 101,
    eventId: 1,
    checkinDate: "2025-11-20",
    checkoutDate: "2025-11-25",
    roomType: "Single",
    specialRequests: "Andar baixo, próximo ao elevador.",
    status: "Pendente",
    userName: "José Antonio",
    userCategory: "Associado",
    userEmail: "emai@emi.com",
  },
  {
    id: 2,
    userId: 102,
    eventId: 1,
    checkinDate: "2025-11-21",
    checkoutDate: "2025-11-24",
    roomType: "Double",
    specialRequests: "",
    status: "Pendente",
    userName: "Joel",
    userCategory: "Diretoria",
    userEmail: "joel@mail.com",
  },
];

export default function ManageRequestsPage() {
  const params = useParams();
  const eventId = params.id; 

  const [requests, setRequests] = useState<Request[]>(MOCK_REQUESTS);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const pendingRequests = requests.filter((r) => r.status === "Pendente");

  const handleApprove = (id: number) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Aprovada" } : req))
    );
    setIsDetailsOpen(false); 
  };

  const handleReject = (id: number) => {
    const reason = window.prompt("Motivo da rejeição:");
    if (reason !== null) {
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: "Rejeitada" } : req))
      );
      setIsDetailsOpen(false);
    }
  };

  const openDetails = (req: Request) => {
    setSelectedRequest(req);
    setIsDetailsOpen(true);
  };

  const handleEdit = (id: number) => {
    console.log("Editar ID:", id);
    setIsDetailsOpen(false);
  };

  return (
    <AuthLayout>
      <div className="p-6">
        <div className="mb-6 flex items-center gap-4">
          <Link href={`/admin/events/${eventId}`}>
            <Button variant="outline" size="icon">
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Solicitações Pendentes</h1>
            <p className="text-muted-foreground text-sm">
              Gerenciamento Solicitações
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 max-w-4xl mx-auto">
          {pendingRequests.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground">
              Nenhuma solicitação pendente.
            </div>
          ) : (
            pendingRequests.map((req) => (
              <Card key={req.id} className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4">
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {req.userName.substring(0,2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg leading-none">{req.userName}</h3>
                    <div className="mt-1">
                      <Badge variant="secondary" className="font-normal">
                        {req.userCategory}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => openDetails(req)}
                    className="hidden sm:flex"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Detalhes
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => openDetails(req)}
                    className="sm:hidden"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    onClick={() => handleEdit(req.id)}
                    title="Editar"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleReject(req.id)}
                    title="Rejeitar"
                  >
                    <XCircle className="h-5 w-5" />
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    onClick={() => handleApprove(req.id)}
                    title="Aprovar"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>

        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalhes da Solicitação</DialogTitle>
              <DialogDescription>
                Revise os dados completos antes de aprovar.
              </DialogDescription>
            </DialogHeader>
            
            {selectedRequest && (
              <div className="grid gap-4 py-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <User className="h-4 w-4" /> Dados do Participante
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-muted/50 rounded-md text-sm">
                    <div>
                      <span className="block text-xs text-muted-foreground">Nome Completo</span>
                      <span className="font-medium">{selectedRequest.userName}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-muted-foreground">Categoria</span>
                      <span className="font-medium">{selectedRequest.userCategory}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="block text-xs text-muted-foreground">Email</span>
                      <span>{selectedRequest.userEmail}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <BedDouble className="h-4 w-4" /> Dados da Hospedagem
                  </h4>
                  <div className="grid grid-cols-2 gap-4 p-3 bg-muted/50 rounded-md text-sm">
                    <div>
                      <span className="block text-xs text-muted-foreground">Tipo de Quarto</span>
                      <span className="font-medium">{selectedRequest.roomType}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-muted-foreground">Período</span>
                      <span className="font-medium flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        {selectedRequest.checkinDate} até {selectedRequest.checkoutDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Solicitações Especiais
                  </h4>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900 rounded-md text-sm text-yellow-800 dark:text-yellow-200">
                    {selectedRequest.specialRequests ? selectedRequest.specialRequests : "Nenhuma observação registrada."}
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="gap-2 sm:gap-0">
              {selectedRequest && (
                <>
                  <div className="flex-1 flex justify-start">
                    <Button 
                      variant="outline" 
                      onClick={() => handleEdit(selectedRequest.id)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar Solicitação
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      onClick={() => setIsDetailsOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => handleReject(selectedRequest.id)}
                    >
                      Rejeitar
                    </Button>
                    <Button 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleApprove(selectedRequest.id)}
                    >
                      Aprovar
                    </Button>
                  </div>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AuthLayout>
  );
}