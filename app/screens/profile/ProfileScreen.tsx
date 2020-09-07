import React from 'react';
import { useSelector } from 'react-redux';
import { IRootReducerInterface } from './../../redux/reducers/root';
import Profile from './../../components/profile/Profile';

const ProfileScreen = () => {
   
    const auth = useSelector((state: IRootReducerInterface) => state.auth);

    if (!auth.user) {
        return <></>
    }

    return (
        <Profile user={auth.user} />
    )

};

export default ProfileScreen