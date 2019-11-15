# Allert

A lightweight mobile prototype app that allows users to create a personalized food allergy profile and scan UPC-labelled products to quickly detect the presence of these allergens. Native mobile development using [React Native](https://facebook.github.io/react-native/), utilizing AsyncStorage for persistent storage of allergy profile, Axios for HTTP calls, and the [Edamam Food Database API](https://developer.edamam.com/food-database-api) for product and allergy information.

<img src="./readme/Simulator-01-Splash.png" alt="Allert splash screen" title="Splash" width="19%"/> <img src="./readme/Simulator-02-Profile.png" alt="Allert profile screen" title="Profile" width="19%"/> <img src="./readme/Simulator-03-Scan.png" alt="Allert scan screen" title="Scan" width="19%"/> <img src="./readme/Simulator-04-Product-OK.png" alt="Allert product ok screen" title="Product OK" width="19%"/> <img src="./readme/Simulator-05-Product-NOT-OK.png" alt="Allert product not ok screen" title="Product Not OK" width="19%"/>

## Dependencies & Running _Allert_
1. Install React Native CLI dependencies listed under the [React Native CLI Quickstart](https://facebook.github.io/react-native/docs/getting-started) tab
2. Fork/clone repo and install all other npm/yarn dependencies
3. `keys.js` file in the root of the repo, which includes your API keys for the Edamam Food Database API. API keys can be requested from Edamam [HERE](https://developer.edamam.com/food-database-api). Example `keys.js` file:
```
export const appKey = "{YOUR API KEY}";
export const appId = "{YOUR API ID}";

```
4. To run the _Allert_ prototype app: `npx react-native run-ios` for iOS or `npx react-native run-android` for Android
