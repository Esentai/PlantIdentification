import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  View,
  ImageBackground
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { StackActions, NavigationActions } from 'react-navigation';

export default class OnboardingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  navigateScreen = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'MainStack' })]
    });
    this.props.navigation.dispatch(resetAction);
  };

  onDone = () => {
    this.navigateScreen();
  };
  onSkip = () => {
    this.navigateScreen();
  };

  render() {
    return (
      <Onboarding
        onDone={this.onDone}
        onSkip={this.onSkip}
        pages={[
          {
            backgroundColor: 'transparent',
            image: (
              <ImageBackground
                style={styles.imgBackground}
                resizeMode="cover"
                source={require('../Images/onBoardingImg3.png')}
              />
            ),
            title: <Text style={styles.title}>Добро пожаловать, в Bagban!</Text>
          },
          {
            backgroundColor: 'transparent',
            image: (
              <ImageBackground
                style={styles.imgBackground}
                resizeMode="cover"
                source={require('../Images/onBoardingImg2.png')}
              />
            ),
            title: (
              <Text style={styles.title2}>
                Данное приложение в процессе разработки и ожидаются возможные
                ошибки в распозновании
              </Text>
            )
          }
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%'
  },
  logo: {
    position: 'absolute',
    top: 25,
    width: 100,
    height: 92
  },
  title: {
    color: '#fff',
    fontSize: 32,
    position: 'absolute',
    top: 180,
    width: 330,
    textAlign: 'center'
  },
  title2: {
    color: '#fff',
    fontSize: 24,
    position: 'absolute',
    top: 80,
    width: 250,
    textAlign: 'right'
  }
});
