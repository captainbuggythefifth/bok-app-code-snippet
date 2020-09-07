import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { colorCodeMenderToProvider, colorCodeProviderToClient } from './../../styles/common.style';
import { Icon } from 'react-native-elements';
import Spacer from './../../components/Spacer';
import { IJobData } from './../../redux/interfaces/job';

interface JobServiceDetailsLocationsProps {
    job: IJobData
}

const JobServiceDetailsLocations = ({ job }: JobServiceDetailsLocationsProps) => {
    const [show, setShow] = useState<boolean>(false);
    return (
        <>
            <View style={{
                padding: 16
            }}>
                <Text style={{
                    textAlign: "right"
                }} onPress={() => setShow(!show)}>{show ? "Hide Locations" : "Show Locations"}</Text>

                {show && (
                    <View style={{
                        borderStyle: "dashed",
                        borderColor: "#ccc",
                        borderRadius: 1,
                        borderWidth: 3,
                        padding: 20
                    }}>
                        {job.business && (
                            <>
                                <View style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}>
                                    <Icon type="material" name="location-on" size={50} color={colorCodeMenderToProvider} />
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: "700"
                                    }}>
                                        {job.business.name}
                                    </Text>
                                    <Text style={{
                                        fontSize: 15,
                                        fontWeight: "700"
                                    }}>
                                        {job.business.location.name}
                                    </Text>
                                </View>
                                <Spacer />
                                <View style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}>
                                    <Icon type="material" name="arrow-downward" size={50} />
                                </View>
                            </>
                        )}


                        <Spacer />
                        <View>
                            <View style={{
                                flexDirection: "column",
                                alignItems: "center",
                            }}>
                                <Icon type="material" name="location-on" size={50} color={colorCodeProviderToClient} />
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: "700"
                                }}>
                                    {job.client.full_name || job.client.first_name + " " + job.client.last_name}
                                </Text>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: "700"
                                }}>
                                    {job.book.location.name}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </>
    )
};

export default JobServiceDetailsLocations