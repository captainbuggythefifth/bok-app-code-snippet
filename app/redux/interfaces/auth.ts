import { IRequestState } from "./common";
import { IPersonData } from "./person";

export interface IAuthState {
    id: string
    isLoggedIn: boolean,
    googleMapsSessionToken: string,
    accessToken?: string,
    refreshToken?: string,
    request: IRequestState,
    user?: IPersonData | null,
    via: "FACEBOOK" | "GOOGLE" | "PERSONAL"
}