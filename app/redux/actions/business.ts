import { IDispatchActionPayload, IRequestState } from "../interfaces/common";
import { BUSINESS_ACTION_CHANGE_CURRENT, BUSINESS_ACTION_CHANGE_BUSINESSES, BUSINESS_ACTION_CHANGE_REQUEST } from "../action-types/business";
import { IBusinessState } from "../interfaces/business";


const businessActionChangeCurrent = (businessId: string): IDispatchActionPayload => ({
    type: BUSINESS_ACTION_CHANGE_CURRENT,
    payload: businessId
});


const businessActionChangeBusinesses = (businesses: IBusinessState[]): IDispatchActionPayload => ({
    type: BUSINESS_ACTION_CHANGE_BUSINESSES,
    payload: businesses
});

const businessActionChangeRequest = (request: Partial<IRequestState>): IDispatchActionPayload => ({
    type: BUSINESS_ACTION_CHANGE_REQUEST,
    payload: request
})

export {
    businessActionChangeCurrent,
    businessActionChangeBusinesses,
    businessActionChangeRequest
}