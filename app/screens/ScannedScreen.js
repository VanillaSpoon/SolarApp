import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Button, Alert, Image } from "react-native";

import Tile from "../components/Tile";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import flatted from "flatted";

function ScannedScreen() {
  const navigation = useNavigation();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await AsyncStorage.getItem("properties");
        if (data) {
          const parsedData = flatted.parse(data);
          setProperties(parsedData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadProperties();
  }, []);

  const handleNavigation = () => {
    navigation.navigate("Solar");
  };

  const handleRemoveAllProperties = async () => {
    try {
      await AsyncStorage.removeItem("properties");
      setProperties([]);
    } catch (error) {
      console.error(error);
    }
  };

  const confirmRemoveAllProperties = () => {
    Alert.alert(
      "Remove All Properties",
      "Are you sure you want to remove all saved properties?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: handleRemoveAllProperties },
      ]
    );
  };

  return (
    <Screen style={styles.screen}>
      {properties.length > 0 && (
        <Button
          title="Remove All Properties"
          onPress={confirmRemoveAllProperties}
        />
      )}
      {properties.length > 0 ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={properties}
          keyExtractor={(property, index) => index.toString()}
          renderItem={({ item }) => (
            <Tile
              title={`Property ${properties.indexOf(item) + 1}`}
              image={require("../assets/images/house.jpeg")}
              onPress={() =>
                navigation.navigate("Property", {
                  markers: item.markers,
                  area: item.area,
                  averageAltitude: item.averageAltitude,
                  averageSunExposure: item.averageSunExposure,
                  propertyId: properties.indexOf(item),
                })
              }
            />
          )}
        />
      ) : (
        <Image
          style={{ width: "100%", height: "50%" }}
          source={require("../assets/images/houseNB.png")}
        />
      )}
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
