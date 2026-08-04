import strings from "../../constants/strings.json";

export const validateCoordinates = (query: string): boolean | string => {
  if (!query) return true;
  const coordRegex = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/;
  return coordRegex.test(query.trim()) || strings.errors.latLongInvalidMsg;
};
