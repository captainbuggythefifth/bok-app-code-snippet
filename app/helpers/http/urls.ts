const CLIENT_AUTH_LOG_IN_URL = "https://39jag3tu2d.execute-api.ap-southeast-1.amazonaws.com/Prod/client/login";
const CLIENT_AUTH_REGISTER_URL = "https://39jag3tu2d.execute-api.ap-southeast-1.amazonaws.com/Prod/client/register";
const CLIENT_AUTH_OTP_SEND_URL = "https://39jag3tu2d.execute-api.ap-southeast-1.amazonaws.com/Prod/otp/send";
const CLIENT_AUTH_OTP_VALIDATE_URL = "https://39jag3tu2d.execute-api.ap-southeast-1.amazonaws.com/Prod/otp/validate";
const CLIENT_AUTH_TOKENS_REFRESH = "https://39jag3tu2d.execute-api.ap-southeast-1.amazonaws.com/Prod/tokens/refresh";
const CLIENT_AUTH_DEVICE_TOKEN_URL = "https://39jag3tu2d.execute-api.ap-southeast-1.amazonaws.com/Prod/client/device-token";
const CLIENT_BOOK_URL = "https://ccjdvz0f97.execute-api.ap-southeast-1.amazonaws.com/test/book";
const BOOK_NEW_URL = "https://ngornzzg24.execute-api.ap-southeast-1.amazonaws.com/Prod/job";

const PROVIDER_AUTH_LOG_IN_URL = "https://39jag3tu2d.execute-api.ap-southeast-1.amazonaws.com/Prod/provider/login";
const PROVIDER_AUTH_REGISTER_URL = "https://39jag3tu2d.execute-api.ap-southeast-1.amazonaws.com/Prod/provider/register";
const PROVIDER_AUTH_DEVICE_TOKEN_URL = "https://39jag3tu2d.execute-api.ap-southeast-1.amazonaws.com/Prod/provider/device-token";

const MENDER_AUTH_LOG_IN_URL = "https://39jag3tu2d.execute-api.ap-southeast-1.amazonaws.com/Prod/mender/login";
const MENDER_AUTH_REGISTER_URL = "https://39jag3tu2d.execute-api.ap-southeast-1.amazonaws.com/Prod/mender/register";
const MENDER_AUTH_DEVICE_TOKEN = "https://39jag3tu2d.execute-api.ap-southeast-1.amazonaws.com/Prod/mender/device-token";


const BUSINESS_AUTH_REGISTER_URL = "https://39jag3tu2d.execute-api.ap-southeast-1.amazonaws.com/Prod/business/register";
const BUSINESSES_AUTH_GET_BY_PROVIDER_ID = "https://39jag3tu2d.execute-api.ap-southeast-1.amazonaws.com/Prod/businesses/get-by-provider-id";

const PROVIDER_JOB_ACCEPT_URL = "https://ngornzzg24.execute-api.ap-southeast-1.amazonaws.com/Prod/job/provider/accept"
const MENDER_JOB_ACCEPT_URL = "https://ngornzzg24.execute-api.ap-southeast-1.amazonaws.com/Prod/job/mender/accept"


const BOOKS_BOOKINGS_GET_URL = "https://ngornzzg24.execute-api.ap-southeast-1.amazonaws.com/Prod/bookings"


export {
    CLIENT_AUTH_LOG_IN_URL,
    CLIENT_AUTH_REGISTER_URL,
    CLIENT_AUTH_OTP_SEND_URL,
    CLIENT_AUTH_OTP_VALIDATE_URL,
    CLIENT_AUTH_TOKENS_REFRESH,
    CLIENT_AUTH_DEVICE_TOKEN_URL,
    CLIENT_BOOK_URL,
    PROVIDER_AUTH_LOG_IN_URL,
    PROVIDER_AUTH_REGISTER_URL,
    PROVIDER_AUTH_DEVICE_TOKEN_URL,
    BUSINESS_AUTH_REGISTER_URL,
    BUSINESSES_AUTH_GET_BY_PROVIDER_ID,
    BOOK_NEW_URL,
    PROVIDER_JOB_ACCEPT_URL,
    MENDER_AUTH_LOG_IN_URL,
    MENDER_AUTH_REGISTER_URL,
    MENDER_AUTH_DEVICE_TOKEN,
    MENDER_JOB_ACCEPT_URL,
    BOOKS_BOOKINGS_GET_URL
}