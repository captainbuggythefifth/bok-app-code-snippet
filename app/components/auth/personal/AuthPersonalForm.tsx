import React, { useState } from 'react';
import Input from './../../input/Input';
import Spacer from './../../../components/Spacer';
import InputButton from './../../../components/input/InputButton';
import { royalBlue } from './../../../styles/common.style';

interface IAuthPersonalForm {
    submit: Function
}

const AuthPersonalForm = ({submit}: IAuthPersonalForm) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <>
            <Input handleTextChange={(text: string) => setEmail(text)} placeHolder={"Email"} />
            <Spacer height={3} />
            <Input handleTextChange={(text: string) => setPassword(text)} placeHolder={"Password"} secureTextEntry={true} />
            <Spacer height={3} />
            <InputButton
                title="Log In"
                onPress={() => {
                    submit(email, password)
                }}
                style={{backgroundColor: royalBlue}}
            />
        </>
    )
};

export default AuthPersonalForm