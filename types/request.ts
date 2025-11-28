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