import React from "react";
import { View, Text, Button } from "react-native";
import Screen from "../components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import flatted from "flatted";
import { useNavigation } from "@react-navigation/native";

const ResultsScreen = ({ route }) => {
  const navigation = useNavigation();

  const { markers, area, averageAltitude, averageSunExposure, energyOutput } =
    route.params;

  const saveInfo = async (
    markers,
    area,
    averageAltitude,
    averageSunExposure,
    energyOutput,
    properties
  ) => {
    try {
      const newProperty = {
        markers,
        area,
        averageAltitude,
        averageSunExposure,
      };
      const newProperties = [...properties, newProperty];
      const data = flatted.stringify(newProperties);
      await AsyncStorage.setItem("properties", data);
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
        <Text>Average sun exposure: {averageSunExposure} W/m²</Text>
      )}
      {energyOutput !== null && (
        <Text>Average energyOutput: {energyOutput} KWh</Text>
      )}

      <Button
        title="Save"
        onPress={async () => {
          const data = await AsyncStorage.getItem("properties");
          const properties = data ? flatted.parse(data) : [];
          saveInfo(
            markers,
            area,
            averageAltitude,
            averageSunExposure,
            properties
          );
        }}
      />
    </Screen>
  );
};

export default ResultsScreen;
