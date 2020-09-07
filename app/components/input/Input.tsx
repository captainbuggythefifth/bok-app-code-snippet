import React, { useState } from 'react';

import { TextInput, View, KeyboardTypeOptions } from 'react-native';
import styles from './../../styles/styles';

interface IInputText {
    handleTextChange?: Function,
    onBlur?: Function,
    onFocus?: Function,
    defaultValue?: string,
    placeHolder?: string,
    secureTextEntry?: boolean,
    editable?: boolean,
    keyboardType?: KeyboardTypeOptions,
    value?: string | null
}

const Input = ({
    handleTextChange = () => { },
    onBlur = () => { },
    onFocus = () => { },
    placeHolder,
    secureTextEntry = false,
    defaultValue = '',
    editable = true,
    keyboardType = 'default',
    value = ''
}: IInputText) => {
    const [typedValue, setTypedValue] = useState(defaultValue);
    return (
        <View>
            <TextInput style={{ ...styles.textInput }}
                defaultValue={defaultValue}
                value={value ? value : typedValue}
                onChangeText={(text: string) => {
                    setTypedValue(text);
                    // handleTextChange(text);
                    handleTextChange(text);
                }}
                placeholder={placeHolder}
                secureTextEntry={secureTextEntry}
                onBlur={() => {
                    onBlur()
                }}
                onFocus={() => {
                    onFocus()
                }}
                editable={editable}
                keyboardType={keyboardType}
            />
        </View>
    )
};

export default Input