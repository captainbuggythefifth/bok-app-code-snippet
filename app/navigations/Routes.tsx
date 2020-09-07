import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn, Home, LoggedIn } from './RootStackList';
import HomeScreen from './../screens/HomeScreen';
import RegisterBusinessScreen from './../screens/register/RegisterBusinessScreen';
import { blueGreen } from './../styles/common.style';
import { IScreen, screens } from './RootStackParamList';
import DrawerButton from './headers/DrawerButton';
import { useSelector } from 'react-redux';
import { IRootReducerInterface } from './../redux/reducers/root';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const defaultLogInScreenRouteName = SignIn;
const defaultScreenRouteName = Home;


export const LoggedInScreen = () => {
    return (
        <Drawer.Navigator initialRouteName={"Home"} drawerType={"back"}>
            <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Dashboard" }} />
            <Drawer.Screen name="RegisterBusiness" component={RegisterBusinessScreen} options={{ title: "Register Business" }} />
        </Drawer.Navigator>
    )
}

interface IRootRouteProps {
    isLoggedIn: boolean
}

export const RootRoute = () => {

    const auth = useSelector((state: IRootReducerInterface) => state.auth);

    const initialRouteName = auth.isLoggedIn ? LoggedIn : defaultLogInScreenRouteName;

    /* useEffect(() => {
        initialRouteName = isLoggedIn ? "LoggedIn" : defaultLogInScreenRouteName;
    }, [isLoggedIn]);

    console.log("render: ", isLoggedIn); */

    console.log("render: ", auth.isLoggedIn);

    
    return (
        <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{
                headerStyle: {
                    backgroundColor: blueGreen,
                    height: 64
                },
                headerTintColor: '#fff',
            }}
        >
            {[...screens.map((screenA: IScreen) => {
                return <Stack.Screen
                    name={screenA.screenName}
                    component={screenA.component}
                    options={{
                        title: screenA.title,
                        animationTypeForReplace: screenA.animationTypeForReplace,
                        headerShown: screenA.headerShown,
                        headerLeft: screenA.headerLeft,
                    }}
                    key={screenA.screenName}

                />
            }), <Stack.Screen
                name={LoggedIn}
                component={LoggedInScreen}
                options={{
                    title: "",
                    headerLeft: () => <DrawerButton />,
                }}
                key={"LoggedIn"}
            />
            ]}
        </Stack.Navigator>
    );
}