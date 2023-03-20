import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/Screen";

import { convertSearchToCoords } from "../calculations/convertSearchToCoords";
import { addMarker } from "../calculations/addMarker";
import { calculateArea } from "../calculations/calculateArea";
import { calculateAndSetPowerOutput } from "../calculations/calculateAndSetPowerOutput";
import { calculateAndSetAltitudeAndSunExposure } from "../calculations/calculateAndSetAltitudeAndSunExposure";

import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import { captureRef } from "react-native-view-shot";

function MapScreen() {
  const navigation = useNavigation();
  const mapRef = useRef(null);

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
    const mapScreenshot = await captureMapScreenshot();
    navigateToResults(mapScreenshot);
  };

  const handleCalculations = () => {
    return new Promise((resolve) => {
      if (markers.length < 3) {
        alert("Please select at least 3 points on the map");
        return;
      }

      calculateArea(
        markers,
        setArea,
        calculateAndSetAltitudeAndSunExposure,
        setAverageAltitude,
        setAverageSunExposure
      );

      resolve();
    });
  };

  const captureMapScreenshot = async () => {
    try {
      const snapshot = await captureRef(mapRef, {
        format: "jpg",
        quality: 0.8,
      });
      return snapshot;
    } catch (error) {
      console.error("Error capturing map screenshot:", error);
      return null;
    }
  };

  useEffect(() => {
    if (averageAltitude !== null && averageSunExposure !== null) {
      calculateAndSetPowerOutput(
        averageAltitude,
        averageSunExposure,
        area,
        setEnergyOutput
      );
    }
  }, [averageAltitude, averageSunExposure]);

  const navigateToResults = (mapScreenshot) => {
    navigation.navigate("Results", {
      markers,
      area,
      averageAltitude,
      averageSunExposure,
      energyOutput,
      searchText,
      mapScreenshot,
    });
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
        ref={mapRef}
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
