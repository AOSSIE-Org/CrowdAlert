import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
  ListView
} from "react-native";
import Expo from "expo";
import { Content, Thumbnail } from "native-base";
import { getListCategories } from "../util/util";
export default class HomeMenuComponent extends React.Component {
  constructor(props) {
    super(props);
    var dataSource = [];
    var categories = getListCategories();
    while (categories.length) {
      dataSource.push(categories.splice(0, 3));
    }
    this.state = {
      categories: dataSource
    };
  }

  render() {
    console.log(this.state.categories);
    return (
      <Content>
        {this.state.categories.map(row => {
          return (
            <View style={styles.rowContainer}>
              {row.map(rowItem => {
                console.log(rowItem);
                return (
                  <TouchableOpacity
                    key={rowItem.category}
                    onPress={() => {
                      this.props.onNavigate(rowItem.category);
                    }}
                  >
                    <View style={styles.rowItem}>
                      <Thumbnail square large source={rowItem.image} />
                      <Text> {rowItem.title} </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}

      </Content>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    padding: 20,
    flexDirection: "row",
    height: 150,
    justifyContent: "space-around",
    alignItems: "center"
  },
  rowItem: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  }
});
