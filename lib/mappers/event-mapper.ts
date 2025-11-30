import { Event, EventPayload } from "@/types";

export function eventToPayload(event: Event): EventPayload {
  const { uuid: _, created_at, created_by, ...payload } = event;
  return payload;
}
