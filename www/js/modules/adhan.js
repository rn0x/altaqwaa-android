function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var Madhab = {
  Shafi: 'shafi',
  Hanafi: 'hanafi'
};
function shadowLength(madhab) {
  switch (madhab) {
    case Madhab.Shafi:
      return 1;

    case Madhab.Hanafi:
      return 2;

    default:
      throw 'Invalid Madhab';
  }
}

var HighLatitudeRule = {
  MiddleOfTheNight: 'middleofthenight',
  SeventhOfTheNight: 'seventhofthenight',
  TwilightAngle: 'twilightangle',
  recommended: function recommended(coordinates) {
    if (coordinates.latitude > 48) {
      return HighLatitudeRule.SeventhOfTheNight;
    } else {
      return HighLatitudeRule.MiddleOfTheNight;
    }
  }
};

var Coordinates = /*#__PURE__*/_createClass(function Coordinates(latitude, longitude) {
  _classCallCheck(this, Coordinates);

  this.latitude = latitude;
  this.longitude = longitude;
});

var Rounding = {
  Nearest: 'nearest',
  Up: 'up',
  None: 'none'
};

function dateByAddingDays(date, days) {
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate() + days;
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  return new Date(year, month, day, hours, minutes, seconds);
}
function dateByAddingMinutes(date, minutes) {
  return dateByAddingSeconds(date, minutes * 60);
}
function dateByAddingSeconds(date, seconds) {
  return new Date(date.getTime() + seconds * 1000);
}
function roundedMinute(date) {
  var rounding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Rounding.Nearest;
  var seconds = date.getUTCSeconds();
  var offset = seconds >= 30 ? 60 - seconds : -1 * seconds;

  if (rounding === Rounding.Up) {
    offset = 60 - seconds;
  } else if (rounding === Rounding.None) {
    offset = 0;
  }

  return dateByAddingSeconds(date, offset);
}
function dayOfYear(date) {
  var returnedDayOfYear = 0;
  var feb = Astronomical.isLeapYear(date.getFullYear()) ? 29 : 28;
  var months = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  for (var i = 0; i < date.getMonth(); i++) {
    returnedDayOfYear += months[i];
  }

  returnedDayOfYear += date.getDate();
  return returnedDayOfYear;
}
function isValidDate(date) {
  return date instanceof Date && !isNaN(date.valueOf());
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180.0;
}
function radiansToDegrees(radians) {
  return radians * 180.0 / Math.PI;
}
function normalizeToScale(num, max) {
  return num - max * Math.floor(num / max);
}
function unwindAngle(angle) {
  return normalizeToScale(angle, 360.0);
}
function quadrantShiftAngle(angle) {
  if (angle >= -180 && angle <= 180) {
    return angle;
  }

  return angle - 360 * Math.round(angle / 360);
}

// Shafaq is the twilight in the sky. Different madhabs define the appearance of
// twilight differently. These values are used by the MoonsightingComittee method
// for the different ways to calculate Isha.
var Shafaq = {
  // General is a combination of Ahmer and Abyad.
  General: 'general',
  // Ahmer means the twilight is the red glow in the sky. Used by the Shafi, Maliki, and Hanbali madhabs.
  Ahmer: 'ahmer',
  // Abyad means the twilight is the white glow in the sky. Used by the Hanafi madhab.
  Abyad: 'abyad'
};

/* eslint-disable max-params, max-lines */
var Astronomical = {
  /* The geometric mean longitude of the sun in degrees. */
  meanSolarLongitude: function meanSolarLongitude(julianCentury) {
    var T = julianCentury;
    /* Equation from Astronomical Algorithms page 163 */

    var term1 = 280.4664567;
    var term2 = 36000.76983 * T;
    var term3 = 0.0003032 * Math.pow(T, 2);
    var L0 = term1 + term2 + term3;
    return unwindAngle(L0);
  },

  /* The geometric mean longitude of the moon in degrees. */
  meanLunarLongitude: function meanLunarLongitude(julianCentury) {
    var T = julianCentury;
    /* Equation from Astronomical Algorithms page 144 */

    var term1 = 218.3165;
    var term2 = 481267.8813 * T;
    var Lp = term1 + term2;
    return unwindAngle(Lp);
  },
  ascendingLunarNodeLongitude: function ascendingLunarNodeLongitude(julianCentury) {
    var T = julianCentury;
    /* Equation from Astronomical Algorithms page 144 */

    var term1 = 125.04452;
    var term2 = 1934.136261 * T;
    var term3 = 0.0020708 * Math.pow(T, 2);
    var term4 = Math.pow(T, 3) / 450000;
    var Omega = term1 - term2 + term3 + term4;
    return unwindAngle(Omega);
  },

  /* The mean anomaly of the sun. */
  meanSolarAnomaly: function meanSolarAnomaly(julianCentury) {
    var T = julianCentury;
    /* Equation from Astronomical Algorithms page 163 */

    var term1 = 357.52911;
    var term2 = 35999.05029 * T;
    var term3 = 0.0001537 * Math.pow(T, 2);
    var M = term1 + term2 - term3;
    return unwindAngle(M);
  },

  /* The Sun's equation of the center in degrees. */
  solarEquationOfTheCenter: function solarEquationOfTheCenter(julianCentury, meanAnomaly) {
    var T = julianCentury;
    /* Equation from Astronomical Algorithms page 164 */

    var Mrad = degreesToRadians(meanAnomaly);
    var term1 = (1.914602 - 0.004817 * T - 0.000014 * Math.pow(T, 2)) * Math.sin(Mrad);
    var term2 = (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad);
    var term3 = 0.000289 * Math.sin(3 * Mrad);
    return term1 + term2 + term3;
  },

  /* The apparent longitude of the Sun, referred to the
        true equinox of the date. */
  apparentSolarLongitude: function apparentSolarLongitude(julianCentury, meanLongitude) {
    var T = julianCentury;
    var L0 = meanLongitude;
    /* Equation from Astronomical Algorithms page 164 */

    var longitude = L0 + Astronomical.solarEquationOfTheCenter(T, Astronomical.meanSolarAnomaly(T));
    var Omega = 125.04 - 1934.136 * T;
    var Lambda = longitude - 0.00569 - 0.00478 * Math.sin(degreesToRadians(Omega));
    return unwindAngle(Lambda);
  },

  /* The mean obliquity of the ecliptic, formula
        adopted by the International Astronomical Union.
        Represented in degrees. */
  meanObliquityOfTheEcliptic: function meanObliquityOfTheEcliptic(julianCentury) {
    var T = julianCentury;
    /* Equation from Astronomical Algorithms page 147 */

    var term1 = 23.439291;
    var term2 = 0.013004167 * T;
    var term3 = 0.0000001639 * Math.pow(T, 2);
    var term4 = 0.0000005036 * Math.pow(T, 3);
    return term1 - term2 - term3 + term4;
  },

  /* The mean obliquity of the ecliptic, corrected for
        calculating the apparent position of the sun, in degrees. */
  apparentObliquityOfTheEcliptic: function apparentObliquityOfTheEcliptic(julianCentury, meanObliquityOfTheEcliptic) {
    var T = julianCentury;
    var Epsilon0 = meanObliquityOfTheEcliptic;
    /* Equation from Astronomical Algorithms page 165 */

    var O = 125.04 - 1934.136 * T;
    return Epsilon0 + 0.00256 * Math.cos(degreesToRadians(O));
  },

  /* Mean sidereal time, the hour angle of the vernal equinox, in degrees. */
  meanSiderealTime: function meanSiderealTime(julianCentury) {
    var T = julianCentury;
    /* Equation from Astronomical Algorithms page 165 */

    var JD = T * 36525 + 2451545.0;
    var term1 = 280.46061837;
    var term2 = 360.98564736629 * (JD - 2451545);
    var term3 = 0.000387933 * Math.pow(T, 2);
    var term4 = Math.pow(T, 3) / 38710000;
    var Theta = term1 + term2 + term3 - term4;
    return unwindAngle(Theta);
  },
  nutationInLongitude: function nutationInLongitude(julianCentury, solarLongitude, lunarLongitude, ascendingNode) {
    var L0 = solarLongitude;
    var Lp = lunarLongitude;
    var Omega = ascendingNode;
    /* Equation from Astronomical Algorithms page 144 */

    var term1 = -17.2 / 3600 * Math.sin(degreesToRadians(Omega));
    var term2 = 1.32 / 3600 * Math.sin(2 * degreesToRadians(L0));
    var term3 = 0.23 / 3600 * Math.sin(2 * degreesToRadians(Lp));
    var term4 = 0.21 / 3600 * Math.sin(2 * degreesToRadians(Omega));
    return term1 - term2 - term3 + term4;
  },
  nutationInObliquity: function nutationInObliquity(julianCentury, solarLongitude, lunarLongitude, ascendingNode) {
    var L0 = solarLongitude;
    var Lp = lunarLongitude;
    var Omega = ascendingNode;
    /* Equation from Astronomical Algorithms page 144 */

    var term1 = 9.2 / 3600 * Math.cos(degreesToRadians(Omega));
    var term2 = 0.57 / 3600 * Math.cos(2 * degreesToRadians(L0));
    var term3 = 0.1 / 3600 * Math.cos(2 * degreesToRadians(Lp));
    var term4 = 0.09 / 3600 * Math.cos(2 * degreesToRadians(Omega));
    return term1 + term2 + term3 - term4;
  },
  altitudeOfCelestialBody: function altitudeOfCelestialBody(observerLatitude, declination, localHourAngle) {
    var Phi = observerLatitude;
    var delta = declination;
    var H = localHourAngle;
    /* Equation from Astronomical Algorithms page 93 */

    var term1 = Math.sin(degreesToRadians(Phi)) * Math.sin(degreesToRadians(delta));
    var term2 = Math.cos(degreesToRadians(Phi)) * Math.cos(degreesToRadians(delta)) * Math.cos(degreesToRadians(H));
    return radiansToDegrees(Math.asin(term1 + term2));
  },
  approximateTransit: function approximateTransit(longitude, siderealTime, rightAscension) {
    var L = longitude;
    var Theta0 = siderealTime;
    var a2 = rightAscension;
    /* Equation from page Astronomical Algorithms 102 */

    var Lw = L * -1;
    return normalizeToScale((a2 + Lw - Theta0) / 360, 1);
  },

  /* The time at which the sun is at its highest point in the sky (in universal time) */
  correctedTransit: function correctedTransit(approximateTransit, longitude, siderealTime, rightAscension, previousRightAscension, nextRightAscension) {
    var m0 = approximateTransit;
    var L = longitude;
    var Theta0 = siderealTime;
    var a2 = rightAscension;
    var a1 = previousRightAscension;
    var a3 = nextRightAscension;
    /* Equation from page Astronomical Algorithms 102 */

    var Lw = L * -1;
    var Theta = unwindAngle(Theta0 + 360.985647 * m0);
    var a = unwindAngle(Astronomical.interpolateAngles(a2, a1, a3, m0));
    var H = quadrantShiftAngle(Theta - Lw - a);
    var dm = H / -360;
    return (m0 + dm) * 24;
  },
  correctedHourAngle: function correctedHourAngle(approximateTransit, angle, coordinates, afterTransit, siderealTime, rightAscension, previousRightAscension, nextRightAscension, declination, previousDeclination, nextDeclination) {
    var m0 = approximateTransit;
    var h0 = angle;
    var Theta0 = siderealTime;
    var a2 = rightAscension;
    var a1 = previousRightAscension;
    var a3 = nextRightAscension;
    var d2 = declination;
    var d1 = previousDeclination;
    var d3 = nextDeclination;
    /* Equation from page Astronomical Algorithms 102 */

    var Lw = coordinates.longitude * -1;
    var term1 = Math.sin(degreesToRadians(h0)) - Math.sin(degreesToRadians(coordinates.latitude)) * Math.sin(degreesToRadians(d2));
    var term2 = Math.cos(degreesToRadians(coordinates.latitude)) * Math.cos(degreesToRadians(d2));
    var H0 = radiansToDegrees(Math.acos(term1 / term2));
    var m = afterTransit ? m0 + H0 / 360 : m0 - H0 / 360;
    var Theta = unwindAngle(Theta0 + 360.985647 * m);
    var a = unwindAngle(Astronomical.interpolateAngles(a2, a1, a3, m));
    var delta = Astronomical.interpolate(d2, d1, d3, m);
    var H = Theta - Lw - a;
    var h = Astronomical.altitudeOfCelestialBody(coordinates.latitude, delta, H);
    var term3 = h - h0;
    var term4 = 360 * Math.cos(degreesToRadians(delta)) * Math.cos(degreesToRadians(coordinates.latitude)) * Math.sin(degreesToRadians(H));
    var dm = term3 / term4;
    return (m + dm) * 24;
  },

  /* Interpolation of a value given equidistant
        previous and next values and a factor
        equal to the fraction of the interpolated
        point's time over the time between values. */
  interpolate: function interpolate(y2, y1, y3, n) {
    /* Equation from Astronomical Algorithms page 24 */
    var a = y2 - y1;
    var b = y3 - y2;
    var c = b - a;
    return y2 + n / 2 * (a + b + n * c);
  },

  /* Interpolation of three angles, accounting for
        angle unwinding. */
  interpolateAngles: function interpolateAngles(y2, y1, y3, n) {
    /* Equation from Astronomical Algorithms page 24 */
    var a = unwindAngle(y2 - y1);
    var b = unwindAngle(y3 - y2);
    var c = b - a;
    return y2 + n / 2 * (a + b + n * c);
  },

  /* The Julian Day for the given Gregorian date components. */
  julianDay: function julianDay(year, month, day) {
    var hours = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    /* Equation from Astronomical Algorithms page 60 */
    var trunc = Math.trunc;
    var Y = trunc(month > 2 ? year : year - 1);
    var M = trunc(month > 2 ? month : month + 12);
    var D = day + hours / 24;
    var A = trunc(Y / 100);
    var B = trunc(2 - A + trunc(A / 4));
    var i0 = trunc(365.25 * (Y + 4716));
    var i1 = trunc(30.6001 * (M + 1));
    return i0 + i1 + D + B - 1524.5;
  },

  /* Julian century from the epoch. */
  julianCentury: function julianCentury(julianDay) {
    /* Equation from Astronomical Algorithms page 163 */
    return (julianDay - 2451545.0) / 36525;
  },

  /* Whether or not a year is a leap year (has 366 days). */
  isLeapYear: function isLeapYear(year) {
    if (year % 4 !== 0) {
      return false;
    }

    if (year % 100 === 0 && year % 400 !== 0) {
      return false;
    }

    return true;
  },
  seasonAdjustedMorningTwilight: function seasonAdjustedMorningTwilight(latitude, dayOfYear, year, sunrise) {
    var a = 75 + 28.65 / 55.0 * Math.abs(latitude);
    var b = 75 + 19.44 / 55.0 * Math.abs(latitude);
    var c = 75 + 32.74 / 55.0 * Math.abs(latitude);
    var d = 75 + 48.1 / 55.0 * Math.abs(latitude);

    var adjustment = function () {
      var dyy = Astronomical.daysSinceSolstice(dayOfYear, year, latitude);

      if (dyy < 91) {
        return a + (b - a) / 91.0 * dyy;
      } else if (dyy < 137) {
        return b + (c - b) / 46.0 * (dyy - 91);
      } else if (dyy < 183) {
        return c + (d - c) / 46.0 * (dyy - 137);
      } else if (dyy < 229) {
        return d + (c - d) / 46.0 * (dyy - 183);
      } else if (dyy < 275) {
        return c + (b - c) / 46.0 * (dyy - 229);
      } else {
        return b + (a - b) / 91.0 * (dyy - 275);
      }
    }();

    return dateByAddingSeconds(sunrise, Math.round(adjustment * -60.0));
  },
  seasonAdjustedEveningTwilight: function seasonAdjustedEveningTwilight(latitude, dayOfYear, year, sunset, shafaq) {
    var a, b, c, d;

    if (shafaq === Shafaq.Ahmer) {
      a = 62 + 17.4 / 55.0 * Math.abs(latitude);
      b = 62 - 7.16 / 55.0 * Math.abs(latitude);
      c = 62 + 5.12 / 55.0 * Math.abs(latitude);
      d = 62 + 19.44 / 55.0 * Math.abs(latitude);
    } else if (shafaq === Shafaq.Abyad) {
      a = 75 + 25.6 / 55.0 * Math.abs(latitude);
      b = 75 + 7.16 / 55.0 * Math.abs(latitude);
      c = 75 + 36.84 / 55.0 * Math.abs(latitude);
      d = 75 + 81.84 / 55.0 * Math.abs(latitude);
    } else {
      a = 75 + 25.6 / 55.0 * Math.abs(latitude);
      b = 75 + 2.05 / 55.0 * Math.abs(latitude);
      c = 75 - 9.21 / 55.0 * Math.abs(latitude);
      d = 75 + 6.14 / 55.0 * Math.abs(latitude);
    }

    var adjustment = function () {
      var dyy = Astronomical.daysSinceSolstice(dayOfYear, year, latitude);

      if (dyy < 91) {
        return a + (b - a) / 91.0 * dyy;
      } else if (dyy < 137) {
        return b + (c - b) / 46.0 * (dyy - 91);
      } else if (dyy < 183) {
        return c + (d - c) / 46.0 * (dyy - 137);
      } else if (dyy < 229) {
        return d + (c - d) / 46.0 * (dyy - 183);
      } else if (dyy < 275) {
        return c + (b - c) / 46.0 * (dyy - 229);
      } else {
        return b + (a - b) / 91.0 * (dyy - 275);
      }
    }();

    return dateByAddingSeconds(sunset, Math.round(adjustment * 60.0));
  },
  daysSinceSolstice: function daysSinceSolstice(dayOfYear, year, latitude) {
    var daysSinceSolstice = 0;
    var northernOffset = 10;
    var southernOffset = Astronomical.isLeapYear(year) ? 173 : 172;
    var daysInYear = Astronomical.isLeapYear(year) ? 366 : 365;

    if (latitude >= 0) {
      daysSinceSolstice = dayOfYear + northernOffset;

      if (daysSinceSolstice >= daysInYear) {
        daysSinceSolstice = daysSinceSolstice - daysInYear;
      }
    } else {
      daysSinceSolstice = dayOfYear - southernOffset;

      if (daysSinceSolstice < 0) {
        daysSinceSolstice = daysSinceSolstice + daysInYear;
      }
    }

    return daysSinceSolstice;
  }
};

var SolarCoordinates = /*#__PURE__*/_createClass(function SolarCoordinates(julianDay) {
  _classCallCheck(this, SolarCoordinates);

  var T = Astronomical.julianCentury(julianDay);
  var L0 = Astronomical.meanSolarLongitude(T);
  var Lp = Astronomical.meanLunarLongitude(T);
  var Omega = Astronomical.ascendingLunarNodeLongitude(T);
  var Lambda = degreesToRadians(Astronomical.apparentSolarLongitude(T, L0));
  var Theta0 = Astronomical.meanSiderealTime(T);
  var dPsi = Astronomical.nutationInLongitude(T, L0, Lp, Omega);
  var dEpsilon = Astronomical.nutationInObliquity(T, L0, Lp, Omega);
  var Epsilon0 = Astronomical.meanObliquityOfTheEcliptic(T);
  var EpsilonApparent = degreesToRadians(Astronomical.apparentObliquityOfTheEcliptic(T, Epsilon0));
  /* declination: The declination of the sun, the angle between
          the rays of the Sun and the plane of the Earth's
          equator, in degrees.
          Equation from Astronomical Algorithms page 165 */

  this.declination = radiansToDegrees(Math.asin(Math.sin(EpsilonApparent) * Math.sin(Lambda)));
  /* rightAscension: Right ascension of the Sun, the angular distance on the
          celestial equator from the vernal equinox to the hour circle,
          in degrees.
          Equation from Astronomical Algorithms page 165 */

  this.rightAscension = unwindAngle(radiansToDegrees(Math.atan2(Math.cos(EpsilonApparent) * Math.sin(Lambda), Math.cos(Lambda))));
  /* apparentSiderealTime: Apparent sidereal time, the hour angle of the vernal
          equinox, in degrees.
          Equation from Astronomical Algorithms page 88 */

  this.apparentSiderealTime = Theta0 + dPsi * 3600 * Math.cos(degreesToRadians(Epsilon0 + dEpsilon)) / 3600;
});

var SolarTime = /*#__PURE__*/function () {
  function SolarTime(date, coordinates) {
    _classCallCheck(this, SolarTime);

    var julianDay = Astronomical.julianDay(date.getFullYear(), date.getMonth() + 1, date.getDate(), 0);
    this.observer = coordinates;
    this.solar = new SolarCoordinates(julianDay);
    this.prevSolar = new SolarCoordinates(julianDay - 1);
    this.nextSolar = new SolarCoordinates(julianDay + 1);
    var m0 = Astronomical.approximateTransit(coordinates.longitude, this.solar.apparentSiderealTime, this.solar.rightAscension);
    var solarAltitude = -50.0 / 60.0;
    this.approxTransit = m0;
    this.transit = Astronomical.correctedTransit(m0, coordinates.longitude, this.solar.apparentSiderealTime, this.solar.rightAscension, this.prevSolar.rightAscension, this.nextSolar.rightAscension);
    this.sunrise = Astronomical.correctedHourAngle(m0, solarAltitude, coordinates, false, this.solar.apparentSiderealTime, this.solar.rightAscension, this.prevSolar.rightAscension, this.nextSolar.rightAscension, this.solar.declination, this.prevSolar.declination, this.nextSolar.declination);
    this.sunset = Astronomical.correctedHourAngle(m0, solarAltitude, coordinates, true, this.solar.apparentSiderealTime, this.solar.rightAscension, this.prevSolar.rightAscension, this.nextSolar.rightAscension, this.solar.declination, this.prevSolar.declination, this.nextSolar.declination);
  }

  _createClass(SolarTime, [{
    key: "hourAngle",
    value: function hourAngle(angle, afterTransit) {
      return Astronomical.correctedHourAngle(this.approxTransit, angle, this.observer, afterTransit, this.solar.apparentSiderealTime, this.solar.rightAscension, this.prevSolar.rightAscension, this.nextSolar.rightAscension, this.solar.declination, this.prevSolar.declination, this.nextSolar.declination);
    }
  }, {
    key: "afternoon",
    value: function afternoon(shadowLength) {
      // TODO source shadow angle calculation
      var tangent = Math.abs(this.observer.latitude - this.solar.declination);
      var inverse = shadowLength + Math.tan(degreesToRadians(tangent));
      var angle = radiansToDegrees(Math.atan(1.0 / inverse));
      return this.hourAngle(angle, true);
    }
  }]);

  return SolarTime;
}();

var PolarCircleResolution = {
  AqrabBalad: 'AqrabBalad',
  AqrabYaum: 'AqrabYaum',
  Unresolved: 'Unresolved'
};
var LATITUDE_VARIATION_STEP = 0.5; // Degrees to add/remove at each resolution step

var UNSAFE_LATITUDE = 65; // Based on https://en.wikipedia.org/wiki/Midnight_sun

var isValidSolarTime = function isValidSolarTime(solarTime) {
  return !isNaN(solarTime.sunrise) && !isNaN(solarTime.sunset);
};

var aqrabYaumResolver = function aqrabYaumResolver(coordinates, date) {
  var daysAdded = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var direction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  if (daysAdded > Math.ceil(365 / 2)) {
    return null;
  }

  var testDate = new Date(date.getTime());
  testDate.setDate(testDate.getDate() + direction * daysAdded);
  var tomorrow = dateByAddingDays(testDate, 1);
  var solarTime = new SolarTime(testDate, coordinates);
  var tomorrowSolarTime = new SolarTime(tomorrow, coordinates);

  if (!isValidSolarTime(solarTime) || !isValidSolarTime(tomorrowSolarTime)) {
    return aqrabYaumResolver(coordinates, date, daysAdded + (direction > 0 ? 0 : 1), -direction);
  }

  return {
    date: date,
    tomorrow: tomorrow,
    coordinates: coordinates,
    solarTime: solarTime,
    tomorrowSolarTime: tomorrowSolarTime
  };
};

var aqrabBaladResolver = function aqrabBaladResolver(coordinates, date, latitude) {
  var solarTime = new SolarTime(date, _objectSpread2(_objectSpread2({}, coordinates), {}, {
    latitude: latitude
  }));
  var tomorrow = dateByAddingDays(date, 1);
  var tomorrowSolarTime = new SolarTime(tomorrow, _objectSpread2(_objectSpread2({}, coordinates), {}, {
    latitude: latitude
  }));

  if (!isValidSolarTime(solarTime) || !isValidSolarTime(tomorrowSolarTime)) {
    return Math.abs(latitude) >= UNSAFE_LATITUDE ? aqrabBaladResolver(coordinates, date, latitude - Math.sign(latitude) * LATITUDE_VARIATION_STEP) : null;
  }

  return {
    date: date,
    tomorrow: tomorrow,
    coordinates: new Coordinates(latitude, coordinates.longitude),
    solarTime: solarTime,
    tomorrowSolarTime: tomorrowSolarTime
  };
};

var polarCircleResolvedValues = function polarCircleResolvedValues(resolver, date, coordinates) {
  var defaultReturn = {
    date: date,
    tomorrow: dateByAddingDays(date, 1),
    coordinates: coordinates,
    solarTime: new SolarTime(date, coordinates),
    tomorrowSolarTime: new SolarTime(dateByAddingDays(date, 1), coordinates)
  };

  switch (resolver) {
    case PolarCircleResolution.AqrabYaum:
      {
        return aqrabYaumResolver(coordinates, date) || defaultReturn;
      }

    case PolarCircleResolution.AqrabBalad:
      {
        var latitude = coordinates.latitude;
        return aqrabBaladResolver(coordinates, date, latitude - Math.sign(latitude) * LATITUDE_VARIATION_STEP) || defaultReturn;
      }

    default:
      {
        return defaultReturn;
      }
  }
};

var CalculationParameters = /*#__PURE__*/function () {
  // Madhab to determine how Asr is calculated.
  // Rule to determine the earliest time for Fajr and latest time for Isha
  // needed for high latitude locations where Fajr and Isha may not truly exist
  // or may present a hardship unless bound to a reasonable time.
  // Manual adjustments (in minutes) to be added to each prayer time.
  // Adjustments set by a calculation method. This value should not be manually modified.
  // Rule to determine how to resolve prayer times inside the Polar Circle
  // where daylight or night may persist for more than 24 hours depending
  // on the season
  // How seconds are rounded when calculating prayer times
  // Used by the MoonsightingCommittee method to determine how to calculate Isha
  function CalculationParameters( // Name of the method, can be used to apply special behavior in calculations.
  // This property should not be manually modified.
  method) {
    var fajrAngle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var ishaAngle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var ishaInterval = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var maghribAngle = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    _classCallCheck(this, CalculationParameters);

    _defineProperty(this, "madhab", Madhab.Shafi);

    _defineProperty(this, "highLatitudeRule", HighLatitudeRule.MiddleOfTheNight);

    _defineProperty(this, "adjustments", {
      fajr: 0,
      sunrise: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0
    });

    _defineProperty(this, "methodAdjustments", {
      fajr: 0,
      sunrise: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0
    });

    _defineProperty(this, "polarCircleResolution", PolarCircleResolution.Unresolved);

    _defineProperty(this, "rounding", Rounding.Nearest);

    _defineProperty(this, "shafaq", Shafaq.General);

    this.method = method;
    this.fajrAngle = fajrAngle;
    this.ishaAngle = ishaAngle;
    this.ishaInterval = ishaInterval;
    this.maghribAngle = maghribAngle;

    if (this.method === null) {
      // we don't want a breaking change
      this.method = 'Other';
    }
  }

  _createClass(CalculationParameters, [{
    key: "nightPortions",
    value: function nightPortions() {
      switch (this.highLatitudeRule) {
        case HighLatitudeRule.MiddleOfTheNight:
          return {
            fajr: 1 / 2,
            isha: 1 / 2
          };

        case HighLatitudeRule.SeventhOfTheNight:
          return {
            fajr: 1 / 7,
            isha: 1 / 7
          };

        case HighLatitudeRule.TwilightAngle:
          return {
            fajr: this.fajrAngle / 60,
            isha: this.ishaAngle / 60
          };

        default:
          throw "Invalid high latitude rule found when attempting to compute night portions: ".concat(this.highLatitudeRule);
      }
    }
  }]);

  return CalculationParameters;
}();

var CalculationMethod = {
  // Muslim World League
  MuslimWorldLeague: function MuslimWorldLeague() {
    var params = new CalculationParameters('MuslimWorldLeague', 18, 17);
    params.methodAdjustments.dhuhr = 1;
    return params;
  },
  // Egyptian General Authority of Survey
  Egyptian: function Egyptian() {
    var params = new CalculationParameters('Egyptian', 19.5, 17.5);
    params.methodAdjustments.dhuhr = 1;
    return params;
  },
  // University of Islamic Sciences, Karachi
  Karachi: function Karachi() {
    var params = new CalculationParameters('Karachi', 18, 18);
    params.methodAdjustments.dhuhr = 1;
    return params;
  },
  // Umm al-Qura University, Makkah
  UmmAlQura: function UmmAlQura() {
    return new CalculationParameters('UmmAlQura', 18.5, 0, 90);
  },
  // Dubai
  Dubai: function Dubai() {
    var params = new CalculationParameters('Dubai', 18.2, 18.2);
    params.methodAdjustments = _objectSpread2(_objectSpread2({}, params.methodAdjustments), {}, {
      sunrise: -3,
      dhuhr: 3,
      asr: 3,
      maghrib: 3
    });
    return params;
  },
  // Moonsighting Committee
  MoonsightingCommittee: function MoonsightingCommittee() {
    var params = new CalculationParameters('MoonsightingCommittee', 18, 18);
    params.methodAdjustments = _objectSpread2(_objectSpread2({}, params.methodAdjustments), {}, {
      dhuhr: 5,
      maghrib: 3
    });
    return params;
  },
  // ISNA
  NorthAmerica: function NorthAmerica() {
    var params = new CalculationParameters('NorthAmerica', 15, 15);
    params.methodAdjustments.dhuhr = 1;
    return params;
  },
  // Kuwait
  Kuwait: function Kuwait() {
    return new CalculationParameters('Kuwait', 18, 17.5);
  },
  // Qatar
  Qatar: function Qatar() {
    return new CalculationParameters('Qatar', 18, 0, 90);
  },
  // Singapore
  Singapore: function Singapore() {
    var params = new CalculationParameters('Singapore', 20, 18);
    params.methodAdjustments.dhuhr = 1;
    params.rounding = Rounding.Up;
    return params;
  },
  // Institute of Geophysics, University of Tehran
  Tehran: function Tehran() {
    var params = new CalculationParameters('Tehran', 17.7, 14, 0, 4.5);
    return params;
  },
  // Dianet
  Turkey: function Turkey() {
    var params = new CalculationParameters('Turkey', 18, 17);
    params.methodAdjustments = _objectSpread2(_objectSpread2({}, params.methodAdjustments), {}, {
      sunrise: -7,
      dhuhr: 5,
      asr: 4,
      maghrib: 7
    });
    return params;
  },
  // Other
  Other: function Other() {
    return new CalculationParameters('Other', 0, 0);
  }
};

var Prayer = {
  Fajr: 'fajr',
  Sunrise: 'sunrise',
  Dhuhr: 'dhuhr',
  Asr: 'asr',
  Maghrib: 'maghrib',
  Isha: 'isha',
  None: 'none'
};

var TimeComponents = /*#__PURE__*/function () {
  function TimeComponents(num) {
    _classCallCheck(this, TimeComponents);

    this.hours = Math.floor(num);
    this.minutes = Math.floor((num - this.hours) * 60);
    this.seconds = Math.floor((num - (this.hours + this.minutes / 60)) * 60 * 60);
    return this;
  }

  _createClass(TimeComponents, [{
    key: "utcDate",
    value: function utcDate(year, month, date) {
      return new Date(Date.UTC(year, month, date, this.hours, this.minutes, this.seconds));
    }
  }]);

  return TimeComponents;
}();

var PrayerTimes = /*#__PURE__*/function () {
  // eslint-disable-next-line complexity
  function PrayerTimes(coordinates, date, calculationParameters) {
    _classCallCheck(this, PrayerTimes);

    this.coordinates = coordinates;
    this.date = date;
    this.calculationParameters = calculationParameters;
    var solarTime = new SolarTime(date, coordinates);
    var fajrTime;
    var sunriseTime;
    var dhuhrTime;
    var asrTime;
    var sunsetTime;
    var maghribTime;
    var ishaTime;
    var nightFraction;
    dhuhrTime = new TimeComponents(solarTime.transit).utcDate(date.getFullYear(), date.getMonth(), date.getDate());
    sunriseTime = new TimeComponents(solarTime.sunrise).utcDate(date.getFullYear(), date.getMonth(), date.getDate());
    sunsetTime = new TimeComponents(solarTime.sunset).utcDate(date.getFullYear(), date.getMonth(), date.getDate());
    var tomorrow = dateByAddingDays(date, 1);
    var tomorrowSolarTime = new SolarTime(tomorrow, coordinates);
    var polarCircleResolver = calculationParameters.polarCircleResolution;

    if ((!isValidDate(sunriseTime) || !isValidDate(sunsetTime) || isNaN(tomorrowSolarTime.sunrise)) && polarCircleResolver !== PolarCircleResolution.Unresolved) {
      var _TimeComponents, _TimeComponents2, _TimeComponents3;

      var resolved = polarCircleResolvedValues(polarCircleResolver, date, coordinates);
      solarTime = resolved.solarTime;
      tomorrowSolarTime = resolved.tomorrowSolarTime;
      var dateComponents = [date.getFullYear(), date.getMonth(), date.getDate()];
      dhuhrTime = (_TimeComponents = new TimeComponents(solarTime.transit)).utcDate.apply(_TimeComponents, dateComponents);
      sunriseTime = (_TimeComponents2 = new TimeComponents(solarTime.sunrise)).utcDate.apply(_TimeComponents2, dateComponents);
      sunsetTime = (_TimeComponents3 = new TimeComponents(solarTime.sunset)).utcDate.apply(_TimeComponents3, dateComponents);
    } // eslint-disable-next-line prefer-const


    asrTime = new TimeComponents(solarTime.afternoon(shadowLength(calculationParameters.madhab))).utcDate(date.getFullYear(), date.getMonth(), date.getDate());
    var tomorrowSunrise = new TimeComponents(tomorrowSolarTime.sunrise).utcDate(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
    var night = (Number(tomorrowSunrise) - Number(sunsetTime)) / 1000;
    fajrTime = new TimeComponents(solarTime.hourAngle(-1 * calculationParameters.fajrAngle, false)).utcDate(date.getFullYear(), date.getMonth(), date.getDate()); // special case for moonsighting committee above latitude 55

    if (calculationParameters.method === 'MoonsightingCommittee' && coordinates.latitude >= 55) {
      nightFraction = night / 7;
      fajrTime = dateByAddingSeconds(sunriseTime, -nightFraction);
    }

    var safeFajr = function () {
      if (calculationParameters.method === 'MoonsightingCommittee') {
        return Astronomical.seasonAdjustedMorningTwilight(coordinates.latitude, dayOfYear(date), date.getFullYear(), sunriseTime);
      } else {
        var portion = calculationParameters.nightPortions().fajr;
        nightFraction = portion * night;
        return dateByAddingSeconds(sunriseTime, -nightFraction);
      }
    }();

    if (isNaN(fajrTime.getTime()) || safeFajr > fajrTime) {
      fajrTime = safeFajr;
    }

    if (calculationParameters.ishaInterval > 0) {
      ishaTime = dateByAddingMinutes(sunsetTime, calculationParameters.ishaInterval);
    } else {
      ishaTime = new TimeComponents(solarTime.hourAngle(-1 * calculationParameters.ishaAngle, true)).utcDate(date.getFullYear(), date.getMonth(), date.getDate()); // special case for moonsighting committee above latitude 55

      if (calculationParameters.method === 'MoonsightingCommittee' && coordinates.latitude >= 55) {
        nightFraction = night / 7;
        ishaTime = dateByAddingSeconds(sunsetTime, nightFraction);
      }

      var safeIsha = function () {
        if (calculationParameters.method === 'MoonsightingCommittee') {
          return Astronomical.seasonAdjustedEveningTwilight(coordinates.latitude, dayOfYear(date), date.getFullYear(), sunsetTime, calculationParameters.shafaq);
        } else {
          var portion = calculationParameters.nightPortions().isha;
          nightFraction = portion * night;
          return dateByAddingSeconds(sunsetTime, nightFraction);
        }
      }();

      if (isNaN(ishaTime.getTime()) || safeIsha < ishaTime) {
        ishaTime = safeIsha;
      }
    }

    maghribTime = sunsetTime;

    if (calculationParameters.maghribAngle) {
      var angleBasedMaghrib = new TimeComponents(solarTime.hourAngle(-1 * calculationParameters.maghribAngle, true)).utcDate(date.getFullYear(), date.getMonth(), date.getDate());

      if (sunsetTime < angleBasedMaghrib && ishaTime > angleBasedMaghrib) {
        maghribTime = angleBasedMaghrib;
      }
    }

    var fajrAdjustment = (calculationParameters.adjustments.fajr || 0) + (calculationParameters.methodAdjustments.fajr || 0);
    var sunriseAdjustment = (calculationParameters.adjustments.sunrise || 0) + (calculationParameters.methodAdjustments.sunrise || 0);
    var dhuhrAdjustment = (calculationParameters.adjustments.dhuhr || 0) + (calculationParameters.methodAdjustments.dhuhr || 0);
    var asrAdjustment = (calculationParameters.adjustments.asr || 0) + (calculationParameters.methodAdjustments.asr || 0);
    var maghribAdjustment = (calculationParameters.adjustments.maghrib || 0) + (calculationParameters.methodAdjustments.maghrib || 0);
    var ishaAdjustment = (calculationParameters.adjustments.isha || 0) + (calculationParameters.methodAdjustments.isha || 0);
    this.fajr = roundedMinute(dateByAddingMinutes(fajrTime, fajrAdjustment), calculationParameters.rounding);
    this.sunrise = roundedMinute(dateByAddingMinutes(sunriseTime, sunriseAdjustment), calculationParameters.rounding);
    this.dhuhr = roundedMinute(dateByAddingMinutes(dhuhrTime, dhuhrAdjustment), calculationParameters.rounding);
    this.asr = roundedMinute(dateByAddingMinutes(asrTime, asrAdjustment), calculationParameters.rounding);
    this.sunset = roundedMinute(sunsetTime, calculationParameters.rounding);
    this.maghrib = roundedMinute(dateByAddingMinutes(maghribTime, maghribAdjustment), calculationParameters.rounding);
    this.isha = roundedMinute(dateByAddingMinutes(ishaTime, ishaAdjustment), calculationParameters.rounding);
  }

  _createClass(PrayerTimes, [{
    key: "timeForPrayer",
    value: function timeForPrayer(prayer) {
      if (prayer === Prayer.Fajr) {
        return this.fajr;
      } else if (prayer === Prayer.Sunrise) {
        return this.sunrise;
      } else if (prayer === Prayer.Dhuhr) {
        return this.dhuhr;
      } else if (prayer === Prayer.Asr) {
        return this.asr;
      } else if (prayer === Prayer.Maghrib) {
        return this.maghrib;
      } else if (prayer === Prayer.Isha) {
        return this.isha;
      } else {
        return null;
      }
    }
  }, {
    key: "currentPrayer",
    value: function currentPrayer() {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

      if (date >= this.isha) {
        return Prayer.Isha;
      } else if (date >= this.maghrib) {
        return Prayer.Maghrib;
      } else if (date >= this.asr) {
        return Prayer.Asr;
      } else if (date >= this.dhuhr) {
        return Prayer.Dhuhr;
      } else if (date >= this.sunrise) {
        return Prayer.Sunrise;
      } else if (date >= this.fajr) {
        return Prayer.Fajr;
      } else {
        return Prayer.None;
      }
    }
  }, {
    key: "nextPrayer",
    value: function nextPrayer() {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

      if (date >= this.isha) {
        return Prayer.None;
      } else if (date >= this.maghrib) {
        return Prayer.Isha;
      } else if (date >= this.asr) {
        return Prayer.Maghrib;
      } else if (date >= this.dhuhr) {
        return Prayer.Asr;
      } else if (date >= this.sunrise) {
        return Prayer.Dhuhr;
      } else if (date >= this.fajr) {
        return Prayer.Sunrise;
      } else {
        return Prayer.Fajr;
      }
    }
  }]);

  return PrayerTimes;
}();

function qibla(coordinates) {
  var makkah = new Coordinates(21.4225241, 39.8261818); // Equation from "Spherical Trigonometry For the use of colleges and schools" page 50

  var term1 = Math.sin(degreesToRadians(makkah.longitude) - degreesToRadians(coordinates.longitude));
  var term2 = Math.cos(degreesToRadians(coordinates.latitude)) * Math.tan(degreesToRadians(makkah.latitude));
  var term3 = Math.sin(degreesToRadians(coordinates.latitude)) * Math.cos(degreesToRadians(makkah.longitude) - degreesToRadians(coordinates.longitude));
  var angle = Math.atan2(term1, term2 - term3);
  return unwindAngle(radiansToDegrees(angle));
}

var SunnahTimes = /*#__PURE__*/_createClass(function SunnahTimes(prayerTimes) {
  _classCallCheck(this, SunnahTimes);

  var date = prayerTimes.date;
  var nextDay = dateByAddingDays(date, 1);
  var nextDayPrayerTimes = new PrayerTimes(prayerTimes.coordinates, nextDay, prayerTimes.calculationParameters);
  var nightDuration = (nextDayPrayerTimes.fajr.getTime() - prayerTimes.maghrib.getTime()) / 1000.0;
  this.middleOfTheNight = roundedMinute(dateByAddingSeconds(prayerTimes.maghrib, nightDuration / 2));
  this.lastThirdOfTheNight = roundedMinute(dateByAddingSeconds(prayerTimes.maghrib, nightDuration * (2 / 3)));
});

export { CalculationMethod, CalculationParameters, Coordinates, HighLatitudeRule, Madhab, PolarCircleResolution, Prayer, PrayerTimes, qibla as Qibla, Rounding, Shafaq, SunnahTimes };
//# sourceMappingURL=adhan.esm.js.map
