import React from 'react';
import { IPersonData } from './../../redux/interfaces/person';
import AuthLogoutButton from '../auth/logout/AuthLogoutButton';
import ProfileDetails from './ProfileDetails';

interface IProfileProps {
    user: IPersonData
}

const Profile = ({ user }: IProfileProps) => {
    return (
        <>
            <ProfileDetails user={user} />
            <AuthLogoutButton />
        </>
    )
};

export default Profile