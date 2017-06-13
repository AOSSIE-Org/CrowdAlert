import React from 'react';
import { View, Platform } from 'react-native';
import Expo from 'expo';
import Home from './screens/Home'

export default class AppContainer extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {Platform.OS === 'android' && (
          <View
            style={{
              height: Expo.Constants.statusBarHeight,
              backgroundColor: 'black',
            }}
          /> )}
        <Home />
      </View>
    );
  }
}
