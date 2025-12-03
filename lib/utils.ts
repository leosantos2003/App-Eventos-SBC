import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { EventStatus, EventStatusLabels, Role } from "@/constants/index";
import { PlacePayload, DailyValuesPayload, Event } from "@/types/index";
import { CalendarClock, CheckCircle2, Clock } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date | undefined): string {
  if (date) {
    return new Date(date).toISOString().split("T")[0];
  }
  return "";
};


export function formatDatePtBr(date: string): string {
  if (date) {
    const [year, month, day] = date.split("T")[0].split("-");
    return `${day}/${month}/${year}`;
  }
  return "";
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

export function createEmptyEvent(): Event {
  return {
    uuid: '',
    name: '',
    start_date: '',
    end_date: '',
    confirmation_limit_date: '',
    description: '',
    place: createEmptyPlace(),
    role_costs: [
      createEmptyRoleCost(Role.DIRECTORY_MEMBER),
      createEmptyRoleCost(Role.COUNCIL_MEMBER),
      createEmptyRoleCost(Role.EDUCATION_COMMISSION),
      createEmptyRoleCost(Role.REGIONAL_SECRETARY),
      createEmptyRoleCost(Role.SPECIAL_COMMISSION_COORDINATOR),
      createEmptyRoleCost(Role.OTHERS),
    ],
    created_at: '',
    created_by: '',
  };
}