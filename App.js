import React from "react";
import Screen from "./app/components/Screen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import LoginScreen from "./app/screens/LoginScreen";
import ScannedScreen from "./app/screens/ScannedScreen";

export default class App extends React.Component {
  render() {
    return (
      <Screen>
        <ScannedScreen />
      </Screen>
    );
  }
}
