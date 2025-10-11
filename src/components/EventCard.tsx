// src/components/EventCard.tsx
import { Evento } from '@/types';
import Link from 'next/link';
import styles from './Card_evento.module.css';

interface Props {
  evento: Evento;
}

export const EventCard = ({ evento }: Props) => {
  return (
    <div className={`${styles['Card_event']} border p-4 rounded-lg shadow hover:shadow-md transition-shadow`}>
      <h2 className={`${styles['Title']} text-xl font-bold`}>{evento.nome}</h2>
      <p className="text-gray-600">{new Date(evento.data).toLocaleDateString()}</p>
      <p className="text-gray-500">{evento.local}</p>
      <Link href={`/events/${evento.id}`} className="text-indigo-600 hover:underline mt-2 inline-block">
        Ver Detalhes
      </Link>
    </div>
  );
};