import React from 'react';
import { storageRemoveData, STORAGE_ACCESS_TOKEN, STORAGE_REFRESH_TOKEN } from './../../../helpers/storage';
import { useSelector, useDispatch } from 'react-redux';
import { IRootReducerInterface } from './../../../redux/reducers/root';
import InputButton from './../../../components/input/InputButton';
import { authActionLogout } from './../../../redux/actions/auth';
import { useNavigation } from '@react-navigation/native';
import { Home, SignIn } from './../../../navigations/RootStackList';

const AuthLogoutButton = () => {
    const navigation = useNavigation();

    const auth = useSelector((state: IRootReducerInterface) => state.auth);

    const dispatch = useDispatch();

    const handlePress = async () => {
        await storageRemoveData(STORAGE_ACCESS_TOKEN);
        await storageRemoveData(STORAGE_REFRESH_TOKEN);

        dispatch(authActionLogout());

        navigation.navigate(SignIn);
    }
    return (
        <InputButton title={'LOG OUT'} onPress={handlePress} />
    )
};

export default AuthLogoutButton