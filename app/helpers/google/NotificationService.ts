import messaging from '@react-native-firebase/messaging';
export default class NotificationService {
    constructor(messagesBackground: Function, onMessage: Function) {
         messagesBackground = messaging().setBackgroundMessageHandler;
         onMessage = messaging().onMessage
    }
}