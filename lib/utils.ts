import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { EventStatus, EventStatusLabels } from "@/constants/eventStatus";
import { Role } from "@/constants/roles";
import { PlacePayload, DailyValuesPayload } from "@/types/index";
import { CalendarClock, CheckCircle2, Clock } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR');
}

export function getEventStatus(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  if (today > endDate) {
    return { label: EventStatusLabels[EventStatus.ENDED], color: "text-gray-500 bg-gray-100", icon: CheckCircle2 };
  }
  if (today >= startDate && today <= endDate) {
    return { label: EventStatusLabels[EventStatus.ONGOING], color: "text-green-700 bg-green-100", icon: Clock };
  }
  return { label: EventStatusLabels[EventStatus.SCHEDULED], color: "text-blue-700 bg-blue-100", icon: CalendarClock };
}

export function createEmptyRoleCost(role: Role): DailyValuesPayload {
  return {
    role,
    individual: 0,
    double: 0,
    guest: 0,
    days_covered: 0,
  }
}

export function createEmptyPlace(): PlacePayload {
  return {
    name: "",
    street: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    country: "",
  };
}