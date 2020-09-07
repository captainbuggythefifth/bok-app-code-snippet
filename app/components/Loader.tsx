import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

interface ILoader {
    size?: "large" | "small" | undefined
}

const Loader = ({ size = "large" }: ILoader) => {
    return (
        <View style={{
            ...StyleSheet.absoluteFillObject,
            alignContent: "center",
            justifyContent: "center"
        }}>
            <ActivityIndicator size={size} />
        </View>
    )
};

export default Loader