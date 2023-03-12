import Geocoder from "react-native-geocoding";

export const convertSearchToCoords = (searchText, setRegion) => {
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
