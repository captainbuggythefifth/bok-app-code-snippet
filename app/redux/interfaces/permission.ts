import { PermissionStatus } from "react-native";

export interface IPermissionLocation {
    status: PermissionStatus | null
    error: any
}

export interface IPermissionState {
    location: IPermissionLocation
}