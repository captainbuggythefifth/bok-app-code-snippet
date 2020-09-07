import React, { useState } from 'react';
import { View } from 'react-native';
import styles from '../../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigations/RootStackParamList';
import RegisterBusinessForm from './../../components/register/RegisterBusinessForm';
import { IBusinessState } from './../../redux/interfaces/business';
import { httpAuthBusinessRegister } from './../../helpers/http/auth';
import { useSelector } from 'react-redux';
import { IRootReducerInterface } from './../../redux/reducers/root';
import getDeviceToken from './../../helpers/get-device-token';
import { Home, LoggedIn } from './../../navigations/RootStackList';

type TRegisterBusinessScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'RegisterBusiness'
>;

type Props = {
    navigation: TRegisterBusinessScreenNavigationProp;
};

const RegisterBusinessScreen = ({navigation}: Props) => {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    
    const auth = useSelector((state: IRootReducerInterface) => state.auth);

    const handleSubmit = async (formValues: Partial<IBusinessState>) => {
        setIsSubmitting(true);
        console.log("formValues: ", formValues);

        const deviceToken = await getDeviceToken();
                    
        
        const result = await httpAuthBusinessRegister({
            ...formValues,
            providerId: auth.id,
            deviceToken
        });

        console.log("result: ", result);

        setIsSubmitting(false);

        if (result)
            navigation.navigate(LoggedIn);
        
    };

    return (
        <View style={{
            ...styles.centerWhiteBackgroundColor,
        }}>
            <View style={{
                ...styles.defaultScreenFormWidth
            }}>
                <RegisterBusinessForm submit={handleSubmit} isSubmitting={isSubmitting} />
            </View>

        </View>
    )
};

export default RegisterBusinessScreen