import React, { useState } from 'react';
import { Button, Icon } from 'react-native-elements';
import FrontOverlay from './../../../components/FrontOverlay';
import styles from './../../../styles/styles';
import JobServiceActionButtons from './JobServiceActionButtons';
import BusinessDetails from './../../../components/business/BusinessDetails';
import { IJobData } from './../../../redux/interfaces/job';

interface IJobServiceActionBusinessProps {
    job: IJobData
}

const JobServiceActionBusiness = ({job}: IJobServiceActionBusinessProps) => {

    const [visible, setVisible] = useState<boolean>(false);
    
    const business = job.business;

    const handleBackdropPress = () => {
        setVisible(false);
    }

    return (
        <>
            <Button buttonStyle={{
                ...styles.button
            }} icon={<Icon name="more-vert" type="material" size={15} color="white" />} title="PROVIDER" onPress={() => setVisible(true)} />
            <FrontOverlay onBackdropPress={handleBackdropPress} visible={visible} >
                <>
                    <BusinessDetails business={business} />
                    {business && business.phone && (
                        <JobServiceActionButtons phone={business.phone} />
                    )}
                    
                </>
            </FrontOverlay>
        </>
    )
};

export default JobServiceActionBusiness