import React from 'react';
import InputButton from '../input/InputButton';
import { View } from 'react-native';
import Spacer from '../Spacer';

interface IPaymentOptionButtons {
    onPressCreditCardButton: Function,
    onPressSwipeCreditCardButton: Function,
    onPressCashButton: Function,
    onPressEditItems: Function
}

const PaymentOptionButtons = ({ onPressCreditCardButton, onPressSwipeCreditCardButton, onPressCashButton, onPressEditItems }: IPaymentOptionButtons) => {
    return (
        <View style={{
            width: "80%"
        }}>

            <InputButton title={"CREDIT CARD"} onPress={onPressCreditCardButton} />
            <Spacer />
            <InputButton title={"SWIPE CREDIT CARD"} onPress={onPressSwipeCreditCardButton} />
            <Spacer />
            <InputButton title={"CASH"} onPress={onPressCashButton} />
            <Spacer />
            <InputButton title={"EDIT ITEMS"} onPress={onPressEditItems} />
        </View>
    )
};

export default PaymentOptionButtons