import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { blueGreen } from '../styles/common.style';
import { IScreen, SignIn, Home } from './RootStackParamList';
import { useSelector } from 'react-redux';
import { IRootReducerInterface } from '../redux/reducers/root';
import HomeScreen from './../screens/HomeScreen';
import SignInScreen from './../screens/auth/SignInScreen';
import RegisterPersonalScreen from './../screens/register/RegisterPersonalScreen';
import RegisterPhoneScreen from './../screens/register/RegisterPhoneScreen';
import VerifyPhoneScreen from './../screens/register/VerifyPhoneScreen';
import FindServiceScreen from './../screens/books/FindServiceScreen';
import FoundServiceScreen from './../screens/books/FoundServiceScreen';
import PaymentOptionsScreen from './../screens/books/PaymentOptionsScreen';
import ChangeLocationScreen from './../screens/maps/ChangeLocationScreen';
import WaitingServiceScreen from './../screens/books/WaitingServiceScreen';
import JobServiceScreen from './../screens/job/JobServiceScreen';
import RegisterBusinessScreen from './../screens/register/RegisterBusinessScreen';

const Stack = createStackNavigator();

const Navigation = () => {

    const defaultLogInScreenRouteName = SignIn;
    const defaultScreenRouteName = Home;

    const auth = useSelector((state: IRootReducerInterface) => state.auth);

    const initialRouteName = auth.isLoggedIn ? defaultScreenRouteName : defaultLogInScreenRouteName;

    console.log("initialRouteName: ", initialRouteName);

    /* const screenComponents = screens.map((screenA: IScreen) => {
        return <Stack.Screen
            name={screenA.screenName}
            component={screenA.component}
            options={{
                title: screenA.title,
                animationTypeForReplace: screenA.animationTypeForReplace,
                headerShown: screenA.headerShown
            }}
            key={screenA.screenName}
        />
    }); */

    // console.log("screenComponents: ", screenComponents);

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={initialRouteName}
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: blueGreen,
                            height: 70
                        },
                        headerTintColor: '#fff',

                    }}
                >
                    
                    <Stack.Screen component={HomeScreen} name="Home" options={{ "animationTypeForReplace": "push", "headerShown": false, "title": "Home" }} />
                    <Stack.Screen component={SignInScreen} name="SignIn" options={{ "animationTypeForReplace": "push", "headerShown": false, "title": "Sign In" }} />
                    <Stack.Screen component={RegisterPersonalScreen} name="RegisterPersonal" options={{ "animationTypeForReplace": "push", "headerShown": true, "title": "Register Personal Details" }} />
                    <Stack.Screen component={RegisterPhoneScreen} name="RegisterPhone" options={{ "animationTypeForReplace": "push", "headerShown": true, "title": "Register Phone" }} />
                    <Stack.Screen component={VerifyPhoneScreen} name="VerifyPhone" options={{ "animationTypeForReplace": "push", "headerShown": true, "title": "Verify Phone" }} />
                    <Stack.Screen component={FindServiceScreen} name="FindService" options={{ "animationTypeForReplace": "push", "headerShown": false, "title": "Find Service" }} />
                    <Stack.Screen component={FoundServiceScreen} name="FoundService" options={{ "animationTypeForReplace": "push", "headerShown": false, "title": "Found Service" }} />
                    <Stack.Screen component={PaymentOptionsScreen} name="PaymentOptions" options={{ "animationTypeForReplace": "push", "headerShown": false, "title": "Payment Options" }} />
                    <Stack.Screen component={ChangeLocationScreen} name="ChangeLocation" options={{ "animationTypeForReplace": "push", "headerShown": false, "title": "Change Location" }} />
                    <Stack.Screen component={WaitingServiceScreen} name="WaitingService" options={{ "animationTypeForReplace": "push", "headerShown": false, "title": "Waiting Service" }} />
                    <Stack.Screen component={JobServiceScreen} name="JobService" options={{ "animationTypeForReplace": "push", "headerShown": false, "title": "Job Service" }} />
                    <Stack.Screen component={RegisterBusinessScreen} name="RegisterBusiness" options={{ "animationTypeForReplace": "push", "headerShown": false, "title": "Register Business" }} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
};

export default Navigation