import React from "react";
import { Content, Container, Header, Body } from "native-base";
import { Text } from "react-native";
import Expo from "expo";
import Router from "../navigation/Router";
import HomeMenuComponent from "./HomeMenuComponent";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  _navigate = category => {
    const { navigate } = this.props.navigation;
    navigate("AddIncident", { type: category });
  };
  render() {
    return (
      <Container>
        <Header>

          <Body>
            <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              Crowd Alert | Home
            </Text>
          </Body>
        </Header>
        <HomeMenuComponent onNavigate={this._navigate.bind(this)} />

      </Container>
    );
  }
}
