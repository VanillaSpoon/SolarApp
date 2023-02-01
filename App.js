import React, { Component } from "react";
import Screen from "./app/components/Screen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import LoginScreen from "./app/screens/LoginScreen";
import ScannedScreen from "./app/screens/ScannedScreen";
import MapScreen from "./app/screens/MapScreen";
import SidebarScreen from "./app/screens/SidebarScreen";

export default class App extends React.Component {
  render() {
    return (
      <Screen>
        <SidebarScreen />
      </Screen>
    );
  }
}
