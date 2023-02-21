import React from "react";
import { View, Text } from "react-native";
import Screen from "../components/Screen";
const ResultsScreen = ({ route }) => {
  const { markers, area, averageAltitude, averageSunExposure } = route.params;

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
    </Screen>
  );
};

export default ResultsScreen;
