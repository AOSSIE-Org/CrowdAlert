const road_marker = require("../assets/images/map/road_marker_100.png");
const health_marker = require("../assets/images/map/health_marker_100.png");
const fire_marker = require("../assets/images/map/fire_marker_100.png");
const flood_marker = require("../assets/images/floods_marker_100.png");
const electric_marker = require("../assets/images/electric_marker_100.png");

const categories = [
  {
    title: "Road",
    category: "road",
    image: road_marker
  },
  {
    title: "Fire",
    category: "fire",
    image: fire_marker
  },
  {
    title: "Health",
    category: "health",
    image: health_marker
  },
  {
    title: "Floods",
    category: "flood",
    image: flood_marker
  },
  {
    title: "Electricity Blackout",
    category: "electric",
    image: electric_marker
  }
];

getMarkerImage = category => {
  image_uri = "../assets/images/map/" + category + "_marker_100.png";
  var image = require(image_uri);
  return image;
};

export { categories };
