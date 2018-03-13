import React, { Component, PropTypes } from "react";
import { AppNav } from "./src/navigation/Router";
import { Root } from "native-base";
import { BlurView, Constants } from "expo";
import { View, AsyncStorage, Modal, Text, TouchableHighlight, StyleSheet } from "react-native";

import styles from './src/assets/styles/ModalStyle'
import Slides from './src/screens/Slides';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }
  componentDidMount() {
    AsyncStorage.getItem("modal_display1")
    .then(modal_display1 => {
      if (modal_display1!="displayed") {
        console.log(modal_display1);
        this.setState({modalVisible:true});
      }
    })
    .catch(error => {
      return Promise.reject(error);
    })
    AsyncStorage.setItem("modal_display1", "displayed").catch(error => {
      return Promise.reject(error);
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {
    return (
      <Root>
        <View style={styles1.modal} />
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
  }
}
const styles1 = StyleSheet.create({
  modal : {
    backgroundColor: "black", 
    height: Constants.statusBarHeight
  }
})
