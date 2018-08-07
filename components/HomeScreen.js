import React from 'react';
import {
  Button,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  StyleSheet,
  ImageBackground
} from 'react-native';

import { Card } from 'react-native-elements';

console.disableYellowBox = true;

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  _renderItem({ item, index }) {
    return (
      <View>
        <Text>{item.title}</Text>
      </View>
    );
  }
  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <ImageBackground
          source={require('../Images/backgroundImg.jpg')}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Card style={{ backgroundColor: '#eaeaea' }} title="Растения дня">
            <Image
              style={{
                width: 250,
                height: 230,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              source={{
                uri:
                  'http://komnatnie-rasteniya.ru/wp-content/uploads/2018/01/504ed87e064e9af9ddc2e07d04d81e7e.jpg'
              }}
            />
            <Text style={styles.title}>
              Единственный в мире кактусовый сад под открытым небом можно
              посетить в Монте-Карло.
            </Text>
          </Card>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: '#000',
    marginTop: 10
  }
});

export default HomeScreen;
