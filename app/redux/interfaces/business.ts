import { ILocation } from "../actions/book";
import { IRequestState } from "./common";

export interface IBusinessState {
    _id?: string,
    id: string,
    providerId: string,
    name: string,
    location: ILocation,
    deviceToken: string,
    phone: string,
    picture: string
}

export interface IBusinessesState {
    businesses: IBusinessState[],
}

export interface IBusinessRequestServerState {
    _id?: string,
    provider_id: string,
    name: string,
    location: ILocation,
    device_token: string,
    phone: string,
    picture?: string,
    picture_url?: string
}

export interface IBusinessRequestState {
    request: IRequestState,
    businesses: IBusinessRequestServerState[] | null,
    active: IBusinessRequestServerState | null
}