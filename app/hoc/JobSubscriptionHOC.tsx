import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { IRootReducerInterface } from './../redux/reducers/root';
import { useSubscription } from 'react-apollo';
import { QUERIES_JOB_SUBSCRIPTION } from './../helpers/apollo-client/queries/jobs';
import { jobActionChangeData, jobActionChangeRequest, jobActionChangeAcceptRequest } from './../redux/actions/job';
import { IRequestState } from './../redux/interfaces/common';
import { IJobData } from './../redux/interfaces/job';
import InputButton from './../components/input/InputButton';
import { httpJobAccept } from './../helpers/http/job';
import JobDetails from './../components/job/details/Details';
import FrontOverlay from './../components/FrontOverlay';

const JobSubscriptionHOC = () => {
    const [visible, setVisible] = useState<boolean>(false);

    const auth = useSelector((state: IRootReducerInterface) => state.auth);
    const job = useSelector((state: IRootReducerInterface) => state.job);

    let request: IRequestState = {
        isRequesting: false,
        done: false,
        success: false
    };

    const dispatch = useDispatch();

    const { loading, data } = useSubscription(QUERIES_JOB_SUBSCRIPTION, {
        variables: {
            status: "PROVIDER_ACCEPTED",
        }
    });

    useEffect(() => {

        if (loading) {
            request = {
                ...request,
                isRequesting: true
            }
            dispatch(jobActionChangeRequest(request));
        }

        if (data) {
            const jobData: IJobData = data.jobs[0];

            setVisible(true);

            dispatch(jobActionChangeData(jobData));

        }

        request = {
            ...request,
            isRequesting: false,
            done: true,
            success: true
        }

        dispatch(jobActionChangeRequest(request));

    }, [loading, data]);



    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const handlePressAcceptBooking = async () => {

        let accept = {
            isRequesting: true,
            done: false,
            success: false
        };

        dispatch(jobActionChangeAcceptRequest(accept));

        const mender_id = auth.id;
        const jobId = job && job.data && job.data.id ? job.data.id : '';
        const httpJobAcceptResult = await httpJobAccept(jobId, {
            mender_id
        });

        accept = {
            ...accept,
            isRequesting: false,
            done: true,
            success: Boolean(httpJobAcceptResult)
        };

        dispatch(jobActionChangeAcceptRequest(accept));
        setVisible(!visible);
    }

    const handlePressIgnoreBooking = () => {
        setVisible(!visible);
    }

    const locationStart = job && job.data && job.data.business && job.data.business.location ? job.data.business.location : null;
    const locationEnd = job && job.data && job.data.book && job.data.book.location ? job.data.book.location : null;


    if (!auth.isLoggedIn || !locationStart || !locationEnd) {
        return <></>
    }

    return (
        <>
            <FrontOverlay visible={visible} onBackdropPress={toggleOverlay}>
                <View style={{
                    flex: 1
                }}>
                    <View style={{
                        height: "100%",
                    }}>
                        {job && job.data && (
                            <JobDetails job={job.data} />
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
                            width: "45%",
                            marginBottom: 10
                        }}>
                            <InputButton onPress={handlePressIgnoreBooking} title={"IGNORE"} style={{
                                backgroundColor: "red"
                            }} />
                        </View>
                        <View style={{
                            width: "45%",
                            marginBottom: 10
                        }}>
                            <InputButton onPress={handlePressAcceptBooking} title={"ACCEPT"} isLoading={job.accept.isRequesting} />
                        </View>
                    </View>
                </View>
            </FrontOverlay>
        </>
    )
}

export default JobSubscriptionHOC