export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'guest';
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