

import React, { useState } from 'react';
import { View } from 'react-native';
import Input from './../input/Input';
import Spacer from '../Spacer';
import InputButton from '../input/InputButton';

interface IRegisterPhoneForm {
    onSubmit: Function,
    isSubmitting?: boolean
}
const RegisterPhoneForm = ({onSubmit, isSubmitting = false}: IRegisterPhoneForm) => {
    const [value, setValue] = useState('');

    return (
        <View>
            <Input handleTextChange={(text: string) => setValue(text)} placeHolder={"Phone Number"} keyboardType={'number-pad'} />
            <Spacer />
            <InputButton
                title="Send OTP"
                onPress={() => {
                    onSubmit(value)
                }}
                isLoading={isSubmitting}
            />
        </View>
    )
};

export default RegisterPhoneForm