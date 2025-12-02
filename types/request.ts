import { RequestStatus, Role, RoomType, TravelTime } from "@/constants/index";
import { User } from "./user";

export interface Request {
  uuid: string;
  user: User;
  event: string;
  phone_number: string;
  institution?: string;
  role: Role;
  room_type: RoomType;
  people_count: number;
  checkin_date: string;
  checkout_date: string;
  special_needs?: string;
  origin_city?: string;
  origin_state?: string;
  origin_airport?: string;
  departure_date?: string;
  departure_preferred_time?: TravelTime;
  return_date?: string;
  return_preferred_time?: TravelTime;
  expected_payment: number;
  value_paid: number;
  status: RequestStatus;
  created_at: string;
}

export interface RequestPayload {
  event: string;
  phone_number: string;
  institution?: string;
  role: Role;
  room_type: RoomType;
  people_count: number;
  checkin_date: string;
  checkout_date: string;
  special_needs?: string;
  origin_city?: string;
  origin_state?: string;
  origin_airport?: string;
  departure_date?: string;
  departure_preferred_time?: TravelTime;
  return_date?: string;
  return_preferred_time?: TravelTime;
  expected_payment: number;
  value_paid: number;
  status: RequestStatus;
}