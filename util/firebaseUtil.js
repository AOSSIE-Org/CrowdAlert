import { firebase } from "../util/util";

// Adds users data to the 'users' collection
addUser = async userDetails => {
  const userKey = userDetails.email.replace(".", "");
  var userRef = firebase.database().ref("users/" + userKey);
  userRef.on("value", function(snapshot) {
    if (snapshot.exists()) {
      console.log("User Exists");
    } else {
      // Adding User to 'users' collection
      firebase
        .database()
        .ref("users")
        .child(userKey)
        .set(userDetails)
        .catch(error => console.log(error));
    }
  });
};

// Queries all the incidents posted by a user
// user_id is defined by the email id
query = async user_id => {
  console.log("input", user_id);
  const user_key = user_id.replace(".", "");
  return new Promise((resolve, reject) => {
    var incident_ref = firebase.database().ref("incidents/");
    incident_ref
      .orderByChild("user_id")
      .equalTo(user_key)
      .on("value", function(snapshot) {
        var items = [];
        snapshot.forEach(item => {
          items.push({
            key: item.key,
            value: item.val()
          });
        });
        resolve(items);
      });
  });
};

// Given an incident_id it increments the report report_count
// TODO: Get reason from the user who reported it
report = async incident_id => {
  databaseRef = firebase
    .database()
    .ref("incidents")
    .child(incident_id)
    .child("report_count");
  await databaseRef
    .transaction(function(report_count) {
      return report_count + 1;
    })
    .catch(error => {
      console.log(error);
    });
};
export { report, addUser, query };
