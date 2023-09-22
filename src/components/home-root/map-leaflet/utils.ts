import { Feature, FeatureCollection } from "geojson";
import * as L from 'leaflet';
import { LatLngTuple } from "leaflet";
import { homeRootQuery$data } from '../../home-root/__generated__/homeRootQuery.graphql'; // eslint-disable-line 

export function isNumberArray(value: unknown): value is number[] {
  return (
    Array.isArray(value)
    && value.every((element) => typeof element === "number")
  );
}

export function isPoint(value: any): value is GeoJSON.Point {  // eslint-disable-line
  return (
    "type" in value
    && "coordinates" in value
    && value.type === "Point"
  );
}

export function isLatLngTuple(value: unknown): value is L.LatLngTuple {  // eslint-disable-line
  return (
    isNumberArray(value)
    && value.length === 2
  );
}

export function toGeoJSON(data: homeRootQuery$data): FeatureCollection {
  const locations: FeatureCollection = {
    type: "FeatureCollection",
    features: [],
  }

  data.base_viewer_connection?.edges.map((edge) => {
    edge.node.feature && locations.features.push(edge.node.feature)
  })

  return locations
}

export function getCurrentLocationAsFeatureCollection(): FeatureCollection {
  const currentLocation: FeatureCollection = {
    type: "FeatureCollection",
    features: [],
  };

  const feature: Feature = {
    id: "x",
    type: "Feature" as "Feature",
    geometry: {
      type: "Point" as "Point",
      coordinates: [
        30.5147,
        50.4649,
      ],
    },
    properties: {
      job_title: "My location",
      organisation_logo: "",
      organisation_name: "",
      organisation_description: "",
    },
  };

  currentLocation.features.push(feature);
  return currentLocation;
}

export function getCurrentLocationAsLatLngTuple(): LatLngTuple {
  const currentLocation: LatLngTuple = [
    Number(process.env.REACT_APP_DEFAULT_LATITUDE),
    Number(process.env.REACT_APP_DEFAULT_LONGITUDE),
  ];

  return currentLocation;
}

export function getBounds(mapRef: any) {
  const bounds = mapRef?.getBounds()
  if (!bounds) return

  const center = bounds.getCenter()
  if (!center) return

  const eastBound = bounds.getEast()
  const northBound = bounds.getNorth()
  const centerEast = L.latLng(Number(center.lat), Number(eastBound))
  const centerNorth = L.latLng(Number(center.lat), Number(northBound))

  const p_distance_meters = center?.distanceTo(centerEast) < center?.distanceTo(centerNorth)
    ? Math.trunc(Number(center?.distanceTo(centerEast)))
    : Math.trunc(Number(center?.distanceTo(centerNorth)))

  return {
    p_latitude: center?.lat,
    p_longitude: center?.lng,
    p_distance_meters
  }
}