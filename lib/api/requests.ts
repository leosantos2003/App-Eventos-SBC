import { executeRequest } from "../request-executor";
import { RequestPayload, Request, PaginatedResponse } from "@/types";
import { Routes } from "@/config/routes";

export async function createRequest(payload: RequestPayload): Promise<Request> {
  try {
    return await executeRequest(Routes.requests, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw error;
  }
}

export async function getRequestByUUID(uuid: string): Promise<Request> {
  try {
    return await executeRequest<Request>(Routes.request(uuid), {
      method: "GET",
    });
  } catch (error) {
    throw error;
  }
}

export async function getRequestsByEvent(eventUUID: string): Promise<Request[]> {
  console.log(Routes.requestsByEvent(eventUUID));
  try {
    const response = await executeRequest<PaginatedResponse<Request>>(
      Routes.requestsByEvent(eventUUID),
      { method: "GET" }
    );
    return response.results ?? [];
  } catch (error) {
    throw error;
  }
}

export async function getUserRequestForEvent(eventUUID: string): Promise<Request | null> {
  console.log(Routes.requestByUserEvent(eventUUID));
  try {
    return await executeRequest<Request | null>(
      Routes.requestByUserEvent(eventUUID),
      { method: "GET" }
    );
  } catch {
    return null;
  }
}

export async function approveRequest(uuid: string): Promise<Request> {
  try {
    return await executeRequest<Request>(Routes.approveRequest(uuid), {
      method: "PATCH",
    });
  } catch (error) {
    throw error;
  }
}


export async function rejectRequest(uuid: string): Promise<Request> {
  try {
    return await executeRequest<Request>(Routes.rejectRequest(uuid), {
      method: "PATCH",
    });
  } catch (error) {
    throw error;
  }
}