import Expo from "expo";
import * as firebase from "firebase";
import { addUser } from "../util/firebaseUtil";
import { facebookConfig } from "../config";

loginFb = async () => {
  return new Promise(async (resolve, reject) => {
    const { type, token } = await Expo.Facebook
      .logInWithReadPermissionsAsync(facebookConfig.facebookAppId, {
        permissions: ["public_profile", "email"]
      })
      .catch(error => {
        console.log(error);
      });
    if (type === "success") {
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`
      );
      const tmp = await response.json();
      const provider = firebase.auth.FacebookAuthProvider;
      const credential = provider.credential(token);
      //Login to firebase
      await firebase
        .auth()
        .signInWithCredential(credential)
        .catch(error => {
          console.log("Err: ", error.message);
          reject(error.message);
        })
        .then(user => {
          console.log("success user");
          console.log(tmp);
          resolve(tmp);
        });
    } else {
      console.log("User cancelled");
    }
  });
};

export { loginFb };
