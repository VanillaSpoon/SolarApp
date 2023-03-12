import React, { useState, useEffect } from "react";
import { View, TextInput, Button } from "react-native";
import Screen from "../components/Screen";
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import haversine from "haversine";
import suncalc from "suncalc";
import { convertSearchToCoords } from "../calculations/convertSearchToCoOrds";
import { fetchElevation } from "../calculations/fetchElevation";
import { addMarker } from "../calculations/addMarker";
import { calculateAvgSunExposure365 } from "../calculations/calculateAvgSunExposure365";
import { calculateAndSetAltitudeAndSunExposure } from "../calculations/calculateAndSetAltitudeAndSunExposure";
import { useNavigation } from "@react-navigation/native";

function MapScreen() {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState("");
  const [region, setRegion] = useState({
    latitude: 33.46637,
    longitude: -84.790878,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markers, setMarkers] = useState([]);
  const [area, setArea] = useState(null);
  const [averageAltitude, setAverageAltitude] = useState(null);
  const [averageSunExposure, setAverageSunExposure] = useState(null);
  const [energyOutput, setEnergyOutput] = useState(null);

  useEffect(() => {
    Geocoder.init("AIzaSyBIcIDCgseIHKADEEOzCrfV1ku927QlpV4");
  }, []);

  const handleSearch = () => {
    convertSearchToCoords(searchText, setRegion);
  };

  const handleMapPress = async (event) => {
    await addMarker(event, markers, setMarkers);
  };

  const handleNext = async () => {
    await handleCalculations();
    navigateToResults();
  };

  const handleCalculations = () => {
    return new Promise((resolve) => {
      if (markers.length < 3) {
        alert("Please select at least 3 points on the map");
        return;
      }

      calculateArea();

      resolve();
    });
  };

  useEffect(() => {
    if (averageAltitude !== null && averageSunExposure !== null) {
      calculateAndSetPowerOutput();
    }
  }, [averageAltitude, averageSunExposure]);

  const calculateAndSetPowerOutput = () => {
    const avgAltitude = parseFloat(averageAltitude);
    const avgSunExposure365 = parseFloat(averageSunExposure);

    const solarIrradiance =
      (avgSunExposure365 / 365 / 86400) * (1 - avgAltitude / 1000);

    const efficiency = 0.2;
    const powerOutput = solarIrradiance * area * efficiency;
    setEnergyOutput((powerOutput * 365).toFixed(2));
  };

  const navigateToResults = () => {
    navigation.navigate("Results", {
      markers,
      area,
      averageAltitude,
      averageSunExposure,
      energyOutput,
      searchText,
    });
  };

  const calculateArea = () => {
    let area = 0;

    // Loop through the markers and calculate the area of each triangle formed by three consecutive markers
    for (let i = 0; i < markers.length - 2; i++) {
      const p1 = markers[i];
      const p2 = markers[i + 1];
      const p3 = markers[i + 2];
      const a = haversine(p1, p2, { unit: "meter" }); // Length of side a using haversine formula
      const b = haversine(p2, p3, { unit: "meter" });
      const c = haversine(p3, p1, { unit: "meter" });
      const s = (a + b + c) / 2; // Semi-perimeter of the triangle
      const triangleArea = Math.sqrt(s * (s - a) * (s - b) * (s - c)); // Area of the triangle using Heron's formula
      area += triangleArea; // add to total area
    }
    setArea(area.toFixed(2));
    calculateAndSetAltitudeAndSunExposure(
      markers,
      setAverageAltitude,
      setAverageSunExposure
    );
  };

  return (
    <Screen>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <TextInput
          style={{ flex: 1, height: 40, borderWidth: 1, marginRight: 10 }}
          onChangeText={setSearchText}
          value={searchText}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        mapType="hybrid"
        region={region}
        showsUserLocation={true}
        onPress={handleMapPress}
      >
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker}></Marker>
        ))}
        {markers.length >= 3 && (
          <Polygon
            coordinates={markers}
            strokeColor="transparent"
            fillColor="rgba(0, 0, 255, 0.5)"
          />
        )}
      </MapView>
      <Button title="Calculate" onPress={handleCalculations} />
      <Button
        title="Next"
        onPress={handleNext}
        disabled={energyOutput === null}
      />
    </Screen>
  );
}

export default MapScreen;
