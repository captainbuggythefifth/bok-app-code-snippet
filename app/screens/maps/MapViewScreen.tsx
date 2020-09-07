import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import { View, PermissionsAndroid } from "react-native";
import Geolocation, { GeoPosition } from "react-native-geolocation-service";
import { ILocation } from "./../../redux/actions/book";
import styles from "./../../styles/styles";
import MapViewDirections from "react-native-maps-directions";
import { googleMapKey } from "./../../helpers/http/map";
import MapDurationAndDistance from "./../../components/maps/MapDurationAndDistance";
import {
    colorCodeMenderToProvider,
    colorCodeProviderToClient
} from "./../../styles/common.style";
import Loader from "./../../components/Loader";

export interface IMapViewScreenLocationProps {
    longitude: number;
    latitude: number;
}

interface IMapViewScreenProps {
    locationStart?: IMapViewScreenLocationProps | null;
    locationEnd?: IMapViewScreenLocationProps | null;
    locationCurrent?: IMapViewScreenLocationProps | null;
    changeLocation?: Function;
    onLocationGrantAccess?: Function;
    onLocationError?: Function;
    draggableLocationStart?: boolean;
    draggableLocationEnd?: boolean;
    showDistanceAndDurationMenderToProvider?: boolean;
    showDistanceAndDurationProviderToClient?: boolean;
    showDirectionMenderToProvider?: boolean;
    showDirectionProviderToClient?: boolean;
    children?: React.ReactNode;
}
const MapViewScreen = ({
    locationStart,
    locationEnd,
    locationCurrent,
    changeLocation,
    onLocationError = () => {},
    draggableLocationStart = false,
    draggableLocationEnd = false,
    showDistanceAndDurationMenderToProvider = false,
    showDistanceAndDurationProviderToClient = false,
    showDirectionMenderToProvider = false,
    showDirectionProviderToClient = false,
    children,
}: IMapViewScreenProps) => {
    const [watchId, setWatchId] = useState<number>(0);
    const [distanceMenderToProvider, setDistanceMenderToProvider] = useState(0);
    const [distanceProviderToClient, setDistanceProviderToClient] = useState(0);

    const [durationMenderToProvider, setDurationMenderToProvider] = useState(0);
    const [durationProviderToClient, setDurationProviderToClient] = useState(0);

    const [latitudeDelta, setLatitudeDelta] = useState<number>(0.015);
    const [longitudeDelta, setLongitudeDelta] = useState<number>(0.0121);

    const getLocation = async () => {
        if (!changeLocation) {
            return false;
        }

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

                    if (changeLocation) {
                        changeLocation(location);
                    }
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                    onLocationError(error);
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

                    if (changeLocation) {
                        changeLocation(location);
                    }
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                    // grantPermission();
                    onLocationError(error);
                },
                {
                    timeout: 15000,
                    maximumAge: 10000,
                    enableHighAccuracy: true,
                    interval: 2000,
                    fastestInterval: 2000
                }
            );

            setWatchId(watchIdTemp);
        }
    };

    useEffect(() => {
        (async function getPermission() {
            getLocation();
        })();

        // return () => Geolocation.clearWatch(watchId);
    }, []);

    return (
        <>
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    zIndex: 1
                }}
            >
                {showDistanceAndDurationMenderToProvider &&
                    distanceMenderToProvider > 0 &&
                    durationMenderToProvider > 0 && (
                        <MapDurationAndDistance
                            distance={distanceMenderToProvider}
                            duration={durationMenderToProvider}
                            backgroundColor={colorCodeMenderToProvider}
                        />
                    )}
                {showDistanceAndDurationProviderToClient &&
                    distanceProviderToClient > 0 &&
                    durationProviderToClient > 0 && (
                        <MapDurationAndDistance
                            distance={distanceProviderToClient}
                            duration={durationProviderToClient}
                            backgroundColor={colorCodeProviderToClient}
                        />
                    )}
            </View>
            <View
                style={{
                    ...styles.container,
                    height: "100%",
                    minHeight: "100%"
                }}
            >
                {locationEnd?.latitude === 0 || locationEnd?.longitude === 0 && (
                    <Loader />
                )}
                {locationEnd && locationEnd?.latitude !== 0 && locationEnd?.longitude !== 0 && (
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        initialRegion={{
                            latitude: locationEnd.latitude,
                            longitude: locationEnd.longitude,
                            latitudeDelta,
                            longitudeDelta
                        }}
                        showsUserLocation={true}
                        followsUserLocation={false}
                        onRegionChangeComplete={(regionChangeComplete) => {
                            setLatitudeDelta(
                                regionChangeComplete.latitudeDelta
                            );
                            setLongitudeDelta(
                                regionChangeComplete.longitudeDelta
                            );
                        }}
                    >
                        {locationStart && (
                            <Marker
                                draggable={draggableLocationStart}
                                coordinate={{
                                    latitude: locationStart.latitude,
                                    longitude: locationStart.longitude
                                }}
                                onDragEnd={(e) => {
                                    const location: ILocation = {
                                        latitude:
                                            e.nativeEvent.coordinate.latitude,
                                        longitude:
                                            e.nativeEvent.coordinate.longitude,
                                        name: "My Location",
                                        placeId: ""
                                    };

                                    if (changeLocation)
                                        changeLocation(location);
                                }}
                                image={require("./company.png")}
                            />
                        )}
                        {locationEnd && (
                            <Marker
                                draggable={draggableLocationEnd}
                                coordinate={{
                                    latitude: locationEnd.latitude,
                                    longitude: locationEnd.longitude
                                }}
                                image={require("./finish-flag.png")}
                                onDragEnd={(e) => {
                                    const location: ILocation = {
                                        latitude:
                                            e.nativeEvent.coordinate.latitude,
                                        longitude:
                                            e.nativeEvent.coordinate.longitude,
                                        name: "My Location",
                                        placeId: ""
                                    };
                                    if (changeLocation)
                                        changeLocation(location);
                                }}
                            />
                        )}
                        {locationCurrent && (
                            <Marker
                                draggable={false}
                                coordinate={{
                                    latitude: locationCurrent.latitude,
                                    longitude: locationCurrent.longitude
                                }}
                                image={require("./food-delivery.png")}
                            />
                        )}
                        {locationCurrent &&
                            locationStart &&
                            showDirectionMenderToProvider && (
                                <MapViewDirections
                                    origin={locationCurrent}
                                    destination={locationStart}
                                    apikey={googleMapKey}
                                    strokeWidth={3}
                                    strokeColor={colorCodeMenderToProvider}
                                    onReady={(result) => {
                                        setDistanceMenderToProvider(
                                            result.distance
                                        );
                                        setDurationMenderToProvider(
                                            result.duration
                                        );
                                    }}
                                    onError={(error) => {
                                        console.log("error: ", error);
                                    }}
                                />
                            )}
                        {locationStart &&
                            locationEnd &&
                            showDirectionProviderToClient && (
                                <MapViewDirections
                                    origin={locationStart}
                                    destination={locationEnd}
                                    apikey={googleMapKey}
                                    strokeWidth={3}
                                    strokeColor={colorCodeProviderToClient}
                                    onReady={(result) => {
                                        setDistanceProviderToClient(
                                            result.distance
                                        );
                                        setDurationProviderToClient(
                                            result.duration
                                        );
                                    }}
                                    onError={(error) => {
                                        console.log("error: ", error);
                                    }}
                                />
                            )}
                    </MapView>
                )}
                {children}
            </View>
        </>
    );
};

export default MapViewScreen;
