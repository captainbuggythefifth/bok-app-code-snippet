import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './../../app/redux/store';

const ReactReduxProviderHOC = ({ children }: any) => {
    return (
        <Provider store={configureStore()}>
            {children}
        </Provider>
    )
};

export default ReactReduxProviderHOC