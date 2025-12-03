export enum RequestStatus {
    PENDING = 1,
    AWAITING_PAYMENT = 5,
    APPROVED = 2,
    REJECTED = 3,
    EXPIRED = 4,
}

export const RequestStatusLabels: Record<RequestStatus, string> = {
	[RequestStatus.PENDING]: "Pending",
    [RequestStatus.AWAITING_PAYMENT]: "Aguardando Pagamento",
    [RequestStatus.APPROVED]: "Approved",
    [RequestStatus.REJECTED]: "Rejected",
    [RequestStatus.EXPIRED]: "Expired",
}