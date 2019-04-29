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
import AsyncStorage from "@react-native-community/async-storage";

// For use in render() below
// const allergens = [
//   "Milk",
//   "Egg",
//   "Fish",
//   "Shellfish",
//   "Tree_nut",
//   "Peanut",
//   "Wheat",
//   "Soy",
//   "Sesame"
// ];

export default class Allergies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Milk: false,
      Egg: false,
      Fish: false,
      Shellfish: false,
      Tree_nut: false,
      Peanut: false,
      Wheat: false,
      Gluten: false,
      Soy: false,
      Sesame: false,
      saved: true
    };
  }

  async componentDidMount() {
    const getSavedAllergens = await AsyncStorage.getItem("selectedAllergens");
    if (getSavedAllergens) {
      JSON.parse(getSavedAllergens).forEach(allergen => {
        this.setState({
          [allergen]: true
        });
      });
    }
    this.props.navigation.navigate("App");
  }

  onPress = allergen => {
    this.setState({
      [allergen]: !this.state[allergen],
      saved: false
    });
  };

  onSave = async () => {
    try {
      const selectedAllergens = Object.keys(this.state).filter(allergen => {
        if (this.state[allergen]) return allergen;
      });
      if (selectedAllergens)
        await AsyncStorage.setItem(
          "selectedAllergens",
          JSON.stringify(selectedAllergens)
        );
      this.setState({ saved: true });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Your allergy profile</Text>
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
            onPress={() => this.onPress("Egg")}
          >
            <Image
              style={styles.allergenImg}
              source={
                this.state.Egg
                  ? require("../assets/icons/eggs_amber_200x200.jpg")
                  : require("../assets/icons/eggs_grey_200x200.jpg")
              }
            />
            <Text
              style={
                this.state.Egg ? styles.allergenTxtSelected : styles.allergenTxt
              }
            >
              Egg
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
            onPress={() => this.onPress("Shellfish")}
          >
            <Image
              style={styles.allergenImg}
              source={
                this.state.Shellfish
                  ? require("../assets/icons/crustaceans_amber_200x200.jpg")
                  : require("../assets/icons/crustaceans_grey_200x200.jpg")
              }
            />
            <Text
              style={
                this.state.Shellfish
                  ? styles.allergenTxtSelected
                  : styles.allergenTxt
              }
            >
              Shellfish
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.singleAllergen}
            onPress={() => this.onPress("Tree_nut")}
          >
            <Image
              style={styles.allergenImg}
              source={
                this.state.Tree_nut
                  ? require("../assets/icons/tree_nut_amber_200x200.jpg")
                  : require("../assets/icons/tree_nut_grey_200x200.jpg")
              }
            />
            <Text
              style={
                this.state.Tree_nut
                  ? styles.allergenTxtSelected
                  : styles.allergenTxt
              }
            >
              Tree nut
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.singleAllergen}
            onPress={() => this.onPress("Peanut")}
          >
            <Image
              style={styles.allergenImg}
              source={
                this.state.Peanut
                  ? require("../assets/icons/peanuts_amber_200x200.jpg")
                  : require("../assets/icons/peanuts_grey_200x200.jpg")
              }
            />
            <Text
              style={
                this.state.Peanut
                  ? styles.allergenTxtSelected
                  : styles.allergenTxt
              }
            >
              Peanut
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
            onPress={() => this.onPress("Gluten")}
          >
            <Image
              style={styles.allergenImg}
              source={
                this.state.Gluten
                  ? require("../assets/icons/wheat_amber_200x200.jpg")
                  : require("../assets/icons/wheat_grey_200x200.jpg")
              }
            />
            <Text
              style={
                this.state.Gluten
                  ? styles.allergenTxtSelected
                  : styles.allergenTxt
              }
            >
              Gluten
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.singleAllergen}
            onPress={() => this.onPress("Soy")}
          >
            <Image
              style={styles.allergenImg}
              source={
                this.state.Soy
                  ? require("../assets/icons/soybeans_amber_200x200.jpg")
                  : require("../assets/icons/soybeans_grey_200x200.jpg")
              }
            />
            <Text
              style={
                this.state.Soy ? styles.allergenTxtSelected : styles.allergenTxt
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
        <View style={styles.saveContainer}>
          <TouchableOpacity
            style={
              this.state.saved ? styles.savedButton : styles.saveChangesButton
            }
            onPress={() => this.onSave()}
          >
            <Text style={styles.saveText}>
              {this.state.saved ? " Saved " : " Save Changes "}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

// _storeData = async () => {
//   try {
//     await AsyncStorage.setItem("@MySuperStore:key", "I like to save it.");
//   } catch (error) {
//     // Error saving data
//   }
// };

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
    fontSize: 25
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
