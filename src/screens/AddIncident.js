import React from "react";
import Expo, { ImagePicker, Location, Permissions } from "expo";
import CheckBox from "react-native-check-box";
import styles from "../assets/styles/AddIncidentStyle";
import LoginComponent from "../screens/LoginComponent";
import { NavigationActions } from "react-navigation";
import { checkLogin } from "../util/storageUtil";
import { getHeaderColor, capitalizeFirstLetter } from "../util/util";
import { firebase } from "../util/firebaseUtil";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
  TextInput,
  NetInfo,
  Alert,
  ActivityIndicator
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
  CardItem,
  Toast
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
      title: "",
      datetime: Date.now(),
      user_id: "",
      public_share: true,
      local_assistance: true,
      image: false,
      image_uri: "",
      image_base64: "",
      location: "",
      report_count: 0,
      reports: [""],
      user_email: "",
      loading : true,
      visible: true,
      isLoading : false
    };
    this.itemsRef = this.getRef().child("incidents");
    this._checkLogin();
  }
  componentDidMount() {
    this.setState({loading: false});
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

  // On Submit
  // Gets the user's location
  // updates the state with location
  // uploads the state to firebase
  _onSubmit = async () => {
    this.setState({isLoading:true});
    if (this.state.title === "") {
      Alert.alert("Title Required", "Please add a title for the post");
      this.setState({isLoading:false});
      return;
    }
    await NetInfo.isConnected.fetch().then(isConnected => {
      console.log("First, is " + (isConnected ? "online" : "offline"));
    });

    await this._getLocation()
      .then(async user_Location => {
        await this.itemsRef
          .push(this.state)
          .then(result => {
            console.log("Upload Complete");
            Toast.show({
              text: 'Your response has been recorded.',
              position: 'bottom',
              duration : 3000
            })
            this.props.navigation.dispatch(NavigationActions.back());
          })
          .catch(error => {
            console.log("Error While uploading");
            alert("Error while uploading");
          });
      })
      .catch(error => {
        Alert.alert(
          "Location error",
          "Cannot get location, enable location and try again."
        );
      });
      this.setState({isLoading:false});
  };

  // function to be used as a callback on successfull login via loginComponent
  _onLogin = email => {
    console.log("->", email);
    this.setState({ user_email: email });
    this.setState({ user_id: email.replace(".", "") });
    console.log(this.state);
  };

  //Checks if a user is logged in
  _checkLogin = async () => {
    await checkLogin()
      .then(result => {
        if (result != false) {
          this.setState({ user_email: result });
          this.setState({ user_id: result.replace(".", "") });
        }
      })
      .catch(error => {
        alert("Error: ", error);
      });
  };
  render() {
    if(this.state.loading) {
      return(
        <View style={styles.loading}>
          <Text>Loading</Text>
        </View>
      )
    }
    else {
      return (
        <Container>
          <Header
            style={{ backgroundColor: getHeaderColor(this.state.category) }}
          >
            <Button
              transparent
              onPress={ () => { this.props.navigation.goBack() } }
              >
             <Icon name='ios-arrow-back' style={{ color: "white" }}/>
           </Button>
            <Body>
              <Text
                style={{ color: "white", fontSize: 20, textAlign: "center" }}
              >
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
              <View style={styles.title}>
                <Item floatingLabel>
                  <Label>Title</Label>
                  <Input
                    onChangeText={text => {
                      this.setState({ title: text });
                    }}
                  />
                </Item>
              </View>
            </View>
            <View style={styles.comment}>
              <Item floatingLabel>
                <Label>Add any comments</Label>
                <Input
                  onChangeText={text => {
                    this.setState({ comments: text });
                  }}
                />
              </Item>
            </View>

            <View style={styles.additionOptions}>
              <Text style={styles.pickerHeader}> Upload Options </Text>
              <ListItem>
                <CheckBox
                  style={styles.checkBox}
                  isChecked={this.state.public_share}
                  onClick={() => {
                    this.setState({
                      public_share: !this.state.public_share,
                      visible: !this.state.visible
                    });
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
            {
              this.state.isLoading
              ? <View><ActivityIndicator size="large" color="#368560" /></View>
              : null
            }
          </Content>
        </Container>
      );
    }
  }
}
