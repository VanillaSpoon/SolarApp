import React from "react";
import { View, Text, Button } from "react-native";
import Screen from "../components/Screen";
import { useNavigation } from "@react-navigation/native";

const PropertyScreen = ({ route }) => {
  const {
    markers,
    averageAltitude,
    averageSunExposure,
    energyOutput,
    searchText,
  } = route.params;
  console.log("energyOutput:", energyOutput);
  console.log(route.params);

  return (
    <Screen style={{ flex: 1, alignItems: "center" }}>
      <View style={{ alignItems: "stretch", marginTop: 15 }}>
        {searchText !== null && (
          <Text>
            <Text style={{ fontWeight: "bold" }}>Address:</Text> {searchText}{" "}
          </Text>
        )}
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
      </View>

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
      {energyOutput !== null && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
            marginTop: 50,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>
            Annual Energy Production Estimation
          </Text>
          <Text style={{ fontSize: 18, alignContent: "center" }}>
            {energyOutput} kWh
          </Text>
        </View>
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
            energyOutput,
            searchText,
            properties
          );
        }}
      />
    </Screen>
  );
};

export default PropertyScreen;
