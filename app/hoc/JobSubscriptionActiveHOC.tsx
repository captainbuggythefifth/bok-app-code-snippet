import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IRootReducerInterface } from './../redux/reducers/root';
import { useSubscription } from 'react-apollo';
import { QUERIES_JOB_SUBSCRIPTION_BY_CLIENT_ID_AND_NEQ_STATUS } from './../helpers/apollo-client/queries/jobs';
import { IRequestState } from './../redux/interfaces/common';
import { IJobData } from './../redux/interfaces/job';
import { jobActiveActionChangeData, jobActiveActionChangeRequest } from './../redux/actions/job-active';
import FrontOverlay from './../components/FrontOverlay';
import { View } from 'react-native';
import InputButton from './../components/input/InputButton';
import { useNavigation, StackActions } from '@react-navigation/native';
import { JobDetails as JobDetaisS } from './../navigations/RootStackList';
import JobDetails from './../components/job/details/Details';


const JobSubscriptionActiveHOC = () => {

    const [visible, setVisible] = useState<boolean>(false);
    const auth = useSelector((state: IRootReducerInterface) => state.auth);
    const jobActive = useSelector((state: IRootReducerInterface) => state.jobActive.data);

    let request: IRequestState = {
        isRequesting: false,
        done: false,
        success: false
    };

    const dispatch = useDispatch();

    const { loading, data } = useSubscription(QUERIES_JOB_SUBSCRIPTION_BY_CLIENT_ID_AND_NEQ_STATUS, {
        variables: {
            client_id: auth.id,
            status: "DONE",
        }
    });

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    useEffect(() => {

        if (loading) {
            request = {
                ...request,
                isRequesting: true
            }
            dispatch(jobActiveActionChangeRequest(request));
        }

        if (data && data.jobs[0]) {
            const jobData: IJobData = data.jobs[0];

            dispatch(jobActiveActionChangeData(jobData));

        }

        request = {
            ...request,
            isRequesting: false,
            done: true,
            success: true
        }

        dispatch(jobActiveActionChangeRequest(request));
    }, [loading, data]);


    return (
        <>
            <FrontOverlay visible={visible} onBackdropPress={toggleOverlay}>
                <View style={{
                    flex: 1
                }}>
                    <View style={{
                        height: "100%",
                    }}>
                        {jobActive && (
                            <JobDetails job={jobActive} />
                        )}
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "flex-end",
                        justifyContent: "space-evenly",
                        paddingBottom: 10
                    }}>
                        <View style={{
                            width: "90%",
                            marginBottom: 10
                        }}>
                            {jobActive && (
                                <InputButton onPress={() => {
                                    
                                    /* navigation.navigate(JobDetaisS, {
                                        jobId: jobActive.id
                                    }) */
                                }} title={"VIEW DETAILS"} style={{
                                    backgroundColor: "green",
                                }} />
                            )}
                        </View>
                    </View>
                </View>
            </FrontOverlay>
        </>
    )
}

export default JobSubscriptionActiveHOC