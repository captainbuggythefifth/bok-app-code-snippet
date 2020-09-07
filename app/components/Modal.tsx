import React, { Component, Children } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert } from 'react-native';

interface IModalComponent {
    show: boolean
}

const ModalComponent = ({show = false}: IModalComponent) => {
    

    return (
        <View style={{ marginTop: 22 }}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={show}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                ALALALAh
            </Modal>
        </View>
    );

};

export default ModalComponent