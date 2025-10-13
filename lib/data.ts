import { User, Event, UserEvent } from '@/types';

export const users: User[] = [
  { id: 1, name: 'Convidado Joãozinho', email: 'convidadojoaozinho@gmail.com', role: 'guest' },
  { id: 2, name: 'Administrador Legal', email: 'administradorlegal@gmail.com', role: 'admin' },
];

export const events: Event[] = [
  {
    id: 101,
    name: 'Congresso Anual da SBC',
    date: '15-18 de Novembro, 2025',
    location: 'Centro de Convenções, São Paulo',
    description: 'O maior evento de computação da América Latina, reunindo pesquisadores, estudantes e profissionais da área.',
  },
  {
    id: 102,
    name: 'Simpósio de Engenharia de Software',
    date: '05-07 de Dezembro, 2025',
    location: 'UFRGS, Porto Alegre',
    description: 'Focado nas últimas tendências e pesquisas em engenharia de software.',
  }
];

// Associa o usuário "Convidado Joãozinho" ao evento "Congresso Anual da SBC"
export const userEvents: UserEvent[] = [
  { userId: 1, eventId: 101 },
];