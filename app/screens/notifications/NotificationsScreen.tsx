import React from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { NotificationDetails } from './../../navigations/RootStackList';
import Loader from './../../components/Loader';
import { useSelector } from 'react-redux';
import { IRootReducerInterface } from './../../redux/reducers/root';
import { INotificationData } from './../../redux/interfaces/notification';
import notificationTitleBuilder from './../../helpers/notifications/notification-title-builder';
import notificationAvatar from './../../helpers/notifications/notification-avatar';


const NotificationsScreen = () => {

    const navigation = useNavigation();

    const notification = useSelector((state: IRootReducerInterface) => state.notification);

    if (notification.request.isRequesting) {
        return (
            <Loader />
        )
    }
    if (notification.data && Array.isArray(notification.data.length) && notification.data.length === 0) {
        return (
            <View>
                <Text>NO DATA YET</Text>
            </View>
        );
    }

    return (
        <View>
            {
                notification.data && Array.isArray(notification.data) && notification.data.map((notificationA: INotificationData, i: any) => (
                    <ListItem
                        key={i}
                        leftAvatar={{ source: { uri: notificationAvatar({
                            notification: notificationA
                        })} }}
                        title={notificationTitleBuilder({
                            notification: notificationA
                        })}
                        subtitle={notificationA.created_at}
                        bottomDivider
                        chevron
                        onPress={() => {
                            navigation.navigate(NotificationDetails, { notificationId: notificationA.id })
                        }}
                        style={{
                            backgroundColor: notificationA.status === "SEEN" ? "#777" : "white"
                        }}
                    />
                ))
            }
        </View>
    )
};

export default NotificationsScreen