import React, { ReactText } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-community/picker';
import InputButton from '../input/InputButton';
import styles from '../../styles/styles';
import { IBookState } from '../../redux/interfaces/book';
import { IProduct } from '../../redux/interfaces/product';
import { Icon } from 'react-native-elements';


interface IServiceForm {
    products: IProduct[],
    book: IBookState,
    changeProduct: Function,
    changeQuantity: Function,
    orderProduct: Function,
    changeLocation: Function,
    activeProduct: IProduct,
    hasActiveJob: boolean
}


const ServiceForm = ({ products, book, changeProduct, changeQuantity, orderProduct, changeLocation, activeProduct, hasActiveJob = false }: IServiceForm) => {

    return (
        <View style={{
            backgroundColor: "white"
        }}>
            <View style={styles.serviceFormDetails}>
                <Text onPress={() => changeLocation()} style={{
                    paddingLeft: 16
                }}>{book.location.name}</Text>
            </View>
            <View style={{
                ...styles.serviceFormDetails,
                display: 'flex',
                flexDirection: 'row'
            }}>
                <View style={{
                    width: '50%',
                }}>
                    <Picker
                        selectedValue={activeProduct.id}
                        style={{
                            height: 20,
                            width: '100%',
                            transform: [{ scaleX: 0.90 }, { scaleY: 0.90 }],
                        }}

                        onValueChange={(itemValue: ReactText, itemIndex: number) => {
                            changeProduct(itemValue);
                        }}>
                        {products.map((product: IProduct) => {
                            return <Picker.Item label={`${product.name} - ₱${product.price}`} value={product.id} key={product.id} />
                        })}
                    </Picker>
                </View>
                <View style={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <View style={{
                        width: '50%'
                    }}>
                        <Text style={{ textAlign: 'right' }}>Quantity</Text>
                    </View>
                    <View style={{
                        width: '50%',
                    }}>
                        <Picker
                            selectedValue={activeProduct.quantity}
                            style={{
                                height: 20,
                                transform: [{ scaleX: 0.90 }, { scaleY: 0.90 }],
                            }}
                            onValueChange={(itemValue: ReactText, itemIndex: number) => {
                                // setSelectedQuantity(Number(itemValue));
                                changeQuantity(Number(itemValue));
                            }}>
                            <Picker.Item label="0" value={0} />
                            <Picker.Item label="1" value={1} />
                            <Picker.Item label="2" value={2} />
                            <Picker.Item label="3" value={3} />
                            <Picker.Item label="4" value={4} />
                            <Picker.Item label="5" value={5} />
                        </Picker>
                    </View>
                </View>
            </View>
            <View style={styles.serviceFormDetails}>
                <Text style={{ textAlign: 'right' }}>Total - ₱{book.total}</Text>
            </View>
            <InputButton
                title={hasActiveJob ? "View Details" : "Search"}
                onPress={() => {
                    orderProduct();
                }}
                style={{
                    width: '100%',
                    borderRadius: 0
                }}
                isLoading={book.isRequesting}
            />
        </View>
    )
};


export default ServiceForm