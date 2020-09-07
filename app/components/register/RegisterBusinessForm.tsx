

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Input from './../input/Input';
import Spacer from '../Spacer';
import InputButton from '../input/InputButton';
import { IBusinessState } from './../../redux/interfaces/business';
import MapViewScreen from './../../screens/maps/MapViewScreen';
import { ILocation } from './../../redux/actions/book';

interface IRegisterBusinessForm {
    submit: Function,
    isSubmitting: boolean
}

const RegisterBusinessForm = ({ submit, isSubmitting }: IRegisterBusinessForm) => {

    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const [location, setLocation] = useState<ILocation>({
        latitude: 1,
        longitude: 1,
        placeId: '',
        name: 'My Location'
    });

    const changeLocation = (l: ILocation) => {
        setLocation(l);
    }

    const submitButtonEnabled: boolean = Boolean(name);

    return (
        <View>
            <Text style={{
                fontSize: 20,
                fontWeight: "bold"
            }}>Add Business</Text>
            <Spacer />

            <Input handleTextChange={(text: string) => setName(text)} placeHolder={"The Rock"} defaultValue={name} />
            <Spacer />
            <Input handleTextChange={(text: string) => setPhone(text)} placeHolder={"+995"} defaultValue={phone} />
            <Spacer />

            <View style={{
                height: 200
            }}>
                <MapViewScreen locationStart={{
                    longitude: location.longitude,
                    latitude: location.latitude
                }} changeLocation={changeLocation} draggableLocationStart={true} />
            </View>
            <Spacer height={6} />
            <InputButton
                disabled={!submitButtonEnabled}
                title="Continue"
                onPress={async () => {
                    const formValues: Partial<IBusinessState> = {
                        name,
                        phone,
                        location
                    };
                    submit(formValues)
                }}
                isLoading={isSubmitting}
            />
        </View>
    )
};

export default RegisterBusinessForm
