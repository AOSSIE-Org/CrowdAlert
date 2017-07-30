import React from "react";
import Expo, { ImagePicker, Location, Permissions } from "expo";
import Toast from "react-native-smart-loading-spinner-overlay";
import LoadingSpinnerOverlay from "react-native-smart-loading-spinner-overlay";
import CheckBox from "react-native-check-box";
import styles from "../assets/styles/AddIncidentStyle";
import { NavigationActions } from "react-navigation";
import { getHeaderColor, capitalizeFirstLetter } from "../util/util";
import {firebaseConfig} from "../config";
import * as firebase from 'firebase';
firebase.initializeApp(firebaseConfig)
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
  TextInput,
  NetInfo
} from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Icon,
  Input,
  Label,
  Header,
  Body,
  Left,
  Button,
  Picker,
  ListItem,
  Card,
  CardItem
} from "native-base";

export default class AddIncident extends React.Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    console.ignoredYellowBox = ["Setting a timer"];
    super(props);
    this.state = {
      category: params.type,
      comments: "",
      sub_category: "key1",
      datetime: Date.now(),
      user_id: "",
      public_share: true,
      local_assistance: true,
      image: false,
      image_uri: "",
      image_base64: "",
      location: ""
    };
    this.itemsRef = this.getRef().child("incidents");
  }

  getRef = () => {
    return firebase.database().ref();
  };

  static navigationOptions = {
    header: null
  };


  // Ger user location 
  _getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    await Location.getCurrentPositionAsync({})
      .then(coords => {
        console.log("Users Location: ", coords);
        this.setState({ location: coords });
        return Promise.resolve(coords);
      })
      .catch(error => {
        console.log("Error: ", error);
        alert(error);
        return Promise.reject(error);
      });
  };

  // Pick image from gallery
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      base64: true,
      quality: 0.5
    });
    if (!result.cancelled) {
      this.setState({ image_uri: result.uri });
      this.setState({ image_base64: result.base64 });
      this.setState({ image: true });
      console.log(this.state.image_uri);
    }
  };

  _onSubmit = async () => {
    this._modalLoadingSpinnerOverLay.show();
    await NetInfo.isConnected.fetch().then(isConnected => {
      console.log("First, is " + (isConnected ? "online" : "offline"));
    });

    await this._getLocation()
      .then(async user_Location => {
        await this.itemsRef
          .push(this.state)
          .then(result => {
            console.log("Upload Complete");
            this._modalLoadingSpinnerOverLay.hide();
            this.props.navigation.dispatch(NavigationActions.back());
          })
          .catch(error => {
            console.log("Error While uploading");
            alert("Error while uploading");
          });
      })
      .catch(error => {});

    this._modalLoadingSpinnerOverLay.hide();
  };


  render() {
    return (
      <Container>
        <Header
          style={{ backgroundColor: getHeaderColor(this.state.category) }}
        >
          <Body>
            <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              Report Incident:
              {" "}
              {capitalizeFirstLetter(this.state.category)}
            </Text>
          </Body>
        </Header>
        <Content>
          {this.state.image &&
            <Card>
              <CardItem cardBody>
                <Image
                  source={{
                    uri: "data:image/jpeg;base64, " + this.state.image_base64
                  }}
                  style={{ height: 200, width: null, flex: 1 }}
                />
              </CardItem>
            </Card>}
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={this._pickImage}>
              <View style={styles.addPhoto}>
                <Icon name="camera" style={{ fontSize: 50 }} />
                {this.state.image
                  ? <Text> Update Photo </Text>
                  : <Text> Add Photo </Text>}
              </View>
            </TouchableOpacity>
            <View style={styles.commentSection}>
              <Item floatingLabel>
                <Label>Add Any Comments</Label>
                <Input
                  onChangeText={text => {
                    this.setState({ comments: text });
                  }}
                />
              </Item>
            </View>
          </View>
          <View style={styles.subCategoryPicker}>
            <Text style={styles.pickerHeader}> Select a sub Category </Text>
            <View style={styles.picker}>
              <Picker
                iosHeader="Select a sub Category"
                mode="dropdown"
                selectedValue={this.state.sub_category}
                onValueChange={item => {
                  this.setState({ sub_category: item });
                }}
              > 
                {
                  // TODO: get categories based on incident category
                }
                <Picker.Item label="Category1" value="Category1" />
                <Picker.Item label="Category2" value="Category2" />
                <Picker.Item label="Category3" value="Category3" />

              </Picker>
            </View>
          </View>
          <View style={styles.additionOptions}>
            <Text style={styles.pickerHeader}> Upload Options </Text>
            <ListItem>
              <CheckBox
                style={styles.checkBox}
                isChecked={this.state.public_share}
                onClick={() => {
                  this.setState({ public_share: !this.state.public_share });
                }}
              />
              <Body style={{ marginLeft: 10 }}>
                <Text>Share Publicly</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox
                style={styles.checkBox}
                isChecked={this.state.local_assistance}
                onClick={() => {
                  this.setState({ public_share: !this.state.public_share });
                }}
              />
              <Body style={{ marginLeft: 10 }}>
                <Text>Get Local Assistance</Text>
              </Body>
            </ListItem>
          </View>

          <Button
            block
            style={{ marginLeft: 20, marginRight: 20, marginBottom: 30 }}
            onPress={this._onSubmit}
          >
            <Text style={{ color: "white" }}>Submit</Text>
          </Button>
          <LoadingSpinnerOverlay
            ref={component => this._modalLoadingSpinnerOverLay = component}
          />
        </Content>
      </Container>
    );
  }
}
