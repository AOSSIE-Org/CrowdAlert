import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import Expo from 'expo';

export default class Incident extends React.Component {
  static navigationOptions = {
    header: null,
    };

  render() {
    return (
      <View style={styles.container}>
        <Text >AOSSIE | Crowd Alert</Text>
        <Text >view for individual Incident </Text>
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
