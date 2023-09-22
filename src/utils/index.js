// Re-export ts utils.
export { getAuthenticated, getCookie, getFieldNames, getMainVariables, getSecureMutation, getSecureQuery, getTables, getVariables, get_p_tguid, guidToClassName, setCookie, setVariables } from "./utils";

export const unflatten = function (data) {
  "use strict";
  if (Object(data) !== data || Array.isArray(data))
    return data;
  var result = {}, cur, prop, idx, last, temp;
  for (var p in data) {
    cur = result, prop = "", last = 0;
    do {
      idx = p.indexOf(".", last);
      temp = p.substring(last, idx !== -1 ? idx : undefined);
      cur = cur[prop] || (cur[prop] = (!isNaN(parseInt(temp)) ? [] : {}));
      prop = temp;
      last = idx + 1;
    } while (idx >= 0);
    cur[prop] = data[p];
  }
  return result[""];
}

export const flatten = function (data) {
  var result = {};
  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++)
        recurse(cur[i], prop ? prop + "." + i : "" + i);
      if (l == 0)
        result[prop] = [];
    } else {
      var isEmpty = true;
      for (var p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? prop + "." + p : p);
      }
      if (isEmpty)
        result[prop] = {};
    }
  }
  recurse(data, "");
  return result;
}

/**
 * Flattens the data similarly to flatten() but preserves the names of the original unflattened object's keys
 * @param {*} data 
 * @returns 
 */
export const flatten2 = function (data) {
  const o = flatten(data)
  Object.keys(o).forEach(key => {
    const newKey = key.split('.').pop()
    delete Object.assign(o, { [newKey]: o[key] })[key]
  })

  return o
}

export const isEmptyObject = (obj) => typeof obj !== 'object' || obj == null || Object.keys(obj).length === 0;

export const isMobile = () => window.matchMedia && window.matchMedia("(max-width: 992px)").matches;

export const tile2long = (x, z) => {
  return x / Math.pow(2, z) * 360 - 180;
}

export const tile2lat = (y, z) => {
  var n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
  return 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
}

export const lon2tile = (lon, zoom) => Math.floor((lon + 180) / 360 * Math.pow(2, zoom))

export const lat2tile = (lat, zoom) => Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom))


const EARTH_CIR_METERS = 40075016.686;
const degreesPerMeter = 360 / EARTH_CIR_METERS;

export const toRadians = (degrees) => {
  return degrees * Math.PI / 180;
}

// width and height must correspond to the iframe width/height
export const latLngToBounds = (lat, lng, zoom, width, height) => {
  const metersPerPixelEW = EARTH_CIR_METERS / Math.pow(2, zoom + 8);
  const metersPerPixelNS = EARTH_CIR_METERS / Math.pow(2, zoom + 8) * Math.cos(toRadians(lat));

  const shiftMetersEW = width / 2 * metersPerPixelEW;
  const shiftMetersNS = height / 2 * metersPerPixelNS;

  const shiftDegreesEW = shiftMetersEW * degreesPerMeter;
  const shiftDegreesNS = shiftMetersNS * degreesPerMeter;

  return {
    south: lat - shiftDegreesNS,
    west: lng - shiftDegreesEW,
    north: lat + shiftDegreesNS,
    east: lng + shiftDegreesEW
  }
}