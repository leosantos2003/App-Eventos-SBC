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