import React from "react";
import { AppNav } from "./navigation/Router";
import { Root } from "native-base";

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <AppNav />
      </Root>
    );
  }
}
