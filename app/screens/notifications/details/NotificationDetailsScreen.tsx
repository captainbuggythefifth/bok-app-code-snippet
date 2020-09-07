import React, { useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigations/RootStackParamList';
import JobDetails from '../../../components/job/details/Details';
import { useSubscription, useMutation } from 'react-apollo';
import { View, Text } from 'react-native';
import Loader from '../../../components/Loader';
import { QUERIES_NOTIFICATION_SUBSCRIPTION_GET_BY_ID, QUERIES_NOTIFICATION_MUTATE_UPDATE_STATUS_BY_ID } from './../../../helpers/apollo-client/queries/notification';
import styles from './../../../styles/styles';


type TNotificationDetailsScreenRouteProp = RouteProp<
    RootStackParamList,
    "NotificationDetails"
>;

type TNotificationDetailsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "NotificationDetails"
>;

type Props = {
    navigation: TNotificationDetailsScreenNavigationProp;
    route: TNotificationDetailsScreenRouteProp
};

const NotificationDetailsScreen = ({ route }: Props) => {

    const { notificationId } = route.params;


    const [notificationUpdateMutation] = useMutation(QUERIES_NOTIFICATION_MUTATE_UPDATE_STATUS_BY_ID);

    useEffect(() => {
        notificationUpdateMutation({
            variables: {
                id: notificationId,
                status: "SEEN"
            },
        })
    }, []);

    const { loading, data } = useSubscription(QUERIES_NOTIFICATION_SUBSCRIPTION_GET_BY_ID, {
        variables: {
            id: notificationId,
        }
    });

    if (loading) {
        return (
            <Loader />
        )
    }

    if (!data) {
        return (
            <View>
                <Text>
                    NO DATA
                </Text>
            </View>
        )
    }

    if (data) {

        return (
            <View style={{
                ...styles.container,
                padding: 40
            }}>
                {data.notifications_by_pk.job && (
                    <JobDetails job={data.notifications_by_pk.job} />
                )}
            </View>
        )
    }

    return (
        <></>
    )
};

export default NotificationDetailsScreen