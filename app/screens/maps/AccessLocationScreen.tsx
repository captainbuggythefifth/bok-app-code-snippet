import React from "react";
import { PermissionsAndroid, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import Spacer from "./../../components/Spacer";
import InputButton from "./../../components/input/InputButton";
import { useDispatch } from "react-redux";
import { permissionActionLocationStatus } from "./../../redux/actions/permission";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./../../navigations/RootStackParamList";

type TAccessLocationScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "AccessLocation"
>;

type Props = {
    navigation: TAccessLocationScreenNavigationProp;
};

const AccessLocationScreen = ({ navigation }: Props) => {

    const dispatch = useDispatch();

    const grantAccessLocation = async () => {

        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Bok',
                message: 'Bok App access to your location ',
                buttonPositive: 'Yes'
            });

        if (granted) {
            console.log("You can use the ACCESS_FINE_LOCATION");
        }
        else {
            console.log("ACCESS_FINE_LOCATION permission denied");
        }

        dispatch(permissionActionLocationStatus(granted));

        navigation.goBack()
    }

    const getPermission = async () => {
        await grantAccessLocation();
    }

    return (
        <View style={{
            position: "absolute",
            height: "100%",
            width: "100%"
        }}>
            <View style={{
                justifyContent: "flex-end",
                alignSelf: "center",
                width: "90%",
                height: "50%"
            }}>
                <Icon type="material" name="location-on" size={150} />
                <Spacer />
                <Text style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "500"
                }}>
                    Allow access to location
                </Text>
            </View>
            <View style={{
                // ...StyleSheet.absoluteFillObject,
                justifyContent: "flex-end",
                alignSelf: "center",
                height: "50%",
                width: "90%",
                paddingBottom: 16
            }}>
                <InputButton onPress={getPermission} title={"Grant Location Access"} style={{
                    padding: 10,
                }} />
            </View>
        </View>
    )
};

export default AccessLocationScreen;