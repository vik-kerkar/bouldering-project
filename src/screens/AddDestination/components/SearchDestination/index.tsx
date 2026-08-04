import { View, FlatList, Text, Pressable } from "react-native";
import { useEffect, useMemo, useState, useCallback } from "react";

import { SearchIcon } from "@/assets/icons";
import { colors } from "@/src/theme";
import strings from "@/src/constants/strings.json";
import { Input } from "@/src/components";

import styles from "./styles";
import { useFindDestinations } from "../../api/useFindDestination";
import { Place } from "@/app/types";
import { SearchMode } from "../../types";
import { pickPlaces, renderSearchStatusIcon } from "./module";
import { validateCoordinates } from "../../module";

import { useAddDestinationStore } from "../../state";
import { useFocusEffect } from "@react-navigation/native";

interface Props {
  mode: SearchMode;
  showAutoComplete?: boolean;
}

const SearchDestination = ({ mode, showAutoComplete }: Props) => {
  const [query, setQuery] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const { data, error } = useFindDestinations(query, mode);

  const setShowAutocomplete = useAddDestinationStore(
    (state) => state.setShowAutocomplete,
  );

  const selectPlace = useAddDestinationStore((state) => state.selectPlace);

  const newDestination = useAddDestinationStore(
    (state) => state.newDestination,
  );

  const places: Place[] = useMemo(() => pickPlaces(data) || [], [data]);

  const showSearchResults =
    mode === SearchMode.Destinations &&
    showAutoComplete &&
    places &&
    places.length > 0;

  const placeholderText =
    mode === SearchMode.Destinations
      ? strings.addDestination.searchPlaceholder.destination
      : strings.addDestination.searchPlaceholder.coordinates;

  const onChangeText = (text: string) => {
    setShowAutocomplete(true);
    setQuery(text);
    selectPlace(null); //clear the SELECTED place because we are restarting the search

    if (mode === SearchMode.Coordinates) {
      const result = validateCoordinates(text);
      if (typeof result === "string") {
        setValidationError(result);
        return;
      }
      setValidationError(null);
    }
  };

  const renderSearchBox = () => (
    <View
      style={[
        styles.searchContainer,
        validationError ? styles.searchInputError : {},
        newDestination && styles.searchInputDisabled,
      ]}
    >
      <SearchIcon
        width={18}
        height={18}
        fill={colors.primary1}
        style={styles.searchIcon}
      />
      <Input
        placeholder={placeholderText}
        onChangeText={onChangeText}
        value={query}
        onFocus={() => setShowAutocomplete(true)}
        underlineColorAndroid="transparent"
        style={styles.searchInput}
        editable={!newDestination}
      />
      {mode === SearchMode.Coordinates
        ? renderSearchStatusIcon(error, places)
        : null}
    </View>
  );

  const renderValidationError = () => {
    const errorMsg = validationError || error?.message;
    if (!errorMsg) return null;
    return <Text style={styles.validationError}>{errorMsg}</Text>;
  };

  const renderSearchResults = () => {
    if (!showSearchResults) return null;
    return (
      <View style={styles.autoCompleteWrapper}>
        <View style={styles.autoCompleteContainer}>
          <FlatList
            data={places}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  selectPlace(item); // select the place as a new destination to be added
                  setQuery(
                    `${item.name}, ${item.state || item.county || item.district}, ${item.country}`,
                  );
                  setShowAutocomplete(false);
                }}
              >
                <View style={styles.autoCompleteItem}>
                  <Text style={styles.autoCompletePlace}>{item.name}</Text>
                  <Text
                    style={[
                      styles.autoCompletePlace,
                      styles.autoCompleteCountry,
                    ]}
                  >{`${item.state || item.county || item.district}, ${item.country}`}</Text>
                </View>
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  };

  useEffect(() => {
    // When coordinates are found, select the place
    if (mode === SearchMode.Coordinates) {
      if (places.length > 0) {
        selectPlace(places[0]); // select the place as a new destination to be added
      } else if (validationError || places?.length === 0) {
        selectPlace(null); // clear the selected place
      }
    }
  }, [mode, places, selectPlace, validationError]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setQuery("");
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      {renderSearchBox()}
      {renderValidationError()}
      {renderSearchResults()}
    </View>
  );
};

export default SearchDestination;
