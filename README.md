# Aossie | CrowdAlert
[![pipeline status](https://gitlab.com/sidd607/CrowdAlert/badges/master/pipeline.svg)](https://gitlab.com/sidd607/CrowdAlert/commits/master) [![Build Status](https://www.bitrise.io/app/f51d58447a3a13d0/status.svg?token=TuJblCfYd_IHDgT-INLuKA&branch=master)](https://www.bitrise.io/app/f51d58447a3a13d0)

CrowdAlert is a crowdsourced application for reporting and viewing incidents aound the world.

## NOTE
This repository is **deprecated** and is no longer being maintained. Please follow our new repository [Crowd Alert Mobile](https://gitlab.com/aossie/CrowdAlert-Mobile) for further development

The current Crowd Alert app was in **expo** which limited its growth. With no native code integration and restricted library support it could not be developed further and therefore, it is not ready for production. 

You can find the new repositories at the following link: <br>
- Mobile: [Crowd Alert Mobile](https://gitlab.com/aossie/CrowdAlert-Mobile) <br>
- Web: [Crowd Alert Web](https://gitlab.com/aossie/CrowdAlert-Web)      

## Getting Started
The project is built in React Native using the [Create React Native App](https://facebook.github.io/react-native/blog/2017/03/13/introducing-create-react-native-app.html) tool and [Expo](https://expo.io/). Make sure you have Node v6 or later installed. No Xcode or Android Studio installation is required.

### NPM Dependencies
Install node package dependencies
```
$ npm install
```
### Firebase Settings
CrowdAlert uses firebase for backend services. Create a project in firebase and add the API Key and Database URL of your project in the `src/config.js` file.

### Firebase Tools
The project uses [firebase functions](https://firebase.google.com/docs/functions/get-started) to execute code based on various triggers. Install and login to firebase to edit and deploy the functions.
```
$ npm install -g firebase-tools
$ firebase login
```
Navigate to the firebase functions and deploy.
```
$ cd firebase-functions
$ firebase deploy --only functions
```
### Google Maps
CrowdAlert uses Google Maps for mapping out incidents. No setup is required for use within the Expo app or standalone IOS app. For instructions on how to configure Maps for deployment as a standalone app on Android, Click [HERE](https://docs.expo.io/versions/latest/sdk/map-view.html)

## Running the Application
```
$ cd <project-dir>
$ npm start
```
Install the [Expo app](https://expo.io/) on your iOS or Android phone, and use the QR code in the terminal to open your app. 
To build IPAs and APKs Expo's [Standalone App build](https://docs.expo.io/versions/v13.0.0/guides/building-standalone-apps.html) service can be used.
