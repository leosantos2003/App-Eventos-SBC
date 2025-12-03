import { EventPayload, Event, PaginatedResponse } from "@/types/index";
import { executeRequest } from "@/lib/request-executor";
import { Routes } from "@/config/routes";

export async function createEvent(payload: EventPayload): Promise<Event> {
  return await executeRequest<Event>(Routes.events, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateEvent(payload: EventPayload, uuid: string): Promise<Event> {
  return await executeRequest<Event>(Routes.event(uuid), {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function getAllEvents(): Promise<Event[]> {
  const res = await executeRequest<PaginatedResponse<Event>>(Routes.events);
  return res.results;
}

export async function getEventByUUID(uuid: string): Promise<Event> {
  return await executeRequest<Event>(Routes.event(uuid));
}
