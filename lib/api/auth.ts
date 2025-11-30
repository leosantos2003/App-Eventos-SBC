import { Routes } from '../../config/routes'
import { executeRequest } from '../request-executor';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

export async function loginUser(payload: LoginPayload): Promise<TokenResponse> {
  return await executeRequest(Routes.token, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
