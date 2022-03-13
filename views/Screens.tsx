import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../store/theme';

import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useFonts } from 'expo-font';

import { BACKGROUND, FONT, TEXT } from '../utils/constants';
import { getCurrentDate } from '../utils/getCurrentDate';

import GamePage from './GamePage';
import MenuPage from './MenuPage';
import TutorialPage from './TutorialPage';
import SettingsPage from './SettingsPage';
import { setMode } from '../store/settings';
import { setSavedGame } from '../store/save';

const Stack = createNativeStackNavigator();

export default function Screens() {
    const dispatch = useDispatch();
    const { theme } = useSelector((state: RootStateOrAny) => state.theme);

    useEffect(() => {
        AsyncStorage.getItem('@mode').then((data) => {
            if (data) dispatch(setMode(parseInt(data)));
        });

        AsyncStorage.getItem('@theme').then((data) => {
            if (data) dispatch(setTheme(data));
        });

        /*
        AsyncStorage.getItem('@grid').then((grid) => {
            if (grid) {
                AsyncStorage.getItem('@keyboard').then((keyboard) => {
                    if (keyboard) {
                        AsyncStorage.getItem('@date').then((date) => {
                            if (date) {
                                const savedGame: SavedGame = {
                                    savedGrid: JSON.parse(grid),
                                    savedKeyboard: JSON.parse(keyboard),
                                    date: date
                                };

                                dispatch(setSavedGame(savedGame));
                            }
                        });
                    }
                });
            }
        });
        */
    }, []);

    const [loaded] = useFonts({
        Oswald: require('../assets/fonts/Oswald-Light.ttf')
    });

    if (!loaded) {
        return <View style={{ backgroundColor: BACKGROUND[theme], flex: 1 }} />;
    }
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: BACKGROUND[theme]
                    },
                    headerTintColor: TEXT[theme],
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontFamily: FONT,
                        fontSize: 22
                    },
                    headerBackTitleVisible: false,
                    gestureEnabled: false,
                    animation: 'slide_from_bottom',
                    headerTitleAlign: 'center'
                }}
            >
                <Stack.Screen
                    name="Menu"
                    options={{
                        headerShown: false
                    }}
                    component={MenuPage}
                />
                <Stack.Screen
                    name="Daily"
                    component={GamePage}
                    options={({ navigation }) => ({
                        headerTitle: getCurrentDate(),
                        title: getCurrentDate(),
                        headerLeft: () => (
                            <Feather
                                name="home"
                                size={26}
                                color={TEXT[theme]}
                                onPress={() => {
                                    Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Medium
                                    );
                                    navigation.navigate('Menu');
                                }}
                            />
                        )
                    })}
                />
                <Stack.Screen
                    name="Standard"
                    component={GamePage}
                    options={({ navigation }) => ({
                        headerTitle: 'Gjett ordet!',
                        title: 'Gjett ordet!',
                        headerLeft: () => (
                            <Feather
                                name="home"
                                size={24}
                                color={TEXT[theme]}
                                onPress={() => {
                                    Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Medium
                                    );
                                    navigation.navigate('Menu');
                                }}
                            />
                        )
                    })}
                />
                <Stack.Screen
                    name="Help"
                    component={TutorialPage}
                    options={({ navigation }) => ({
                        headerTitle: 'Hjelp!',
                        title: 'Hjelp!',
                        headerLeft: () => (
                            <Feather
                                name="home"
                                size={24}
                                color={TEXT[theme]}
                                onPress={() => {
                                    Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Medium
                                    );
                                    navigation.navigate('Menu');
                                }}
                            />
                        )
                    })}
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsPage}
                    options={({ navigation }) => ({
                        headerTitle: 'Innstillinger',
                        title: 'Innstillinger',
                        headerLeft: () => (
                            <Feather
                                name="home"
                                size={24}
                                color={TEXT[theme]}
                                onPress={() => {
                                    Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Medium
                                    );
                                    navigation.navigate('Menu');
                                }}
                            />
                        )
                    })}
                />
            </Stack.Navigator>
            <StatusBar hidden />
        </NavigationContainer>
    );
}
