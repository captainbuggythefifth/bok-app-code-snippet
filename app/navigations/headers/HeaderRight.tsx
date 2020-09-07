import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, withBadge, Icon, Badge } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { IRootReducerInterface } from './../../redux/reducers/root';
import { useNavigation } from '@react-navigation/native';
import { Profile, Notifications } from '../RootStackList';


const HeaderRight = () => {

    const navigation = useNavigation();

    const auth = useSelector((state: IRootReducerInterface) => state.auth);
    const notification = useSelector((state: IRootReducerInterface) => state.notification);

    const handleClick = () => {
        navigation.navigate(Notifications)
    };

    return (
        <View style={{
            paddingRight: 8
        }}>
            {!auth.user || !auth.user.picture_url && (
                <Avatar
                    title={auth.user.first_name}
                    titleStyle={{
                        color: "green",
                    }}
                    rounded={true}
                    size={40}
                    containerStyle={{
                        backgroundColor: "white",
                    }}
                    activeOpacity={0.7}
                    onPress={handleClick}
                />
            )}
            {auth.user && auth.user.picture_url && (
                <Avatar
                    source={{
                        uri: auth.user.picture_url
                    }}
                    rounded={true}
                    size={40}
                    activeOpacity={0.7}
                    onPress={handleClick}

                />
            )}
            {notification && notification.data && notification.data.length > 0 && (
                <Badge
                    value={notification.data.length}
                    status="success"
                    containerStyle={{ position: 'absolute', top: -2, right: -2 }}
                />
            )}

        </View>
    )
}


export default HeaderRight