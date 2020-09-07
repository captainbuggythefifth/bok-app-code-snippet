import { IDispatchActionPayload, IRequestState } from "../interfaces/common";
import { IJobData } from "../interfaces/job";
import { JOB_ACTION_TYPE_CHANGE_DATA, JOB_ACTION_TYPE_CHANGE_REQUEST, JOB_ACTION_TYPE_CHANGE_ACCEPT_REQUEST, JOB_ACTION_TYPE_CHANGE_ACTIVE_DATA } from "../action-types/job";

const jobActionChangeData = (job: IJobData): IDispatchActionPayload => ({
    type: JOB_ACTION_TYPE_CHANGE_DATA,
    payload: job
});

const jobActionChangeRequest = (request: IRequestState): IDispatchActionPayload => ({
    type: JOB_ACTION_TYPE_CHANGE_REQUEST,
    payload: request
});

const jobActionChangeAcceptRequest = (request: IRequestState): IDispatchActionPayload => ({
    type: JOB_ACTION_TYPE_CHANGE_ACCEPT_REQUEST,
    payload: request
});


export {
    jobActionChangeData,
    jobActionChangeRequest,
    jobActionChangeAcceptRequest,
}