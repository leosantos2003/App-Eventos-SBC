export interface User {
  uuid: string;
  email: string;
  name: string;
  cpf: string;
  passportNumber: number;
  passportCountry: string;
  birthDate: string;
  is_staff: boolean;
}

export interface UserEvent { // provavelmente vai ser deletado, não vai precisar dele
  userId: number;
  eventId: number;
}