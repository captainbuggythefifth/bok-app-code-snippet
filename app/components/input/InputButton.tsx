import React from 'react';

import { Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import styles from './../../styles/styles';
import { mediumTurquoise, cornFlower, royalBlue } from './../../styles/common.style';


interface IInputButton {
    title: string,
    onPress: any,
    isLoading?: boolean,
    style?: any,
    disabled?: boolean,
    textStyle?: {}
}

const InputButton = ({ title = '', onPress, isLoading = false, style, disabled = false, textStyle }: IInputButton) => {
    const styleButton = isLoading || disabled ? {
        ...styles.button,
        ...style,
        backgroundColor: style && style.babackgroundColor && style.backgroundColor === royalBlue ? cornFlower : mediumTurquoise,
    } : {
            ...styles.button,
            ...style,
        }
    return (
        <TouchableOpacity style={styleButton} onPress={onPress} disabled={isLoading || disabled}>
            <View style={{
                justifyContent: "flex-start",
            }}>
                <ActivityIndicator animating={isLoading} size={"small"} color="white" style={{ display: isLoading ? "flex" : "none" }} />
                <Text style={{
                    ...styles.buttonText,
                    ...textStyle,
                    display: isLoading ? "none" : "flex"
                }}>{title}</Text>
            </View>

        </TouchableOpacity>
    )
};

export default InputButton