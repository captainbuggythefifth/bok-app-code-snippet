import React from 'react';
import RegisterPersonalForm from '../../components/register/RegisterPersonalForm';
import { View } from 'react-native';
import styles from './../../styles/styles';
import { useSelector, useDispatch } from 'react-redux';
import { IRootReducerInterface } from './../../redux/reducers/root';
import { IRegisterState } from './../../redux/interfaces/register';
import { registerActionChangeFields } from './../../redux/actions/register';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../../navigations/RootStackParamList';
import { RegisterPhone } from './../../navigations/RootStackList';

type TRegisterPersonalScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'RegisterPersonal'
>;

type Props = {
    navigation: TRegisterPersonalScreenNavigationProp;
};

const RegisterPersonalScreen = ({navigation}: Props) => {

    const register = useSelector((state: IRootReducerInterface) => state.register);

    const dispatch = useDispatch();

    const handleSubmit = (formValues: Partial<IRegisterState>) => {
        dispatch(registerActionChangeFields(formValues));
        navigation.navigate(RegisterPhone);
    };


    return (
        <View style={{
            ...styles.centerWhiteBackgroundColor,
        }}>
            <View style={{
                ...styles.defaultScreenFormWidth
            }}>
                <RegisterPersonalForm register={register} submit={handleSubmit} />
            </View>

        </View>
    )
};

export default RegisterPersonalScreen