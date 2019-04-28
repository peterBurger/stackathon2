import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView
} from "react-native";

// For use in render() below
// const allergens = [
//   "Milk",
//   "Eggs",
//   "Fish",
//   "Crustaceans",
//   "Treenuts",
//   "Peanuts",
//   "Wheat",
//   "Soybeans",
//   "Sesame"
// ];

export default class Allergies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Milk: false,
      Eggs: false,
      Fish: false,
      Crustaceans: false,
      Treenuts: false,
      Peanuts: false,
      Wheat: false,
      Soybeans: false,
      Sesame: false
    };
  }

  onPress = allergen => {
    this.setState(
      {
        [allergen]: !this.state[allergen]
      },
      function() {
        // console.log("after: ", this.state);
      }
    );
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.heading}>
          <Text style={styles.headingText}>I am allergic to...</Text>
        </View>
        <View style={styles.allAllergens}>
          {/* Can't use due to limiations for images (source cannot be dynamic). See https://facebook.github.io/react-native/docs/image
            {allergens.map(allergen => {
            let icon = this.state[allergen]
              ? `../assets/icons/${allergen.toLowerCase()}_amber_200x200.jpg`
              : `../assets/icons/${allergen.toLowerCase()}_grey_200x200.jpg`;

            return (
              <TouchableOpacity
                key={allergen}
                style={styles.singleAllergen}
                onPress={() => this.onPress(allergen)}
              >
                <Image style={styles.allergenImg} source={require(icon)} />
                <Text
                  style={
                    this.state[allergen]
                      ? styles.allergenTxtSelected
                      : styles.allergenTxt
                  }
                >
                  {allergen}
                </Text>
              </TouchableOpacity>
            );
          })} */}
          <TouchableOpacity
            style={styles.singleAllergen}
            onPress={() => this.onPress("Milk")}
          >
            <Image
              style={styles.allergenImg}
              source={
                this.state.Milk
                  ? require("../assets/icons/milk_amber_200x200.jpg")
                  : require("../assets/icons/milk_grey_200x200.jpg")
              }
            />
            <Text
              style={
                this.state.Milk
                  ? styles.allergenTxtSelected
                  : styles.allergenTxt
              }
            >
              Milk
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.singleAllergen}
            onPress={() => this.onPress("Eggs")}
          >
            <Image
              style={styles.allergenImg}
              source={
                this.state.Eggs
                  ? require("../assets/icons/eggs_amber_200x200.jpg")
                  : require("../assets/icons/eggs_grey_200x200.jpg")
              }
            />
            <Text
              style={
                this.state.Eggs
                  ? styles.allergenTxtSelected
                  : styles.allergenTxt
              }
            >
              Eggs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.singleAllergen}
            onPress={() => this.onPress("Fish")}
          >
            <Image
              style={styles.allergenImg}
              source={
                this.state.Fish
                  ? require("../assets/icons/fish_amber_200x200.jpg")
                  : require("../assets/icons/fish_grey_200x200.jpg")
              }
            />
            <Text
              style={
                this.state.Fish
                  ? styles.allergenTxtSelected
                  : styles.allergenTxt
              }
            >
              Fish
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.singleAllergen}
            onPress={() => this.onPress("Crustaceans")}
          >
            <Image
              style={styles.allergenImg}
              source={
                this.state.Crustaceans
                  ? require("../assets/icons/crustaceans_amber_200x200.jpg")
                  : require("../assets/icons/crustaceans_grey_200x200.jpg")
              }
            />
            <Text
              style={
                this.state.Crustaceans
                  ? styles.allergenTxtSelected
                  : styles.allergenTxt
              }
            >
              Crustaceans
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.singleAllergen}
            onPress={() => this.onPress("Treenuts")}
          >
            <Image
              style={styles.allergenImg}
              source={
                this.state.Treenuts
                  ? require("../assets/icons/treenuts_amber_200x200.jpg")
                  : require("../assets/icons/treenuts_grey_200x200.jpg")
              }
            />
            <Text
              style={
                this.state.Treenuts
                  ? styles.allergenTxtSelected
                  : styles.allergenTxt
              }
            >
              Treenuts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.singleAllergen}
            onPress={() => this.onPress("Peanuts")}
          >
            <Image
              style={styles.allergenImg}
              source={
                this.state.Peanuts
                  ? require("../assets/icons/peanuts_amber_200x200.jpg")
                  : require("../assets/icons/peanuts_grey_200x200.jpg")
              }
            />
            <Text
              style={
                this.state.Peanuts
                  ? styles.allergenTxtSelected
                  : styles.allergenTxt
              }
            >
              Peanuts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.singleAllergen}
            onPress={() => this.onPress("Wheat")}
          >
            <Image
              style={styles.allergenImg}
              source={
                this.state.Wheat
                  ? require("../assets/icons/wheat_amber_200x200.jpg")
                  : require("../assets/icons/wheat_grey_200x200.jpg")
              }
            />
            <Text
              style={
                this.state.Wheat
                  ? styles.allergenTxtSelected
                  : styles.allergenTxt
              }
            >
              Wheat
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.singleAllergen}
            onPress={() => this.onPress("Soybeans")}
          >
            <Image
              style={styles.allergenImg}
              source={
                this.state.Soybeans
                  ? require("../assets/icons/soybeans_amber_200x200.jpg")
                  : require("../assets/icons/soybeans_grey_200x200.jpg")
              }
            />
            <Text
              style={
                this.state.Soybeans
                  ? styles.allergenTxtSelected
                  : styles.allergenTxt
              }
            >
              Soybeans
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.singleAllergen}
            onPress={() => this.onPress("Sesame")}
          >
            <Image
              style={styles.allergenImg}
              source={
                this.state.Sesame
                  ? require("../assets/icons/sesame_amber_200x200.jpg")
                  : require("../assets/icons/sesame_grey_200x200.jpg")
              }
            />
            <Text
              style={
                this.state.Sesame
                  ? styles.allergenTxtSelected
                  : styles.allergenTxt
              }
            >
              Sesame
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    backgroundColor: "#bfd774",
    height: 100,
    justifyContent: "flex-end",
    paddingLeft: 10,
    paddingBottom: 10
  },
  headingText: {
    color: "#ffffff",
    fontSize: 30
  },
  allAllergens: {
    backgroundColor: "white",
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
    borderColor: "white",
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
  }
});

AppRegistry.registerComponent("App", () => App);
