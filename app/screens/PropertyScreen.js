import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Screen from "../components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import flatted from "flatted";

const SavedDataScreen = () => {
  const [markers, setMarkers] = useState([]);
  const [area, setArea] = useState(null);
  const [averageAltitude, setAverageAltitude] = useState(null);
  const [averageSunExposure, setAverageSunExposure] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await AsyncStorage.getItem("propertyData");
        if (data !== null) {
          const parsedData = flatted.parse(data);
          setMarkers(parsedData.markers);
          setArea(parsedData.area);
          setAverageAltitude(parsedData.averageAltitude);
          setAverageSunExposure(parsedData.averageSunExposure);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

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

export default SavedDataScreen;
