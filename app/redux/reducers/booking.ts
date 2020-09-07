import { IDispatchActionPayload, initialRequestState } from '../interfaces/common';
import { BOOKING_ACTION_TYPE_CHANGE_DATA, BOOKING_ACTION_TYPE_CHANGE_REQUEST } from '../action-types/booking';
import { IBookingState } from '../interfaces/booking';

const initialState: IBookingState = {
    request: initialRequestState,
    data: null,
}

const bookingReducer = (state: IBookingState = initialState, action: IDispatchActionPayload): IBookingState => {
    switch (action.type) {
        case BOOKING_ACTION_TYPE_CHANGE_DATA:
            return {
                ...state,
                data: action.payload
            }

        case BOOKING_ACTION_TYPE_CHANGE_REQUEST:
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
};


export default bookingReducer;