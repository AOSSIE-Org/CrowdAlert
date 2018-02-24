import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import Expo from "expo";
import {
  Container,
  Header,
  Body,
  Content,
  Card,
  CardItem,
  Icon,
  Right
} from "native-base";
import { query } from "../util/firebaseUtil";
import * as firebase from "firebase";
//import LoadingSpinnerOverlay from "react-native-smart-loading-spinner-overlay";
import { getHeaderColor, capitalizeFirstLetter } from "../util/util";
export default class IncidentListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.userEmail,
      num_incidents: 0,
      incidents: [],
      loading: true
    };
    this.itemsRef = firebase.database().ref("incidents");
  }

  _fetchHeaderText = () => {
    if (this.state.loading === true) {
      return "Fetching Details";
    } else {
      if (this.state.num_incidents === 0) {
        return "You have not reported any incidents";
      } else {
        return "Incidents reported by you";
      }
    }
  };
  async componentDidMount() {
    this.setState({ user: this.props.userEmail });
    this.listenForItems(this.itemsRef);
     //this._modalLoadingSpinnerOverLay.show();
     //this._modalLoadingSpinnerOverLay.hide();
  }
  // used the code of Mapscreen.js to refresh it
  listenForItems(itemsRef) {
    console.log("listening for changes");
      itemsRef
      .orderByChild("user_id")
      .equalTo(this.props.userEmail.replace(".", ""))
      .on("value", snapshot => {
        var items = [];
        snapshot.forEach(child => {
            if (child.val().visible == true) {
              items.push({
                key: child.key,
                value: child.val()
              });
            }
        });
        console.log(items);
        this.setState({ incidents: items });
        this.setState({ num_incidents: items.length });
        this.setState({ loading: false });
      });
      console.log(this.state.incidents.length);
  }

  render() {
    return (
      <View>
        <Card>
          <CardItem header>

            <Text> {this._fetchHeaderText()} </Text>

          </CardItem>

          {this.state.incidents.map(incident => {
            console.log("test", getHeaderColor(incident.value.category));
            return (
              <CardItem
                button
                key={incident.key}
                onPress={() => {
                  this.props.navigateProps1(incident);
                }}
              >
                <Text
                  style={{ color: getHeaderColor(incident.value.category) }}
                >
                  {capitalizeFirstLetter(incident.value.category)}
                </Text>
                <Text> {incident.value.comments} </Text>
                <Right>
                  <Icon
                    name="arrow-forward"
                    style={{ color: getHeaderColor(incident.value.category) }}
                  />
                </Right>
              </CardItem>
            );
          })}
        </Card>
      </View>
    );
  }
}