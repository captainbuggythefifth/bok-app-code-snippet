import { ICounterState } from '../interfaces/counter';
import { IDispatchActionPayload } from '../interfaces/common';
import { COUNTER_ACTION_TYPE_CHANGE_COUNT } from '../action-types/counter';


const initialState: ICounterState = {
  count: 0
}

const counterReducer = (state: ICounterState = initialState, action: IDispatchActionPayload): ICounterState => {
  switch(action.type) {
    case COUNTER_ACTION_TYPE_CHANGE_COUNT:
      return {
        ...state,
        count: action.payload
      }
    default:
      return state;
  }
};


export default counterReducer;