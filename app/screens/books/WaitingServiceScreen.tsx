import React from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../../navigations/RootStackParamList';
import { useSelector } from 'react-redux';
import { IRootReducerInterface } from './../../redux/reducers/root';
import ServiceInformation from './../../components/books/ServiceInformation';
import { PaymentOptions } from './../../navigations/RootStackList';
import {Icon} from 'react-native-elements';

type TWaitingServiceScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "WaitingService"
>;

type Props = {
    navigation: TWaitingServiceScreenNavigationProp;
};

const WaitingServiceScreen = ({ navigation }: Props) => {
    const book = useSelector((state: IRootReducerInterface) => state.book);
    const jobActive = useSelector((state: IRootReducerInterface) => state.jobActive);

    return (
        <>
            <View style={{
                padding: 50
            }}>
                <Icon name={"hourglass-empty"} type={"material"} size={80} />
            </View>
            <View>
                {jobActive && jobActive.data && (
                    <ServiceInformation book={book} job={jobActive.data} onPressPayButton={() => {
                        navigation.navigate(PaymentOptions);
                    }} />
                )}
            </View>
        </>
    )
}

export default WaitingServiceScreen