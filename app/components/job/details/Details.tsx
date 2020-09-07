import React from 'react';
import { View, Text } from 'react-native';
import { IJobData } from './../../../redux/interfaces/job';
import { Avatar } from 'react-native-elements';
import JobServiceDetails from './../../../screens/job/JobServiceDetails';

interface IJobDetailsProps {
    job: IJobData
}

const JobDetails = ({ job }: IJobDetailsProps) => {

    /* const locationStart = job && job.business && job.business.location ? job.business.location : null;
        const locationEnd = job && job.book && job.book.location ? job.book.location : null;
    */
    return (
        <>
            <View style={{
                alignItems: "center"
            }}>
                <View>
                    <Avatar
                        source={{
                            uri: job.client.picture_url
                        }}
                        rounded={true}
                        size="xlarge"
                    />
                </View>
                <View>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 20
                    }}>
                        {job.client.full_name || job.client.first_name + " " + job.client.last_name}
                    </Text>
                </View>
            </View>
            <JobServiceDetails job={job} />
        </>
    )
};

export default JobDetails