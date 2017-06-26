import React from "react";
import { StyleSheet, Text, View, Platform, Dimensions } from "react-native";
import Expo from "expo";
import { Components } from "expo";

//Import map marker images
const road_marker = require("../assets/images/map/road_marker_100.png");
const health_marker = require("../assets/images/map/health_marker_100.png");
const fire_marker = require("../assets/images/map/fire_marker_100.png");

const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;

// latitudeDelta and longitudeDelta control the amount
// of map to be displayed, in effect controlling the Zoom
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA + ASPECT_RATIO;

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapInitialRegion: {
        latitude: 10,
        longitude: 7,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      markers: [ ]
    };
  }

  static navigationOptions = {
    header: null
  };

  // Sets the marker image based on the type of incident
  _getMarkerImage = type => {
    if (type === "fire") {
      return fire_marker;
    } else if (type === "road") {
      return road_marker;
    } else return health_marker;
  };

  // This is a dummy function that would fetch details
  // of markers from server
  _getMarkerInformation = () => {
    var tmp = [
      {
          id: 1,
          type: "fire",
          title: "Forrest Fire",
          description: "Fire is spreading",
          coordinate: {
            latitude: 10,
            longitude: 7
          }
        },
        {
          id: 2,
          type: "road",
          title: "Car Rollover",
          description: "car rolled over",
          coordinate: {
            latitude: 11,
            longitude: 8
          }
        }
    ];
    this.setState({ markers: tmp });
    //console.log("_getMarkerInformation");
    //console.log(this.state.markers);
    return tmp;
  };

  componentDidMount() {
    // Get Marker Information from the server
    this._getMarkerInformation();

    // Get user's location to render the map around the user
    navigator.geolocation.getCurrentPosition(
      position => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);
        var initalRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };
        this.setState({ mapInitialRegion: initalRegion });
      },
      error => alert("Cannot Get Location"),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
    );
  }

  render() {
    //console.log(this.state);
    return (
      <View style={{ flex: 1 }}>
        <Expo.MapView
          style={{ flex: 1 }}
          initialRegion={this.state.mapInitialRegion}
        >
          {this.state.markers.map(marker => {
            //console.log(marker);
            return (
              <Expo.MapView.Marker
                key={marker.id}
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
                image={this._getMarkerImage(marker.type)}
              />
            );
          })}
        </Expo.MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  map: {
    alignSelf: "stretch",
    flex: 1
  }
});
