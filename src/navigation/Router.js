import HomeScreen from "../screens/Home";
import MapScreen from "../screens/MapScreen.js";
import Profile from "../screens/Profile";
import AddIncident from "../screens/AddIncident";
import Incident from "../screens/Incident";
import { NavigationComponent } from "react-native-material-bottom-navigation";
import { TabNavigator, StackNavigator } from "react-navigation";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

export const TabNav = TabNavigator(
  {
    Map: {
      screen: MapScreen
    },
    Home: {
      screen: HomeScreen
    },
    Profile: {
      screen: Profile
    }
  },
  {
    tabBarComponent: NavigationComponent,
    tabBarPosition: "bottom",
    initialRouteName: "Home",
    lazy: true,
    tabBarOptions: {
      bottomNavigationOptions: {
        labelColor: "white",
        rippleColor: "white",
        tabs: {
          Map: {
            barBackgroundColor: "#37474F",
            icon: <Icon name="map" size={24} color="white" />
          },
          Home: {
            label: "Report",
            barBackgroundColor: "#00796B",
            icon: <Icon name="add-box" size={24} color="white" />
          },
          Profile: {
            barBackgroundColor: "#8e44ad",
            icon: <Icon name="person" size={24} color="white" />
          }
        }
      }
    }
  }
);

export const AppNav = StackNavigator({
  Home: {
    screen: TabNav
  },
  AddIncident: {
    screen: AddIncident
  },
  Incident: {
    screen: Incident
  }
});
