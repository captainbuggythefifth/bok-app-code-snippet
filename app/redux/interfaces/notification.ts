import { IRequestState } from "./common";
import { IJobData } from "./job";

export interface INotificationData {
    id: string,
    job_id?: string,
    job?: IJobData,
    status: string,
    sender_reference_id: string,
    sender_reference_type: string,
    receiver_reference_id: string,
    receiver_reference_type: string,
    created_at: string,
    updated_at: string
}

export interface INotificationState {
    request: IRequestState,
    data: INotificationData[] | null,
}