import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import Input from '../input/Input';
import styles from './../../styles/styles';

interface IInputSearchPlace {
    changeInputValue: Function,
    defaultValue: string
}

const InputSearchPlace = ({changeInputValue, defaultValue}: IInputSearchPlace) => {
    const [destination, setDestination] = useState<string>(defaultValue);

    return (
        <View style={{
            width: '100%',
                marginTop: 40,
                marginBottom: 40
        }}>
            <View>
        <Input defaultValue={destination} handleTextChange={(value: string) => {
                setDestination(value);
                // handleChangeDestination(value);
                changeInputValue(value)
            }} />
            </View>
        </View>
    )
};

export default InputSearchPlace