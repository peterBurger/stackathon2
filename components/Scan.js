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
import { appId, appKey } from "../keys";

export default class Scan extends Component {
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
      // if (getSavedAllergens) {
      //   this.setState({
      //     savedAllergens: JSON.parse(getSavedAllergens)
      //   });
      // }
      this.setState({
        savedAllergens: JSON.parse(getSavedAllergens)
      });
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

    this.setState({
      hasAllergens: positiveAllergens
    });
  };

  searchUPC = async upc => {
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

      const getSavedAllergens = await AsyncStorage.getItem("selectedAllergens");

      this.setState({
        savedAllergens: JSON.parse(getSavedAllergens),
        upc,
        image,
        brand,
        label,
        ingredients,
        hasAllergens: []
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
          <Text style={styles.headingText}>Food scanner</Text>
        </View>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder=" || Scan a UPC || "
            onChangeText={upc => this.setState({ upc })}
            onSubmitEditing={() => this.searchUPC(this.state.upc)}
            key
          />
          <Icon
            name="search"
            size={20}
            color="#bfd774"
            onPress={() => this.searchUPC(this.state.upc)}
          />
        </View>
        <View style={styles.upcInfo}>
          <View style={styles.upcImageContainer}>
            {this.state.image ? (
              <Image
                style={styles.upcImage}
                source={{
                  uri: this.state.image
                }}
              />
            ) : (
              <Icon name="utensils" size={150} color="#d3d3d3" />
            )}
          </View>
          <Text style={styles.upcProp}>NAME</Text>
          <Text style={styles.upcValue}>{this.state.label}</Text>
          <Text style={styles.upcProp}>BRAND</Text>
          <Text style={styles.upcValue}>{this.state.brand}</Text>
          <Text style={styles.upcProp}>INGREDIENTS</Text>
          <Text style={styles.upcValue}>{this.state.ingredients}</Text>
          <Text style={styles.upcProp}>ALLERGENS</Text>
          {this.state.savedAllergens.map(allergen => {
            if (this.state.hasAllergens.includes(allergen)) {
              return (
                <Text style={styles.upcValue} key={allergen}>
                  <Icon name="exclamation-circle" size={15} color="#ff0800" />{" "}
                  {allergen}
                </Text>
              );
            }
          })}
        </View>
        <View style={styles.allergenCheck} />
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
    fontSize: 25
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingLeft: 20,
    paddingBottom: 50,
    paddingTop: 30
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#ffffff",
    fontSize: 20,
    color: "#000000"
  },
  upcInfo: {
    flex: 1,
    flexDirection: "column"
  },
  upcImageContainer: {
    alignItems: "center",
    paddingBottom: 50
  },
  upcImage: {
    height: 100,
    width: 100
  },
  upcProp: {
    fontSize: 15,
    color: "#d3d3d3",
    paddingLeft: 20,
    paddingBottom: 5
  },
  upcValue: {
    fontSize: 20,
    color: "#000000",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15
  }
});

AppRegistry.registerComponent("App", () => App);
