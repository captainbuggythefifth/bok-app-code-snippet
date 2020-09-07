import React from 'react';
import { IPersonData } from './../../redux/interfaces/person';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';


interface IProfileDetailsProps {
    user: IPersonData
}

const ProfileDetails = ({ user }: IProfileDetailsProps) => {
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
                        uri: user.picture_url
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
                    {user.full_name || user.first_name + " " + user.last_name}
                </Text>
            </View>
            <View style={{
            }}>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 15
                }}>
                    {user.phone}
                </Text>
            </View>
        </View>
    )
};

export default ProfileDetails