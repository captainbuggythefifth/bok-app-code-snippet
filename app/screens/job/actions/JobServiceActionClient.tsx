import React, { useState } from 'react';
import { Button, Icon } from 'react-native-elements';
import FrontOverlay from './../../../components/FrontOverlay';
import ProfileDetails from './../../../components/profile/ProfileDetails';
import styles from './../../../styles/styles';
import JobServiceActionButtons from './JobServiceActionButtons';
import { IJobData } from './../../../redux/interfaces/job';

interface IJobServiceActionClientProps {
    job: IJobData
}

const JobServiceActionClient = ({ job }: IJobServiceActionClientProps) => {

    const [visible, setVisible] = useState<boolean>(false);

    const client = job.client;

    const handleBackdropPress = () => {
        setVisible(false);
    }

    return (
        <>
            <Button buttonStyle={{
                ...styles.button
            }} icon={<Icon name="more-vert" type="material" size={15} color="white" />} title="CLIENT" onPress={() => setVisible(true)} />
            <FrontOverlay onBackdropPress={handleBackdropPress} visible={visible} >
                <>
                    <ProfileDetails user={client} />
                    {client && client.phone && (
                        <JobServiceActionButtons phone={client.phone} />
                    )}

                </>
            </FrontOverlay>
        </>
    )
};

export default JobServiceActionClient