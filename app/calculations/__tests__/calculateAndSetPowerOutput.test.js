import { calculateAndSetPowerOutput } from "../calculateAndSetPowerOutput";

describe("calculateAndSetPowerOutput", () => {
  it("should calculate and set the energy output correctly", () => {
    const averageAltitude = "100";
    const averageSunExposure = "200";
    const area = 10;
    const setEnergyOutput = jest.fn();

    calculateAndSetPowerOutput(
      averageAltitude,
      averageSunExposure,
      area,
      setEnergyOutput
    );

    const avgAltitude = parseFloat(averageAltitude);
    const avgSunExposure365 = parseFloat(averageSunExposure);
    const solarIrradiance =
      (avgSunExposure365 / 365 / 86400) * (1 - avgAltitude / 1000);
    const efficiency = 0.2;
    const expectedPowerOutput = (
      solarIrradiance *
      area *
      efficiency *
      365
    ).toFixed(2);

    expect(setEnergyOutput).toHaveBeenCalledWith(expectedPowerOutput);
  });
});
