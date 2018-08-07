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
  state = {
    name: '',
    watering: '',
    temperature: '',
    interestingfacts: '',
    history: '',
    linkforimage: '',
    loading: 'false'
  };
  static navigationOptions = {
    header: null,
    tabBarHidden: true
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true });
    const name = this.props.navigation.getParam('name');
    const response = await fetch(
      `https://amazing-flower-app.herokuapp.com/apiLabelGraph/?name=${name}`
    );
    const json = await response;
    const responseJson = await json.json();
    console.log('json:', responseJson);
    this.setState({
      name: responseJson.title,
      watering: responseJson.watering,
      temperature: responseJson.temperature,
      interestingfacts: responseJson.interestingfacts,
      history: responseJson.history,
      linkforimage: responseJson.linkforimage
    });
    this.setState({ loading: false });
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
            {this.state.loading && (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#28D190" />
              </View>
            )}
            <Image
              style={{ height: 300 }}
              source={{
                uri: this.state.linkforimage
              }}
            />
            <TouchableHighlight
              style={styles.goBackButton}
              onPress={this.goBackButton}
            >
              <Ionicons name={'ios-arrow-back'} size={60} color={'#fff'} />
            </TouchableHighlight>

            <Text style={styles.name}>{this.state.name}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.text}>Полив:</Text>
            <Text style={styles.data}>{this.state.watering}</Text>
            <Text style={styles.text}>Температура:</Text>
            <Text style={styles.data}>{this.state.temperature}</Text>
            <Text style={styles.text}>История:</Text>
            <Text style={styles.data}>{this.state.history}</Text>
            <Text style={styles.text}>Интересные факты:</Text>
            <Text style={styles.data}>{this.state.interestingfacts}</Text>
          </View>
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
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#28D190',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#28D190'
  },
  goBackButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28D190',
    borderRadius: 100,
    borderWidth: 1,
    paddingRight: 5,
    borderColor: '#28D190',
    width: 60,
    height: 60,
    position: 'absolute',
    top: 30,
    left: 15
  },
  info: {
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    color: '#666666',
    fontSize: 16,
    marginTop: 15
  },
  data: {
    fontSize: 16
  },
  loading: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default DetailsScreen;
