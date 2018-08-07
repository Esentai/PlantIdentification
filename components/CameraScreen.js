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
  TouchableHighlight
} from 'react-native';
import { Camera, Permissions, ImagePicker, Vibration } from 'expo';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json

import Onboarding from 'react-native-onboarding-swiper';

export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    image: null,
    cameraImg: '',
    max_key: '',
    max_value: 0,
    mas: {},
    loading: false
  };
  static navigationOptions = {
    header: null
  };
  static tabbarOptions = {
    hide: true
  };

  async componentDidMount() {
    try {
      await AsyncStorage.setItem('isFirstLaunch', true);
    } catch (error) {
      console.log(error);
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  setModalVisible(visible) {
    this.setState({
      modalVisible: visible,
      mas: {}
    });
  }

  maxFunc = () => {
    this.setState({
      max_key: '',
      max_value: 0
    });
    Object.entries(this.state.mas).map(([key, v]) => {
      const value = Number((v * 100).toFixed(0));
      console.log('Value:', value);
      if (value >= this.state.max_value) {
        this.setState({
          max_key: key,
          max_value: value
        });
      }
    });
  };

  details = () => {
    console.log('Max:', this.state.max_key, ':', this.state.max_value);
    this.props.navigation.navigate('Details', {
      name: this.state.max_key
    });
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="blue" barStyle="light-content" />
          <Camera
            style={{
              flex: 0.8
            }}
            ref={ref => {
              this.camera = ref;
            }}
            type={this.state.type}
          />
          {this.state.loading && (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#00ff00" />
              <Text style={styles.loadingText}>Подождите, пожалуйста!</Text>
            </View>
          )}
          <View style={styles.takePhoto}>
            <TouchableOpacity
              style={styles.albumButton}
              onPress={this._pickImage}
            >
              <Ionicons name={'ios-albums'} size={35} color={'#9BDF69'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.takePhotoButton}
              onPress={this._takePhoto}
              disabled={this.state.loading}
            >
              <Image
                style={styles.takePhotoLogo}
                source={require('../Images/Group.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ReverseCameraButton}
              onPress={() => {
                this.setState({
                  type:
                    this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                });
              }}
            >
              <Ionicons
                name={'ios-reverse-camera-outline'}
                size={50}
                color={'#9BDF69'}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  _takePhoto = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.setState({
        cameraImg: photo.uri
      });
      this._handleImagePicked(this.state.cameraImg);
    }
  };

  _pickImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (!result.cancelled) {
        this.setState({ image: result.uri, cameraImg: result.uri });
      }
      this._handleImagePicked(result.uri);
    } catch (e) {
      console.log('error', e);
    }
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({ uploading: true });
      if (!pickerResult.cancelled) {
        this.setState({ loading: true });
        uploadResponse = await uploadImageAsync(pickerResult);
        uploadResult = await uploadResponse.json();
        this.setState({ mas: uploadResult.mas });
        console.log(uploadResult.mas);
        this.maxFunc();
        this.details();
        this.setState({ loading: false });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
      this.setState({ loading: false });
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  let apiUrl = 'https://amazing-flower-app.herokuapp.com/api/classify/';

  let uriParts = uri.split('.');
  let fileType = uri[uri.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  };

  return fetch(apiUrl, options);
}

const styles = StyleSheet.create({
  takePhoto: {
    flex: 0.2,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  takePhotoLogo: {
    width: 60,
    height: 60
  },
  takePhotoButton: {
    alignSelf: 'center'
  },
  album: {
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#9BDF69',
    color: '#9BDF69'
  },
  ReverseCameraButton: {
    alignSelf: 'center',
    textAlign: 'center',
    width: 60
  },
  albumButton: {
    alignSelf: 'center',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60
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
  },
  loadingText: {
    fontSize: 18,
    color: '#fff'
  }
});
