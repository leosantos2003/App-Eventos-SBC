export interface User {
  name: string;
  email: string;
  cpf: number;
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
  userEmail: string;
  eventId: number;
  checkinDate: string;
  checkoutDate: string;
  roomType: string;
  specialRequests: string;
  status: 'Pendente' | 'Aprovada' | 'Rejeitada';
}