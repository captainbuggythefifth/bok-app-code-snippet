import React from 'react';
import { Icon } from 'react-native-elements';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';


const DrawerButton = () => {
    const navigation = useNavigation();

    return (
        <View style={{ paddingLeft: 8 }}>
            <Icon
                name="menu"
                type="material-community"
                size={32}
                color="#fff"
                style={{ paddingLeft: 10 }}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
            />
        </View>
    )
};

export default DrawerButton