import { IJobState } from '../interfaces/job';
import { IDispatchActionPayload, initialRequestState } from '../interfaces/common';
import { JOB_ACTION_TYPE_CHANGE_DATA, JOB_ACTION_TYPE_CHANGE_REQUEST, JOB_ACTION_TYPE_CHANGE_ACCEPT_REQUEST, JOB_ACTION_TYPE_CHANGE_ACTIVE_DATA } from '../action-types/job';


const initialState: IJobState = {
  request: initialRequestState,
  data: null,
  accept: initialRequestState
}

const jobReducer = (state: IJobState = initialState, action: IDispatchActionPayload): IJobState => {
  switch (action.type) {
    case JOB_ACTION_TYPE_CHANGE_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload
        }
      }

    case JOB_ACTION_TYPE_CHANGE_REQUEST:
      return {
        ...state,
        request: {
          ...state.request,
          ...action.payload
        }

      }
    case JOB_ACTION_TYPE_CHANGE_ACCEPT_REQUEST:
      return {
        ...state,
        accept: {
          ...state.accept,
          ...action.payload
        }
      }
    default:
      return state;
  }
};


export default jobReducer;