/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Splash from "./components/Splash";
import Allergies from "./components/Allergies";
import Lookup from "./components/Lookup";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <Lookup />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a4c639"
  },
  welcome: {
    fontSize: 50,
    color: "#ffffff",
    textAlign: "center",
    margin: 10
  }
});
