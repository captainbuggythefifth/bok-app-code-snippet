import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import styles from '../../styles/styles';
import Spacer from './../../components/Spacer';
const SplashScreen = () => {
    return (

        <View style={{
            ...styles.centerBackgroundColor,
            ...StyleSheet.absoluteFillObject,
            justifyContent: "center",
            alignContent: "center",
            height: '100%'
        }}>

            <View style={{
                ...styles.alignCenter
            }}><Image source={require('./../../images/logo-2x2.jpg')} style={{
                width: 80,
                height: 80
            }} /></View>
        </View>

    )
};

export default SplashScreen