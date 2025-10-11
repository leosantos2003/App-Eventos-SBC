// services/eventService.ts
import { Evento } from '@/types';

// Usamos um array em memória para simular um banco de dados.
const eventos: Evento[] = [
  {
    id: '1',
    nome: 'Congresso Anual da SBC',
    data: '2025-11-10',
    local: 'Centro de Convenções - São Paulo, SP',
    descricao: 'O maior evento de computação da América Latina.',
  },
  {
    id: '2',
    nome: 'Workshop de Engenharia de Software',
    data: '2025-10-20',
    local: 'UFRGS - Porto Alegre, RS',
    descricao: 'Discussões sobre as últimas tendências em Engenharia de Software.',
  },
];

// Função para buscar todos os eventos
export const getEvents = async (): Promise<Evento[]> => {
  return Promise.resolve(eventos);
};

// Função para buscar um evento pelo ID
export const getEventById = async (id: string): Promise<Evento | undefined> => {
  return Promise.resolve(eventos.find((e) => e.id === id));
};

// Função para criar um novo evento
export const createEvent = async (data: Omit<Evento, 'id'>): Promise<Evento> => {
  const newEvent: Evento = {
    id: String(Date.now()), // Gera um ID único simples
    ...data,
  };
  eventos.push(newEvent);
  return Promise.resolve(newEvent);
};