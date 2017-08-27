// Scren for viewing user profile
// 897180426
import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import Expo from "expo";
import * as firebase from "firebase";
import { loginFb } from "../util/Login";
import { checkLogin } from "../util/storageUtil";
import LoginComponent from "./LoginComponent";
import ProfileComponent from "./ProfileComponent";
import { Container } from "native-base";

export default class Profile extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      user: false
    };
  }
  async componentWillMount() {
    console.log("Function");
    await checkLogin()
      .then(email => {
        console.log(email);
        if (email != false) {
          console.log("User Logged In");
          this.setState({ user: email });
          console.log(this.state);
        } else {
          console.log("No User Logged in");
          this.setState({ user: false });
          console.log(this.state);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  _onLogin = email => {
    this.setState({ user: email });
  };
  _onLogout = () => {
    this.setState({ user: false });
  };
  _navigateToIncident = incidentDetails => {
    console.log("navigate");
    const { navigate } = this.props.navigation;
    navigate("Incident", { data: incidentDetails });
  };

  render() {
    return (
      <Container>
        {this.state.user
          ? <ProfileComponent
              userEmail={this.state.user}
              onLogout={this._onLogout.bind(this)}
              navigateProps={this._navigateToIncident.bind(this)}
            />
          : <LoginComponent onLogin={this._onLogin.bind(this)} />}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
