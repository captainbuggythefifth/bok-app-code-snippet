import React from 'react';
import { View } from 'react-native';
import InputButton from '../input/InputButton';
import { IBookState } from '../../redux/interfaces/book';
import { IJobData } from './../../redux/interfaces/job';
import JobServiceDetails from './../../screens/job/JobServiceDetails';


interface IServiceInformation {
    job: IJobData,
    book: IBookState,
    onPressPayButton: Function
}

const ServiceInformation = ({ job, onPressPayButton }: IServiceInformation) => {

    return (
        <View style={{
            justifyContent: "space-between",
            height: "100%"
        }}>
            <View style={{
                justifyContent: "flex-start"
            }}>
                {job && (
                    <JobServiceDetails job={job} />
                )}

            </View>
            {job.status === "MENDER_ACCEPTED" || job.status === "PROVIDER_ACCEPTED" && (
                <View style={{
                    justifyContent: "flex-end"
                }}>
                    <InputButton
                        title={"PAYMENT"}
                        onPress={() => {
                            onPressPayButton();
                        }}
                        style={{
                            width: '100%',
                            borderRadius: 0
                        }}
                    />
                </View>
            )}

        </View>
    )
};


export default ServiceInformation