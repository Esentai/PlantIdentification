import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, StatusBar, ActivityIndicator} from 'react-native';
import { Camera, Permissions, ImagePicker, Vibration } from 'expo';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json


export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    image: null,
    mas:{},
  };
  static navigationOptions = {
    header: null,
    tabBarHidden: true,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {

    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
          
        <View style={{ flex: 1 }}>
            <StatusBar
                backgroundColor="blue"
                barStyle="light-content"
            />
          <Camera
            style={{
              flex: 0.8,
            }}
            type={this.state.type}
          />
            {/* <ActivityIndicator size="large" color="#0000ff" /> */}
          <View style={styles.takePhoto}>
            <TouchableOpacity
              style={styles.albumButton}
              onPress={this._pickImage}>
              <Text style={styles.album}>Album</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.takePhotoButton}
                onPress={this._takePhoto}
            >
              <Image
                style={styles.takePhotoLogo}
                source={require('../Group.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ReverseCameraButton}
              onPress={() => {
                this.setState({
                  type:
                    this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                });
              }}>
              <Ionicons
                name={'ios-reverse-camera-outline'}
                size={60}
                color={'#9BDF69'}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  _takePhoto = async () => {
      const result = await ImagePicker.takePictureAsync();
      if (!result.cancelled) {
        console.log( result.uri)
      }
      
  };

  _pickImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
      this._handleImagePicked(result);
    } catch (e) {
      console.log('error', e);
    }
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
        this.setState({ uploading: true });
        if (!pickerResult.cancelled) {
            uploadResponse = await uploadImageAsync(pickerResult.uri);
            uploadResult = await uploadResponse.json();
            this.setState({mas: uploadResult.mas})
            console.log(uploadResult.mas)
        }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
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
      type: `image/${fileType}`,
    });
  
    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
  
    return fetch(apiUrl, options);
  
  }

const styles = StyleSheet.create({
    takePhoto: {
      flex: 0.2,
      height: 60,
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    takePhotoLogo: {
      width: 60,
      height: 60,
    },
    takePhotoButton: {
      alignSelf: 'center',
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
      color: '#9BDF69',
    },
    ReverseCameraButton: {
      alignSelf: 'center',
    },
    albumButton: {
      alignSelf: 'center',
    },
  });