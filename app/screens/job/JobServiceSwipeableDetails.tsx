import React, { useState } from 'react';
import { Button, Icon, CheckBox } from 'react-native-elements';
import styles from './../../styles/styles';
import SwipeablePanel from './../../components/swipeable-panel/SwipeablePanel';
import { IRootReducerInterface } from './../../redux/reducers/root';
import { useSelector } from 'react-redux';
import JobServiceDetails from './JobServiceDetails';

interface IJobServiceSwipeableDetails {
    onPressItemsPickedUp: Function
}

const JobServiceSwipeableDetails = ({onPressItemsPickedUp}: IJobServiceSwipeableDetails) => {

    const [isActive, setIsActive] = useState<boolean>(false);
    
    const jobActive = useSelector((state: IRootReducerInterface) => state.jobActive);

    return (
        <>
            <Button buttonStyle={{
                ...styles.button
            }} icon={<Icon name="more-vert" type="material" size={15} color="white" />} title="ORDER DETAILS" onPress={() => {
                setIsActive(true);
            }} />
            <SwipeablePanel
                isActive={isActive}
                onClose={() => {
                    // console.log("yea", yea);
                    setIsActive(false);
                }}
                noBar={false}
                barStyle={{}}
            >
                {jobActive && jobActive.data && (
                    <JobServiceDetails job={jobActive.data} />
                )}
                {jobActive && jobActive.data && jobActive.data.status !== "MENDER_PICKED_UP_ITEMS" && (
                    <CheckBox
                        title="Mark items as picked up"
                        checked={jobActive.data.status === "MENDER_PICKED_UP_ITEMS" || jobActive.data.status === "DONE"}
                        onPress={() => {
                            onPressItemsPickedUp()
                        }}
                    />
                )}
            </SwipeablePanel>
        </>
    )
};

export default JobServiceSwipeableDetails