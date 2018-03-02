// Screen for displaying individual incident

import React from "react";
import { StyleSheet, Text, View, Platform, Image, Modal, Alert } from "react-native";
import Expo from "expo";
import { getHeaderColor, capitalizeFirstLetter } from "../util/util";
import { NavigationActions } from "react-navigation";
import * as firebase from "firebase";
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
  Button,
  Toast
} from "native-base";
import { report } from "../util/firebaseUtil";
import { timeSince } from "../util/util";
import { AsyncStorage } from "react-native";
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
      incident_key: params.data.key,
      del_button : false
    };
    this.itemsRef = this.getRef().child("incidents"); 
       AsyncStorage.getItem("email")
      .then(email => {
        if (email == this.state.incident.user_email) {
          this.setState({del_button : true});
        }
      })
      .catch(error => {
        console.log("Err: ", error);
        reject(error);
      });
  }
  getRef = () => {
    return firebase.database().ref();
  };

  _delete = async (title) => {
    Alert.alert('', 'Are you sure you want to delete this incident?',
    [
      {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Yes', onPress: async () => {
          await this.itemsRef.child(this.state.incident_key).update({ visible: false })
            .then(result => {
              console.log("Updation Complete");
              this.props.navigation.dispatch(NavigationActions.back());
              Toast.show({
                text: 'Incident has been deleted',
                position: 'bottom',
                duration : 3000
              })
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
          style={{backgroundColor: getHeaderColor(this.state.incident.category)}}
        >
          <Body>
            <Text style={styles.incident_category}>
              {capitalizeFirstLetter(this.state.incident.category)}
            </Text>
          </Body>
        </Header>
        <Content>
          <Card style={styles.card}>
            <CardItem>
              <Body>
                <Text style={styles.incident_title}>
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
                  style={styles.incident_image}
                />
              </CardItem>}

            <CardItem>
              <Text> {this.state.incident.comments} </Text>
            </CardItem>
            <CardItem>
              <Left>
                {this.state.incident.visible
                  ? <Text style={styles.incident_visible}>
                      This post is visible to everyone
                    </Text>
                  : <Text style={styles.incident_visible}>
                      Only you can view this post
                    </Text>}
              </Left>
              <Right>
                {this.state.incident.visible == false &&
                  this.state.incident.report_count > 0
                  ? <Text style={styles.incident_reportcount}>
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
          <Card style={styles.card}>
            <Expo.MapView
              provider="google"
              style={styles.incident_map}
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
            style={styles.button_container}
          >
            <View style={styles.button_view}>
              <Button success rounded block>
                <Text style={styles.button_text}>
                  Share
                </Text>
              </Button>
            </View>
            {this.state.del_button
                  ? <View style={styles.button_view}>
                    <Button style = {styles.button_color_delete} rounded block onPress={this._delete}>
                      <Text style={styles.button_text}>
                        Delete
                      </Text>
                    </Button>
                    </View>
                  : <View><Text></Text></View>
            } 
            <View style={styles.button_view}>
              <Button danger rounded block onPress={this._reportIncident}>
                <Text style={styles.button_text}>
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
const styles = StyleSheet.create({
  incident_category:{
    color: "white",
    fontSize: 20, 
    textAlign: "center"
  },
  incident_title:{
    fontSize: 20, 
    fontWeight: "bold"
  },
  incident_image :{
    height: 200, 
    width: null, 
    flex: 1
  },
  incident_visible:{
    color: "#34495e"
  },
  incident_reportcount:{
    color: "#e74c3c"
  },
  card:{
    padding: 5
  },
  incident_map:{
    height: 200, 
    width: null
  },
  button_container:{
    padding: 5,
    flexDirection: "row"
  },
  button_text:{
    color: "white"
  },
  button_view:{
    padding: 15, 
    flex: 1
  },
  button_color_delete:{
    backgroundColor : "#F82535"
  }
});