import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../navigations/RootStackParamList';

import JobsList from './../components/job/JobsList';
import { FindService, FoundService, WaitingSevice } from './../navigations/RootStackList';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { blueGreen } from './../styles/common.style';
import { useSelector } from 'react-redux';
import { IRootReducerInterface } from './../redux/reducers/root';

type THomeScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Home"
>;

type Props = {
    navigation: THomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {

    const jobActive = useSelector((state: IRootReducerInterface) => state.jobActive.data);

    return (
        <View style={{
            flex: 1,
            justifyContent: "space-between"
        }}>
            <View >
                <JobsList />
            </View>
            <View>
                <View style={{
                    position: "absolute",
                    bottom: 16,
                    left: 16
                }}>
                    <Icon
                        reverse={true}
                        name="book"
                        type="material"
                        size={32}
                        color={blueGreen}
                        onPress={() => {
                            console.log("jobActiv: ", jobActive);
                            
                            if (!jobActive) {
                                navigation.navigate(FindService)
                            }
                            if (jobActive?.status === "FINDING_PROVIDER") {
                                navigation.navigate(WaitingSevice)
                            } 
                            if (jobActive?.status === "PROVIDER_ACCEPTED" || jobActive?.status === "MENDER_ACCEPTED") {
                                navigation.navigate(FoundService)
                            } 
                            
                            
                        }}
                    />
                </View>
            </View>
        </View>
    );
};


export default HomeScreen
