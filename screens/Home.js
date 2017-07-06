import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableHighlight
} from "react-native";
import Expo from "expo";
import Router from "../navigation/Router";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.menuContainer}>
        <View style={styles.rowContainer}>
          <TouchableHighlight
            style={styles.highlight}
            underlayColor="transparent"
            activeOpacity={0.5}
          >
            <View style={styles.menuButton}>
              <Image
                style={styles.menuImage}
                source={require("../assets/images/road_marker_100_new.png")}
              />
              <Text style={styles.menuText}>Road</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.highlight}
            underlayColor="transparent"
            activeOpacity={0.5}
          >
            <View style={styles.menuButton}>
              <Image
                style={styles.menuImage}
                source={require("../assets/images/fire_marker_100_new.png")}
              />
              <Text style={styles.menuText}>Fire</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.highlight}
            underlayColor="transparent"
            activeOpacity={0.5}
          >
            <View style={styles.menuButton}>
              <Image
                style={styles.menuImage}
                source={require("../assets/images/health_marker_100_new.png")}
              />
              <Text style={styles.menuText}>Health</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: "#cecece",
    alignItems: "center"
  },
  rowContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  highlight: {},
  menuButton: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  menuImage: {
    height: 100,
    width: 100
  },
  menuText: {}
});
