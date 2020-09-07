import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IRootReducerInterface } from './../../redux/reducers/root';
import InputSearchPlace from './../../components/maps/InputSearchPlace';
import PlaceSuggestion from './../../components/maps/PlaceSuggestion';
import { View } from 'react-native';
import { blueGreen } from './../../styles/common.style';
import { debounce } from 'lodash';
import { ILocation, bookActionChangeLocation } from '../../redux/actions/book';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './../../navigations/RootStackParamList';
import { IHttpMapPlaceAutoComplete, httpMapPlaceAutoComplete, httpMapGeocode, IHttpMapGeocode } from './../../helpers/http/map';

type TChangeLocationScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "ChangeLocation"
>;

type Props = {
    navigation: TChangeLocationScreenNavigationProp;
};

const ChangeLocationScreen = ({navigation}: Props) => {
    const [predictions, setPredictions] = useState([]);

    const auth = useSelector((state: IRootReducerInterface) => state.auth);
    const book = useSelector((state: IRootReducerInterface) => state.book);

    const { googleMapsSessionToken } = auth;
    const { location: { latitude, longitude } } = book;

    const dispatch = useDispatch();

    const handleChangeDestination = (value: string) => {
        
        
        debounce(async () => {
            
            const params: IHttpMapPlaceAutoComplete = {
                value,
                latitude,
                longitude,
                googleMapsSessionToken
            }

            const result = await httpMapPlaceAutoComplete(params);
            
            setPredictions(result.predictions);

        }, 2000)();

    }

    const handleSelectPrediction = async (prediction: any) => {

        console.log("prediction: ", prediction);
        
        const params: IHttpMapGeocode = {
            placeId: prediction.place_id,
            googleMapsSessionToken,
        }

        const predictions = await httpMapGeocode(params);

        const predictionLocation: ILocation = {
            name: predictions.results[0].formatted_address,
            placeId: predictions.results[0].place_id,
            longitude: predictions.results[0].geometry.location.lng,
            latitude: predictions.results[0].geometry.location.lat
        };

        dispatch(bookActionChangeLocation(predictionLocation));

        navigation.goBack();

    }
    return (
        <View style={{
            backgroundColor: blueGreen,
            height: '100%',
        }}>
            <View style={{
                marginLeft: 15,
                marginRight: 15
            }}>
                <InputSearchPlace changeInputValue={handleChangeDestination} defaultValue={book.location.name} />
                <PlaceSuggestion predictions={predictions} selectPrediction={handleSelectPrediction} />
            </View>
        </View>

    )
};

export default ChangeLocationScreen