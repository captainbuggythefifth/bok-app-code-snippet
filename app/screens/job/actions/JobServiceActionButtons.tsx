import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { callNumber } from './../../../helpers/linking/call-number';
import { textNumber } from './../../../helpers/linking/text-number';

interface IJobServiceActionButtonsProps {
    phone: string
}

const JobServiceActionButtons = ({phone}: IJobServiceActionButtonsProps) => {
    return (
        <View style={{
            flexDirection: "row"
        }}>
            <View style={{
                width: "50%",
                alignContent: "center",
                alignItems: "center"
            }}>
                <Icon 
                    name="call" 
                    type="material" 
                    size={25} 
                    color="red" 
                    reverse={true} 
                    onPress={() => callNumber(phone)}
                />
            </View>
            <View style={{
                width: "50%",
                alignContent: "center",
                alignItems: "center"
            }}>
                <Icon 
                    name="textsms" 
                    type="material" 
                    size={25} 
                    color="green" 
                    reverse={true}
                    onPress={() => textNumber(phone)}
                 />
            </View>
        </View>
    )
};

export default JobServiceActionButtons