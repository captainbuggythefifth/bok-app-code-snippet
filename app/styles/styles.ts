import { StyleSheet, Button } from 'react-native';
import common, { blueGreen, defaultScreenWidth, defaultBorderColor, mediumTurquoise } from './common.style';
export default StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    centerBackgroundColor: {
        ...common.blueGreenBackground,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    },
    backgroundText: {
        color: 'white'
    },
    alignCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerWhiteBackgroundColor: {
        ...common.whiteBackground,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    defaultScreenFormWidth: {
        width: defaultScreenWidth
    },
    defaultScreenWidth: {
        width: defaultScreenWidth
    },
    textInput: {
        backgroundColor: '#ffffff',
        width: '100%',
        borderRadius: 10,
        padding: 15,
        borderColor: '#d5d4d5',
        borderWidth: 1,
        height: 50
    },
    button: {
        backgroundColor: blueGreen,
        borderRadius: 10,
        height: 50,
        color: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    buttonText: {
        color: "white", 
        fontWeight: "bold",
    },
    buttonDisabled: {
        backgroundColor: mediumTurquoise,
        borderRadius: 10,
        height: 50,
        color: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    serviceFormDetails: {
        borderTopColor: defaultBorderColor,
        borderTopWidth: 1,
        padding: 10
    }
});