import React from "react";
import Screen from "./app/components/Screen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import LoginScreen from "./app/screens/LoginScreen";

export default class App extends React.Component {
  render() {
    return (
      <Screen>
        <RegisterScreen />
      </Screen>
    );
  }
}
