# CrowdAlert Mobile Application
CrowdAlert is a cross platform mobile application that allows users to post and view incidents around them. 

## Goals
### Achieved
* Map Screen: Displays the geographical location of incidents on a Map
* Add Incident: User can add incidents along with photo and other details
* User Profile: shows all the incidents posted by the user
* Incident Screen: shows all the details about each individual incident
* Spam reporting of incidents that seem outdated or irrelevant.
* Firebase integration for user authentication via Facebook
### Pending
* Sharing on social media
* Filter incidents on the Map Screen bases on incident category

## Challenges and Future scope
* The appliaction is built using the `create-react-native-app` tool and `expo`. The advantage is that reviewing application among people becomes mush easier. Instead of downloading and installing apks for each iteration of the application, the application can be hosted in Expo and people can review it by typing in the url in the Expo client app.
* Expo also has an inbuilt wrapper for `react-native-maps`. `MapScreen.js` uses `Expo.MapView` to display incidents on Google Maps. 
* Add Incident - Users can add photo of an incident and uploading incidents. `Expo.ImagePicker` was used to select image from the gallary. CrowdAlert uses Firebase for storing data about the incident. React Native does not support File and Blob types which is required by Firebase to store images in `Firebase Storage`. I tried `react-native-fetch-blob` to fix this, but there were some dependency issues. To fix this instead of storing images in `Firebase Storage`, I converted the image into a base64 string and stored this along with other details in `Firebase Realtime Database`.
* Currently CrowdAlert only supports Facebook login. In future more social logins can be added.
* Firebase provides the functionality of executing code based on certain triggers (firebase-functions). The report spam feature works on this principle. Every time someone reports an incident the `report_count` of the incident increases and this triggers the `report` function that checks the current `report_count` and decides the post should be taken down or not. In future firebase-functions can be defined to send notifications to everyone everytime a new incident is posted.

## Other Contributions
While coding I found a very interesting tool `appr` which builds a review appliaction based on the pull request and deploys it to Expo for users to test out the application before merging the pull request. Although very usefull, the tool was limited for appliaction hosted in github. I extended the functionality for it to be compatible with gitlab also, as CrowdAlert was hosted in gitlab.
https://github.com/sidd607/appr


## Links
### GSoC 2017
https://gitlab.com/sidd607/CrowdAlert/tags/GSoC-2017
### Project Repository
https://gitlab.com/aossie/CrowdAlert
### Application hosted on Expo
https://expo.io/@sidd607/crowdalert
### Merge Requests

* MR1 - [Initial Setup](https://gitlab.com/aossie/CrowdAlert/merge_requests/1)
* MR2 - [Navigation Bar](https://gitlab.com/aossie/CrowdAlert/merge_requests/2)
* MR3 - [Map Screen to display incidents](https://gitlab.com/aossie/CrowdAlert/merge_requests/3)
* MR4 - [Home Screen](https://gitlab.com/aossie/CrowdAlert/merge_requests/4)
* MR5 - [Firebase Integration](https://gitlab.com/aossie/CrowdAlert/merge_requests/5)
* MR6 - [User Authentication via Facebook](https://gitlab.com/aossie/CrowdAlert/merge_requests/6)
* MR7 - [Firebase Function for Spam Reporting](https://gitlab.com/aossie/CrowdAlert/merge_requests/7)