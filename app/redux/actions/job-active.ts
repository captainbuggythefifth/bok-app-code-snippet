import { IDispatchActionPayload, IRequestState } from "../interfaces/common";
import { IJobData } from "../interfaces/job";
import { JOB_ACTIVE_ACTION_TYPE_CHANGE_DATA, JOB_ACTIVE_ACTION_TYPE_CHANGE_REQUEST } from "../action-types/job-active";

const jobActiveActionChangeData = (job: IJobData): IDispatchActionPayload => ({
    type: JOB_ACTIVE_ACTION_TYPE_CHANGE_DATA,
    payload: job
});

const jobActiveActionChangeRequest = (request: IRequestState): IDispatchActionPayload => ({
    type: JOB_ACTIVE_ACTION_TYPE_CHANGE_REQUEST,
    payload: request
});


export {
    jobActiveActionChangeData,
    jobActiveActionChangeRequest,
}