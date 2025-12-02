export enum EventStatus {
    SCHEDULED = 1,
    ONGOING = 2,
    ENDED = 3
}

export const EventStatusLabels: Record<EventStatus, string> = {
    [EventStatus.SCHEDULED]: "Agendado",
    [EventStatus.ONGOING]: "Em andamento",
    [EventStatus.ENDED]: "Encerrado"
};