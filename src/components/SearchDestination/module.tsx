import { Feature, Place } from "./types";
import { CheckCircleIcon, AlertCircleIcon } from "@/assets/icons";

import { colors } from "@/src/theme";
import styles from "./styles";

export const pickPlaces = (data: { features?: Feature[] }) =>
  data?.features?.map((feature: Feature) => ({
    id: feature.properties.place_id,
    name: feature.properties.city || feature.properties.address_line_1,
    state: feature.properties.state,
    country: feature.properties.country,
    lat: feature.properties.lat,
    lon: feature.properties.lon,
    county: feature.properties.county,
    district: feature.properties.county_district,
  }));

export const renderSearchStatusIcon = (
  error: Error | null,
  places?: Place[],
) => {
  if (error) {
    return (
      <AlertCircleIcon
        width={18}
        height={18}
        stroke={colors.error}
        testID="alert-circle-icon"
        style={styles.coordinatesIcon}
      />
    );
  }
  if (places && places.length > 0) {
    return (
      <CheckCircleIcon
        width={18}
        height={18}
        stroke={colors.success}
        testID="checked-circle-icon"
        style={styles.coordinatesIcon}
      />
    );
  }
};
