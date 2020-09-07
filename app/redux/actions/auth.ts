import { IDispatchActionPayload, IRequestState } from "../interfaces/common";
import { AUTH_ACTION_TYPE_LOG_IN, AUTH_ACTION_TYPE_LOG_IN_FACEBOOK, AUTH_ACTION_TYPE_CHANGE_GOOGLE_MAPS_SESSION_TOKEN, AUTH_ACTION_TYPE_LOG_OUT, AUTH_ACTION_TYPE_CHANGE_REQUEST, AUTH_ACTION_TYPE_CHANGE_PARTIAL_AUTH, AUTH_ACTION_TYPE_CHANGE_USER } from "../action-types/auth";
import { IAuthState } from "../interfaces/auth";
import { IPersonData } from "../interfaces/person";

interface ITokens {
    id: string,
    accessToken: string,
    refreshToken: string
}

const authActionLogIn = (tokens: ITokens): IDispatchActionPayload => ({
    type: AUTH_ACTION_TYPE_LOG_IN,
    payload: tokens
});

const authActionLogInFacebook = (): IDispatchActionPayload => ({
    type: AUTH_ACTION_TYPE_LOG_IN_FACEBOOK,
    payload: null
});

const authActionChangeGoogleMapsSessionToken = (sessionToken: string): IDispatchActionPayload => ({
    type: AUTH_ACTION_TYPE_CHANGE_GOOGLE_MAPS_SESSION_TOKEN,
    payload: sessionToken
});

const authActionLogout = (): IDispatchActionPayload => ({
    type: AUTH_ACTION_TYPE_LOG_OUT,
    payload: null
});


const authActionChangeRequest = (payload: Partial<IRequestState>): IDispatchActionPayload => ({
    type: AUTH_ACTION_TYPE_CHANGE_REQUEST,
    payload
});

const authActionChangeUser = (payload: Partial<IPersonData>): IDispatchActionPayload => ({
    type: AUTH_ACTION_TYPE_CHANGE_USER,
    payload
});

const authActionChangePartialAuth = (payload: Partial<IAuthState>): IDispatchActionPayload => ({
    type: AUTH_ACTION_TYPE_CHANGE_PARTIAL_AUTH,
    payload
});

export {
    authActionLogIn,
    authActionLogInFacebook,
    authActionChangeGoogleMapsSessionToken,
    authActionLogout,
    authActionChangeRequest,
    authActionChangeUser,
    authActionChangePartialAuth
}