import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import Screen from "../components/Screen";
import ResultsScreen from "./ResultsScreen";
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import haversine from "haversine";
import suncalc from "suncalc";
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

  useEffect(() => {
    Geocoder.init("AIzaSyBIcIDCgseIHKADEEOzCrfV1ku927QlpV4");
  }, []);

  // converting the search  to latitude and longitude coordinates using the Geocoder API
  const handleSearch = () => {
    Geocoder.from(searchText)
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const northeast = response.results[0].geometry.viewport.northeast;
        const southwest = response.results[0].geometry.viewport.southwest;
        const latitudeDelta = northeast.lat - southwest.lat;
        const longitudeDelta = northeast.lng - southwest.lng;
        setRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        });
      })
      .catch((error) => console.warn(error));
  };

  // get the elevation of a given latitude and longitude using the Google Elevation API
  const getElevation = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/elevation/json?locations=${latitude},${longitude}&key=${"AIzaSyBIcIDCgseIHKADEEOzCrfV1ku927QlpV4"}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.results.length > 0) {
      return data.results[0].elevation;
    }
    return null;
  };

  // adding a marker to the map when the user presses on it, and calculate markers altitude and sun exposure
  const handleMapPress = async (event) => {
    const { coordinate } = event.nativeEvent; //gets the coordinates of the pressed location
    const altitude = await getElevation(
      // gets the altitude of the pressed location
      coordinate.latitude,
      coordinate.longitude
    );
    // calculate the sunrise and sunset times for the point using the suncalc library
    const sunTimes = suncalc.getTimes(
      new Date(),
      coordinate.latitude,
      coordinate.longitude
    );
    const sunrise = sunTimes.sunrise.getTime(); // in milliseconds
    const sunset = sunTimes.sunset.getTime();
    const sunExposures = [];
    for (let i = 0; i < 365; i++) {
      // calculate the sun exposure for each day of the year
      const newSunrise = new Date(sunrise + i * 24 * 60 * 60 * 1000); // add 24 hours to the sunrise time
      const newSunset = new Date(sunset + i * 24 * 60 * 60 * 1000);
      const newSunExposure = ((newSunset - newSunrise) / 86400000) * 86400; // in seconds
      sunExposures.push(newSunExposure);
    }
    const avgSunExposure365 = sunExposures.reduce((acc, curr) => acc + curr, 0); // calculate the average sun exposure for the year
    const newMarkers = [
      ...markers,
      {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        altitude: altitude,
        sunExposure: avgSunExposure365,
      },
    ];
    setMarkers(newMarkers);
  };

  // calculate the average altitude and sun exposure of all markers
  const handleCalculateAverage = () => {
    const sumAltitude = markers.reduce((acc, curr) => acc + curr.altitude, 0);
    const avgAltitude = sumAltitude / markers.length;
    setAverageAltitude(avgAltitude.toFixed(2));

    const sumSunExposure365 = markers.reduce(
      (acc, curr) => acc + curr.sunExposure,
      0
    );
    const avgSunExposure365 = sumSunExposure365 / markers.length;
    setAverageSunExposure(avgSunExposure365.toFixed(2));

    const solarIrradiance =
      (avgSunExposure365 / 365 / 86400) * (1 - avgAltitude / 1000);

    const efficiency = 0.2; // assume a solar panel efficiency of 15%
    const powerOutput = solarIrradiance * area * efficiency;
    const energyOutput = powerOutput * 365;
    navigation.navigate("Results", {
      markers: markers,
      area: area,
      averageAltitude: averageAltitude,
      averageSunExposure: averageSunExposure,
      energyOutput: energyOutput.toFixed(2),
    });
  };

  // calculate the area enclosed by the markers
  const handleCalculateArea = () => {
    if (markers.length < 3) {
      alert("Please select at least 3 points on the map");
      return;
    }

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
    handleCalculateAverage();
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
      <Button title="Calculate" onPress={handleCalculateArea} />
      {area && (
        <View style={{ alignSelf: "center" }}>
          <Text>Area: {area} m²</Text>
        </View>
      )}
      {averageAltitude !== null && (
        <View style={{ alignSelf: "center" }}>
          <Text>Average altitude: {averageAltitude} meters</Text>
        </View>
      )}
      {averageSunExposure !== null && (
        <View style={{ alignSelf: "center" }}>
          <Text>Average sun exposure: {averageSunExposure} seconds</Text>
        </View>
      )}
    </Screen>
  );
}

export default MapScreen;
