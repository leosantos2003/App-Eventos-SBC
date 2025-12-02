"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Eye, 
  Download,
  User as UserIcon,
  Mail,
  Phone,
  CreditCard,
  CalendarDays,
  BedDouble,
  FileText,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import BackButton from "@/components/BackButton";
import { User, Request as ApiRequest } from "@/types/index";
import { Role, RoomType, TravelTime, RequestStatus, RoleLabels, RoomTypeLabels } from "@/constants/index";
import { formatDatePtBr } from "@/lib/utils";

// --- NOVOS DADOS MOCKADOS (Substituindo os antigos) ---

const MOCK_USERS: User[] = [
  {
    uuid: "user-001",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    cpf: "123.456.789-00",
    passport_number: 0,
    passport_country: "",
    birth_date: "1985-04-12",
    is_staff: false
  },
  {
    uuid: "user-002",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    cpf: "234.567.890-11",
    passport_number: 0,
    passport_country: "",
    birth_date: "1990-08-25",
    is_staff: true
  },
  {
    uuid: "user-003",
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    cpf: "",
    passport_number: 987654321,
    passport_country: "USA",
    birth_date: "1982-12-05",
    is_staff: false
  },
  {
    uuid: "user-004",
    name: "Diana Evans",
    email: "diana.evans@example.com",
    cpf: "456.789.012-33",
    passport_number: 0,
    passport_country: "",
    birth_date: "1995-03-15",
    is_staff: false
  },
  {
    uuid: "user-005",
    name: "Evan Wright",
    email: "evan.wright@example.com",
    cpf: "567.890.123-44",
    passport_number: 0,
    passport_country: "",
    birth_date: "1988-07-20",
    is_staff: true
  }
];

const MOCK_API_REQUESTS: ApiRequest[] = [
  {
    uuid: "req-001",
    user: "user-001",
    event: "evt-100",
    phone_number: "+5511988887777",
    institution: "University of Tech",
    role: Role.DIRECTORY_MEMBER,
    room_type: RoomType.SINGLE,
    people_count: 1,
    checkin_date: "2025-11-20",
    checkout_date: "2025-11-25",
    special_needs: "Acesso para cadeira de rodas",
    origin_city: "Sao Paulo",
    origin_state: "SP",
    origin_airport: "GRU",
    departure_date: "2025-11-20",
    departure_preferred_time: TravelTime.MORNING,
    return_date: "2025-11-25",
    return_preferred_time: TravelTime.EVENING,
    expected_payment: 0,
    value_paid: 0,
    status: RequestStatus.PENDING,
    created_at: "2025-01-15T10:00:00Z"
  },
  {
    uuid: "req-002",
    user: "user-002",
    event: "evt-100",
    phone_number: "+5521999998888",
    role: Role.COUNCIL_MEMBER,
    room_type: RoomType.DOUBLE,
    people_count: 2,
    checkin_date: "2025-11-21",
    checkout_date: "2025-11-24",
    expected_payment: 500,
    value_paid: 500,
    status: RequestStatus.APPROVED,
    created_at: "2025-01-16T14:30:00Z"
  },
  {
    uuid: "req-003",
    user: "user-003",
    event: "evt-100",
    phone_number: "+15550199",
    institution: "Global Corp",
    role: Role.OTHERS,
    room_type: RoomType.SINGLE,
    people_count: 1,
    checkin_date: "2025-11-19",
    checkout_date: "2025-11-26",
    special_needs: "Refeições veganas",
    expected_payment: 2000,
    value_paid: 0,
    status: RequestStatus.REJECTED,
    created_at: "2025-01-17T09:15:00Z"
  },
  {
    uuid: "req-004",
    user: "user-004",
    event: "evt-100",
    phone_number: "+5531977776666",
    role: Role.REGIONAL_SECRETARY,
    room_type: RoomType.DOUBLE,
    people_count: 2,
    checkin_date: "2025-11-20",
    checkout_date: "2025-11-25",
    expected_payment: 0,
    value_paid: 0,
    status: RequestStatus.PENDING,
    created_at: "2025-01-18T11:45:00Z"
  },
  {
    uuid: "req-005",
    user: "user-005",
    event: "evt-100",
    phone_number: "+5541966665555",
    role: Role.EDUCATION_COMMISSION,
    room_type: RoomType.SINGLE,
    people_count: 1,
    checkin_date: "2025-11-20",
    checkout_date: "2025-11-23",
    expected_payment: 0,
    value_paid: 0,
    status: RequestStatus.AWAITING_PAYMENT,
    created_at: "2025-01-19T16:20:00Z"
  }
];

// Interface unificada para UI
export interface ParticipantUI {
  id: string;
  userName: string;
  userCategory: string;
  userEmail: string;
  userPhone: string;
  userCpf: string;
  checkinDate: string;
  checkoutDate: string;
  roomType: string;
  specialRequests?: string;
  status: "Pendente" | "Aprovada" | "Rejeitada" | "Aguardando Pagamento";
  rawValueStatus: RequestStatus; // Mantendo o enum original para lógica
}

export default function ParticipantsPage() {
  const eventId = useParams().uuid as string;

  // Inicializa o estado usando os NOVOS mocks e fazendo o mapeamento User + Request
  const [participants, setParticipants] = useState<ParticipantUI[]>(() => {
    return MOCK_API_REQUESTS.map((req) => {
      const user = MOCK_USERS.find((u) => u.uuid === req.user);
      
      let uiStatus: ParticipantUI["status"] = "Pendente";
      if (req.status === RequestStatus.APPROVED) uiStatus = "Aprovada";
      if (req.status === RequestStatus.REJECTED) uiStatus = "Rejeitada";
      if (req.status === RequestStatus.AWAITING_PAYMENT) uiStatus = "Aguardando Pagamento";

      return {
        id: req.uuid,
        userName: user ? user.name : "Desconhecido",
        userCategory: RoleLabels[req.role] || "Outros",
        userEmail: user ? user.email : "",
        userPhone: req.phone_number,
        userCpf: user ? (user.cpf || `Passaporte: ${user.passport_number}`) : "",
        checkinDate: formatDatePtBr(req.checkin_date),
        checkoutDate: formatDatePtBr(req.checkout_date),
        roomType: RoomTypeLabels[req.room_type],
        specialRequests: req.special_needs,
        status: uiStatus,
        rawValueStatus: req.status
      };
    });
  });

  const [selected, setSelected] = useState<ParticipantUI | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const openDetails = (participant: ParticipantUI) => {
    setSelected(participant);
    setIsDetailsOpen(true);
  };

  const handleStatusChange = (id: string, newStatus: RequestStatus, newUiStatus: ParticipantUI["status"]) => {
    setParticipants(prev => prev.map(p => 
      p.id === id ? { ...p, rawValueStatus: newStatus, status: newUiStatus } : p
    ));
    setIsDetailsOpen(false);
  };

  const renderBadge = (status: ParticipantUI["status"]) => {
    switch(status) {
      case "Aprovada": return <Badge className="bg-green-600 hover:bg-green-700">Confirmado</Badge>;
      case "Rejeitada": return <Badge variant="destructive">Rejeitado</Badge>;
      case "Aguardando Pagamento": return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Aguar. Pagamento</Badge>;
      default: return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Pendente</Badge>;
    }
  };

  const ParticipantList = ({ data }: { data: ParticipantUI[] }) => {
    if (data.length === 0) {
      return (
        <div className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground bg-gray-50">
          Nenhum registro encontrado nesta categoria.
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        {data.map((p) => (
          <Card key={p.id} className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg border ${
                p.status === "Aprovada" ? "bg-green-100 text-green-700 border-green-200" : 
                p.status === "Rejeitada" ? "bg-red-100 text-red-700 border-red-200" :
                "bg-blue-100 text-blue-700 border-blue-200"
              }`}>
                {p.userName.substring(0,2).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-lg leading-tight">{p.userName}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge variant="secondary" className="font-normal text-xs">
                    {p.userCategory}
                  </Badge>
                  {renderBadge(p.status)}
                  <span className="text-xs text-muted-foreground hidden sm:inline-block">
                      • {p.roomType}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-auto flex justify-end gap-2">
              {/* Botões de ação rápida para pendentes */}
              {(p.status === "Pendente" || p.status === "Aguardando Pagamento") && (
                <>
                  <Button size="icon" variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => handleStatusChange(p.id, RequestStatus.REJECTED, "Rejeitada")} title="Rejeitar">
                    <XCircle className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-green-600 hover:bg-green-50" onClick={() => handleStatusChange(p.id, RequestStatus.APPROVED, "Aprovada")} title="Aprovar">
                    <CheckCircle2 className="h-5 w-5" />
                  </Button>
                </>
              )}
              
              <Button 
                variant="outline" 
                onClick={() => openDetails(p)}
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                Detalhes
              </Button>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const pendingList = participants.filter(p => p.status === "Pendente" || p.status === "Aguardando Pagamento");
  const approvedList = participants.filter(p => p.status === "Aprovada");
  const rejectedList = participants.filter(p => p.status === "Rejeitada");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <BackButton route={`/admin/events/${eventId}`} />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestão de Inscrições</h1>
          <p className="text-muted-foreground text-sm">
            Gerencie solicitações e participantes confirmados.
          </p>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Todos ({participants.length})</TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pendentes ({pendingList.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Confirmados ({approvedList.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            Rejeitados ({rejectedList.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ParticipantList data={participants} />
        </TabsContent>
        <TabsContent value="pending">
          <ParticipantList data={pendingList} />
        </TabsContent>
        <TabsContent value="approved">
          <ParticipantList data={approvedList} />
        </TabsContent>
        <TabsContent value="rejected">
          <ParticipantList data={rejectedList} />
        </TabsContent>
      </Tabs>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <div className="flex items-center justify-between mr-8">
              <DialogTitle className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-primary" />
                  Detalhes da Inscrição
              </DialogTitle>
              {selected && renderBadge(selected.status)}
            </div>
            <DialogDescription>
              Informações completas do participante e solicitação.
            </DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="space-y-6 py-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <UserIcon className="h-3 w-3" /> Nome Completo
                    </span>
                    <p className="text-sm font-medium">{selected.userName}</p>
                </div>
                <div className="space-y-1">
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <CreditCard className="h-3 w-3" /> Documento
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

          <DialogFooter className="sm:justify-between gap-2 flex-col sm:flex-row">
            <div className="flex gap-2 justify-end w-full">
              {(selected?.status === "Pendente" || selected?.status === "Aguardando Pagamento") ? (
                <>
                  <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>Cancelar</Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => selected && handleStatusChange(selected.id, RequestStatus.REJECTED, "Rejeitada")}
                  >
                    Rejeitar
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => selected && handleStatusChange(selected.id, RequestStatus.APPROVED, "Aprovada")}
                  >
                    Aprovar
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setIsDetailsOpen(false)}>Fechar</Button>
                  {selected?.status === "Aprovada" && (
                    <Button 
                        className="gap-2 bg-blue-600 hover:bg-blue-700 text-white" 
                        onClick={() => alert("Download iniciado...")}
                    >
                        <Download className="h-4 w-4" />
                        Exportar Dados
                    </Button>
                  )}
                </>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}