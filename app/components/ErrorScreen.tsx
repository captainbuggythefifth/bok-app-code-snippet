import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Text } from 'react-native-elements';

interface IError {
    size?: number | undefined
}


const ErrorScreen = ({ size = 50 }: IError) => {
    return (
        <View style={{
            ...StyleSheet.absoluteFillObject,
            alignContent: "center",
            justifyContent: "center"
        }}>
            <Icon name="emoticon-dead-outline" type="material-community" size={size} />
            <Text style={{
                fontWeight: "bold",
                fontSize: size
            }}>We are awfully sorry</Text>
        </View>
    )
};

export default ErrorScreen