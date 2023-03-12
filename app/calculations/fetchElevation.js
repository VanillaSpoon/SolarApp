export const fetchElevation = async (latitude, longitude) => {
  const url = `https://maps.googleapis.com/maps/api/elevation/json?locations=${latitude},${longitude}&key=${"AIzaSyBIcIDCgseIHKADEEOzCrfV1ku927QlpV4"}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.results.length > 0) {
    return data.results[0].elevation;
  }
  return null;
};
