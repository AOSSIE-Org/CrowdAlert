// Screen for displaying individual incident

import React from "react";
import { StyleSheet, Text, View, Platform, Image, Modal, Alert } from "react-native";
import Expo from "expo";
import { getHeaderColor, capitalizeFirstLetter } from "../util/util";
import { NavigationActions } from "react-navigation";
import * as firebase from "firebase";
import Toast from 'react-native-simple-toast';
import {
  Container,
  Header,
  Body,
  Card,
  Content,
  CardItem,
  Right,
  Left,
  Icon,
  Button
} from "native-base";
import { report } from "../util/firebaseUtil";
import { timeSince } from "../util/util";
export default class Incident extends React.Component {
  static navigationOptions = {
    header: null
  };
  _reportIncident = () => {
    report(this.state.incident_key);
  };
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    console.log(params.data.key);
    this.state = {
      incident: params.data.value,
      incident_key: params.data.key
    };
    this.itemsRef = this.getRef().child("incidents");
  }
  getRef = () => {
    return firebase.database().ref();
  };

  _delete = async (title) => {
    Alert.alert('', 'Are you sure you want to delete this incident ?',
    [
      {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Yes', onPress: async () => {
          await this.itemsRef.child(this.state.incident_key).update({ visible: false })
            .then(result => {
              console.log("Updation Complete");
              this.props.navigation.dispatch(NavigationActions.back());
              Toast.show("Incident Deleted");
            })
            .catch(error => {
              console.log("Error While uploading");
              alert("Error while uploading");
            });
      }},
    ],
    { cancelable: true }
  );
  }
  render() {
    return (
      <Container>
        <Header
          style={{
            backgroundColor: getHeaderColor(this.state.incident.category)
          }}
        >
          <Body>
            <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              {capitalizeFirstLetter(this.state.incident.category)}
            </Text>
          </Body>
        </Header>
        <Content>
          <Card style={{ padding: 5 }}>
            <CardItem>
              <Body>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {" "}{capitalizeFirstLetter(this.state.incident.title)}{" "}
                </Text>
                <Text note> {" "} </Text>
              </Body>
              <Right>
                <Text> {timeSince(this.state.incident.datetime)} </Text>
              </Right>
            </CardItem>
            {this.state.incident.image &&
              <CardItem cardBody>
                <Image
                  source={{
                    uri: "data:image/jpeg;base64, " +
                      this.state.incident.image_base64
                  }}
                  style={{ height: 200, width: null, flex: 1 }}
                />
              </CardItem>}

            <CardItem>
              <Text> {this.state.incident.comments} </Text>
            </CardItem>
            <CardItem>
              <Left>
                {this.state.incident.visible
                  ? <Text style={{ color: "#34495e" }}>
                      This post is visible to everyone
                    </Text>
                  : <Text style={{ color: "#34495e" }}>
                      Only you can view this post
                    </Text>}
              </Left>
              <Right>
                {this.state.incident.visible == false &&
                  this.state.incident.report_count > 0
                  ? <Text style={{ color: "#e74c3c" }}>
                      {" "}
                      Reported
                      {" "}
                      {this.state.incident.report_count}
                      {" "}
                      times
                      {" "}
                    </Text>
                  : <Text />}
              </Right>
            </CardItem>
          </Card>
          <Card style={{ padding: 5 }}>
            <Expo.MapView
              provider="google"
              style={{ height: 200, width: null }}
              initialRegion={{
                latitude: this.state.incident.location.coords.latitude,
                longitude: this.state.incident.location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            >
              <Expo.MapView.Marker
                coordinate={{
                  latitude: this.state.incident.location.coords.latitude,
                  longitude: this.state.incident.location.coords.longitude
                }}
                title={this.state.incident.sub_category}
                description={this.state.incident.comments}
              />
            </Expo.MapView>
          </Card>

          <View
            style={{
              padding: 5,
              flexDirection: "row"
            }}
          >
            <View style={{ padding: 15, flex: 1 }}>
              <Button success rounded block>
                <Text style={{ color: "white" }}>
                  Share
                </Text>
              </Button>
            </View>
            <View style={{ padding: 15, flex: 1 }}>
              <Button style = {{backgroundColor : "#F82535"}} rounded block onPress={this._delete}>
                <Text style={{ color: "white" }}>
                  Delete
                </Text>
              </Button>
            </View>
            <View style={{ padding: 15, flex: 1 }}>
              <Button danger rounded block onPress={this._reportIncident}>
                <Text style={{ color: "white" }}>
                  Report Spam
                </Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
