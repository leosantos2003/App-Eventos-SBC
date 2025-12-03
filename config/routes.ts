const PORT = 8000;
const BASE_URL = `http://localhost:${PORT}`

export const Routes = Object.freeze({
  users: `${BASE_URL}/users/`,
  me: `${BASE_URL}/me/`,
  token: `${BASE_URL}/token/`,
  refreshToken: `${BASE_URL}/token/refresh/`,
  user: (uuid: string) => `${BASE_URL}/users/${uuid}/`,
  events: `${BASE_URL}/events/`,
  event: (uuid: string) => `${BASE_URL}/events/${uuid}/`,
  requests: `${BASE_URL}/requests/`,
  request: (uuid: string) => `${BASE_URL}/requests/${uuid}/`,
  requestsByEvent: (uuid: string) => `${BASE_URL}/requests/?event=${uuid}`,
  requestByUserEvent: (eventUUID: string) => `${BASE_URL}/requests/by-user-event/?event=${eventUUID}`,
  approveRequest: (uuid: string) => `${BASE_URL}/requests/${uuid}/approve/`,
  rejectRequest: (uuid: string) => `${BASE_URL}/requests/${uuid}/reject/`,
  eventReport: (uuid: string) => `${BASE_URL}/events/${uuid}/generate-report/`
});
