import React from "react";
import Screen from "../components/Screen";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

function MapScreen() {
  return (
    <Screen>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={{
          latitude: 42.882004,
          longitude: 74.582748,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      />
    </Screen>
  );
}

export default MapScreen;
