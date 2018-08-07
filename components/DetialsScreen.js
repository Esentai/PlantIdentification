import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  ActivityIndicator,
  Modal,
  TouchableHighlight,
  AsyncStorage,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json

console.disableYellowBox = true;

class DetailsScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarHidden: true
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const name = this.props.navigation.getParam('name');
    const response = await fetch(
      `https://amazing-flower-app.herokuapp.com/apiLabelGraph/?name=${name}`
    );
    const json = await response;
    const responseJson = await json.json();
    console.log('json:', responseJson);
  };

  goBackButton = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <StatusBar backgroundColor="blue" barStyle="dark-content" />
          <View>
            <Image
              style={{ height: 300 }}
              source={{
                uri:
                  'https://avatars.mds.yandex.net/get-pdb/38069/9032f194-c910-409e-99e7-54c52a28842f/orig'
              }}
            />
            <TouchableHighlight
              style={styles.goBackButton}
              onPress={this.goBackButton}
            >
              <Ionicons name={'ios-arrow-back'} size={60} color={'#fff'} />
            </TouchableHighlight>

            <Text style={styles.name}>
              {this.props.navigation.getParam('name')}
            </Text>
          </View>
          <Text>Salem Alem</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  name: {
    fontSize: 25,
    position: 'absolute',
    left: 15,
    top: 235,
    color: '#fff',
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#9BDF69',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9BDF69'
  },
  goBackButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9BDF69',
    borderRadius: 100,
    borderWidth: 1,
    paddingRight: 5,
    borderColor: '#9BDF69',
    width: 60,
    height: 60,
    position: 'absolute',
    top: 30,
    left: 15
  }
});

export default DetailsScreen;
