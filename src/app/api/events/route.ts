// src/app/api/events/route.ts
import { createEvent, getEvents } from '@/services/eventService';
import { NextResponse } from 'next/server';

// Handler para GET (listar eventos)
export async function GET() {
  const eventos = await getEvents();
  return NextResponse.json(eventos);
}

// Handler para POST (criar evento)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, data, local, descricao } = body;

    if (!nome || !data || !local) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    const newEvent = await createEvent({ nome, data, local, descricao });
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar evento' }, { status: 500 });
  }
}