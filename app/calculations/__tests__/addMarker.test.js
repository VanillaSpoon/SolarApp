import { addMarker } from "../addMarker";
import { calculateAvgSunExposure365 } from "../calculateAvgSunExposure365";

jest.mock("../fetchElevation", () => ({
  fetchElevation: jest.fn(() => Promise.resolve(10)),
}));

jest.mock("../calculateAvgSunExposure365", () => ({
  calculateAvgSunExposure365: jest.fn(() => 5),
}));

describe("addMarker", () => {
  it("should call setMarkers with the updated markers array", async () => {
    const markers = [];
    const setMarkers = jest.fn();
    const event = {
      nativeEvent: {
        coordinate: {
          latitude: 40,
          longitude: -70,
        },
      },
    };

    await addMarker(event, markers, setMarkers);

    expect(setMarkers).toHaveBeenCalledWith([
      {
        latitude: 40,
        longitude: -70,
        altitude: 10,
        sunExposure: 5,
      },
    ]);
  });

  it("should call calculateAvgSunExposure365 with the correct parameters", async () => {
    const markers = [];
    const setMarkers = jest.fn();
    const event = {
      nativeEvent: {
        coordinate: {
          latitude: 40,
          longitude: -70,
        },
      },
    };

    await addMarker(event, markers, setMarkers);

    expect(calculateAvgSunExposure365).toHaveBeenCalledWith(40, -70);
  });
});
