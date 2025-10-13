import { User, Event, UserEvent, Request } from '@/types';

export const users: User[] = [
  { id: 1, name: 'Convidado Teste', email: 'convidado@sbc.com', role: 'guest' },
  { id: 2, name: 'Administrador SBC', email: 'admin@sbc.com', role: 'admin' },
];

export const events: Event[] = [
  {
    id: 101,
    name: 'Evento Anual da SBC',
    date: '15-18 de Novembro, 2025',
    location: 'Instituto de Informática, UFRGS',
    description: 'Evento anual de computação da SBC.',
  },
  {
    id: 102,
    name: 'Festa da Engenharia de Software',
    date: '05-07 de Dezembro, 2025',
    location: 'UFRGS, Porto Alegre',
    description: 'Uma festa para comemorarmos a Engenharia de Software.',
  }
];

export const userEvents: UserEvent[] = [
  { userId: 1, eventId: 101 },
];

// Array para armazenar as solicitações (simulando um banco de dados)
export let requests: Request[] = [];

// Função para adicionar uma nova solicitação
export const addRequest = (newRequestData: Omit<Request, 'id' | 'status'>) => {
  const newId = requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1;
  const newRequest: Request = {
    id: newId,
    ...newRequestData,
    status: 'Pendente',
  };
  requests.push(newRequest);
};