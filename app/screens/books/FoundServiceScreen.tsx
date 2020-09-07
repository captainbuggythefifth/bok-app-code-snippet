import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { IRootReducerInterface } from '../../redux/reducers/root';
import Spacer from '../../components/Spacer';
import DriverInformation from '../../components/books/DriverInformation';
import ServiceInformation from '../../components/books/ServiceInformation';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigations/RootStackParamList';
import { PaymentOptions } from './../../navigations/RootStackList';


const deliveryInformation = {
    driver: {},
    distanceSupplierToClient: "11 KM",
    eta: 10,
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        backgroundColor: "white",
    },
});

type TFoundServiceScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "FoundService"
>;

type Props = {
    navigation: TFoundServiceScreenNavigationProp;
};

const FoundServiceScreen = ({ navigation }: Props) => {
    const book = useSelector((state: IRootReducerInterface) => state.book);
    const jobActive = useSelector((state: IRootReducerInterface) => state.jobActive.data);

    return (
        <View style={
            styles.container
        } >
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                alignContent: 'center',
                height: "70%",
            }}>

                <View style={{
                }}>
                    <Text style={{
                        textAlign: "center"
                    }}>Yehey! Found a nearest supplier.</Text>
                    <Text style={{
                        textAlign: "center"
                    }}>It will be delivered to you in {deliveryInformation.eta} minutes.</Text>
                    <Spacer />
                </View>
                <View style={{

                }}>
                    <DriverInformation />
                </View>
            </View>
            <View>
                {jobActive && (
                    <ServiceInformation
                        job={jobActive}
                        book={book}
                        onPressPayButton={() => {
                            navigation.navigate(PaymentOptions)
                        }}
                    />
                )}

            </View>
        </View>
    )
};

export default FoundServiceScreen