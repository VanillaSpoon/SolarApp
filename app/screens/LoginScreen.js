import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import Screen from "../components/Screen";
import Button from "../components/Button";

function LoginScreen() {
  return (
    <Screen style={styles.container}>
      <Text style={styles.tagline}>Solar</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCompleteType="off"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
      />
      <View style={styles.buttonsContainer}>
        <Button title="Login" color="primary" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  input: {
    width: 300,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#6d69c3",
    marginVertical: 10,
    padding: 15,
    alignSelf: "center",
  },
  container: {
    padding: 10,
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
    alignSelf: "center",
  },
});

export default LoginScreen;
