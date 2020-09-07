import React, { useState } from 'react';
import RegisterPhoneForm from './../../components/register/RegisterPhoneForm';
import { View } from 'react-native';
import styles from './../../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../../navigations/RootStackParamList';
import { httpAuthSendOtp } from './../../helpers/http/auth';
import { useDispatch } from 'react-redux';
import { registerActionChangeFields } from './../../redux/actions/register';
import { VerifyPhone } from './../../navigations/RootStackList';

type TRegisterPhoneScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'RegisterPhone'
>;

type Props = {
    navigation: TRegisterPhoneScreenNavigationProp;
};


const RegisterPhoneScreen = ({navigation}: Props) => {
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const handleSubmit = async (phone: string) => {
        setIsSubmitting(true);
        const result = await httpAuthSendOtp(phone);

        if (!result) {
            setIsSubmitting(false);
            return false
        };

        dispatch(registerActionChangeFields({
            phone
        }));

        navigation.navigate(VerifyPhone);
        setIsSubmitting(false);
        return false

    };


    return (
        <View style={{
            ...styles.centerWhiteBackgroundColor,
        }}>
            <View style={{
                ...styles.defaultScreenFormWidth
            }}>
            <RegisterPhoneForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </View>
        </View>
    )
};

export default RegisterPhoneScreen