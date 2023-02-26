import React from "react";
import { View, Text, Button } from "react-native";
import Screen from "../components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import flatted from "flatted";
import { useNavigation } from "@react-navigation/native";

const ResultsScreen = ({ route }) => {
  const navigation = useNavigation();

  const { markers, area, averageAltitude, averageSunExposure } = route.params;
  const saveInfo = async (
    markers,
    area,
    averageAltitude,
    averageSunExposure
  ) => {
    try {
      const data = { markers, area, averageAltitude, averageSunExposure };
      const dataString = flatted.stringify(data);
      await AsyncStorage.setItem("propertyData", dataString);
      navigation.navigate("Scanned");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Screen style={{ flex: 1, alignItems: "center" }}>
      <Text>Markers:</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", flex: 1 }}>Marker</Text>
        <Text style={{ fontWeight: "bold", flex: 1 }}>Longitude</Text>
        <Text style={{ fontWeight: "bold", flex: 1 }}>Latitude</Text>
      </View>
      {markers.map((marker, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text style={{ flex: 1 }}>{`Marker ${index + 1}`}</Text>
          <Text style={{ flex: 1 }}>{marker.longitude}</Text>
          <Text style={{ flex: 1 }}>{marker.latitude}</Text>
        </View>
      ))}
      {area !== null && <Text>Area: {area} m²</Text>}
      {averageAltitude !== null && (
        <Text>Average altitude: {averageAltitude} meters</Text>
      )}
      {averageSunExposure !== null && (
        <Text>Average sun exposure: {averageSunExposure} seconds</Text>
      )}

      <Button
        title="Save"
        onPress={() =>
          saveInfo(markers, area, averageAltitude, averageSunExposure)
        }
      />
    </Screen>
  );
};

export default ResultsScreen;
