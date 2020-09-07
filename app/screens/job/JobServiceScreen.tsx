import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../../navigations/RootStackParamList';
import { useSelector, useDispatch } from 'react-redux';
import { IRootReducerInterface } from './../../redux/reducers/root';
import MapViewScreen from '../maps/MapViewScreen';
import { View } from 'react-native';
import styles from './../../styles/styles';
import { ILocation } from './../../redux/actions/book';
import { QUERIES_JOB_MUTATE_UPDATE_STATUS_BY_ID, QUERIES_JOB_MUTATE_UPDATE_CURRENT_BY_ID, QUERIES_JOB_SUBSCRIPTION_GET_BY_ID } from './../../helpers/apollo-client/queries/jobs';
import { useMutation, useSubscription } from 'react-apollo';
import JobServiceSwipeableDetails from './JobServiceSwipeableDetails';
import { permissionActionLocationScreen, permissionActionLocationStatus, permissionActionLocationError } from './../../redux/actions/permission';
import { JobService, AccessLocation } from './../../navigations/RootStackList';
import Loader from './../../components/Loader';
import ErrorScreen from './../../components/ErrorScreen';
import { GeoError } from 'react-native-geolocation-service';
import { RouteProp } from '@react-navigation/native';

type TJobServiceScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "JobService"
>;

type TJobServiceScreenRouteProp = RouteProp<
    RootStackParamList,
    "JobDetails"
>;

type Props = {
    navigation: TJobServiceScreenNavigationProp,
    route: TJobServiceScreenRouteProp,
};


const JobServiceScreen = ({ navigation, route }: Props) => {

    const { jobId } = route.params;

    const { loading, data } = useSubscription(QUERIES_JOB_SUBSCRIPTION_GET_BY_ID, {
        variables: {
            id: jobId,
        }
    });

    // const [locationCurrent, setLocationCurrent] = useState<ILocation | null>(null);
    const [jobMutateUpdateCurrentById] = useMutation(QUERIES_JOB_MUTATE_UPDATE_CURRENT_BY_ID);
    const [jobMutateUpdateStatusById] = useMutation(QUERIES_JOB_MUTATE_UPDATE_STATUS_BY_ID);

    const handleChangeLocation = (location: ILocation) => {
        if (location) {
            // setLocationCurrent(location);

            jobMutateUpdateCurrentById({
                variables: {
                    id: jobId,
                    current: location
                },
            })
        }

    }

    const handlePressItemsPickedUp = () => {
        jobMutateUpdateStatusById({
            variables: {
                id: jobActive?.id,
                status: "MENDER_PICKED_UP_ITEMS"
            },
        })
    }

    /* const handleLocationError = (error: GeoError) => {
        console.log("handleLocationError: ", error);

        // dispatch(permissionActionLocationStatus("denied"))

        if (permission.location.status === null && permission.location.error === null) {
            dispatch(permissionActionLocationError(error.code));
            navigation.navigate(AccessLocation);
        }

    } */

    if (loading) {
        return (
            <Loader />
        )
    }

    if (!data || !data.jobs_by_pk) {
        return <ErrorScreen />
    }

    const jobActive = data.jobs_by_pk;  

    const locationStart = jobActive && jobActive && jobActive.business && jobActive.business.location ? jobActive.business.location : null;
    const locationEnd = jobActive && jobActive && jobActive.book && jobActive.book.location ? jobActive.book.location : null;
    const locationCurrent = jobActive && jobActive && jobActive.current ? jobActive.current : null;

    /* if (!locationCurrent || !locationStart || !locationEnd) {
        return <></>
    } */

    // we must check if the status is MENDER_PICKED_UP_ITEMS, if not equal to, we must must display the distance&duration and directions from mender to provider
    const showDistanceAndDurationMenderToProvider = true // true // job && jobActive && jobActive.status !== "MENDER_PICKED_UP_ITEMS" ? true : false;
    const showDistanceAndDurationProviderToClient = true // true;
    const showDirectionMenderToProvider = true;
    const showDirectionProviderToClient = true;

    return (
        <>
            <View style={{
                ...styles.container
            }}>
                <MapViewScreen
                    locationStart={locationStart}
                    locationEnd={locationEnd}
                    locationCurrent={locationCurrent}
                    showDistanceAndDurationMenderToProvider={showDistanceAndDurationMenderToProvider}
                    showDistanceAndDurationProviderToClient={showDistanceAndDurationProviderToClient}
                    showDirectionMenderToProvider={showDirectionMenderToProvider}
                    showDirectionProviderToClient={showDirectionProviderToClient}
                    changeLocation={handleChangeLocation}
                >
                    <JobServiceSwipeableDetails onPressItemsPickedUp={handlePressItemsPickedUp} />
                </MapViewScreen>
            </View>
        </>
    )
};

export default JobServiceScreen