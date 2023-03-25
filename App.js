import React from "react";
import ScannedScreen from "./app/screens/ScannedScreen";
import MapScreen from "./app/screens/MapScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ResultsScreen from "./app/screens/ResultsScreen";
import PropertyScreen from "./app/screens/PropertyScreen";

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Scanned" component={ScannedScreen} />
          <Stack.Screen name="Solar" component={MapScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
          <Stack.Screen name="Property" component={PropertyScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
