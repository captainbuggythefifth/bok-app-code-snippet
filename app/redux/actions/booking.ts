import { BOOKING_ACTION_TYPE_CHANGE_DATA, BOOKING_ACTION_TYPE_CHANGE_REQUEST } from "../action-types/booking";
import { IBookingData } from "../interfaces/booking";
import { IDispatchActionPayload, IRequestState } from "../interfaces/common";

const bookingActionChangeData = (bookings: IBookingData[]): IDispatchActionPayload => ({
    type: BOOKING_ACTION_TYPE_CHANGE_DATA,
    payload: bookings
});

const bookingActionChangeRequest = (request: IRequestState): IDispatchActionPayload => ({
    type: BOOKING_ACTION_TYPE_CHANGE_REQUEST,
    payload: request
});

export {
    bookingActionChangeData,
    bookingActionChangeRequest
}