import { User, Event, UserEvent, Request } from '@/types';

export const users: User[] = [
  { cpf: 1, name: 'Convidado Teste', email: 'convidado@sbc.com', birthDate: '07/05/2003', password: '12345678' },
  { cpf: 2, name: 'Administrador SBC', email: 'admin@sbc.com', birthDate: '07/05/2003', password: '12345678' },
];

export const events: Event[] = [
  {
    id: 101,
    name: 'Evento Anual da SBC',
    date: '15-18 de Novembro, 2025',
    location: 'Instituto de Informática, UFRGS',
    description: 'Evento anual de computação da SBC. Descrição do evento bla bla bla bla bla.',
  },
  {
    id: 102,
    name: 'Festa da Engenharia de Software',
    date: '05-07 de Dezembro, 2025',
    location: 'UFRGS, Porto Alegre',
    description: 'Uma festa para comemorarmos a Engenharia de Software.',
  },
  {
    id: 103,
    name: 'Mais Um Evento de Teste',
    date: '01-02 de Janeiro, 2026',
    location: 'Tóquio, Japão',
    description: 'Uma evento de teste qualquer.',
  },
  {
    id: 1,
    name: "Congresso Brasileiro de Software 2025",
    date: "2025-10-20",   
    location: "Centro de Convenções PUCRS, Porto Alegre",
    description: `O CBSoft é um dos principais eventos da Sociedade Brasileira de Computação.
    
    O evento contará com trilhas de Engenharia de Software, Sistemas de Informação e diversas palestras internacionais.
    
    Contamos com a presença de todos os associados.`,
  }
];

export const userEvents: UserEvent[] = [
  { userId: 1, eventId: 101 },
  { userId: 1, eventId: 102 },
  { userId: 1, eventId: 104 }
];

// Array para armazenar as solicitações (simulando um banco de dados)
export const requests: Request[] = [];

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