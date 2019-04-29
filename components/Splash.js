/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default class Splash extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon name="allergies" size={50} color="#ffffff" />
        <Text style={styles.welcome}>allert</Text>
      </View>
    );
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
