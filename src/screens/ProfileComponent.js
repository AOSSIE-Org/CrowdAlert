import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import Expo from "expo";
import { Container, Header, Body, Content, Right, Button ,Toast } from "native-base";
import { query } from "../util/firebaseUtil";
import { removeUserEmail } from "../util/storageUtil";
import IncidentListComponent from "./IncidentListComponent";
export default class ProfileComponent extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.userEmail
    };
  }
  _logout = async () => {
    await removeUserEmail().catch(error => {
      console.log(error);
      alert("Err: ", error);
    });
    this.props.onLogout();
    Toast.show({
      text : "You are Logged out.",
      position : 'bottom',
      duration : 3000
    })
  };

  _navigateIncident = incidentDetails => {
    this.props.navigateProps(incidentDetails);
  };
  componentDidMount() {
    this.setState({ user: this.props.userEmail });
  }
  render() {
    console.log("props", this.props.userEmail);
    console.log("state: ", this.state.user);
    return (
      <Container>
        <Header>
          <Body>
            <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              {this.props.userEmail}
            </Text>
          </Body>
        </Header>
        <Content>
          <Text> </Text>
          <View style={{ padding: 5 }}>
            <IncidentListComponent
              userEmail={this.props.userEmail}
              navigateProps1={this._navigateIncident}
            />
          </View>
          <View style={{ padding: 30 }}>
            <Button block rounded onPress={this._logout}>
              <Text style={{ color: "white" }}> Logout </Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
