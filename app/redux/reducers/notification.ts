import { IDispatchActionPayload, initialRequestState } from '../interfaces/common';
import { INotificationState } from '../interfaces/notification';
import { NOTIFICATION_ACTION_TYPE_CHANGE_DATA, NOTIFICATION_ACTION_TYPE_CHANGE_REQUEST } from '../action-types/notification';


const initialState: INotificationState = {
  request: initialRequestState,
  data: null,
}

const notificationReducer = (state: INotificationState = initialState, action: IDispatchActionPayload): INotificationState => {
  switch (action.type) {
    case NOTIFICATION_ACTION_TYPE_CHANGE_DATA:
      return {
        ...state,
        data: action.payload
      }

    case NOTIFICATION_ACTION_TYPE_CHANGE_REQUEST:
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


export default notificationReducer;