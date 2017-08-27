import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon
} from "native-base";
import React from "react";
import { StyleSheet, Text, View, Platform, Dimensions } from "react-native";
import Expo from "expo";
import { loginFb } from "../util/Login";
import { setUserEmail } from "../util/storageUtil";

export default class Login extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }

  _login = async () => {
    await loginFb().then(async user => {
      console.log("Logged in as: ", user.email);
      await setUserEmail(user.email);
      this.props.onLogin(user.email);
    });
  };
  render() {
    const { height: screenHeight } = Dimensions.get("window");

    return (
      <Container>
        <Header>
          <Body>
            <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              Profile Login
            </Text>
          </Body>
        </Header>

        <View
          style={{
            flex: 1,
            height: screenHeight,
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "#9b59b6"
          }}
        >
          <View style={styles.logoItem}>
            <Text style={{ fontSize: 45, alignSelf: "center" }}>
              {" "}crowdAlert
            </Text>
          </View>
          <View style={styles.loginItem}>

            <View style={{ justifyContent: "center" }}>
              <Button block rounded iconRight onPress={this._login}>
                <Text style={{ color: "white", fontSize: 20 }}>
                  Login with facebook{" "}
                </Text>
                <Icon name="logo-facebook" fontSize={20} />
              </Button>
            </View>
          </View>

        </View>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  logoItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  loginItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
