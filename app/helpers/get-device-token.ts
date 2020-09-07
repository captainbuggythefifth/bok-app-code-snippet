import messaging from '@react-native-firebase/messaging';

const getDeviceToken = async () => {
    return await messaging().getToken()
}

export default getDeviceToken