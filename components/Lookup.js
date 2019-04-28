/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

const appKey = "a2ba1fd53d897ac8fb0a84cb484e98ee";
const appId = "34041e6c";

export default class Lookup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedAllergens: [],
      upc: "",
      image: "",
      brand: "",
      label: "",
      ingredients: "",
      hasAllergens: []
    };
  }

  async componentDidMount() {
    try {
      const getSavedAllergens = await AsyncStorage.getItem("selectedAllergens");
      if (getSavedAllergens) {
        this.setState({
          savedAllergens: JSON.parse(getSavedAllergens)
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  allergenCheck = healthLabels => {
    let healthLabelstoString = healthLabels.join();
    let positiveAllergens = [];

    this.state.savedAllergens.forEach(allergen => {
      if (healthLabelstoString.indexOf(allergen.toUpperCase()) < 0) {
        positiveAllergens.push(allergen);
      }
    });

    this.setState(
      {
        hasAllergens: positiveAllergens
      },
      function() {
        console.log("newState: ", this.state);
      }
    );
  };

  searchUPC = async upc => {
    // 8850539240352 Red Curry Paste > no interactions
    // 074822706594 Peanut Butter > peanuts
    // 040000002376 M&M minis > milk
    // 033617000460 Wasa crackers > wheat, gluten
    try {
      // API request to get basic upc info but more impotantly 'foodId'
      const upcInfo = await axios.get(
        `https://api.edamam.com/api/food-database/parser?upc=${upc}&app_id=${appId}&app_key=${appKey}`
      );

      const foodId = upcInfo.data.hints[0].food.foodId;
      const image = upcInfo.data.hints[0].food.image;
      const brand = upcInfo.data.hints[0].food.brand;
      const label = upcInfo.data.hints[0].food.label;
      const ingredients = upcInfo.data.hints[0].food.foodContentsLabel;

      this.setState({
        upc,
        image,
        brand,
        label,
        ingredients
      });

      // Secondary API request to get allergen label info
      const postHeaders = {
        "Content-Type": "application/json"
      };

      const jsonBody = {
        ingredients: [
          {
            foodId
          }
        ]
      };

      const allergenLabels = await axios.post(
        `https://api.edamam.com/api/food-database/nutrients?app_id=${appId}&app_key=${appKey}`,
        jsonBody,
        postHeaders
      );

      this.allergenCheck(allergenLabels.data.healthLabels);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <View
          style={
            this.state.hasAllergens.length > 0
              ? styles.headingRed
              : styles.headingGreen
          }
        >
          <Text style={styles.headingText}>UPC Lookup</Text>
        </View>
        <View style={styles.searchSection}>
          <Icon
            style={styles.searchIcon}
            name="search"
            size={20}
            color="#000"
            onPress={() => this.searchUPC(this.state.upc)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter UPC..."
            onChangeText={upc => this.setState({ upc })}
            onSubmitEditing={() => this.searchUPC(this.state.upc)}
            key
          />
        </View>
        <View>
          {this.state.image ? (
            <Image
              style={styles.image}
              source={{
                uri: this.state.image
              }}
            />
          ) : (
            <Icon name="utensils" size={20} color="#000" />
          )}
          <Text>UPC: {this.state.upc}</Text>
          <Text>Name: {this.state.label}</Text>
          <Text>Brand: {this.state.brand}</Text>
          <Text>Ingredients: {this.state.ingredients}</Text>
          <Text>{this.state.hasAllergens}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headingGreen: {
    backgroundColor: "#bfd774",
    height: 100,
    justifyContent: "flex-end",
    paddingLeft: 20,
    paddingBottom: 10
  },
  headingRed: {
    backgroundColor: "#ff0800",
    height: 100,
    justifyContent: "flex-end",
    paddingLeft: 20,
    paddingBottom: 10
  },
  headingText: {
    color: "#ffffff",
    fontSize: 30
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  searchIcon: {
    padding: 10
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242"
  },
  image: {
    width: 100,
    height: 100
  }
});

AppRegistry.registerComponent("App", () => App);
