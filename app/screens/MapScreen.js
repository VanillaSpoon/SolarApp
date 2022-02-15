import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text } from "react-native";
import Screen from "../components/Screen";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
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

  const handleMapPress = (event) => {
    const newMarkers = [...markers, event.nativeEvent.coordinate];
    setMarkers(newMarkers);
  };

  const handleCalculateArea = () => {
    if (markers.length !== 4) {
      alert("Please select 4 points on the map");
      return;
    }

    const [point1, point2, point3, point4] = markers;
    const distance1 = haversine(point1, point2, { unit: "meter" });
    const distance2 = haversine(point2, point3, { unit: "meter" });
    const distance3 = haversine(point3, point4, { unit: "meter" });
    const distance4 = haversine(point4, point1, { unit: "meter" });
    const semiperimeter = (distance1 + distance2 + distance3 + distance4) / 2;
    const area = Math.sqrt(
      (semiperimeter - distance1) *
        (semiperimeter - distance2) *
        (semiperimeter - distance3) *
        (semiperimeter - distance4)
    );
    setArea(area.toFixed(2));
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
          <Marker key={index} coordinate={marker} />
        ))}
      </MapView>
      <Button title="Calculate Area" onPress={handleCalculateArea} />
      {area && (
        <Text style={{ alignSelf: "center" }}>Area: {area} square meters</Text>
      )}
    </Screen>
  );
}

export default MapScreen;
