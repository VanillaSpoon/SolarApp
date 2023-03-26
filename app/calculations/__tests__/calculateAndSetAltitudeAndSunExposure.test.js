import { calculateAndSetAltitudeAndSunExposure } from "../calculateAndSetAltitudeAndSunExposure";

describe("calculateAndSetAltitudeAndSunExposure", () => {
  it("should set average altitude correctly", () => {
    const markers = [
      { latitude: 40, longitude: -70, altitude: 10, sunExposure: 5 },
      { latitude: 40, longitude: -70, altitude: 20, sunExposure: 10 },
      { latitude: 40, longitude: -70, altitude: 30, sunExposure: 15 },
    ];
    const setAverageAltitude = jest.fn();
    const setAverageSunExposure = jest.fn();

    calculateAndSetAltitudeAndSunExposure(
      markers,
      setAverageAltitude,
      setAverageSunExposure
    );

    expect(setAverageAltitude).toHaveBeenCalledWith("20.00");
  });

  it("should set average sun exposure correctly", () => {
    const markers = [
      { latitude: 40, longitude: -70, altitude: 10, sunExposure: 5 },
      { latitude: 40, longitude: -70, altitude: 20, sunExposure: 10 },
      { latitude: 40, longitude: -70, altitude: 30, sunExposure: 15 },
    ];
    const setAverageAltitude = jest.fn();
    const setAverageSunExposure = jest.fn();

    calculateAndSetAltitudeAndSunExposure(
      markers,
      setAverageAltitude,
      setAverageSunExposure
    );

    expect(setAverageSunExposure).toHaveBeenCalledWith("10.00");
  });
});
