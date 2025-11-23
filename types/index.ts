export interface User {
  cpf: number;
  name: string;
  email: string;
  birthDate: string;
  password: string;
}

export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
}

export interface UserEvent {
  userId: number;
  eventId: number;
}

export interface Request {
  id: number;
  userId: number;
  eventId: number;
  checkinDate: string;
  checkoutDate: string;
  roomType: string;
  specialRequests: string;
  status: 'Pendente' | 'Aprovada' | 'Rejeitada';
}

export interface ValoresDiaria {
  individual: number;
  duplo: number;
  convidado: number;
  diariasCobertas: number;
}

export interface local{
  id?: number;
  nome: String;
  rua: String;
  cidade: String;
  estado: String;
  pais: String;
  complemento: String;
}

export interface NewEvent {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  local: local;
  description: string;
  finalRequestDate: Date;
  
  valores: {
    diretoria: ValoresDiaria;
    conselho: ValoresDiaria;
    comissaoEdu: ValoresDiaria;
    secretarioRegional: ValoresDiaria;
    cooComissaoEsp: ValoresDiaria;
    outros: ValoresDiaria;
  };
}
