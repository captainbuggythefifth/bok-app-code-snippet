import React from 'react';
import { Image, Text } from 'react-native';
import Spacer from '../Spacer';

const driver = {
    name: "Juan Dela Cruz",
    phone: "099344443344",
    image: "../../images/silhoutte.png"
};

const DriverInformation = () => {
    return (
        <>
            <Image source={require("../../images/silhoutte.png")} />
            <Spacer />
            <Text style={{
                textAlign: "center"
            }}>{driver.name}</Text>
            <Spacer />
            <Text style={{
                textAlign: "center"
            }}>{driver.phone}</Text>
        </>
    )
};

export default DriverInformation