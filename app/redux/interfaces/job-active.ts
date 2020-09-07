import { IJobData } from "./job";
import { IRequestState } from "./common";

export interface IJobActiveState {
    data: IJobData | null,
    request: IRequestState
}