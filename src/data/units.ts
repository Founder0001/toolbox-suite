export interface Unit {
  key: string;
  label: string;
  factor?: number;
}

export interface UnitCategory {
  label: string;
  icon: string;
  units: Unit[];
  baseUnitKey: string;
  precision: number;
}

export const UNIT_CONVERSION_DATA: Record<string, UnitCategory> = {
  length: {
    label: 'Length',
    icon: '\uD83D\uDCCF',
    units: [
      { key: 'meter', label: 'Meters (m)', factor: 1 },
      { key: 'kilometer', label: 'Kilometers (km)', factor: 1000 },
      { key: 'centimeter', label: 'Centimeters (cm)', factor: 0.01 },
      { key: 'millimeter', label: 'Millimeters (mm)', factor: 0.001 },
      { key: 'micrometer', label: 'Micrometers (\u00B5m)', factor: 0.000001 },
      { key: 'nanometer', label: 'Nanometers (nm)', factor: 0.000000001 },
      { key: 'mile', label: 'Miles (mi)', factor: 1609.344 },
      { key: 'yard', label: 'Yards (yd)', factor: 0.9144 },
      { key: 'foot', label: 'Feet (ft)', factor: 0.3048 },
      { key: 'inch', label: 'Inches (in)', factor: 0.0254 },
    ],
    baseUnitKey: 'meter',
    precision: 6,
  },
  mass: {
    label: 'Mass/Weight',
    icon: '\u2696',
    units: [
      { key: 'kilogram', label: 'Kilograms (kg)', factor: 1 },
      { key: 'gram', label: 'Grams (g)', factor: 0.001 },
      { key: 'milligram', label: 'Milligrams (mg)', factor: 0.000001 },
      { key: 'microgram', label: 'Micrograms (\u00B5g)', factor: 0.000000001 },
      { key: 'metric_ton', label: 'Metric Tons (t)', factor: 1000 },
      { key: 'pound', label: 'Pounds (lb)', factor: 0.453592 },
      { key: 'ounce', label: 'Ounces (oz)', factor: 0.0283495 },
      { key: 'stone', label: 'Stones (st)', factor: 6.35029 },
    ],
    baseUnitKey: 'kilogram',
    precision: 6,
  },
  area: {
    label: 'Area',
    icon: '\uD83D\uDDFA',
    units: [
      { key: 'square_meter', label: 'Square Meters (m\u00B2)', factor: 1 },
      { key: 'square_kilometer', label: 'Square Kilometers (km\u00B2)', factor: 1000000 },
      { key: 'square_centimeter', label: 'Square Centimeters (cm\u00B2)', factor: 0.0001 },
      { key: 'square_millimeter', label: 'Square Millimeters (mm\u00B2)', factor: 0.000001 },
      { key: 'hectare', label: 'Hectares (ha)', factor: 10000 },
      { key: 'acre', label: 'Acres (ac)', factor: 4046.86 },
      { key: 'square_mile', label: 'Square Miles (mi\u00B2)', factor: 2589988.11 },
      { key: 'square_yard', label: 'Square Yards (yd\u00B2)', factor: 0.836127 },
      { key: 'square_foot', label: 'Square Feet (ft\u00B2)', factor: 0.092903 },
      { key: 'square_inch', label: 'Square Inches (in\u00B2)', factor: 0.00064516 },
    ],
    baseUnitKey: 'square_meter',
    precision: 6,
  },
  volume: {
    label: 'Volume',
    icon: '\uD83E\uDD5B',
    units: [
      { key: 'cubic_meter', label: 'Cubic Meters (m\u00B3)', factor: 1 },
      { key: 'liter', label: 'Liters (L)', factor: 0.001 },
      { key: 'milliliter', label: 'Milliliters (ml)', factor: 0.000001 },
      { key: 'cubic_centimeter', label: 'Cubic Centimeters (cm\u00B3)', factor: 0.000001 },
      { key: 'cubic_foot', label: 'Cubic Feet (ft\u00B3)', factor: 0.0283168 },
      { key: 'cubic_inch', label: 'Cubic Inches (in\u00B3)', factor: 0.0000163871 },
      { key: 'gallon_us_liquid', label: 'Gallons (US liquid)', factor: 0.00378541 },
      { key: 'quart_us_liquid', label: 'Quarts (US liquid)', factor: 0.000946353 },
      { key: 'pint_us_liquid', label: 'Pints (US liquid)', factor: 0.000473176 },
      { key: 'fluid_ounce_us', label: 'Fluid Ounces (US fl oz)', factor: 0.0000295735 },
    ],
    baseUnitKey: 'cubic_meter',
    precision: 6,
  },
  temperature: {
    label: 'Temperature',
    icon: '\uD83C\uDF21',
    units: [
      { key: 'celsius', label: 'Celsius (\u00B0C)' },
      { key: 'fahrenheit', label: 'Fahrenheit (\u00B0F)' },
      { key: 'kelvin', label: 'Kelvin (K)' },
    ],
    baseUnitKey: 'celsius',
    precision: 2,
  },
  time: {
    label: 'Time',
    icon: '\u23F0',
    units: [
      { key: 'second', label: 'Seconds (s)', factor: 1 },
      { key: 'millisecond', label: 'Milliseconds (ms)', factor: 0.001 },
      { key: 'microsecond', label: 'Microseconds (\u00B5s)', factor: 0.000001 },
      { key: 'minute', label: 'Minutes (min)', factor: 60 },
      { key: 'hour', label: 'Hours (hr)', factor: 3600 },
      { key: 'day', label: 'Days (d)', factor: 86400 },
      { key: 'week', label: 'Weeks (wk)', factor: 604800 },
      { key: 'month', label: 'Months (approx)', factor: 2629746 },
      { key: 'year', label: 'Years (approx)', factor: 31556952 },
      { key: 'decade', label: 'Decades', factor: 315569520 },
      { key: 'century', label: 'Centuries', factor: 3155695200 },
    ],
    baseUnitKey: 'second',
    precision: 4,
  },
  speed: {
    label: 'Speed',
    icon: '\uD83D\uDCA8',
    units: [
      { key: 'meters_per_second', label: 'Meters/second (m/s)', factor: 1 },
      { key: 'kilometers_per_hour', label: 'Kilometers/hour (km/h)', factor: 1 / 3.6 },
      { key: 'miles_per_hour', label: 'Miles/hour (mph)', factor: 0.44704 },
      { key: 'knots', label: 'Knots (kn)', factor: 0.514444 },
      { key: 'foot_per_second', label: 'Feet/second (ft/s)', factor: 0.3048 },
    ],
    baseUnitKey: 'meters_per_second',
    precision: 4,
  },
  pressure: {
    label: 'Pressure',
    icon: '\uD83C\uDF00',
    units: [
      { key: 'pascal', label: 'Pascals (Pa)', factor: 1 },
      { key: 'kilopascal', label: 'Kilopascals (kPa)', factor: 1000 },
      { key: 'bar', label: 'Bar (bar)', factor: 100000 },
      { key: 'psi', label: 'Pounds/square inch (psi)', factor: 6894.76 },
      { key: 'atmosphere', label: 'Atmospheres (atm)', factor: 101325 },
      { key: 'torr', label: 'Torr (Torr)', factor: 133.322 },
    ],
    baseUnitKey: 'pascal',
    precision: 6,
  },
  power: {
    label: 'Power',
    icon: '\u26A1',
    units: [
      { key: 'watt', label: 'Watts (W)', factor: 1 },
      { key: 'kilowatt', label: 'Kilowatts (kW)', factor: 1000 },
      { key: 'horsepower_hp', label: 'Horsepower (hp)', factor: 745.7 },
      { key: 'foot_pound_per_minute', label: 'Foot-pounds/minute (ft-lb/min)', factor: 0.022597 },
      { key: 'btu_per_hour', label: 'BTUs/hour (BTU/hr)', factor: 0.293071 },
    ],
    baseUnitKey: 'watt',
    precision: 6,
  },
  energy: {
    label: 'Energy',
    icon: '\uD83D\uDCA1',
    units: [
      { key: 'joule', label: 'Joules (J)', factor: 1 },
      { key: 'kilojoule', label: 'Kilojoules (kJ)', factor: 1000 },
      { key: 'calorie', label: 'Calories (cal)', factor: 4.184 },
      { key: 'kilocalorie', label: 'Kilocalories (kcal)', factor: 4184 },
      { key: 'kilowatt_hour', label: 'Kilowatt-hours (kWh)', factor: 3600000 },
      { key: 'electronvolt', label: 'Electronvolts (eV)', factor: 1.60218e-19 },
      { key: 'btu', label: 'British Thermal Units (BTU)', factor: 1055.06 },
    ],
    baseUnitKey: 'joule',
    precision: 6,
  },
  data_storage: {
    label: 'Digital Storage',
    icon: '\uD83D\uDCBE',
    units: [
      { key: 'bit', label: 'Bits (b)', factor: 1 },
      { key: 'kilobit', label: 'Kilobits (kb)', factor: 1000 },
      { key: 'megabit', label: 'Megabits (Mb)', factor: 1000000 },
      { key: 'gigabit', label: 'Gigabits (Gb)', factor: 1000000000 },
      { key: 'terabit', label: 'Terabits (Tb)', factor: 1000000000000 },
      { key: 'byte', label: 'Bytes (B)', factor: 8 },
      { key: 'kilobyte', label: 'Kilobytes (KB)', factor: 8 * 1024 },
      { key: 'megabyte', label: 'Megabytes (MB)', factor: 8 * 1024 * 1024 },
      { key: 'gigabyte', label: 'Gigabytes (GB)', factor: 8 * 1024 * 1024 * 1024 },
      { key: 'terabyte', label: 'Terabytes (TB)', factor: 8 * 1024 * 1024 * 1024 * 1024 },
    ],
    baseUnitKey: 'bit',
    precision: 2,
  },
  force: {
    label: 'Force',
    icon: '\uD83D\uDCAA',
    units: [
      { key: 'newton', label: 'Newtons (N)', factor: 1 },
      { key: 'kilonewton', label: 'Kilonewtons (kN)', factor: 1000 },
      { key: 'pound_force', label: 'Pound-force (lbf)', factor: 4.44822 },
      { key: 'kilogram_force', label: 'Kilogram-force (kgf)', factor: 9.80665 },
      { key: 'dyne', label: 'Dynes (dyn)', factor: 0.00001 },
    ],
    baseUnitKey: 'newton',
    precision: 6,
  },
  angle: {
    label: 'Angle',
    icon: '\uD83D\uDCD0',
    units: [
      { key: 'degree', label: 'Degrees (\u00B0)', factor: 1 },
      { key: 'radian', label: 'Radians (rad)', factor: 180 / Math.PI },
      { key: 'gradian', label: 'Gradians (grad)', factor: 9 / 10 },
      { key: 'arcminute', label: 'Arcminutes (\u2032)', factor: 1 / 60 },
      { key: 'arcsecond', label: 'Arcseconds (\u2033)', factor: 1 / 3600 },
    ],
    baseUnitKey: 'degree',
    precision: 6,
  },
  fuel_economy: {
    label: 'Fuel Economy',
    icon: '\u26FD',
    units: [
      { key: 'mpg_us', label: 'Miles/gallon (US)', factor: 1 / 235.214583 },
      { key: 'mpg_uk', label: 'Miles/gallon (UK)', factor: 1 / 282.481 },
      { key: 'km_per_liter', label: 'Kilometers/liter (km/L)', factor: 100 },
      { key: 'liter_per_100km', label: 'Liters/100 km (L/100km)', factor: 1 },
      { key: 'liter_per_10km', label: 'Liters/10 km (L/10km)', factor: 10 },
    ],
    baseUnitKey: 'liter_per_100km',
    precision: 3,
  },
  frequency: {
    label: 'Frequency',
    icon: '\uD83D\uDCF1',
    units: [
      { key: 'hertz', label: 'Hertz (Hz)', factor: 1 },
      { key: 'kilohertz', label: 'Kilohertz (kHz)', factor: 1000 },
      { key: 'megahertz', label: 'Megahertz (MHz)', factor: 1000000 },
      { key: 'gigahertz', label: 'Gigahertz (GHz)', factor: 1000000000 },
      { key: 'revolutions_per_minute', label: 'Revolutions/minute (RPM)', factor: 1 / 60 },
    ],
    baseUnitKey: 'hertz',
    precision: 6,
  },
  density: {
    label: 'Density',
    icon: '\uD83E\uDDF1',
    units: [
      { key: 'kilogram_per_cubic_meter', label: 'Kilograms/cubic meter (kg/m\u00B3)', factor: 1 },
      { key: 'gram_per_cubic_centimeter', label: 'Grams/cubic centimeter (g/cm\u00B3)', factor: 1000 },
      { key: 'pound_per_cubic_foot', label: 'Pounds/cubic foot (lb/ft\u00B3)', factor: 16.0185 },
      { key: 'pound_per_cubic_inch', label: 'Pounds/cubic inch (lb/in\u00B3)', factor: 27679.9 },
    ],
    baseUnitKey: 'kilogram_per_cubic_meter',
    precision: 6,
  },
  torque: {
    label: 'Torque',
    icon: '\uD83D\uDD29',
    units: [
      { key: 'newton_meter', label: 'Newton-meters (N\u00B7m)', factor: 1 },
      { key: 'foot_pound', label: 'Foot-pounds (ft\u00B7lb)', factor: 1.35582 },
      { key: 'inch_pound', label: 'Inch-pounds (in\u00B7lb)', factor: 0.112985 },
      { key: 'kilogram_force_meter', label: 'Kilogram-force meters (kgf\u00B7m)', factor: 9.80665 },
    ],
    baseUnitKey: 'newton_meter',
    precision: 6,
  },
};

export function performUnitConversion(value: number, fromUnitKey: string, toUnitKey: string, unitType: string): number {
  if (isNaN(value) || value === 0) return 0;
  const category = UNIT_CONVERSION_DATA[unitType];
  if (!category) return NaN;
  if (unitType === 'temperature') {
    let valueInCelsius: number;
    if (fromUnitKey === 'celsius') valueInCelsius = value;
    else if (fromUnitKey === 'fahrenheit') valueInCelsius = (value - 32) * 5 / 9;
    else if (fromUnitKey === 'kelvin') valueInCelsius = value - 273.15;
    else return NaN;
    if (toUnitKey === 'celsius') return valueInCelsius;
    else if (toUnitKey === 'fahrenheit') return (valueInCelsius * 9 / 5) + 32;
    else if (toUnitKey === 'kelvin') return valueInCelsius + 273.15;
    else return NaN;
  }
  const fromUnit = category.units.find(u => u.key === fromUnitKey);
  const toUnit = category.units.find(u => u.key === toUnitKey);
  if (!fromUnit || !toUnit || fromUnit.factor === undefined || toUnit.factor === undefined) return NaN;
  const valueInBase = value * fromUnit.factor;
  return valueInBase / toUnit.factor;
}
