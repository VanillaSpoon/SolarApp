import React from "react";
import { View, Text } from "react-native";

const ResultsScreen = ({ route }) => {
  const { markers, area, averageAltitude, averageSunExposure } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Markers:</Text>
      {markers.map((marker, index) => (
        <Text key={index}>{`Marker ${index + 1}: (${marker.latitude}, ${
          marker.longitude
        })`}</Text>
      ))}
      {area !== null && <Text>Area: {area} m²</Text>}
      {averageAltitude !== null && (
        <Text>Average altitude: {averageAltitude} meters</Text>
      )}
      {averageSunExposure !== null && (
        <Text>Average sun exposure: {averageSunExposure} seconds</Text>
      )}
    </View>
  );
};

export default ResultsScreen;
