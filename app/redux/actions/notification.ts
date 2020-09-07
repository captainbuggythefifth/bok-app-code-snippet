import { IDispatchActionPayload, IRequestState } from "../interfaces/common";
import { INotificationData } from "../interfaces/notification";
import { NOTIFICATION_ACTION_TYPE_CHANGE_DATA, NOTIFICATION_ACTION_TYPE_CHANGE_REQUEST } from "../action-types/notification";


const notificationActionChangeData = (notifications: INotificationData[]): IDispatchActionPayload => ({
    type: NOTIFICATION_ACTION_TYPE_CHANGE_DATA,
    payload: notifications
});

const notificationActionChangeRequest = (request: IRequestState): IDispatchActionPayload => ({
    type: NOTIFICATION_ACTION_TYPE_CHANGE_REQUEST,
    payload: request
});

export {
    notificationActionChangeData,
    notificationActionChangeRequest
}