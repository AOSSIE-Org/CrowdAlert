import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Image } from 'react-native';
import { Button } from 'native-base';

const SCREEN_WIDTH = Dimensions.get('window').width - 40;
const data = [
  {
    text: 'Welcome to CrowdAlert!',
    color: '#00796B',
    screen: require('../assets/images/screenshots/screen_1.png')
  },
  {
    text: 'To get started, first Log-in into the Application',
    color: '#8e44ad',
    screen: require('../assets/images/screenshots/screen_2.png')
  },
  {
    text: 'You can select your Desired Location by just navigating through the Map',
    color: '#37474F',
    screen: require('../assets/images/screenshots/screen_3.png')
  },
  {
    text: 'To report an Incident, just select anyone category, fill up the form and its done!',
    color: '#2980b9',
    screen: require('../assets/images/screenshots/screen_4.png')
  },
  {
    text: 'You can see, share and delete your Reported Incident from your Profile',
    color: '#2980b9',
    screen: require('../assets/images/screenshots/screen_5.png')
  }
];


class Slides extends Component {
  renderSlides() {
    return data.map((slide) => {
      return (
        <View key={slide.text} style={[styles.slideStyle]}>
          <Image
            style={styles.imageStyle}
            source={slide.screen}
            resizeMode="contain"
          />
          <Text style={styles.textStyle}>{slide.text}</Text>
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView horizontal style={{ flex: 1 }} pagingEnabled>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  imageStyle: {
    flex: 6,
    width: 2*SCREEN_WIDTH/3,
    height: null,
		marginTop: 20,
  },
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
    marginBottom: 30
  },
  buttonStyle: {
    backgroundColor: '#1b2226',
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30
  },
};

export default Slides;
