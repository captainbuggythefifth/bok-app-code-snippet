import React from 'react';
import ApolloClientHOC from './ApolloClientHOC';
import ReactReduxProviderHOC from './ReactReduxProviderHOC';

import messaging from '@react-native-firebase/messaging';
import { Vibration } from 'react-native';

messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
    Vibration.vibrate([2, 150]);
    console.log('Message handled in the background!', remoteMessage);
});

const HOC = ({ children }: any) => {
    return (
        <ApolloClientHOC>
            <ReactReduxProviderHOC>
                {children}
            </ReactReduxProviderHOC>
        </ApolloClientHOC>
    )
};

export default HOC