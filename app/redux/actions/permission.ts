import { IDispatchActionPayload } from "../interfaces/common";
import { PERMISSION_ACTION_TYPE_LOCATION, PERMISSION_ACTION_TYPE_LOCATION_STATUS, PERMISSION_ACTION_TYPE_LOCATION_SCREEN, PERMISSION_ACTION_TYPE_LOCATION_ERROR } from "../action-types/permission";
import { IPermissionLocation } from "../interfaces/permission";
import { PermissionStatus } from "react-native";

const permissionActionLocation = (locationPermission: IPermissionLocation): IDispatchActionPayload => ({
    type: PERMISSION_ACTION_TYPE_LOCATION,
    payload: locationPermission
});

const permissionActionLocationStatus = (status: PermissionStatus): IDispatchActionPayload => ({
    type: PERMISSION_ACTION_TYPE_LOCATION_STATUS,
    payload: status
});

const permissionActionLocationScreen = (screen: string): IDispatchActionPayload => ({
    type: PERMISSION_ACTION_TYPE_LOCATION_SCREEN,
    payload: screen
});

const permissionActionLocationError = (error: any): IDispatchActionPayload => ({
    type: PERMISSION_ACTION_TYPE_LOCATION_ERROR,
    payload: error
});

export {
    permissionActionLocation,
    permissionActionLocationStatus,
    permissionActionLocationScreen,
    permissionActionLocationError
}