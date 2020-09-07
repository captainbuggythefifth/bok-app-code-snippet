import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigations/RootStackParamList';
import ServiceInformation from '../../components/books/ServiceInformation';
import { IRootReducerInterface } from '../../redux/reducers/root';
import { useSelector } from 'react-redux';
import PaymentOptionButtons from '../../components/books/PaymentOptionButtons';
import { FindService, PaymentOptions } from './../../navigations/RootStackList';
import { useMutation } from 'react-apollo';
import { QUERIES_JOB_MUTATE_UPDATE_PAYMENT_MODE_BY_ID } from './../../helpers/apollo-client/queries/jobs';

type TPaymentOptionsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "PaymentOptions"
>;

type Props = {
    navigation: TPaymentOptionsScreenNavigationProp;
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        backgroundColor: "white",
    },
});

const PaymentOptionsScreen = ({ navigation }: Props) => {
    const book = useSelector((state: IRootReducerInterface) => state.book);

    const jobActiveData = useSelector((state: IRootReducerInterface) => state.jobActive.data);

    const [jobMutateUpdatePaymentMode] = useMutation(QUERIES_JOB_MUTATE_UPDATE_PAYMENT_MODE_BY_ID);

    /* useEffect(() => {
        notificationUpdateMutation({
            variables: {
                id: notificationId,
                status: "SEEN"
            },
        })
    }, []); */

    

    const submitPaymentMode = (paymentMode: string) => {

        if (jobActiveData) {
            jobMutateUpdatePaymentMode({
                variables: {
                    id: jobActiveData.id,
                    payment_mode: paymentMode
                },
            })
            return navigation.goBack()
        }
     
        return
    }

    const handlePressCreditCardButton = () => {
        submitPaymentMode("CC")
    }

    const handlePressSwipeCreditCardButton = () => {
        submitPaymentMode("SC")
    }

    const handlePressCashButton = async () => {
        // Simulate payment here

        submitPaymentMode("COD")
    }

    const handlePressEditItemsButton = () => {
        navigation.navigate(FindService);
    }

    return (
        <View style={
            styles.container
        } >
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: "100%"
            }}>
                <PaymentOptionButtons
                    onPressCreditCardButton={handlePressCreditCardButton}
                    onPressSwipeCreditCardButton={handlePressSwipeCreditCardButton}
                    onPressCashButton={handlePressCashButton}
                    onPressEditItems={handlePressEditItemsButton}
                />
            </View>
            {/* <View>
                <ServiceInformation book={book} onPressPayButton={() => {
                    navigation.navigate(PaymentOptions);
                }} />
            </View> */}
        </View>
    )
};

export default PaymentOptionsScreen