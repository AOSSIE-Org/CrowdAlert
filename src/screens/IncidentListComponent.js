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
// import LoadingSpinnerOverlay from "react-native-smart-loading-spinner-overlay";
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
    // this._modalLoadingSpinnerOverLay.show();
    await query(this.props.userEmail).then(items => {
      this.setState({ incidents: items });
      this.setState({ num_incidents: items.length });
      this.setState({ loading: false });
    });
    console.log(this.state.incidents.length);
    // this._modalLoadingSpinnerOverLay.hide();
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
        {/* <LoadingSpinnerOverlay
          ref={component => this._modalLoadingSpinnerOverLay = component}
        /> */}
      </View>
    );
  }
}
