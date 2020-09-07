import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

interface ICardProps {
    children: React.ReactNode
}

const Card: FunctionComponent<ICardProps> = ({ children }) => {
    return (
        <View style={{
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 2,
        }}>
            {children}
        </View>
    )
}

export default Card