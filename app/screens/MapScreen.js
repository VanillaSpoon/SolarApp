import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text } from "react-native";
import Screen from "../components/Screen";
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import haversine from "haversine";

function MapScreen() {
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

  useEffect(() => {
    Geocoder.init("AIzaSyBIcIDCgseIHKADEEOzCrfV1ku927QlpV4");
  }, []);

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

  const getElevation = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/elevation/json?locations=${latitude},${longitude}&key=${"AIzaSyBIcIDCgseIHKADEEOzCrfV1ku927QlpV4"}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.results.length > 0) {
      return data.results[0].elevation;
    }
    return null;
  };

  const handleMapPress = async (event) => {
    const { coordinate } = event.nativeEvent;
    const altitude = await getElevation(
      coordinate.latitude,
      coordinate.longitude
    );
    const newMarkers = [
      ...markers,
      {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        altitude: altitude,
      },
    ];
    setMarkers(newMarkers);
  };

  const handleCalculateAverage = () => {
    const sumAltitude = markers.reduce((acc, curr) => acc + curr.altitude, 0);
    const avgAltitude = sumAltitude / markers.length;
    setAverageAltitude(avgAltitude.toFixed(2));
  };

  const handleCalculateArea = () => {
    if (markers.length < 3) {
      alert("Please select at least 3 points on the map");
      return;
    }

    let area = 0;

    for (let i = 0; i < markers.length - 2; i++) {
      const p1 = markers[i];
      const p2 = markers[i + 1];
      const p3 = markers[i + 2];
      const a = haversine(p1, p2, { unit: "meter" });
      const b = haversine(p2, p3, { unit: "meter" });
      const c = haversine(p3, p1, { unit: "meter" });
      const s = (a + b + c) / 2;
      const triangleArea = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      area += triangleArea;
    }
    setArea(area.toFixed(2));
    setMarkers(markers);
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
      <Button title="Calculate Area" onPress={handleCalculateArea} />
      {area && (
        <View style={{ alignSelf: "center" }}>
          <Text>Area: {area} m²</Text>
        </View>
      )}
      <Button title="Calculate Average" onPress={handleCalculateAverage} />
      {averageAltitude !== null && (
        <View style={{ alignSelf: "center" }}>
          <Text>Average altitude: {averageAltitude} meters</Text>
        </View>
      )}
    </Screen>
  );
}

export default MapScreen;
