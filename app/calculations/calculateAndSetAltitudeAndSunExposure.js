// calculate the average altitude and sun exposure of all markers
export const calculateAndSetAltitudeAndSunExposure = (
  markers,
  setAverageAltitude,
  setAverageSunExposure
) => {
  const sumAltitude = markers.reduce((acc, curr) => acc + curr.altitude, 0);
  const avgAltitude = sumAltitude / markers.length;
  setAverageAltitude(avgAltitude.toFixed(2));

  const sumSunExposure365 = markers.reduce(
    (acc, curr) => acc + curr.sunExposure,
    0
  );
  const avgSunExposure365 = sumSunExposure365 / markers.length;
  setAverageSunExposure(avgSunExposure365.toFixed(2));
};
