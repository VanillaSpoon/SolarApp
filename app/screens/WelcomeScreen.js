import React from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import Button from "../components/Button";
function WelcomeScreen() {
  return (
    <ImageBackground
      blurRadius={3}
      style={styles.background}
      source={require("../assets/images/WelcomeBackground.jpeg")}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.tagline}>Solar</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Login" />
        <Button title="Register" color="secondary" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});

export default WelcomeScreen;
