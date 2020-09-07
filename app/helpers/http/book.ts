import { IBookState } from "./../../redux/interfaces/book";
import fetcherHandler, { IFetcherHandler, IAlertOptions } from "./fetcher-handler";
import { CLIENT_BOOK_URL, BOOK_NEW_URL } from "./urls";

const options: IAlertOptions = {
    show: true
}

export interface IHttpBookLocation {
    lat: number,
    long: number
}

export interface IHttpBookingInformation {
    bookingType: string,
    bookingInfo: IBookState
}

export interface IHttpBook {
    currentLocation: IHttpBookLocation,
    bookingInformation: IHttpBookingInformation
}

export interface IHttpBookNew {
    book: Partial<IBookState>,
    client_id: string,
    transaction_id: string,
    booking_id: string
}

const httpBook = async (data: IHttpBook) => {
    const request: IFetcherHandler = {
        url: CLIENT_BOOK_URL,
        method: "POST",
        data
    }

    return await fetcherHandler(request, options);
}

const httpBookNew = async (data: IHttpBookNew) => {
    const request: IFetcherHandler = {
        url: BOOK_NEW_URL,
        method: "POST",
        data
    }

    return await fetcherHandler(request, options);
}


export {
    httpBook,
    httpBookNew
}