import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: "#cecece",
    alignItems: "center"
  },
  rowContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  highlight: {},
  menuButton: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  menuImage: {
    height: 100,
    width: 100
  },
  menuText: {}
});

export default styles;
