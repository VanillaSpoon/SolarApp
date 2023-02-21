import React, { Component } from "react";
import Screen from "./app/components/Screen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import LoginScreen from "./app/screens/LoginScreen";
import ScannedScreen from "./app/screens/ScannedScreen";
import MapScreen from "./app/screens/MapScreen";
import SidebarScreen from "./app/screens/SidebarScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ResultsScreen from "./app/screens/ResultsScreen";

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Scanned" component={ScannedScreen} />
          <Stack.Screen name="Solar" component={MapScreen} />
          <Stack.Screen name="ResultsScreen" component={ResultsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
