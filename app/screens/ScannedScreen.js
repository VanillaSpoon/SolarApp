import React from "react";
import { FlatList, StyleSheet, Button } from "react-native";

import Tile from "../components/Tile";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { useNavigation } from "@react-navigation/native";

const scanned = [
  {
    id: 1,
    title: "Owner 1",
    address: "Address one",
    image: require("../assets/images/house.jpeg"),
  },
  {
    id: 2,
    title: "Owner 2",
    address: "Address two",
    image: require("../assets/images/house.jpeg"),
  },
  {
    id: 3,
    title: "Owner 3",
    address: "Address three",
    image: require("../assets/images/house.jpeg"),
  },
];

function ScannedScreen() {
  const navigation = useNavigation();
  const handleNavigation = () => {
    navigation.navigate("Solar");
  };
  return (
    <Screen style={styles.screen}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={scanned}
        keyExtractor={(scanned) => scanned.id.toString()}
        renderItem={({ item }) => (
          <Tile title={item.title} address={item.address} image={item.image} />
        )}
      />
      <Button title="New Property" onPress={handleNavigation} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ScannedScreen;
