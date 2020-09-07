import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root';
import logger from 'redux-logger'

const middlewares = [
    thunk,
    logger
]

export default function configureStore(initialState = {}) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middlewares)
    );
}