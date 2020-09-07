import { SignIn, RegisterPersonal, RegisterPhone, VerifyPhone, FindService, FoundService, PaymentOptions, ChangeLocation, WaitingSevice, JobService, RegisterBusiness, JobDetails, Notifications, NotificationDetails, AccessLocation } from "./RootStackList";

import HomeScreen from "./../screens/HomeScreen";
import SignInScreen from "./../screens/auth/SignInScreen";
import RegisterPersonalScreen from "./../screens/register/RegisterPersonalScreen";
import VerifyPhoneScreen from "./../screens/register/VerifyPhoneScreen";
import FindServiceScreen from "../screens/books/FindServiceScreen";
import RegisterPhoneScreen from "./../screens/register/RegisterPhoneScreen";
import FoundServiceScreen from "../screens/books/FoundServiceScreen";
import PaymentOptionsScreen from "../screens/books/PaymentOptionsScreen";
import ChangeLocationScreen from "./../screens/maps/ChangeLocationScreen";
import WaitingSeviceScreen from "./../screens/books/WaitingServiceScreen";
import JobServiceScreen from "./../screens/job/JobServiceScreen";
import RegisterBusinessScreen from "./../screens/register/RegisterBusinessScreen";
import JobDetailsScreen from "./../screens/job/details/JobDetailsScreen";
import NotificationsScreen from "./../screens/notifications/NotificationsScreen";
import NotificationDetailsScreen from "./../screens/notifications/details/NotificationDetailsScreen";
import AccessLocationScreen from "./../screens/maps/AccessLocationScreen";



/* export const Home = "Home";
export const SignIn = "SignIn";
export const RegisterPersonal = "RegisterPersonal";
export const RegisterPhone = "RegisterPhone";
export const VerifyPhone = "VerifyPhone";
export const FindService = "FindService";
export const FoundService = "FoundService";
export const PaymentOptions = "PaymentOptions";
export const ChangeLocation = "ChangeLocation";
export const WaitingSevice = "WaitingService";
export const JobService = "JobService";
export const RegisterBusiness = "RegisterBusiness";
export const JobDetails = "JobDetails"; */

export type RootStackParamList = {
    Home: undefined;
    SignIn: undefined;
    RegisterPersonal: undefined,
    RegisterPhone: undefined,
    VerifyPhone: undefined,
    FindService: undefined,
    FoundService: undefined,
    PaymentOptions: undefined,
    ChangeLocation: undefined,
    WaitingService: undefined,
    JobService: {
        jobId: string
    },
    RegisterBusiness: undefined,
    JobDetails: {
        jobId: string
    }
    LoggedIn: undefined,
    Notifications: undefined
    NotificationDetails: {
        notificationId: string
    },
    AccessLocation: undefined
};

export interface IScreen {
    screenName: string,
    title?: string | undefined,
    headerShown?: boolean | undefined,
    animationTypeForReplace?: 'push' | 'pop',
    component: any,
    headerLeft?: any | undefined
}

export const screens: IScreen[] = [
    /* {
        screenName: Home,
        title: "Home",
        headerShown: true,
        animationTypeForReplace: 'push',
        component: HomeScreen,
        headerLeft: DrawerButton
    }, */
    {
        screenName: SignIn,
        title: "Sign In",
        headerShown: false,
        animationTypeForReplace: 'push',
        component: SignInScreen
    },
    {
        screenName: RegisterPersonal,
        title: "Register Personal Details",
        headerShown: true,
        animationTypeForReplace: 'push',
        component: RegisterPersonalScreen
    },
    {
        screenName: RegisterPhone,
        title: "Register Phone",
        headerShown: true,
        animationTypeForReplace: 'push',
        component: RegisterPhoneScreen
    },
    {
        screenName: VerifyPhone,
        title: "Verify Phone",
        headerShown: true,
        animationTypeForReplace: 'push',
        component: VerifyPhoneScreen
    },
    {
        screenName: FindService,
        title: "Find Service",
        headerShown: false,
        animationTypeForReplace: 'push',
        component: FindServiceScreen
    },
    {
        screenName: FoundService,
        title: "Found Service",
        headerShown: false,
        animationTypeForReplace: 'push',
        component: FoundServiceScreen
    },
    {
        screenName: PaymentOptions,
        title: "Payment Options",
        headerShown: true,
        animationTypeForReplace: 'push',
        component: PaymentOptionsScreen
    },
    {
        screenName: ChangeLocation,
        title: "Change Location",
        headerShown: true,
        animationTypeForReplace: 'push',
        component: ChangeLocationScreen
    },
    {
        screenName: WaitingSevice,
        title: "Waiting Service",
        headerShown: true,
        animationTypeForReplace: 'push',
        component: WaitingSeviceScreen
    },
    {
        screenName: JobService,
        title: "Job Service",
        headerShown: false,
        animationTypeForReplace: 'push',
        component: JobServiceScreen
    },
    {
        screenName: RegisterBusiness,
        title: "Register Business",
        headerShown: false,
        animationTypeForReplace: 'push',
        component: RegisterBusinessScreen
    },
    {
        screenName: JobDetails,
        title: "Job Details",
        headerShown: true,
        animationTypeForReplace: 'push',
        component: JobDetailsScreen
    },
    {
        screenName: Notifications,
        title: "Notifications",
        headerShown: true,
        animationTypeForReplace: 'push',
        component: NotificationsScreen
    },
    {
        screenName: NotificationDetails,
        title: "Notification Details",
        headerShown: true,
        animationTypeForReplace: 'push',
        component: NotificationDetailsScreen
    },
    {
        screenName: AccessLocation,
        title: "Access Location",
        headerShown: false,
        animationTypeForReplace: "pop",
        component: AccessLocationScreen
    }
];

