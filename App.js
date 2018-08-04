import React from 'react';
import { Button, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json

import HomeScreen from './components/HomeScreen'
import CameraScreen from './components/CameraScreen'
import HistoryScreen from './components/HistoryScreen'
import DetailsScreen from './components/DetialsScreen'

console.disableYellowBox=true;




const HomeStack = StackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen },
});

const Camera = StackNavigator({
  Camera: { screen: CameraScreen },
  Details: { screen: DetailsScreen },
});

const History = StackNavigator({
  History: { screen: HistoryScreen },
  Details: { screen: DetailsScreen },
});

export default TabNavigator(
  {
    Home: { screen: HomeStack },
    Camera:{ screen: Camera, },
    History: { screen: History },
  
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Camera') {
          iconName = `ios-camera${focused ? '' : '-outline'}`;
        }else if (routeName === 'History'){
          iconName = `history${focused ? '' : '-outline'}`;
        }


        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#9BDF69',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);
