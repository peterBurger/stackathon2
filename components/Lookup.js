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
      ingredients: ""
    };
  }

  async componentDidMount() {
    try {
      const getSavedAllergens = await AsyncStorage.getItem("selectedAllergens");
      if (getSavedAllergens) {
        this.setState({
          savedAllergens: JSON.parse(getSavedAllergens)
        });
        console.log(this.state);
      }
    } catch (error) {
      console.error(error);
    }
  }

  searchUPC = async upc => {
    // 8850539240352
    // 074822706594
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

      // Secondary API request to get allergen label info
      const postHeaders = {
        "Content-Type": "application/json"
      }

      const jsonBody = {
        "ingredients": [
          {
            "foodId": foodId
          }
        ]
      }

      const allergenLabels = await axios.post(
        `https://api.edamam.com/api/food-database/nutrients?app_id=${appId}&app_key=${appKey}`,
        jsonBody, postHeaders
      );

      console.log("cautions: ", allergenLabels.data.cautions, "healthLabels: ", allergenLabels.data.healthLabels);

    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.heading}>
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
        {/* <View>
          <Image source={require(this.state.image)} />
          <Text>{}</Text>
          <Text>{}</Text>
          <Text>{}</Text>
          <Text>{}</Text>
        </View> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    backgroundColor: "#bfd774",
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
  allAllergens: {
    backgroundColor: "#ffffff",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1
  },
  singleAllergen: {
    margin: 5,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center"
  },
  allergenImg: {
    width: 100,
    height: 100,
    borderWidth: 1.5,
    borderColor: "#ffffff",
    borderRadius: 50
  },
  allergenTxt: {
    marginTop: 5,
    textAlign: "center",
    color: "#e8e8e8",
    fontSize: 20
  },
  allergenTxtSelected: {
    marginTop: 5,
    textAlign: "center",
    color: "#ebbf75",
    fontSize: 20
  },
  saveContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: 20
  },
  savedButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
    height: 60,
    borderRadius: 5
  },
  saveChangesButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a4c639",
    height: 60,
    borderRadius: 5
  },
  saveText: {
    color: "#ffffff",
    fontSize: 20
  }
});

AppRegistry.registerComponent("App", () => App);
