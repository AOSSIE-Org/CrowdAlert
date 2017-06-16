import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import Expo from 'expo';

export default class Profile extends React.Component {
  static navigationOptions = {
    header: null,
    };

  render() {
    return (
      <View style={styles.container}>
        <Text >AOSSIE | Crowd Alert</Text>
        <Text >User Profile</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
