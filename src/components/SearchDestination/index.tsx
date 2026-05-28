import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import { SearchIcon } from "@/assets/icons";
import { colors } from "@/src/theme";
import styles from "./styles";
import strings from "@/src/constants/strings.json";
import { useSearch, validateCoordinates } from "./useSearch";
import { Place, SearchMode } from "./types";
import { pickPlaces, renderSearchStatusIcon } from "./module";
import { delay } from "@/src/utils";

interface Props {
  mode: SearchMode;
  dispatchPlace: (place: Place | null) => void;
}

const SearchDestination = ({ mode, dispatchPlace }: Props) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [validationError, setValidationError] = useState<boolean | null>(null);

  const { data, error } = useSearch(query, mode);

  const places: Place[] = useMemo(() => pickPlaces(data) || [], [data]);

  const showSearchResults =
    mode === SearchMode.Destinations &&
    isFocused &&
    places &&
    places.length > 0;

  const placeholderText =
    mode === SearchMode.Destinations
      ? strings.addDestination.searchPlaceholder.destination
      : strings.addDestination.searchPlaceholder.coordinates;

  const onChangeText = (text: string) => {
    setQuery(text);
    dispatchPlace(null); //r clear the found place because we are restarting search

    if (mode === SearchMode.Coordinates) {
      // Validate coordinates format: "lat, lon" or "lat lon"
      if (!validateCoordinates(text)) {
        // Show error message or handle invalid format
        setValidationError(true);
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
      ]}
    >
      <SearchIcon
        width={18}
        height={18}
        fill={colors.primary1}
        style={{ alignSelf: "center" }}
      />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholderText}
        placeholderTextColor={colors.neutral4}
        onChangeText={onChangeText}
        value={query}
        onFocus={() => setIsFocused(true)}
        onBlur={() => delay(() => setIsFocused(false), 200)}
        underlineColorAndroid="transparent"
      />
      {mode === SearchMode.Coordinates
        ? renderSearchStatusIcon(error, places)
        : null}
    </View>
  );

  const renderValidationError = () => {
    if (!validationError) return null;
    return (
      <Text style={styles.validationError}>{strings.errors.validationMsg}</Text>
    );
  };

  const renderSearchResults = () => {
    if (!showSearchResults) return null;
    return (
      <View
        style={{ position: "relative", top: -13, width: "90%", zIndex: 100 }}
      >
        <View style={styles.autoCompleteContainer}>
          <FlatList
            data={places}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  dispatchPlace(item); // when a item is selected, update it as the found place
                  setQuery(`${item.name}, ${item.state}, ${item.country}`);
                  setIsFocused(false);
                }}
              >
                <View style={styles.autoCompleteItem}>
                  <Text style={styles.autoCompletePlace}>{item.name}</Text>
                  <Text
                    style={[
                      styles.autoCompletePlace,
                      styles.autoCompleteCountry,
                    ]}
                  >{`${item.state}, ${item.country}`}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  };

  useEffect(() => {
    // When coordinates are found, dispatch the place
    if (mode === SearchMode.Coordinates) {
      if (places.length > 0) {
        dispatchPlace(places[0]); // update the found place
      } else if (validationError || places?.length === 0) {
        dispatchPlace(null); // clear the found place
      }
    }
  }, [mode, places, dispatchPlace, validationError]);

  return (
    <>
      {renderSearchBox()}
      {renderValidationError()}
      {renderSearchResults()}
    </>
  );
};

export default SearchDestination;
