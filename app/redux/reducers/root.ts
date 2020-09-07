import { combineReducers } from 'redux';
import { ICounterState } from '../interfaces/counter';
import counterReducer from './counter';
import { IAuthState } from '../interfaces/auth';
import authReducer from './auth';
import { IBookState } from '../interfaces/book';
import bookReducer from './book';
import { IRegisterState } from '../interfaces/register';
import registerReducer from './register';
import { IJobState } from '../interfaces/job';
import jobReducer from './job';
import { IBusinessRequestState } from '../interfaces/business';
import businessReducer from './business';
import { INotificationState } from '../interfaces/notification';
import notificationReducer from './notification';
import { IPermissionState } from '../interfaces/permission';
import permissionReducer from './permission';
import { IJobActiveState } from '../interfaces/job-active';
import jobActiveReducer from './job-active';
import { IBookingState } from '../interfaces/booking';
import bookingReducer from './booking';


export interface IRootReducerInterface {
    counter: ICounterState,
    auth: IAuthState,
    book: IBookState,
    register: IRegisterState,
    job: IJobState,
    business: IBusinessRequestState,
    notification: INotificationState,
    permission: IPermissionState,
    jobActive: IJobActiveState,
    booking: IBookingState
}

export default combineReducers<IRootReducerInterface>({
    counter: counterReducer,
    auth: authReducer,
    book: bookReducer,
    register: registerReducer,
    job: jobReducer,
    business: businessReducer,
    notification: notificationReducer,
    permission: permissionReducer,
    jobActive: jobActiveReducer,
    booking: bookingReducer
});