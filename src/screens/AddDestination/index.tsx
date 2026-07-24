import { Text, Pressable } from "react-native";
import styles from "./styles";
import { useState } from "react";
import strings from "../../constants/strings.json";
import { SearchMode } from "./types";
import {
  SearchDestination,
  Stepper,
  LocationDetails,
  UploadPhotos,
  RadioGroup,
  ClimbingAreas,
} from "./components";
import { Snackbar } from "@/src/components";
import { StepContext } from "./context/stepContext";
import { useAddDestinationStore } from "./state";
import { useShallow } from "zustand/react/shallow";
import type { SearchState } from "./state/types";
import useCheckDestinationExists from "./api/useCheckDestination";
import { confirmUndo, formatString } from "@/src/utils";

const AddDestination = () => {
  const { searchMode, setSearchMode, showAutocomplete, setShowAutocomplete } =
    useAddDestinationStore<SearchState>(
      useShallow((s) => ({
        searchMode: s.searchMode,
        showAutocomplete: s.showAutocomplete,
        setSearchMode: s.setSearchMode,
        setShowAutocomplete: s.setShowAutocomplete,
      })),
    );

  const { selectedPlace } = useAddDestinationStore(
    useShallow((state) => ({
      selectedPlace: state.selectedPlace,
      selectPlace: state.selectPlace,
    })),
  );

  const resetState = useAddDestinationStore((state) => state.reset);

  const { data: destinationExists } = useCheckDestinationExists(
    selectedPlace?.id || "",
  );

  const [step, setStep] = useState(1);

  const isEditing = selectedPlace && !destinationExists;

  const switchSearchMode = (option: SearchMode) => {
    resetState();
    setStep(1);
    setSearchMode(option as SearchMode);
  };

  return (
    <Pressable
      style={{ flex: 1, alignItems: "stretch" }}
      onPress={() => setShowAutocomplete(false)}
      testID="add-destination-wrapper"
    >
      <Text style={styles.headline}>{strings.addDestination.headline}</Text>
      <RadioGroup
        selectedOption={searchMode}
        onSelectOption={async (option) => {
          if (isEditing) {
            // check with user
            const yes = await confirmUndo();
            if (!yes) {
              return;
            }
          }
          switchSearchMode(option as SearchMode);
        }}
        options={[SearchMode.Destinations, SearchMode.Coordinates]}
      />
      <SearchDestination
        mode={searchMode}
        key={searchMode}
        showAutoComplete={showAutocomplete}
      />
      {selectedPlace ? (
        !!destinationExists ? (
          <Snackbar
            message={formatString(strings.addDestination.destinationExists, {
              name: selectedPlace.name,
            })}
            visible={!!destinationExists}
          />
        ) : (
          <StepContext value={{ step, setStep }}>
            <Stepper />
            {step === 1 && <LocationDetails />}
            {step === 2 && <UploadPhotos />}
            {step === 3 && <ClimbingAreas />}
          </StepContext>
        )
      ) : null}
    </Pressable>
  );
};

export default AddDestination;
