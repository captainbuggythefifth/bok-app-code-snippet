import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { authActionChangeGoogleMapsSessionToken, authActionLogIn, authActionChangeRequest, authActionChangePartialAuth } from './redux/actions/auth';
import generateRandomToken from './helpers/get-random-token';
import { storageSaveData, STORAGE_ACCESS_TOKEN, STORAGE_REFRESH_TOKEN, storageGetData, storageRemoveData } from './helpers/storage';
import { httpAuthTokensRefresh } from './helpers/http/auth';
import { Vibration } from 'react-native';
import NotifService from './helpers/NotificationService';
import JobSubscriptionHOC from './hoc/JobSubscriptionHOC';
import { IRequestState } from './redux/interfaces/common';
import { SignIn, Home, LoggedIn, RegisterBusiness, Profile } from './navigations/RootStackList';
import { IRootReducerInterface } from './redux/reducers/root';
import SplashScreen from './screens/splash/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterBusinessScreen from './screens/register/RegisterBusinessScreen';
import { screens, IScreen } from './navigations/RootStackParamList';
import { blueGreen } from './styles/common.style';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from './screens/profile/ProfileScreen';
import HeaderLeft from './navigations/headers/HeaderLeft';
import HeaderRight from './navigations/headers/HeaderRight';
import NotificationSubscriptionHOC from './hoc/NotificationSubscriptionHOC';
import JobSubscriptionActiveHOC from './hoc/JobSubscriptionActiveHOC';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Main = () => {

    const navigationRef = React.useRef(null);

    const dispatch = useDispatch();

    const authIsLoggedIn = useSelector((state: IRootReducerInterface) => state.auth.isLoggedIn);
    const authIsRequesting = useSelector((state: IRootReducerInterface) => state.auth.request.isRequesting);

    const jobRequestDone = useSelector((state: IRootReducerInterface) => state.job.request.done);

    let request: IRequestState = {
        done: false,
        isRequesting: false,
        success: false
    };


    const [showModal, setShowModal] = useState(false);
    const onRegister = (token: any) => {
        console.log(token);
    };

    const onNotification = (notif: any) => {
        Vibration.vibrate([2, 150]);
        setShowModal(true)
    };

    useEffect(() => {

        // Notification

        const notificationService = new NotifService(onRegister, onNotification);

        // Create a session token for Google Maps; this will keep the cost low
        const randomToken = generateRandomToken();
        dispatch(authActionChangeGoogleMapsSessionToken(randomToken));

        request = {
            ...request,
            isRequesting: true
        }
        dispatch(authActionChangeRequest(request));

        const checkRefreshToken = async () => {
            const refreshToken = await storageGetData(STORAGE_REFRESH_TOKEN);

            if (!refreshToken) {
                // setAppLoading(false);
                request = {
                    ...request,
                    isRequesting: false,
                    done: true,
                }
                dispatch(authActionChangeRequest(request));
                return false
            }

            const resultTokensRefresh = await httpAuthTokensRefresh(refreshToken);

            console.log("resultTokensRefresh: ", resultTokensRefresh);
            if (!resultTokensRefresh) {
                await storageRemoveData(STORAGE_ACCESS_TOKEN);
                await storageRemoveData(STORAGE_REFRESH_TOKEN);
                // setAppLoading(false);

                request = {
                    ...request,
                    isRequesting: false,
                    done: true
                }
                dispatch(authActionChangeRequest(request));

                return false
            }

            const tokens = {
                id: resultTokensRefresh.data.id,
                accessToken: resultTokensRefresh.data.access_token,
                refreshToken: resultTokensRefresh.data.refresh_token,
            }

            await storageSaveData(STORAGE_ACCESS_TOKEN, tokens.accessToken);
            await storageSaveData(STORAGE_REFRESH_TOKEN, tokens.refreshToken);

            dispatch(authActionLogIn(tokens));

            request = {
                ...request,
                isRequesting: false,
                done: true,
                success: true
            }

            dispatch(authActionChangePartialAuth({
                id: resultTokensRefresh.data.id,
                accessToken: resultTokensRefresh.data.access_token,
                refreshToken: resultTokensRefresh.data.refresh_token,
                user: resultTokensRefresh.data.user,
                isLoggedIn: true,
                request,
            }))
        }
        checkRefreshToken();

    }, []);

    const defaultLogInScreenRouteName = SignIn;
    const defaultScreenRouteName = Home;

    const shouldDisplaySplashScreen = authIsRequesting; // && !jobRequestDone;
    
    if (shouldDisplaySplashScreen) {
        return (
            <SplashScreen />
        );
    }

    const initialRouteName = authIsLoggedIn ? LoggedIn : defaultLogInScreenRouteName;

    const LoggedInScreen = () => {
        return (
            <Drawer.Navigator initialRouteName={Home} drawerType={"back"}>
                <Drawer.Screen name={Home} component={HomeScreen} options={{ title: "Dashboard" }} />
                <Drawer.Screen name={Profile} component={ProfileScreen} options={{ title: "Profile" }} />
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
                        title: "Bok",
                        headerTitleAlign: "center",
                        headerLeft: () => <HeaderLeft />,
                        headerRight: () => <HeaderRight />,
                    }}
                    key={LoggedIn}
                />
                ]}
            </Stack.Navigator>
        );
    }

    return (
        <>
            <NavigationContainer>
                <Root />
            </NavigationContainer>
            <JobSubscriptionHOC />
            <JobSubscriptionActiveHOC />
            <NotificationSubscriptionHOC />
        </>
    )
};

export default Main