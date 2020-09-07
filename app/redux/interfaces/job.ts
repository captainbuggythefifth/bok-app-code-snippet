import { IRequestState } from "./common";
import { IBookState } from "./book";

export interface IJobData {
    id: string,
    client_id: string,
    mender_id: string | null,
    provider_id: string | null,
    transaction_id: string,
    status: "FINDING_PROVIDER" | "PROVIDER_ACCEPTED" | "MENDER_ACCEPTED" | "DONE",
    start: any,
    current: any,
    end: any,
    type: string | null,
    created_at: string,
    updated_at: string,
    booking_id: string | null,
    booking: any,
    book: IBookState,
    client: any,
    mender: any | null,
    provider: any | null,
    business: any | null,
    payment: any | null,
    payment_status: "PENDING" | "DONE",
    payment_mode: null | "COD" | "CC" | "DC" | "SC"
}

export interface IJobState {
    request: IRequestState,
    data: IJobData | null,
    accept: IRequestState
}