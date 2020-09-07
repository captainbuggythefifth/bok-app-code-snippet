import fetcherHandler, { IFetcherHandler, IAlertOptions } from "./fetcher-handler";
import { BOOKS_BOOKINGS_GET_URL } from "./urls";


const options: IAlertOptions = {
    show: true
}

const httpBookingGet = async () => {
    const request: IFetcherHandler = {
        url: BOOKS_BOOKINGS_GET_URL,
        method: "GET",
    }

    return await fetcherHandler(request, options);
}

export {
    httpBookingGet
}