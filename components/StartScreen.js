import React from 'react';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';

export default class StartScreen extends React.Component {
  state = {
    isFirstLaunch: false
  };
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.retrieveData();
  }

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('isFirstLaunch');
      console.log(value);
      if (!value) {
        console.log(value);
        this.props.navigation.navigate('Onboarding');
      } else {
        this.props.navigation.navigate('MainStack');
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="small" color="#00ff00" animating={true} />
      </View>
    );
  }
}
