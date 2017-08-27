import { firebaseConfig } from "../config";
import * as fbase from "firebase";
const firebase = fbase.initializeApp(firebaseConfig);

getHeaderColor = type => {
  if (type === "fire") return "#d35400";
  else if (type === "health") return "#2980b9";
  else return "#2c3e50";
};

capitalizeFirstLetter = input => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

timeSince = date => {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};

export { getHeaderColor, capitalizeFirstLetter, firebase, timeSince };
