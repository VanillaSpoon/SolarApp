import React from "react";
import Screen from "../components/Screen";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

function MapScreen() {
  return (
    <Screen>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        mapType="hybrid"
        region={{
          latitude: 33.46637,
          longitude: -84.790878,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      />
    </Screen>
  );
}

export default MapScreen;
