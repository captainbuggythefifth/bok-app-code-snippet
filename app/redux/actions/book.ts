import { IDispatchActionPayload } from "../interfaces/common";
import { BOOK_ACTION_TYPE_CHANGE_LOCATION, BOOK_ACTION_TYPE_CHANGE_PRODUCT, BOOK_ACTION_TYPE_CHANGE_TOTAL, BOOK_ACTION_TYPE_CHANGE_QUANTITY, BOOK_ACTION_TYPE_CHANGE_ISREQUESTING, BOOK_ACTION_TYPE_CHANGE_STATUS, BOOK_ACTION_TYPE_CHANGE_CLIENT_ID, BOOK_ACTION_TYPE_ADD_PRODUCT, BOOK_ACTION_TYPE_CHANGE_QUANTITY_BY_PRODUCT_ID, BOOK_ACTION_TYPE_ADD_PRODUCTS } from "../action-types/book";
import { IProduct } from "../interfaces/product";

export interface ILocation {
    latitude: number,
    longitude: number,
    placeId?: string,
    name: string
}

export const locationInitialState: ILocation = {
    latitude: 0,
    longitude: 0,
    placeId: "",
    name: "My Location"
};

interface IBookActionChangeQuantityProductId {
    productId: string;
    quantity: number
}

const bookActionChangeClientId = (clientId: string): IDispatchActionPayload => ({
    type: BOOK_ACTION_TYPE_CHANGE_CLIENT_ID,
    payload: clientId
});

const bookActionChangeLocation = (location: ILocation): IDispatchActionPayload => ({
    type: BOOK_ACTION_TYPE_CHANGE_LOCATION,
    payload: location
});

const bookActionChangeProduct = (product: IProduct): IDispatchActionPayload => ({
    type: BOOK_ACTION_TYPE_CHANGE_PRODUCT,
    payload: product
});

const bookActionAddProduct = (product: IProduct): IDispatchActionPayload => ({
    type: BOOK_ACTION_TYPE_ADD_PRODUCT,
    payload: product
});

const bookActionAddProducts = (products: IProduct[]): IDispatchActionPayload => ({
    type: BOOK_ACTION_TYPE_ADD_PRODUCTS,
    payload: products
});

const bookActionChangeQuantity = (quantity: number): IDispatchActionPayload => ({
    type: BOOK_ACTION_TYPE_CHANGE_QUANTITY,
    payload: quantity
});

const bookActionChangeQuantityProductId = (payload: IBookActionChangeQuantityProductId): IDispatchActionPayload => ({
    type: BOOK_ACTION_TYPE_CHANGE_QUANTITY_BY_PRODUCT_ID,
    payload
});

const bookActionChangeTotal = (): IDispatchActionPayload => ({
    type: BOOK_ACTION_TYPE_CHANGE_TOTAL,
    payload: null
});

const bookActionChangeIsRequesting = (): IDispatchActionPayload => ({
    type: BOOK_ACTION_TYPE_CHANGE_ISREQUESTING,
    payload: null
});

const bookActionChangeStatus = (status: string): IDispatchActionPayload => ({
    type: BOOK_ACTION_TYPE_CHANGE_STATUS,
    payload: status
});

export {
    bookActionChangeClientId,
    bookActionChangeLocation,
    bookActionChangeProduct,
    bookActionChangeTotal,
    bookActionChangeQuantity,
    bookActionChangeIsRequesting,
    bookActionChangeStatus,
    bookActionAddProduct,
    bookActionAddProducts,
    bookActionChangeQuantityProductId
}