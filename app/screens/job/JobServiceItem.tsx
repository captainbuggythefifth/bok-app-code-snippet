import React from 'react';
import { View, Text } from 'react-native';

interface IJobServiceItemProps {
    quantity: number,
    name: string,
    price: number,
}

const JobServiceItem = ({name, quantity, price}: IJobServiceItemProps) => {
    return (
        <View style={{
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            padding: 8,
            flexDirection: "row"
        }}>
            <View style={{
                width: "50%",
            }}>
                <Text key={name}>{name}</Text>
            </View>
            <View style={{
                width: "50%",
                alignItems: "flex-end"
            }}>
                <Text style={{
                    textAlign: "right",
                    position: "absolute",
                    right: 30
                }}> x {quantity} </Text> 
                <Text style={{
                    fontWeight: "600",
                    position: "absolute",
                }}>{price * quantity}</Text>
            </View>
        </View>
    )
};

export default JobServiceItem