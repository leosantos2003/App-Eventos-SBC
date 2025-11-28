import { Role } from "@/constants/roles";

export interface Place {
  name: string;
  street: string;
  complement: string | null;
  neighborhood: string | null;
  city: string;
  state: string;
  country: string;
}

export interface DailyValues {
  role: Role;
  individual: number;
  double: number;
  guest: number;
  days_covered: number;
}

export interface Event {
  uuid: string;
  name: string;
  start_date: string;
  end_date: string;
  confirmation_limit_date: string;
  description: string;
  place: Place;
  role_costs: DailyValues[];
  created_at: string;
  created_by: string;
}

export interface PlacePayload {
  name: string;
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}

export interface DailyValuesPayload {
  role: Role;
  individual: number;
  double: number;
  guest: number;
  days_covered: number;
}

export interface CreateEventPayload {
  name: string;
  start_date: string;
  end_date: string;
  confirmation_limit_date: string;
  description: string;
  place: Place;
  role_costs: DailyValues[];
}