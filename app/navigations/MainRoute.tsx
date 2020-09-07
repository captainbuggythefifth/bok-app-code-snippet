import React from 'react';
import { useSelector } from 'react-redux';
import { IRootReducerInterface } from './../redux/reducers/root';
import SplashScreen from './../screens/splash/SplashScreen';
import { screens, IScreen } from './RootStackParamList';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './../screens/HomeScreen';
import RegisterBusinessScreen from './../screens/register/RegisterBusinessScreen';
import { blueGreen } from './../styles/common.style';
import DrawerButton from './headers/DrawerButton';
import { NavigationContainer } from '@react-navigation/native';
import { SignIn, Home } from './RootStackList';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainRoute = () => {

    const defaultLogInScreenRouteName = SignIn;
    const defaultScreenRouteName = Home;

    const auth = useSelector((state: IRootReducerInterface) => state.auth);
    const job = useSelector((state: IRootReducerInterface) => state.job);
    
    const shouldDisplaySplashScreen = auth.request.isRequesting && !job.request.done;

    if (shouldDisplaySplashScreen) {
        return (
            <>
                <SplashScreen />
            </>
        );
    }

    const initialRouteName = auth.isLoggedIn ? "LoggedIn" : defaultLogInScreenRouteName;

    const LoggedInScreen = () => {
        return (
            <Drawer.Navigator initialRouteName={"Home"} drawerType={"back"}>
                <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Dashboard" }} />
                <Drawer.Screen name="RegisterBusiness" component={RegisterBusinessScreen} options={{ title: "Register Business" }} />
            </Drawer.Navigator>
        )
    }

    const Root = () => {
        return (
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
                    name="LoggedIn"
                    component={LoggedInScreen}
                    options={{
                        title: "", 
                        headerLeft: () => <DrawerButton />
                    }}
                    key={"LoggedIn"}
                />
                ]}
            </Stack.Navigator>
        );
    }

    return (
        <>
            <NavigationContainer>
                {Root()}
            </NavigationContainer>
        </>
    )
}

export default MainRoute