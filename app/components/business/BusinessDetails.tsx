import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { IBusinessRequestServerState } from './../../redux/interfaces/business';


interface IBusinessDetailsProps {
    business: IBusinessRequestServerState
}

const BusinessDetails = ({ business }: IBusinessDetailsProps) => {
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: "center",
        }}>
            <View style={{

            }}>
                <Avatar
                    source={{
                        uri: business.picture_url
                    }}
                    rounded={true}
                    size="xlarge"
                />
            </View>
            <View style={{
            }}>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 20
                }}>
                    {business.name}
                </Text>
            </View>
            <View style={{
            }}>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 15
                }}>
                    {business.phone}
                </Text>
            </View>
        </View>
    )
};

export default BusinessDetails