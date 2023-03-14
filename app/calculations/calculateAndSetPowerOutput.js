export const calculateAndSetPowerOutput = (
  averageAltitude,
  averageSunExposure,
  area,
  setEnergyOutput
) => {
  const avgAltitude = parseFloat(averageAltitude);
  const avgSunExposure365 = parseFloat(averageSunExposure);

  const solarIrradiance =
    (avgSunExposure365 / 365 / 86400) * (1 - avgAltitude / 1000);

  const efficiency = 0.2;
  const powerOutput = solarIrradiance * area * efficiency;
  setEnergyOutput((powerOutput * 365).toFixed(2));
};
