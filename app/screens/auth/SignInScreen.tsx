import React, { useState } from 'react';
import AuthFacebookButton from './../../components/auth/facebook/AuthFacebookButton';
import { Image, View, Text } from 'react-native';
import styles from './../../../app/styles/styles';
import AuthPersonalForm from './../../components/auth/personal/AuthPersonalForm';
import AuthGoogleButton from './../../components/auth/google/AuthGoogleButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../../navigations/RootStackParamList';
import checkMandatoryRegistrationFields from './../../helpers/check-mandatory-registration-fields';
import Spacer from './../../components/Spacer';
import { useDispatch, useSelector } from 'react-redux';
import { IRegisterState } from './../../redux/interfaces/register';
import { registerActionChangeFields } from './../../redux/actions/register';
import { authActionLogIn, authActionChangePartialAuth } from './../../redux/actions/auth';
import { storageSaveData, STORAGE_ACCESS_TOKEN, STORAGE_REFRESH_TOKEN } from './../../helpers/storage';
import { httpAuthLogin } from './../../helpers/http/auth';
import InputButton from './../../components/input/InputButton';
import { IRootReducerInterface } from './../../redux/reducers/root';
import { RegisterPersonal, RegisterPhone, LoggedIn, Home } from './../../navigations/RootStackList';
import { IRequestState } from './../../redux/interfaces/common';
import getDeviceToken from './../../helpers/get-device-token';

type TSignInScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'SignIn'
>;

type Props = {
    navigation: TSignInScreenNavigationProp;
};

const SignInScreen = ({ navigation }: Props) => {

    const register = useSelector((state: IRootReducerInterface) => state.register);
    const authViaFacebookIsRequesting = useSelector((state: IRootReducerInterface) => state.auth.via && state.auth.request.isRequesting);

    const dispatch = useDispatch();

    const handleFacebookLogIn = async (result: any, accessToken: string, userDetails: any) => {

        let request: IRequestState;
        request = {
            isRequesting: true,
            done: false,
            success: false
        };

        dispatch(authActionChangePartialAuth({
            request,
            via: "FACEBOOK"
        }));

        const deviceToken = await getDeviceToken();

        const firstName = userDetails.first_name ? userDetails.first_name : '';
        const lastName = userDetails.last_name ? userDetails.last_name : '';
        const fullName = `${firstName} ${lastName}`;
        const birthdate = userDetails.birthday ? userDetails.birthday : '';
        const email = userDetails.email ? userDetails.email : '';
        const picture = userDetails.picture && userDetails.picture.data && userDetails.picture.data.url ? userDetails.picture.data.url : '';

        const userRegistrationDetails: Partial<IRegisterState> = {
            firstName,
            lastName,
            fullName,
            birthdate,
            email,
            picture
        }

        // If client does not approve of the email, we will try to register his account via personal

        if (!userRegistrationDetails.email) {
            dispatch(registerActionChangeFields({
                ...userRegistrationDetails,
                via: "PERSONAL"
            }));
            navigation.navigate(RegisterPersonal);
            return false;
        }

        // Must call to server login and send userRegistrationDetails if details exists; if yes, must redirect to FindServiceScreen, if no, must proceed with the codes below

        const hasEmailRegistered = await httpAuthLogin({
            email: userRegistrationDetails.email,
            via: "FACEBOOK",
            fbToken: accessToken,
            deviceToken
        });

        // If the user has NOT yet registered
        // Will the check the permissions

        if (!hasEmailRegistered) {
            const hasAllPersmissions = checkMandatoryRegistrationFields(result.grantedPermissions);

            dispatch(registerActionChangeFields(userRegistrationDetails));

            if (hasAllPersmissions.length > 0) {
                // if the user did not approve of any of permissions, must redirect to RegisterPersonal to fill out the details
                navigation.navigate(RegisterPersonal);
                return false;
            } else {
                navigation.navigate(RegisterPhone);
                return false;
            }
        }

        // If the user has already registerd
        // Login functionality

        if (hasEmailRegistered.data.access_token) {

            delete hasEmailRegistered.data.user.logged_ins;

            const tokens = {
                accessToken: hasEmailRegistered.data.access_token,
                refreshToken: hasEmailRegistered.data.refresh_token,
            }

            await storageSaveData(STORAGE_ACCESS_TOKEN, tokens.accessToken);
            await storageSaveData(STORAGE_REFRESH_TOKEN, tokens.refreshToken);

            // dispatch(authActionLogIn(tokens));

            request = {
                isRequesting: false,
                done: true,
                success: true
            };

            dispatch(authActionChangePartialAuth({
                id: hasEmailRegistered.data.id,
                accessToken: hasEmailRegistered.data.access_token,
                refreshToken: hasEmailRegistered.data.refresh_token,
                user: hasEmailRegistered.data.user,
                isLoggedIn: true,
                request,
            }));

            navigation.navigate(LoggedIn);
        }
    }

    const handleSubmitAuthPersonal = async (email: string, password: string) => {
        let request: IRequestState;
        request = {
            isRequesting: false,
            done: true,
            success: true
        }

        const deviceToken = await getDeviceToken();

        const clientAuthDetails = {
            email,
            password,
            via: "PERSONAL",
            deviceToken
        };

        const hasEmailRegistered = await httpAuthLogin(clientAuthDetails);

        if (!hasEmailRegistered) {
            return false
        }

        if (hasEmailRegistered.data.access_token) {
            const tokens = {
                id: hasEmailRegistered.data.id,
                accessToken: hasEmailRegistered.data.access_token,
                refreshToken: hasEmailRegistered.data.refresh_token,
            }

            await storageSaveData(STORAGE_ACCESS_TOKEN, tokens.accessToken);
            await storageSaveData(STORAGE_REFRESH_TOKEN, tokens.refreshToken);

            dispatch(authActionLogIn(tokens));

            request = {
                isRequesting: false,
                done: true,
                success: true
            }

            dispatch(authActionChangePartialAuth({
                id: hasEmailRegistered.data.id,
                accessToken: hasEmailRegistered.data.access_token,
                refreshToken: hasEmailRegistered.data.refresh_token,
                user: hasEmailRegistered.data.user,
                request,
                via: "PERSONAL"
            }))

            navigation.navigate(LoggedIn);

            return false;
        }
    }

    return (
        <>
            <View style={{
                ...styles.centerBackgroundColor,
                height: '100%'
            }}>
                <View style={{
                    ...styles.defaultScreenWidth,
                }}>
                    <View style={{
                        ...styles.alignCenter
                    }}><Image source={require('./../../images/logo-2x2.jpg')} style={{
                        width: 80,
                        height: 80
                    }} /></View>
                    <Spacer height={6} />
                    <View>
                        <View>
                            <AuthFacebookButton onFacebookLogin={handleFacebookLogIn} isLoading={authViaFacebookIsRequesting} />
                        </View>
                    </View>
                    <Spacer height={3} />
                    <View style={{
                        ...styles.alignCenter
                    }}>
                        <Text style={{
                            color: "white"
                        }}>OR</Text>
                    </View>
                    <Spacer height={3} />
                    <View>
                        <AuthPersonalForm submit={handleSubmitAuthPersonal} />
                    </View>
                    <Spacer height={2} />
                    <View>
                        <InputButton onPress={() => {
                            navigation.navigate("")
                        }} title={'Forgot Your Password?'} style={{
                            backgroundColor: "transparent"
                        }} />
                    </View>
                    <Spacer height={2} />
                    <View>
                        <InputButton onPress={() => {

                            dispatch(registerActionChangeFields({
                                ...register,
                                via: "PERSONAL"
                            }));

                            navigation.navigate(RegisterPersonal)
                        }} title={'No account yet? Register Now!'} style={{
                            backgroundColor: "white",
                            color: "blue"
                        }} textStyle={{
                            color: "blue"
                        }} />
                    </View>
                </View>
            </View>
        </>
    )
};

export default SignInScreen