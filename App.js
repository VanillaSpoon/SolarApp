import React from "react";
import Screen from "./app/components/Screen";
import WelcomeScreen from "./app/screens/WelcomeScreen";

export default class App extends React.Component {
  render() {
    return (
      <Screen>
        <WelcomeScreen />
      </Screen>
    );
  }
}
