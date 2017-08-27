import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity
} from "react-native";
import Expo from "expo";
import Router from "../navigation/Router";
import styles from "../assets/styles/HomeScreen";
import { checkLogin } from "../util/storageUtil";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.menuContainer}>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.highlight}
            underlayColor="transparent"
            activeOpacity={0.5}
            onPress={() => navigate("AddIncident", { type: "road" })}
          >
            <View style={styles.menuButton}>
              <Image
                style={styles.menuImage}
                source={require("../assets/images/road_marker_100_new.png")}
              />
              <Text style={styles.menuText}>Road</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.highlight}
            underlayColor="transparent"
            activeOpacity={0.5}
            onPress={() => navigate("AddIncident", { type: "fire" })}
          >
            <View style={styles.menuButton}>
              <Image
                style={styles.menuImage}
                source={require("../assets/images/fire_marker_100_new.png")}
              />
              <Text style={styles.menuText}>Fire</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.highlight}
            underlayColor="transparent"
            activeOpacity={0.5}
            onPress={() => navigate("AddIncident", { type: "health" })}
          >
            <View style={styles.menuButton}>
              <Image
                style={styles.menuImage}
                source={require("../assets/images/health_marker_100_new.png")}
              />
              <Text style={styles.menuText}>Health</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
