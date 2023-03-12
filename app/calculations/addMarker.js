import { fetchElevation } from "./fetchElevation";
import { calculateAvgSunExposure365 } from "./calculateAvgSunExposure365";

// adding a marker to the map when the user presses on it, and calculate markers altitude and sun exposure
export const addMarker = async (event, markers, setMarkers) => {
  const { coordinate } = event.nativeEvent;
  const altitude = await fetchElevation(
    // gets the altitude of the marker
    coordinate.latitude,
    coordinate.longitude
  );
  const avgSunExposure365 = calculateAvgSunExposure365(
    coordinate.latitude,
    coordinate.longitude
  );

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
