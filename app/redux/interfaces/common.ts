export interface IResponseDataState {
    isRequesting: boolean,
    success: boolean,
    data: any
}

export interface IDispatchActionPayload {
    type: string,
    payload: any
}

export interface IRequestState {
    isRequesting: boolean,
    done: boolean,
    success: boolean
}

export const initialRequestState: IRequestState = {
    isRequesting: false,
    done: false,
    success: false
}