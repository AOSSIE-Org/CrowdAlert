import React, { Component, PropTypes } from "react";
import { AppNav } from "./src/navigation/Router";
import { Root } from "native-base";
import { BlurView, Constants } from "expo";
import { View, AsyncStorage, Modal, Text, TouchableHighlight } from "react-native";

import styles from './src/assets/styles/ModalStyle'
import Slides from './src/screens/Slides';

export default class App extends React.Component {
  state = {
    modalVisible: true,
    welcomeScreen : false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  _modaldisplay = () => {
    AsyncStorage.getItem("modal")
    .then(modal => {
      if (modal!="displayed") {
        this.setState({ welcomeScreen : true});
         AsyncStorage.setItem("modal", "displayed").catch(error => {
          return Promise.reject(error);
        });
      }
    })
    .catch(error => {
      return Promise.reject(error);
    })
  }
  render() {
    this._modaldisplay();
    if(this.state.welcomeScreen) {
    return (
      <Root>
        <View style={{ backgroundColor: "black", height: Constants.statusBarHeight }} />
        <AppNav />
        <Modal
          animationType={"fade"}
          transparent={true}
          style={styles.Container}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <BlurView intensity={100} style={styles.blurContainer}>
            <View style={styles.blurContainer}>
              <View style={styles.Container}>
                <View style={styles.SlidesContainer}>
                  <Slides />
                </View>
                <View style={styles.ExitContainer}>
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  >
                    <View style={styles.ExitButtonContainer}>
                      <Text style={styles.ExitButtonText}>Exit</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </BlurView>
        </Modal>
      </Root>
    );
  } else {
    return (
      <Root>
        <View style={styles.statusBar} />
        <AppNav />
      </Root>
    );
  }
  }
}
