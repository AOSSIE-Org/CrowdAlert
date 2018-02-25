import React from "react";
import { Content, Container, Header, Body ,Toast } from "native-base";
import { Text, Button, Alert } from "react-native";
import Expo from "expo";
import Router from "../navigation/Router";
import HomeMenuComponent from "./HomeMenuComponent";
import { getUserEmail } from "../util/storageUtil";
import { AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor (props) {
    super(props)
    this.state = {
      user: false,
      loading: false
    }
  }
  _navigate = category => {
    const { navigate } = this.props.navigation;
    //navigate("AddIncident", { type: category });
    return new Promise(async (resolve, reject) => {  
    await  AsyncStorage.getItem("email")
    .then(email => {
      if (email != null) {
        navigate("AddIncident", { type: category });
        resolve(email);
      } else {
        Toast.show({
          text : 'Please Login First',
          position : 'bottom',
          duration : 3000
        })
        this.props.navigation.dispatch(NavigationActions.back());
        navigate('Profile');
        this.setState({ user : true });
        console.log("User Logged in as: ", email);
        resolve(email);
        console.log("No User Logged In");
        resolve(false);
      }
    })
    .catch(error => {
      console.log("Err: ", error);
      reject(error);
    });
  });
}
  componentDidMount() {
    this.setState({ loading: true });
  }
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