import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import Expo from 'expo';
import Home from './screens/Home'
import {NavigationProvider, StackNavigation} from '@expo/ex-navigation';

import Router from './navigation/Router';

export default class AppContainer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationProvider router={Router}>
            <StackNavigation
              id="root"
              initialRoute={Router.getRoute('rootNavigation')}
            />
          </NavigationProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
