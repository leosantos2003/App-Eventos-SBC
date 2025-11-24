const PORT = 8000;
const BASE_URL = `http://localhost:${PORT}`

export const Routes = Object.freeze({
  users: `${BASE_URL}/users/`,
  me: `${BASE_URL}/me/`,
  token: `${BASE_URL}/token/`,
  user: (cpf: string) => `${BASE_URL}/users/${cpf}/`,
  events: `${BASE_URL}/events/`,
  event: (id: number) => `${BASE_URL}/events/${id}/`,
  requests: `${BASE_URL}/requests/`,
  requestsByEvent: (eventId: number) => `${BASE_URL}/requests?event=${eventId}`,
  request: (userCpf: string, eventId: number) => `${BASE_URL}/requests?user=${userCpf}&event=${eventId}`
  // requestsReportXlsx: (q = "") => `/reports/requests.xlsx${q}`,

});
