import React from 'react';

import { View } from 'react-native';
import { getEquivalentHeight } from './../helpers/screen-size';

interface ISpacer {
    height?: number,
    isScreenPercentage?: boolean
}

const Spacer = ({height = 2, isScreenPercentage = true}: ISpacer) => {
    
    let h = height

    if (isScreenPercentage) {
        h = getEquivalentHeight(height);
    }
    
    return (
        <View style={{
            height: h
        }} />
    )
};

export default Spacer