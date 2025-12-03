export enum TravelTime {
    MORNING = 1,
    AFTERNOON = 2,
    EVENING = 3,
    NIGHT = 4,

}

export const TravelTimeLabels: Record<TravelTime, string> = {
    [TravelTime.MORNING]: "Manhã",
    [TravelTime.AFTERNOON]: "Tarde",
    [TravelTime.EVENING]: "Noite",
    [TravelTime.NIGHT]: "Madrugada",
};