import { IDispatchActionPayload } from '../interfaces/common';
import { IRegisterState } from '../interfaces/register';
import { REGISTER_ACTION_TYPE_CHANGE_FIELDS } from '../action-types/register';


const initialState: IRegisterState = {
    fullName: '',
    firstName: '',
    lastName: '',
    email: '',
    birthdate: '',
    phone: '',
    via: "FACEBOOK",
    picture: ''
}

const registerReducer = (state: IRegisterState = initialState, action: IDispatchActionPayload): IRegisterState => {
  switch (action.type) {
    case REGISTER_ACTION_TYPE_CHANGE_FIELDS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};


export default registerReducer;