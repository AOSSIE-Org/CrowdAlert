import React from "react";
import { AppNav } from "./src/navigation/Router";
import { Root } from "native-base";
import { Constants } from "expo";
import { StyleSheet, View } from "react-native";

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <View style={styles.statusBar} />
        <AppNav />
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "black",
    height: Constants.statusBarHeight
  }
});
