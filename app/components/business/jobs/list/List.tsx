import React from 'react';
import { useSubscription } from 'react-apollo';
import { QUERIES_JOB_QUERY_ALL_BY_BUSINESS_ID_AND_STATUS } from './../../../../helpers/apollo-client/queries/jobs';
import { View, ActivityIndicator, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { IJobData } from './../../../../redux/interfaces/job';
import { useNavigation } from '@react-navigation/native';
import { JobDetails } from './../../../../navigations/RootStackList';
import Loader from './../../../../components/Loader';

interface IJobBusinessListProps {
    businessId: string,
    status: string
}

const BusinessJobsList = ({ businessId, status }: IJobBusinessListProps) => {

    const navigation = useNavigation();
   
    const { loading, data } = useSubscription(QUERIES_JOB_QUERY_ALL_BY_BUSINESS_ID_AND_STATUS, {
        variables: {
            business_id: businessId,
            status,
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

    return (
        <View>
            {
                data.jobs.map((job: IJobData, i: any) => (
                    <ListItem
                        key={i}
                        leftAvatar={{ source: { uri: job.client.picture_url } }}
                        title={job.client.full_name || job.client.first_name + " " + job.client.last_name}
                        subtitle={job.created_at}
                        bottomDivider
                        chevron
                        onPress={() => {
                            navigation.navigate(JobDetails, { jobId: job.id })
                        }}
                    />
                ))
            }
        </View>
    )
};

export default BusinessJobsList