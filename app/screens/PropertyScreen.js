import React from "react";
import { View, Text, Button } from "react-native";
import Screen from "../components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import flatted from "flatted";
import { useNavigation } from "@react-navigation/native";

const PropertyScreen = ({ route }) => {
  const navigation = useNavigation();

  const { markers, area, averageAltitude, averageSunExposure, energyOutput } =
    route.params;
  console.log("energyOutput:", energyOutput);
  console.log(route.params);

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
        <Text>
          <Text style={{ fontWeight: "bold" }}>Average Altitude:</Text>{" "}
          {averageAltitude} meters
        </Text>
      )}
      {averageSunExposure !== null && (
        <Text style={{ marginBottom: 50 }}>
          <Text style={{ fontWeight: "bold" }}>Average Sun Exposure:</Text>{" "}
          {averageSunExposure} W/m²
        </Text>
      )}
      {energyOutput !== null && (
        <Text style={{ fontSize: 18 }}>
          <Text style={{ fontWeight: "bold" }}>
            Annual Energy Production Estimation:
          </Text>{" "}
          {energyOutput} kWh
        </Text>
      )}
    </Screen>
  );
};

export default PropertyScreen;
