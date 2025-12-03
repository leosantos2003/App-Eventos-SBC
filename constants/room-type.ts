export enum RoomType {
    SINGLE = 1,
    DOUBLE = 2,
    GUEST = 3,
}

export const RoomTypeLabels: Record<RoomType, string> = {
    [RoomType.SINGLE]: "Individual",
    [RoomType.DOUBLE]: "Duplo",
    [RoomType.GUEST]: "Com Convidado",
};