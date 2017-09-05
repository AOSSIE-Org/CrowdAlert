// Import all the Images for each category
const road_marker = require("../assets/images/road_marker_100.png");
const health_marker = require("../assets/images/health_marker_100.png");
const fire_marker = require("../assets/images/fire_marker_100.png");
const flood_marker = require("../assets/images/floods_marker_100.png");
const electric_marker = require("../assets/images/electric_marker_100.png");

// Defing properties for the categories of incidents
const categories = {
  road: {
    title: "Road",
    category: "road",
    image: road_marker,
    color: "#2c3e50"
  },
  fire: {
    title: "Fire",
    category: "fire",
    image: fire_marker,
    color: "#d35400"
  },
  health: {
    title: "Health",
    category: "health",
    image: health_marker,
    color: "#2980b9"
  },
  flood: {
    title: "Floods",
    category: "flood",
    image: flood_marker,
    color: "#2980b9"
  },
  electric: {
    title: "Electricity Blackout",
    category: "electric",
    image: electric_marker,
    color: "#2ecc71"
  }
};

// Get image for the given category
getMarkerImage = category => {
  return categories[category].image;
};

// Get header color for the given category
getHeaderColor = type => {
  return categories[type].color;
};

// Generates an Array with all the properties of categories
// for rendering in Home Page
getListCategories = () => {
  var res = [];
  for (var i in categories) {
    res.push(categories[i]);
  }
  return res;
};

// Capitalize first letter of a string
capitalizeFirstLetter = input => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

// Get relative time
// example: 19 hrs ago | 3 mins ago
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

export {
  getHeaderColor,
  capitalizeFirstLetter,
  timeSince,
  categories,
  getMarkerImage,
  getListCategories
};
