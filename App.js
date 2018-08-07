import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  SwitchNavigator,
  AsyncStorage
} from 'react-navigation'; // Version can be specified in package.json

import StartScreen from './components/StartScreen';
import OnboardingScreen from './components/OnboardingScreen';
import HomeScreen from './components/HomeScreen';
import CameraScreen from './components/CameraScreen';
import HistoryScreen from './components/HistoryScreen';
import DetailsScreen from './components/DetialsScreen';

console.disableYellowBox = true;

const status = false;

const HomeStack = StackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen }
});

const Camera = StackNavigator({
  Camera: { screen: CameraScreen },
  Details: { screen: DetailsScreen }
});

const History = StackNavigator({
  History: { screen: HistoryScreen },
  Details: { screen: DetailsScreen }
});

const TabNav = TabNavigator(
  {
    Home: { screen: HomeStack },
    Camera: { screen: Camera }
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: null,
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Camera') {
          iconName = `ios-camera${focused ? '' : '-outline'}`;
        } else if (routeName === 'History') {
          iconName = `ios-list${focused ? '' : '-outline'}`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),

    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#28D190',
      inactiveTintColor: 'gray'
    },
    header: null,
    animationEnabled: false,
    swipeEnabled: false
  }
);

const Router = StackNavigator(
  {
    Start: { screen: StartScreen },
    Onboarding: { screen: OnboardingScreen },
    MainStack: { screen: TabNav }
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

export default Router;
