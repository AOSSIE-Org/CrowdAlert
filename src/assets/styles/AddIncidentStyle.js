// Style definition for AddIncident Screen

import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    paddingTop: 10
  },
  rowContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    flexDirection: "row"
  },
  addPhoto: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
    borderRightWidth: 2,
    borderRightColor: "black"
  },
  title: {
    flex: 3,
    paddingLeft: 10
  },
  comment: {
    padding: 10
  },
  commentInput: {
    height: 50,
    marginBottom: 20,
    paddingLeft: 10,
    paddingHorizontal: 10
  },
  subCategoryPicker: {
    justifyContent: "flex-start",
    marginLeft: 5,
    marginTop: 20
  },
  pickerHeader: {
    fontWeight: "bold",
    marginLeft: 10
  },
  picker: {
    marginLeft: 20
  },
  additionOptions: {
    marginLeft: 5,
    paddingVertical: 10
  },
  checkBox: {
    marginLeft: 10
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    width: "100%"
  }
});

export default styles;
