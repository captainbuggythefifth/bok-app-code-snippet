

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Input from './../input/Input';
import Spacer from '../Spacer';
import InputButton from '../input/InputButton';
import { royalBlue } from './../../styles/common.style';
import InputDate from '../input/InputDate';
import { IRegisterState } from './../../redux/interfaces/register';
import validateEmail from './../../helpers/validate-email';

interface IRegisterPersonalForm {
    register: IRegisterState,
    submit: Function
}

const RegisterPersonalForm = ({ register, submit }: IRegisterPersonalForm) => {

    const [value, setValue] = useState('');
    const [fullName, setFullName] = useState<string>(register.fullName);
    const [firstName, setFirstName] = useState<string>(register.firstName);
    const [lastName, setLastName] = useState<string>(register.lastName);
    const [birthdate, setBirthdate] = useState<string>(register.birthdate);
    const [email, setEmail] = useState<string>(register.email);
    const [phone, setPhone] = useState<string>(register.phone);
    const [password, setPassword] = useState<string>(register.password || '');

    const showPasswordInput: boolean = register.via === "PERSONAL" ? true : false;

    const validPassword = showPasswordInput && password && password.length > 6;
    const validEmail = validateEmail(email);

    const submitButtonEnabled: boolean = Boolean((fullName && birthdate && validEmail) || validPassword);

    console.log("submitButtonEnabled: ", submitButtonEnabled);

    return (
        <View>
            {/* <Input handleTextChange={(text: string) => setFirstName(text)} placeHolder={"First Name"} defaultValue={firstName} />
            <Spacer />
            <Input handleTextChange={(text: string) => setLastName(text)} placeHolder={"Last Name"} defaultValue={lastName} />
            <Spacer /> */}
            <Input handleTextChange={(text: string) => setFullName(text)} placeHolder={"The Rock"} defaultValue={firstName} />
            <Spacer />
            <InputDate handleTextChange={(text: string) => setBirthdate(text)} placeHolder={''} defaultValue={register.birthdate} />
            <Spacer />
            <Input handleTextChange={(text: string) => setEmail(text)} placeHolder={"Email Address"} defaultValue={email} keyboardType={"email-address"} />
            <Spacer />
            {/* <Input handleTextChange={(text: string) => setPhone(text)} placeHolder={"Phone Number"} defaultValue={phone} />
            <Spacer /> */}
            {showPasswordInput && (
                <Input handleTextChange={(text: string) => setPassword(text)} placeHolder={"Password"} defaultValue={password} />
            )}
            <Spacer height={6} />
            <InputButton
                disabled={!submitButtonEnabled}
                title="Continue"
                onPress={() => {
                    const formValues: Partial<IRegisterState> = {
                        fullName,
                        firstName,
                        lastName,
                        email,
                        birthdate,
                        phone,
                        password
                    };
                    submit(formValues)
                }}
                style={{
                    backgroundColor: royalBlue
                }}
            />
        </View>
    )
};

export default RegisterPersonalForm