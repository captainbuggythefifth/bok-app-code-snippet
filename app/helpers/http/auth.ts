import { CLIENT_AUTH_OTP_SEND_URL, CLIENT_AUTH_OTP_VALIDATE_URL, CLIENT_AUTH_TOKENS_REFRESH, PROVIDER_AUTH_LOG_IN_URL, PROVIDER_AUTH_REGISTER_URL, PROVIDER_AUTH_DEVICE_TOKEN_URL, BUSINESS_AUTH_REGISTER_URL, BUSINESSES_AUTH_GET_BY_PROVIDER_ID, MENDER_AUTH_LOG_IN_URL, MENDER_AUTH_REGISTER_URL, MENDER_AUTH_DEVICE_TOKEN, CLIENT_AUTH_LOG_IN_URL, CLIENT_AUTH_REGISTER_URL, CLIENT_AUTH_DEVICE_TOKEN_URL } from "./urls"
import fetcherHandler, { IFetcherHandler, IAlertOptions } from "./fetcher-handler";
import { IRegisterState } from "./../../redux/interfaces/register";
import { IBusinessState } from "./../../redux/interfaces/business";

const options: IAlertOptions = {
    show: true
}

export interface IHttpAuthLogin {
    email: string,
    via?: string,
    fbToken?: string,
    password?: string,
    deviceToken?: string
}

const httpAuthLogin = async (data: IHttpAuthLogin) => {
    const request: IFetcherHandler = {
        url: CLIENT_AUTH_LOG_IN_URL,
        method: "POST",
        data
    };

    let opts = options;

    // Because of design, error alert must not show during Sign Up - only during sign via PERSONAL
    if (data.via === "FACEBOOK" || data.via === "GOOGLE") {
        opts = {
            ...opts,
            show: false
        }
    }

    return await fetcherHandler(request, opts);
}

const httpAuthSendOtp = async (phone: string) => {
    const request: IFetcherHandler = {
        url: CLIENT_AUTH_OTP_SEND_URL,
        method: "POST",
        data: {
            phone
        }
    }

    return await fetcherHandler(request, options);
}

const httpAuthOtpValidate = async (phone: string, otp: string) => {
    const request: IFetcherHandler = {
        url: CLIENT_AUTH_OTP_VALIDATE_URL,
        method: "POST",
        data: {
            phone,
            otp
        }
    }

    return await fetcherHandler(request, options);

}

const httpAuthRegister = async (values: Partial<IRegisterState>) => {
    const request: IFetcherHandler = {
        url: CLIENT_AUTH_REGISTER_URL,
        method: "POST",
        data: {
            full_name: values.fullName,
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            birth_date: values.birthdate,
            via: values.via,
            phone: values.phone,
            password: values.password,
            device_token: values.deviceToken,
            picture: values.picture
        }
    }

    return await fetcherHandler(request, options);

}

const httpAuthBusinessRegister = async (values: Partial<IBusinessState>) => {
    const request: IFetcherHandler = {
        url: BUSINESS_AUTH_REGISTER_URL,
        method: "POST",
        data: {
            provider_id: values.providerId,
            name: values.name,
            location: values.location,
            device_token: values.deviceToken
        }
    }

    return await fetcherHandler(request, options);

}

const httpAuthTokensRefresh = async (refreshToken: string) => {
    const request: IFetcherHandler = {
        url: CLIENT_AUTH_TOKENS_REFRESH,
        method: "POST",
        data: {
            refresh_token: refreshToken
        }
    }

    return await fetcherHandler(request, {
        show: false
    });

}

const httpAuthDeviceToken = async (accessToken: string, deviceToken: string) => {
    const request: IFetcherHandler = {
        url: CLIENT_AUTH_DEVICE_TOKEN_URL,
        method: "POST",
        data: {
            access_token: accessToken,
            device_token: deviceToken
        }
    }

    return await fetcherHandler(request, {
        show: false
    });

}

const httpAuthBusinessGetByProviderId = async (providerId: string) => {
    const request: IFetcherHandler = {
        url: `${BUSINESSES_AUTH_GET_BY_PROVIDER_ID}/${providerId}`,
        method: "GET"
    }

    return await fetcherHandler(request, options);

}

export {
    httpAuthLogin,
    httpAuthSendOtp,
    httpAuthOtpValidate,
    httpAuthRegister,
    httpAuthTokensRefresh,
    httpAuthDeviceToken,
    httpAuthBusinessRegister,
    httpAuthBusinessGetByProviderId
}