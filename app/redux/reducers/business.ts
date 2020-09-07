import { IDispatchActionPayload, initialRequestState } from '../interfaces/common';
import { IBusinessesState, IBusinessRequestState } from '../interfaces/business';
import { BUSINESS_ACTION_CHANGE_BUSINESSES, BUSINESS_ACTION_CHANGE_REQUEST } from '../action-types/business';


const initialState: IBusinessRequestState = {
    request: initialRequestState,
    businesses: null,
    active: null
}

const businessReducer = (state: IBusinessRequestState = initialState, action: IDispatchActionPayload) => {
    switch (action.type) {
        case BUSINESS_ACTION_CHANGE_BUSINESSES:
            return {
                ...state,
                businesses: action.payload,
                active: action.payload[0]
            }

        case BUSINESS_ACTION_CHANGE_REQUEST:
            return {
                ...state,
                request: {
                    ...state.request,
                    ...action.payload
                }
            }

        default:
            return state;
    }
}

export default businessReducer;