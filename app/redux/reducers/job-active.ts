import { IDispatchActionPayload, initialRequestState } from '../interfaces/common';
import { IJobActiveState } from '../interfaces/job-active';
import { JOB_ACTIVE_ACTION_TYPE_CHANGE_DATA, JOB_ACTIVE_ACTION_TYPE_CHANGE_REQUEST } from '../action-types/job-active';


const initialState: IJobActiveState = {
  request: initialRequestState,
  data: null
}

const jobActiveReducer = (state: IJobActiveState = initialState, action: IDispatchActionPayload): IJobActiveState => {
  switch (action.type) {
    case JOB_ACTIVE_ACTION_TYPE_CHANGE_DATA:
      return {
        ...state,
        data: action.payload
      }

    case JOB_ACTIVE_ACTION_TYPE_CHANGE_REQUEST:
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


export default jobActiveReducer;