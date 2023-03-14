import suncalc from "suncalc";

// calculate the sunrise and sunset times for the point using the suncalc library
export const calculateAvgSunExposure365 = (latitude, longitude) => {
  const sunTimes = suncalc.getTimes(new Date(), latitude, longitude);
  const sunrise = sunTimes.sunrise.getTime();
  const sunset = sunTimes.sunset.getTime();
  const sunExposures = [];

  for (let i = 0; i < 365; i++) {
    // calculate the sun exposure for each day of the year
    const newSunrise = new Date(sunrise + i * 24 * 60 * 60 * 1000); // add 24 hours to the sunrise time
    const newSunset = new Date(sunset + i * 24 * 60 * 60 * 1000);
    const newSunExposure = ((newSunset - newSunrise) / 86400000) * 86400; // in seconds
    sunExposures.push(newSunExposure);
  }

  return sunExposures.reduce((acc, curr) => acc + curr, 0); // calculate the average sun exposure for the year
};
