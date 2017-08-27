// Screen for displaying individual incident

import React from "react";
import { StyleSheet, Text, View, Platform, Image, Modal } from "react-native";
import Expo from "expo";
import { getHeaderColor, capitalizeFirstLetter } from "../util/util";
import {
  Container,
  Header,
  Body,
  Card,
  Content,
  CardItem,
  Right,
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
      incident_key: params.data.key,
    };
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
                  {" "}{this.state.incident.category}{" "}
                </Text>
                <Text note> {this.state.incident.sub_category} </Text>
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
              <Button danger rounded block onPress={this._reportIncident}>
                <Text style={{ color: "white" }}>
                  Report
                </Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
