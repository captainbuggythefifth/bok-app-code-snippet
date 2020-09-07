import { IDispatchActionPayload, initialRequestState } from '../interfaces/common';
import { AUTH_ACTION_TYPE_LOG_IN_FACEBOOK, AUTH_ACTION_TYPE_LOG_OUT, AUTH_ACTION_TYPE_CHANGE_GOOGLE_MAPS_SESSION_TOKEN, AUTH_ACTION_TYPE_LOG_IN, AUTH_ACTION_TYPE_CHANGE_REQUEST, AUTH_ACTION_TYPE_CHANGE_USER, AUTH_ACTION_TYPE_CHANGE_PARTIAL_AUTH } from '../action-types/auth';
import { IAuthState } from '../interfaces/auth';


const initialState: IAuthState = {
  id: '',
  isLoggedIn: false,
  googleMapsSessionToken: '',
  accessToken: '',
  refreshToken: '',
  request: initialRequestState,
  user: null,
  via: "PERSONAL"
}

const authReducer = (state: IAuthState = initialState, action: IDispatchActionPayload): IAuthState => {
  switch (action.type) {
    case AUTH_ACTION_TYPE_LOG_IN:
      return {
        ...state,
        id: action.payload.id,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isLoggedIn: true
      }
    case AUTH_ACTION_TYPE_LOG_IN_FACEBOOK:
      return {
        ...state,
        isLoggedIn: true
      }
    case AUTH_ACTION_TYPE_LOG_OUT:
      return {
        ...state,
        id: '',
        accessToken: '',
        refreshToken: '',
        isLoggedIn: false,
        user: null
      }

    case AUTH_ACTION_TYPE_CHANGE_REQUEST:
      return {
        ...state,
        request: action.payload
      }

    case AUTH_ACTION_TYPE_CHANGE_GOOGLE_MAPS_SESSION_TOKEN:
      return {
        ...state,
        googleMapsSessionToken: action.payload
      }

    case AUTH_ACTION_TYPE_CHANGE_USER:
      return {
        ...state,
        user: action.payload
      }

      case AUTH_ACTION_TYPE_CHANGE_PARTIAL_AUTH:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};


export default authReducer;