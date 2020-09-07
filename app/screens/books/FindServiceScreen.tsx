import React, { useEffect } from 'react';
import { View } from 'react-native';
import MapViewScreen from '../maps/MapViewScreen';
import ServiceForm from '../../components/books/ServiceForm';
import { StyleSheet } from 'react-native';
import { IRootReducerInterface } from '../../redux/reducers/root';
import { useSelector, useDispatch } from 'react-redux';

import { ILocation, bookActionChangeLocation, bookActionChangeTotal, bookActionChangeIsRequesting, bookActionChangeStatus, bookActionChangeClientId, locationInitialState, bookActionAddProduct, bookActionChangeQuantityProductId, bookActionAddProducts } from '../../redux/actions/book';
import { IProduct } from '../../redux/interfaces/product';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigations/RootStackParamList';
import { IHttpBook, httpBook, httpBookNew, IHttpBookNew } from './../../helpers/http/book';

import { httpBookingGet } from './../../helpers/http/booking';
import { IRequestState } from './../../redux/interfaces/common';
import { bookingActionChangeRequest, bookingActionChangeData } from './../../redux/actions/booking';
import Loader from './../../components/Loader';

import { WaitingSevice, ChangeLocation, FoundService } from './../../navigations/RootStackList';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
    },
});

type TFindServiceScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "FindService"
>;

type Props = {
    navigation: TFindServiceScreenNavigationProp;
};

const FindServiceScreen = ({ navigation }: Props) => {

    const dispatch = useDispatch();
    
    const auth = useSelector((state: IRootReducerInterface) => state.auth);
    const book = useSelector((state: IRootReducerInterface) => state.book);
    const booking = useSelector((state: IRootReducerInterface) => state.booking);
    const jobActive = useSelector((state: IRootReducerInterface) => state.jobActive.data);

    const getProduct = (productId: string): IProduct | undefined => {
        const product = booking && booking.data ? booking.data[0].products.find((_product: IProduct) => {
            return _product.id === productId
        }) : undefined;
        return product
    }

    const getProductQuantityFromBookByProductById = (productId: string): number | undefined => {
        const product = book ? book.products.find((_product: IProduct) => {
            return _product.id === productId
        }) : undefined;

        return product?.quantity
    }

    // We will get the bookings data; this contains products and services and fees
    const getBookings = async () => {

        let request: IRequestState = {
            isRequesting: true,
            done: false,
            success: false
        }

        // let the app know that booking is requesting/loading
        dispatch(bookingActionChangeRequest(request));

        // fetch the data
        const bookings = await httpBookingGet();

        // console.log("bookings: ", bookings);

        // if the data is not available or error
        if (!bookings || !bookings.data) {
            request = {
                ...request,
                success: false,
                done: true,
                isRequesting: false
            }

            dispatch(bookingActionChangeRequest(request));
            return false
        }

        // if successful fetch
        request = {
            ...request,
            success: true,
            done: true,
            isRequesting: false
        }

        dispatch(bookingActionChangeData(bookings.data));
        dispatch(bookingActionChangeRequest(request));

        // Must set all quantity of all products to zero by default

        let defaultProductsQuantity = bookings.data[0].products.map((_product: IProduct) => {
            return {
                ..._product,
                quantity: 0
            }
        });

        // dispatch(bookActionChangeProduct(defaultProduct));
        dispatch(bookActionAddProducts(defaultProductsQuantity));
        dispatch(bookActionChangeClientId(auth.id));

    }

    useEffect(() => {

        // if the booking data has already been set, we must not refetch
        if (!booking.data && !booking.request.isRequesting && !booking.request.done) {
            (async () => {
                await getBookings();
            })();
        }

    }, []);

    const display = () => {

        if (booking && booking.data && booking.data[0]) {
            return (
                <>
                    <MapViewScreen
                        locationEnd={{
                            latitude: book.location.latitude,
                            longitude: book.location.longitude
                        }}
                        draggableLocationEnd={true}
                        changeLocation={(location: ILocation) => {
                            if (location.latitude !== book.location.latitude && location.longitude !== book.location.latitude) {
                                dispatch(bookActionChangeLocation(location));
                            }
                        }}
                    />
                    <View style={{
                        justifyContent: 'flex-end',
                    }}>
                        {booking.data[0].products && book.products && (
                            <ServiceForm
                                products={booking.data[0].products}
                                book={jobActive ? jobActive.book : book}
                                changeProduct={(productId: string) => {
                                    let product = getProduct(productId);
                                    if (!product) {
                                        return false;
                                    }

                                    const quantity = getProductQuantityFromBookByProductById(productId);

                                    product = {
                                        ...product,
                                        quantity: quantity ? quantity : 1
                                    }
                                    dispatch(bookActionAddProduct(product));
                                    dispatch(bookActionChangeTotal());
                                }}
                                changeQuantity={(quantity: string) => {
                                    // dispatch(bookActionChangeQuantity(Number(quantity)));

                                    if (!booking || !booking.data || !booking.data[0]) {
                                        return false
                                    }

                                    let payload = {
                                        productId: book.activeProduct ? book.activeProduct.id : booking.data[0].products[0].id,
                                        quantity: Number(quantity)
                                    };

                                    if (!payload.productId) {
                                        return false
                                    }

                                    dispatch(bookActionChangeQuantityProductId(payload));
                                    dispatch(bookActionChangeTotal());

                                }}
                                orderProduct={async () => {
                                    if (!jobActive) {
                                        dispatch(bookActionChangeIsRequesting());

                                        const bookNewRequest: IHttpBookNew = {
                                            book: book,
                                            client_id: book.clientId,
                                            transaction_id: 'transaction_id',
                                            booking_id: booking && booking.data ? booking.data[0].id : ""
                                        }

                                        const resultBookNew = await httpBookNew(bookNewRequest);

                                        console.log("resultBookNew: ", resultBookNew);

                                        dispatch(bookActionChangeIsRequesting());
                                        navigation.navigate(WaitingSevice);
                                    }
                                    if (jobActive?.status === "FINDING_PROVIDER") {
                                        navigation.navigate(WaitingSevice)
                                    }
                                    if (jobActive?.status === "PROVIDER_ACCEPTED" || jobActive?.status === "MENDER_ACCEPTED") {
                                        navigation.navigate(FoundService)
                                    }


                                }}
                                changeLocation={() => {
                                    navigation.navigate(ChangeLocation);
                                }}
                                activeProduct={
                                    jobActive ? jobActive.book.products[0] : book.activeProduct ? book.activeProduct : booking.data[0].products[0]
                                }
                                hasActiveJob={jobActive ? true : false}
                            />
                        )}

                    </View>

                </>
            )
        }
    }

    // Must check if client has current booking; if yes, must redirect to JobService
    // This should be handled on HOC but nothing words so I dont know meme


    const shouldDisplayScreen = booking && booking.data && booking.data[0] && book.products && book.clientId;
    const shouldDisplayLoader = !shouldDisplayScreen && booking.request.isRequesting && !booking.request.done;

    if (shouldDisplayLoader) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <View style={{
                ...styles.container,
                height: "100%"
            }}>
                {display()}
            </View>
        </>
    )
};

export default FindServiceScreen
