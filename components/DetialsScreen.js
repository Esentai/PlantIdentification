import React from 'react';
import { Button, Text, View } from 'react-native';

console.disableYellowBox=true;

class DetailsScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Details!</Text>
        </View>
      );
    }
  }
  
 export default DetailsScreen 