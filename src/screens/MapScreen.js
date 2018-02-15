import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Dimensions,
    BackHandler,
    Alert,
    Picker,
    TouchableHighlight
} from "react-native";
import { Fab, Icon, Button } from 'native-base';
import Expo from "expo";
import {Constants, Location, Permissions, IntentLauncherAndroid} from 'expo';
import {Components} from "expo";
import * as firebase from "firebase";
import {getMarkerImage, getListCategories} from "../util/util";
const {width, height} = Dimensions.get("window");
const ASPECT_RATIO = width / height;
import Modal from 'react-native-modalbox';

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
      markers: [],
      domain:'all',
      activeFab: true,
    };

    this.itemsRef = firebase.database().ref("incidents");
  }

  static navigationOptions = {
    header: null
  };

  // Listening for changes in Incidents
  listenForItems(itemsRef) {
    console.log("Listening for Items");
    itemsRef.on("value", snap => {
      // get children as an array
      var items = [];
      snap.forEach(child => {
        if (child.val().visible == true) {
          items.push({
            title: child.val().title,
            _key: child.key,
            value: child.val()
          });
        }
      });

      this.setState({ markers: items });
    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
      const {status} = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
          Alert.alert('', 'Permission to access location was denied', [
              {
                  text: 'Close the App',
                  onPress: () => BackHandler.exitApp()
              }
          ]);
      }

      let permission = await Location.getProviderStatusAsync();
      if (!permission.locationServicesEnabled) {
          Alert.alert('', 'Please turn ON your GPS', [
              {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel'
              },
              {
                  text: 'Location settings',
                  onPress: ()=>{
                      // BackHandler.exitApp();
                      IntentLauncherAndroid.startActivityAsync(
                        IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
                      );
                  }
              }
          ]);
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({location});
      var initalRegion = {
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
      };
      this.setState({mapInitialRegion: initalRegion});
  };
    setFab(state){
        this.setState({activeFab: state});
    }
    setDomain(category) {
      this.setState({domain: category});
    }

  render() {
      var self=this;
      var markers=this.state.markers.filter(function(item){
           if(self.state.domain==='all'){
               return true;
           }
           else{
               return item.value.category===self.state.domain;
           }
       });
       var categories=getListCategories();

    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <Expo.MapView
          region={this.state.mapInitialRegion}
          showUserLocation={true}
          provider="google"
          showsMyLocationButton={true}
          style={styles.map}
        >
          <Expo.MapView.Marker
            coordinate={{
              latitude: this.state.mapInitialRegion.latitude,
              longitude: this.state.mapInitialRegion.longitude
            }}
          />
          {markers.map(marker => {
            return (
              <Expo.MapView.Marker
                key={marker._key}
                coordinate={{
                  latitude: marker.value.location.coords.latitude,
                  longitude: marker.value.location.coords.longitude
                }}
                title={marker.value.title}
                description={marker.value.comments}
                image={getMarkerImage(marker.value.category)}
                onCalloutPress={() => {
                  var incidentDetails = {
                    key: marker._key,
                    value: marker.value
                  };
                  navigate("Incident", { data: incidentDetails });
                }}
              />
            );
          })}
        </Expo.MapView>
        {
            this.state.activeFab &&
            <Fab
                active={this.state.activeFab}
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#f45d3f' }}
                position="bottomRight"
                onPress={() => {
                    // this.refs.modal1.open();
                    this.setFab(!this.state.activeFab);
                }}>
                <Icon name="funnel" />
                {categories.map(item => {
                    return(
                        <Button style={{ backgroundColor: 'white' }} key={item.category}>
                          <Text>{item.title}</Text>
                        </Button>
                    );
                })}
            </Fab>
        }
        <Modal
         style={{ justifyContent: 'center', alignItems: 'center' }}
         ref={"modal1"}
         onClosed={()=>{this.setFab(!this.state.activeFab)}}
         backButtonClose={true}>
         {categories.map(item => {
             return(
                <TouchableHighlight
                    key={item.category}
                    onPress={() => {
                        this.setDomain(item.category);
                        this.refs.modal1.close()
                    }}>
                    <Text>{item.title}</Text>
                </TouchableHighlight>
             );
         })}
       </Modal>
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
    flex: 1
  }
});
