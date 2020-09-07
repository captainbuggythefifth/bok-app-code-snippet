import { PermissionsAndroid } from "react-native";
import Geolocation, { GeoPosition } from "react-native-geolocation-service";
import { ILocation } from "./../../../redux/actions/book";
import { useState } from "react";

export interface IGetLocation {
    isRequesting: boolean;
    success: boolean;
    error: any;
    data: ILocation | null;
    watchId: number;
    granted: boolean;
}

export const getLocationInitialState: IGetLocation = {
    isRequesting: false,
    success: false,
    error: false,
    data: null,
    watchId: 0,
    granted: false
};

const getLocation = async (callback: Function) => {
    let result = getLocationInitialState;

    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: "Bok",
            message: "Bok App access to your location ",
            buttonPositive: "Yes"
        }
    );

    if (granted) {
        console.log("You can use the ACCESS_FINE_LOCATION");
    } else {
        console.log("ACCESS_FINE_LOCATION permission denied");
    }

    if (granted === "granted") {
        Geolocation.getCurrentPosition(
            (position: GeoPosition) => {
                const location: ILocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    name: "My Location",
                    placeId: ""
                };

                /* if (changeLocation) {
                changeLocation(location);
            } */
                result = {
                    ...result,
                    success: true,
                    data: location
                };

                callback(result);
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
                // onLocationError(error);

                result = {
                    ...result,
                    error: error
                };

                callback(result)
            },
            {
                timeout: 15000,
                maximumAge: 10000,
                enableHighAccuracy: true
            }
        );

        const watchIdTemp = Geolocation.watchPosition(
            (position: GeoPosition) => {
                const location: ILocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    name: "My Location",
                    placeId: ""
                };

                /* if (changeLocation) {
                changeLocation(location);
            } */

                result = {
                    ...result,
                    success: true,
                    data: location
                };

                callback(result)
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
                // grantPermission();
                // onLocationError(error);

                result = {
                    ...result,
                    error: error
                };

                callback(result)
            },
            {
                timeout: 15000,
                maximumAge: 10000,
                enableHighAccuracy: true,
                interval: 2000,
                fastestInterval: 2000
            }
        );

        // setWatchId(watchIdTemp);

        result = {
            ...result,
            watchId: watchIdTemp
        };
    }

    // return result;
};

const useLocation = () => {
    const [result, setResult] = useState<IGetLocation>(getLocationInitialState);

    PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: "Bok",
            message: "Bok App access to your location ",
            buttonPositive: "Yes"
        }
    ).then((granted) => {
        if (granted) {
            console.log("You can use the ACCESS_FINE_LOCATION");
        } else {
            console.log("ACCESS_FINE_LOCATION permission denied");
        }

        if (granted === "granted") {
            Geolocation.getCurrentPosition(
                (position: GeoPosition) => {
                    const location: ILocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        name: "My Location",
                        placeId: ""
                    };

                    /* if (changeLocation) {
                        changeLocation(location);
                    } */
                    setResult({
                        ...result,
                        success: true,
                        data: location
                    });
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                    // onLocationError(error);

                    setResult({
                        ...result,
                        error: error
                    });
                    /* result = {
                        ...result,
                        error: error
                    } */
                },
                {
                    timeout: 15000,
                    maximumAge: 10000,
                    enableHighAccuracy: true
                }
            );

            const watchIdTemp = Geolocation.watchPosition(
                (position: GeoPosition) => {
                    const location: ILocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        name: "My Location",
                        placeId: ""
                    };

                    /* if (changeLocation) {
                        changeLocation(location);
                    } */

                    setResult({
                        ...result,
                        success: true,
                        data: location
                    });
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                    // grantPermission();
                    // onLocationError(error);

                    setResult({
                        ...result,
                        error: error
                    });
                },
                {
                    timeout: 15000,
                    maximumAge: 10000,
                    enableHighAccuracy: true,
                    interval: 2000,
                    fastestInterval: 2000
                }
            );

            // setWatchId(watchIdTemp);

            setResult({
                ...result,
                watchId: watchIdTemp
            });
        }
    });

    return result;
};

export { getLocation, useLocation };
