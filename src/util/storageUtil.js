import { AsyncStorage } from "react-native";

// Checks if a user if logged in
// Returns the user's email id if logged in
// Return false if no email available
checkLogin = () => {
  return new Promise(async (resolve, reject) => {
    await  AsyncStorage.getItem("email")
      .then(email => {
        if (email != null) {
          console.log("User Logged in as: ", email);
          resolve(email);
        } else {
          console.log("No User Logged In");
          resolve(false);
        }
      })
      .catch(error => {
        console.log("Err: ", error);
        reject(error);
      });
  });
};

// Gets the email as stored in the local storage
getUserEmail = () => {
  return new Promise(async (resolve, reject) => {
    await AsyncStorage.getItem("email")
      .then(email => {
        resolve(email);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// Given a user's email id it sets the "email" key in local storage
setUserEmail = async userEmail => {
  await AsyncStorage.setItem("email", userEmail).catch(error => {
    return Promise.reject(error);
  });
  await getUserEmail().then(email => console.log(email));
};

// Removes the email key at local storage
// Signifying no user logged in
removeUserEmail = async () => {
  await AsyncStorage.removeItem("email").catch(error => {
    console.log(error);
    return Promise.reject(error);
  });
};

export { checkLogin, setUserEmail, removeUserEmail };
