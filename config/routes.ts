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
  requestsByEvent: (eventId: number) => `${BASE_URL}/requests?event=${eventId}`,
  request: (uuid:string) => `${BASE_URL}/requests/${uuid}`,
  eventReport: (uuid: string) => `${BASE_URL}/events/${uuid}/generate-report/`
  // requestsReportXlsx: (q = "") => `/reports/requests.xlsx${q}`,
  
});
