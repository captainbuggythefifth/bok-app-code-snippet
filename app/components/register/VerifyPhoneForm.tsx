import React, { useState } from 'react';
import { View } from 'react-native';
import Input from '../input/Input';
import Spacer from '../Spacer';
import InputButton from '../input/InputButton';

interface IVerifyPhoneForm {
    onSubmit: Function,
    disable: boolean,
    loading: boolean
}


const VerifyPhoneForm = ({onSubmit, disable = false, loading = false}: IVerifyPhoneForm) => {
    const [otp, setOtp] = useState('');
    return (
        <View>
            <Input handleTextChange={(text: string) => setOtp(text)} placeHolder={"ex: 699404"} />
            <Spacer />
            <InputButton
                title="Verify OTP"
                onPress={() => onSubmit(otp)}
                disabled={disable}
                isLoading={loading}
            />
        </View>
    )
};

export default VerifyPhoneForm