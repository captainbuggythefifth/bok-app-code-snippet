import { IDispatchActionPayload } from '../interfaces/common';
import { BOOK_ACTION_TYPE_CHANGE_LOCATION, BOOK_ACTION_TYPE_CHANGE_PRODUCT, BOOK_ACTION_TYPE_CHANGE_TOTAL, BOOK_ACTION_TYPE_CHANGE_QUANTITY, BOOK_ACTION_TYPE_CHANGE_ISREQUESTING, BOOK_ACTION_TYPE_CHANGE_STATUS, BOOK_ACTION_TYPE_CHANGE_CLIENT_ID, BOOK_ACTION_TYPE_CHANGE_DEVICE_TOKEN, BOOK_ACTION_TYPE_ADD_PRODUCT, BOOK_ACTION_TYPE_ADD_SERVICE, BOOK_ACTION_TYPE_CHANGE_QUANTITY_BY_PRODUCT_ID, BOOK_ACTION_TYPE_ADD_PRODUCTS } from '../action-types/book';
import { IBookState } from '../interfaces/book';
import { ILocation } from '../actions/book';
import { IProduct } from '../interfaces/product';
import totalProductsAndServiceCalculator from './../../helpers/compute-total';

const initialLocationState: ILocation = {
    latitude: 0,
    longitude: 0,
    name: 'My Location',
    placeId: '',
}

const initialState: IBookState = {
    location: initialLocationState,
    clientId: '',
    deviceToken: '',
    products: [],
    services: [],
    quantity: 1,
    total: 0,
    isRequesting: false,
    status: 'ongoing'
}

const bookReducer = (state: IBookState = initialState, action: IDispatchActionPayload): IBookState => {
    switch (action.type) {
        case BOOK_ACTION_TYPE_CHANGE_CLIENT_ID:
            return {
                ...state,
                clientId: action.payload
            }
        case BOOK_ACTION_TYPE_CHANGE_LOCATION:
            return {
                ...state,
                location: action.payload
            }
        /* case BOOK_ACTION_TYPE_CHANGE_PRODUCT:
          return {
            ...state,
            product: action.payload
          } */
        case BOOK_ACTION_TYPE_ADD_PRODUCT:

            return {
                ...state,
                products: addProductIfNotExist(action.payload, state.products),
                activeProduct: updateActiveProductQuantity(action.payload, state.products),
                // total: totalProductsAndServiceCalculator(state.services, state.products)
            }

        case BOOK_ACTION_TYPE_ADD_PRODUCTS:

            return {
                ...state,
                products: action.payload,
                activeProduct: action.payload[0],
                // total: totalProductsAndServiceCalculator(state.services, state.products)
            }

        case BOOK_ACTION_TYPE_ADD_SERVICE:

            return {
                ...state,
                services: [
                    ...state.services,
                    action.payload
                ]
            }

        case BOOK_ACTION_TYPE_CHANGE_QUANTITY_BY_PRODUCT_ID:
            return {
                ...state,
                products: changeProductQuantityById(action.payload.productId, action.payload.quantity, state.products),
                activeProduct: updateActiveProductQuantityByProductId(action.payload.productId, action.payload.quantity, state.products),
                // total: totalProductsAndServiceCalculator(state.services, state.products)
            }

        case BOOK_ACTION_TYPE_CHANGE_QUANTITY:
            return {
                ...state,
                quantity: action.payload
            }

        case BOOK_ACTION_TYPE_CHANGE_TOTAL:
            return {
                ...state,
                total: totalProductsAndServiceCalculator(state.services, state.products)
            }

        case BOOK_ACTION_TYPE_CHANGE_ISREQUESTING:
            return {
                ...state,
                isRequesting: action.payload
            }

        case BOOK_ACTION_TYPE_CHANGE_STATUS:
            return {
                ...state,
                status: action.payload
            }

        case BOOK_ACTION_TYPE_CHANGE_DEVICE_TOKEN:
            return {
                ...state,
                deviceToken: action.payload
            }

        default:
            return state;
    }
};

const addProductIfNotExist = (product: IProduct, products: IProduct[]) => {
    if (!products || !Array.isArray(products)) {
        return []
    }

    return products.find((_product: IProduct) => _product.id === product.id) ? products : [
        ...products,
        product
    ];
}

const updateActiveProductQuantity = (product: IProduct, products: IProduct[]) => {
    if (!products || !Array.isArray(products)) {
        return product
    }

    const foundProduct = products.find((_product: IProduct) => _product.id === product.id);

    if (!foundProduct) {
        return product
    }

    const updatedProduct = {
        ...product,
        quantity: foundProduct.quantity
    }
    return updatedProduct
}

const updateActiveProductQuantityByProductId = (productId: string, quantity: number, products: IProduct[]) => {
    if (!products || !Array.isArray(products)) {
        return null
    }

    const foundProduct = products.find((_product: IProduct) => _product.id === productId);

    if (!foundProduct) {
        return null
    }

    const updatedProduct = {
        ...foundProduct,
        quantity
    }
    return updatedProduct
}

const changeProductQuantityById = (productId: string, quantity: number, products: IProduct[]) => {

    if (!products || !Array.isArray(products) || products.length === 0) {
        return []
    }

    return products.map((product: IProduct) => {
        if (productId === product.id) {

            return {
                ...product,
                quantity
            }
        }

        return product
    })
}




export default bookReducer;