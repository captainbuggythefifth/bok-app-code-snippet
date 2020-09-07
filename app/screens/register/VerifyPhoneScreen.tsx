import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './../../styles/styles';
import VerifyPhoneForm from './../../components/register/VerifyPhoneForm';
import InputButton from './../../components/input/InputButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../../navigations/RootStackParamList';
import Spacer from './../../components/Spacer';
import { httpAuthSendOtp, httpAuthOtpValidate, httpAuthRegister } from './../../helpers/http/auth';
import { IRootReducerInterface } from './../../redux/reducers/root';
import { useSelector, useDispatch } from 'react-redux';
import getDeviceToken from './../../helpers/get-device-token';
import { Home, RegisterPhone, LoggedIn } from './../../navigations/RootStackList';
import { storageSaveData, STORAGE_ACCESS_TOKEN, STORAGE_REFRESH_TOKEN } from './../../helpers/storage';
import { authActionLogIn, authActionChangePartialAuth } from './../../redux/actions/auth';
import { IRequestState } from './../../redux/interfaces/common';

type TVerifyPhoneScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'VerifyPhone'
>;

type Props = {
    navigation: TVerifyPhoneScreenNavigationProp;
};

const VerifyPhoneScreen = ({ navigation }: Props) => {
    const [retry, setRetry] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch();

    const register = useSelector((state: IRootReducerInterface) => state.register);

    const handleSubmit = async (otp: string) => {
        setLoading(true);
        const resultOtpValidate = await httpAuthOtpValidate(register.phone, otp);

        if (!resultOtpValidate) {
            return false
        }

        // Register

        const deviceToken = await getDeviceToken();

        const resultRegister = await httpAuthRegister({
            ...register,
            deviceToken
        });

        if (!resultRegister) {
            setLoading(false);
            return false
        }

        const tokens = {
            id: resultRegister.id,
            accessToken: resultRegister.data.access_token,
            refreshToken: resultRegister.data.refresh_token,
        }

        await storageSaveData(STORAGE_ACCESS_TOKEN, tokens.accessToken);
        await storageSaveData(STORAGE_REFRESH_TOKEN, tokens.refreshToken);

        let request: IRequestState;
        request = {
            isRequesting: false,
            done: true,
            success: true
        }

        dispatch(authActionChangePartialAuth({
            id: resultRegister.data.id,
            accessToken: resultRegister.data.access_token,
            refreshToken: resultRegister.data.refresh_token,
            user: resultRegister.data.user,
            isLoggedIn: true,
            request,
        }))

        setLoading(false);
        navigation.navigate(LoggedIn);
        return false

    }
    const handlePressRetry = async () => {
        const result = await httpAuthSendOtp(register.phone);

        if (!result) {
            // setIsSubmitting(false);
            return false
        };
    }
    return (
        <View style={{
            ...styles.centerWhiteBackgroundColor,
        }}>
            <View style={{
                ...styles.defaultScreenFormWidth
            }}>
                <VerifyPhoneForm onSubmit={handleSubmit} loading={loading} disable={loading} />
                <Spacer />
                <InputButton onPress={() => handlePressRetry} title={"Retry"} />
                <Spacer />
                <InputButton onPress={() => {
                    navigation.navigate(RegisterPhone)
                }} title={"Change Number"} />
            </View>
        </View>
    )
};

export default VerifyPhoneScreen