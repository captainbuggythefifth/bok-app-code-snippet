import { IDispatchActionPayload } from '../interfaces/common';
import { IPermissionState, IPermissionLocation } from '../interfaces/permission';
import { PERMISSION_ACTION_TYPE_LOCATION, PERMISSION_ACTION_TYPE_LOCATION_SCREEN, PERMISSION_ACTION_TYPE_LOCATION_STATUS, PERMISSION_ACTION_TYPE_LOCATION_ERROR } from '../action-types/permission';

const initialStatePermissionLocation: IPermissionLocation = {
    status: null,
    error: null    
}

const initialState: IPermissionState = {
    location: initialStatePermissionLocation
}

const permissionReducer = (state: IPermissionState = initialState, action: IDispatchActionPayload): IPermissionState => {
    switch (action.type) {
        case PERMISSION_ACTION_TYPE_LOCATION:
            return {
                ...state,
                location: action.payload
            }

        case PERMISSION_ACTION_TYPE_LOCATION_STATUS:
            return {
                ...state,
                location: {
                    ...state.location,
                    status: action.payload
                }
            }

        case PERMISSION_ACTION_TYPE_LOCATION_ERROR:
            return {
                ...state,
                location: {
                    ...state.location,
                    error: action.payload,
                    status: null
                }
            }

        default:
            return state;
    }
};


export default permissionReducer;