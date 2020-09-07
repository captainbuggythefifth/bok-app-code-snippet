import fetcherHandler, { IFetcherHandler, IAlertOptions } from "./fetcher-handler";

export const googleMapKey = ""

export interface IHttpMapPlaceAutoComplete {
    value: string,
    latitude: number,
    longitude: number,
    googleMapsSessionToken: string
}

export interface IHttpMapGeocode {
    placeId: string,
    googleMapsSessionToken: string
}


interface ILocation {
    latitude: number,
    longitude: number,
}

export interface IHttpDirections {
    origin: ILocation,
    destination: ILocation,
    googleMapsSessionToken: string
}

const httpMapPlaceAutoComplete = async ({value, latitude, longitude, googleMapsSessionToken}: IHttpMapPlaceAutoComplete) => {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${googleMapKey}&input=${value}&location=${latitude},${longitude}&radius=20000&sessiontoken=${googleMapsSessionToken}`

    const request: IFetcherHandler = {
        url,
        method: "GET",
    }

    const options: IAlertOptions = {
        show: false
    }

    return await fetcherHandler(request, options);

}

const httpMapGeocode = async ({placeId, googleMapsSessionToken}: IHttpMapGeocode) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&place_id=${placeId}&sessiontoken=${googleMapsSessionToken}`

    const request: IFetcherHandler = {
        url,
        method: "GET",
    }

    const options: IAlertOptions = {
        show: false
    }

    return await fetcherHandler(request, options);

}

const httpMapDirections = async ({origin, destination, googleMapsSessionToken}: IHttpDirections) => {
    const url = `https://maps.googleapis.com/maps/api/directions/json?key=${googleMapKey}&origin=${origin}&destination=${destination}&sessiontoken=${googleMapsSessionToken}`

    const request: IFetcherHandler = {
        url,
        method: "GET",
    }

    const options: IAlertOptions = {
        show: false
    }

    return await fetcherHandler(request, options);

}

export {
    httpMapPlaceAutoComplete,
    httpMapGeocode,
    httpMapDirections
}