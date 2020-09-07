import React from 'react';
import { View, Text } from 'react-native';


interface IDurationAndDistanceProps {
    distance: number,
    duration: number,
    backgroundColor?: string,
    isHighlight?: boolean
}

const MapDurationAndDistance = ({duration, distance, backgroundColor = "white"} : IDurationAndDistanceProps) => {
    return (
        <View style={{
            width: 100,
            backgroundColor,
            borderRadius: 10,
            padding: 10,
            marginLeft: 10,
            marginTop: 10
        }}>
            <View>
                <Text style={{
                    color: "white"
                }}>
                    {distance > 1 ? Math.floor(distance) : distance - 1} {distance > 1 ? "KMS" : "METERS"}
                </Text>
            </View>
            <View>
                <Text style={{
                    color: "white"
                }}>
                    {duration > 1 ? Math.floor(duration) : duration - 1} {duration > 1 ? "MINS" : "SECONDS"}
                </Text>
            </View>
        </View>
    )
}

export default MapDurationAndDistance