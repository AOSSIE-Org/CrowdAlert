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
  Icon,
  Toast
} from "native-base";
import React from "react";
import { StyleSheet, Text, View, Platform, Dimensions } from "react-native";
import Expo from "expo";
import { loginFb } from "../util/Login";
import { setUserEmail } from "../util/storageUtil";

const { height: screenHeight } = Dimensions.get("window");

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
      Toast.show({
        text : 'Login Successful',
        position : 'bottom',
        duration : 3000
      })
    });
  };
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#8e44ad' }}>
          <Body>
            <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              Profile Login
            </Text>
          </Body>
        </Header>

        <View style={styles.heading}>
          <View style={styles.logoItem}>
            <Text style={{ fontSize: 45, alignSelf: "center" }}>
              {" "}Crowd Alert
            </Text>
          </View>
          <View style={styles.loginItem}>

            <View style={{ justifyContent: "center" }}>
              <Button block rounded iconRight onPress={this._login}>
                <Text style={styles.innerButton}>
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
    heading: {
        flex: 1,
        height: screenHeight,
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "white"
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
    },
    innerButton: {
        color: "white",
        fontSize: 20,
        marginLeft: 13
    }
});
