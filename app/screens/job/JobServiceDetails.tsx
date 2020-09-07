import React from 'react';
import { View, Text } from 'react-native';
import JobServiceScreenActions from './JobServiceScreenActions';
import JobServiceItem from './JobServiceItem';
import Spacer from './../../components/Spacer';
import JobServiceDetailsLocations from './JobServiceDetailsLocations';
import { IJobData } from './../../redux/interfaces/job';

interface IJobServiceDetailsProps {
    job: IJobData
}

const JobServiceDetails = ({ job }: IJobServiceDetailsProps) => {

    return (
        <>
            <View style={{
                padding: 16
            }}>
                <View>
                    <View style={{
                        padding: 8
                    }}>
                        {job.book.products.map((product) => {
                            return <JobServiceItem name={product.name} quantity={product.quantity} key={product.name} price={product.price} />
                        })}
                        {job.book.services.map((service) => {
                            return <JobServiceItem name={service.name} quantity={service.quantity} key={service.name} price={service.price} />
                        })}
                        {job && job.book && job.book && (
                            <>
                                <View style={{
                                    padding: 8,
                                    flexDirection: "row"
                                }}>
                                    <View style={{
                                        width: "50%",
                                    }}>
                                        <Text style={{
                                            fontWeight: "bold"
                                        }}> Total</Text>
                                    </View>
                                    <View style={{
                                        width: "50%",
                                        alignItems: "flex-end"
                                    }}>
                                        <Text style={{
                                            fontWeight: "700",
                                            position: "absolute",
                                        }}>{job.book.total} PHP</Text>
                                    </View>
                                </View>
                            </>
                        )}
                    </View>
                    <JobServiceDetailsLocations job={job} />
                    <Spacer />
                    <JobServiceScreenActions job={job} />
                </View>
            </View>
        </>
    )
}

export default JobServiceDetails