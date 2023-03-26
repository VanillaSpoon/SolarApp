import haversine from "haversine";

export const calculateArea = (
  markers,
  setArea,
  calculateAndSetAltitudeAndSunExposure,
  setAverageAltitude,
  setAverageSunExposure
) => {
  let area = 0;

  if (markers.length >= 3) {
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
  }

  setArea(area.toFixed(2));
  calculateAndSetAltitudeAndSunExposure(
    markers,
    setAverageAltitude,
    setAverageSunExposure
  );
};
