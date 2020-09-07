import React from 'react';
import { View, Text } from 'react-native';


interface IPlaceSuggestion {
    predictions: any,
    selectPrediction: Function
}

const PlaceSuggestion = ({ predictions, selectPrediction }: IPlaceSuggestion) => {

    const suggestions = predictions.map((prediction: any) => {
        return <View key={prediction.id} style={{
            borderColor: "grey",
            borderWidth: .5,
            backgroundColor: "white",
            width: "100%"
        }}><Text style={{
            backgroundColor: "white",
            padding: 10,
        }} onPress={() => {
            // console.log("prediction: ", prediction);
            selectPrediction(prediction);
            /* const { lat, long } = prediction.geometry.location;

            selectPrediction({
                latitude: lat,
                longitude: long
            }); */

        }}>{prediction.description}</Text></View>
    });
    return (
        <View style={{
        }}>
            <View style={{
                backgroundColor: "white",
                borderRadius: 10
            }}>
                {suggestions}
            </View>
        </View>
    )
}

export default PlaceSuggestion