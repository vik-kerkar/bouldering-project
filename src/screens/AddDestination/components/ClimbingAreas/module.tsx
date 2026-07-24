import { Coordinate } from "../../types";
import strings from "@/src/constants/strings.json";

const EARTH_RADIUS_KM = 6371;

const toRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

const distanceInKm = (point1: Coordinate, point2: Coordinate): number => {
  const dLat = toRadians(point2.latitude - point1.latitude);
  const dLon = toRadians(point2.longitude - point1.longitude);

  const lat1 = toRadians(point1.latitude);
  const lat2 = toRadians(point2.latitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
};

export const isWithinRadius = (
  center: Coordinate,
  point: Coordinate,
  radiusKm = 100,
): boolean | string => {
  return (
    distanceInKm(center, point) <= radiusKm || strings.errors.latLongOutOfRange
  );
};

export const validateDistance = (
  value: string,
  destinationPoint: Coordinate,
) => {
  if (!value) return true;

  const [latitude, longitude] = value.split(",").map(Number);
  const areaPoint = {
    latitude,
    longitude,
  };
  return isWithinRadius(destinationPoint, areaPoint);
};
