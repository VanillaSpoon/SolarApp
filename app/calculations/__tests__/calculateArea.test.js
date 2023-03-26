import { calculateArea } from "../calculateArea";
import haversine from "haversine";

describe("calculateArea", () => {
  let setAreaMock;
  let calculateAndSetAltitudeAndSunExposureMock;
  let setAverageAltitudeMock;
  let setAverageSunExposureMock;

  beforeEach(() => {
    setAreaMock = jest.fn();
    calculateAndSetAltitudeAndSunExposureMock = jest.fn();
    setAverageAltitudeMock = jest.fn();
    setAverageSunExposureMock = jest.fn();
  });

  it("should calculate the area correctly for valid markers", () => {
    const markers = [
      { latitude: 40.7128, longitude: -74.006 },
      { latitude: 34.0522, longitude: -118.2437 },
      { latitude: 41.8781, longitude: -87.6298 },
    ];

    calculateArea(
      markers,
      setAreaMock,
      calculateAndSetAltitudeAndSunExposureMock,
      setAverageAltitudeMock,
      setAverageSunExposureMock
    );

    const area = setAreaMock.mock.calls[0][0];
    expect(parseFloat(area)).toBeGreaterThanOrEqual(0);
  });

  it("should set area to 0 when there are less than three markers", () => {
    const markers = [
      { latitude: 40.7128, longitude: -74.006 },
      { latitude: 34.0522, longitude: -118.2437 },
    ];

    calculateArea(
      markers,
      setAreaMock,
      calculateAndSetAltitudeAndSunExposureMock,
      setAverageAltitudeMock,
      setAverageSunExposureMock
    );

    expect(setAreaMock).toHaveBeenCalledWith("0.00");
  });

  it("should call calculateAndSetAltitudeAndSunExposure", () => {
    const markers = [
      { latitude: 40.7128, longitude: -74.006 },
      { latitude: 34.0522, longitude: -118.2437 },
      { latitude: 41.8781, longitude: -87.6298 },
    ];

    calculateArea(
      markers,
      setAreaMock,
      calculateAndSetAltitudeAndSunExposureMock,
      setAverageAltitudeMock,
      setAverageSunExposureMock
    );

    expect(calculateAndSetAltitudeAndSunExposureMock).toHaveBeenCalledWith(
      markers,
      setAverageAltitudeMock,
      setAverageSunExposureMock
    );
  });
});
