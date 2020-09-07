import React from 'react';
import { useSubscription } from 'react-apollo';
import { QUERIES_JOB_QUERY_ALL_BY_MENDER_ID, QUERIES_JOB_QUERY_ALL_BY_CLIENT_ID } from './../../helpers/apollo-client/queries/jobs';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { IJobData } from './../../redux/interfaces/job';
import { useNavigation } from '@react-navigation/native';
import { JobDetails, JobService, WaitingSevice } from './../../navigations/RootStackList';
import Loader from './../../components/Loader';
import { IRootReducerInterface } from './../../redux/reducers/root';
import { useSelector } from 'react-redux';


const JobsList = () => {

    const auth = useSelector((state: IRootReducerInterface) => state.auth);

    const navigation = useNavigation();

    const { loading, data } = useSubscription(QUERIES_JOB_QUERY_ALL_BY_CLIENT_ID, {
        variables: {
            client_id: auth.id,
        }
    });

    if (loading) {
        return (
            <Loader />
        )
    }
    if (!loading && data.jobs && Array.isArray(data.jobs) && data.jobs.lenght === 0) {
        return (
            <View>
                <Text>NO DATA YET</Text>
            </View>
        );
    }

    const handlePressListItem = (job: IJobData) => {
        const jobId = job.id;
        const isJobStatusDone = job.status === "DONE";
        const isJobPaymentStatusPending = job.payment_status === "PENDING";

        if (isJobPaymentStatusPending) {
            return navigation.navigate(WaitingSevice);
        }

        if (isJobStatusDone) {
            return navigation.navigate(JobDetails, { jobId });
            
        }

        return navigation.navigate(JobService, { jobId })
    }

    return (
        <View>
            {
                data.jobs.map((job: IJobData, i: any) => (
                    <ListItem
                        key={i}
                        leftAvatar={{ source: { uri: job.client.picture_url } }}
                        title={job.client.full_name || job.client.first_name + " " + job.client.last_name}
                        subtitle={job.book.location.name}
                        bottomDivider
                        chevron={{
                            backgroundColor: job.status !== "DONE" ? "green" : "white",
                            borderRadius: 50
                        }}
                        onPress={() => {
                            handlePressListItem(job)
                        }}
                        containerStyle={{
                            
                        }}
                        titleStyle={{

                        }}
                        
                    />
                ))
            }
        </View>
    )
};

export default JobsList