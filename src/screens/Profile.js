// Scren for viewing user profile
// 897180426
import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import Expo from "expo";
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
      user: false,
      loading: true
    };
  }
  componentWillMount() {
    this.setState({ loading: true });
    
    checkLogin()
      .then(email => {
        console.log(email);
        if (email != false) {
          console.log("User Logged In");
          this.setState({ user: email, loading: false });
          console.log(this.state);
        } else {
          console.log("No User Logged in");
          this.setState({ user: false, loading: false });
          console.log(this.state);
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
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
    const content = this.state.loading === false
      ? this.state.user
          ? <ProfileComponent
              userEmail={this.state.user}
              onLogout={this._onLogout.bind(this)}
              navigateProps={this._navigateToIncident.bind(this)}
            />
          : <LoginComponent onLogin={this._onLogin.bind(this)} />
      : <Text> - </Text>;

    return (
      <Container>
        {content}
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
