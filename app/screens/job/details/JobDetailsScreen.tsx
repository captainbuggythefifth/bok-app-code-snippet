import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './../../../navigations/RootStackParamList';
import JobDetails from './../../../components/job/details/Details';
import { useSubscription } from 'react-apollo';
import { QUERIES_JOB_SUBSCRIPTION_GET_BY_ID } from './../../../helpers/apollo-client/queries/jobs';
import Loader from './../../../components/Loader';
import { ScrollView } from 'react-native-gesture-handler';

type TJobDetailsScreenRouteProp = RouteProp<
    RootStackParamList,
    "JobDetails"
>;

type TJobDetailsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "JobDetails"
>;

type Props = {
    navigation: TJobDetailsScreenNavigationProp;
    route: TJobDetailsScreenRouteProp
};

const JobDetailsScreen = ({ route }: Props) => {

    const { jobId } = route.params;

    const { loading, data } = useSubscription(QUERIES_JOB_SUBSCRIPTION_GET_BY_ID, {
        variables: {
            id: jobId,
        }
    });

    if (loading) {
        return (
            <Loader />
        )
    }

    if (data) {
        return (
            <ScrollView style={{
                paddingTop: 40,
                paddingBottom: 8,
                paddingLeft: 8,
                paddingRight: 8
            }}>
                <JobDetails job={data.jobs_by_pk} />
            </ScrollView>
        )
    }

    return (
        <></>
    )
};

export default JobDetailsScreen