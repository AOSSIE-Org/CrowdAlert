import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@expo/ex-navigation';
import { FontAwesome } from '@expo/vector-icons';

export default class RootNavigation extends React.Component {

  render() {
    return (
      <TabNavigation tabBarHeight={56} initialTab="home">

        <TabNavigationItem
          id="mapView"
          renderIcon={isSelected => this._renderIcon('map', isSelected)}>
          <StackNavigation initialRoute="mapView" />
        </TabNavigationItem>

        <TabNavigationItem
          id="home"
          renderIcon={isSelected => this._renderIcon('plus-square', isSelected)}>
          <StackNavigation initialRoute="home" />
        </TabNavigationItem>

        <TabNavigationItem
          id="profile"
          renderIcon={isSelected => this._renderIcon('user', isSelected)}>
          <StackNavigation initialRoute="profile" />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={32}
        color={isSelected ? "#2f95dc" : "#888" }
      />
    );
  }

}
