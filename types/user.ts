export interface User {
  uuid: string;
  email: string;
  name: string;
  cpf: string;
  passport_number: number;
  passport_country: string;
  birth_date: string;
  is_staff: boolean;
}

export interface UserEvent { // provavelmente vai ser deletado, não vai precisar dele
  userId: number;
  eventId: number;
}