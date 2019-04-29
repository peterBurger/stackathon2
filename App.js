import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";

import Splash from "./components/Splash";
import Allergies from "./components/Allergies";
import Scan from "./components/Scan";

const TabNavigator = createBottomTabNavigator({
  Profile: { screen: Allergies },
  Scan: { screen: Scan }
});

const InitialNavigator = createSwitchNavigator({
  Splash: Splash,
  App: TabNavigator
});

const App = createAppContainer(InitialNavigator);

export default App;
