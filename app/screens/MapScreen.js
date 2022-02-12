import React, { useState, useEffect } from "react";
import { View, TextInput, Button } from "react-native";
import Screen from "../components/Screen";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Geocoder from "react-native-geocoding";

function MapScreen() {
  const [searchText, setSearchText] = useState("");
  const [region, setRegion] = useState({
    latitude: 33.46637,
    longitude: -84.790878,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

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
      />
    </Screen>
  );
}

export default MapScreen;
