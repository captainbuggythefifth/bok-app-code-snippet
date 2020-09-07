import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IRootReducerInterface } from '../redux/reducers/root';
import { useSubscription } from 'react-apollo';
import { IRequestState } from '../redux/interfaces/common';
import { QUERIES_NOTIFICATION_SUBSCRIPTION_RECEIVER_REFERENCE_ID } from '../helpers/apollo-client/queries/notification';
import { notificationActionChangeRequest, notificationActionChangeData } from '../redux/actions/notification';
import { INotificationData } from './../redux/interfaces/notification';

const NotificationSubscriptionHOC = () => {
    
    const auth = useSelector((state: IRootReducerInterface) => state.auth);

    let request: IRequestState = {
        isRequesting: false,
        done: false,
        success: false
    };

    const dispatch = useDispatch();

    const { loading, data } = useSubscription(QUERIES_NOTIFICATION_SUBSCRIPTION_RECEIVER_REFERENCE_ID, {
        variables: {
            receiverReferenceId: auth.id,
        }
    });

    useEffect(() => {

        if (loading) {
            request = {
                ...request,
                isRequesting: true
            }
            dispatch(notificationActionChangeRequest(request));
        }

        if (data) {
            
            const notifications: INotificationData[] = data.notifications;

            request = {
                ...request,
                isRequesting: false,
                done: true,
                success: true
            }

            dispatch(notificationActionChangeData(notifications));
            dispatch(notificationActionChangeRequest(request));
        }
    }, [loading, data]);    

    return (
        <>
            
        </>
    )
}

export default NotificationSubscriptionHOC