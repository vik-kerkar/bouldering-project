import React, { useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { useForm } from "react-hook-form";

import { FormInput, ImageButton, Spacer } from "@/src/components";

import { StepContext } from "../../context/stepContext";

import { useAddDestinationStore } from "../../state";

import Strings from "@/src/constants/strings.json";

import { LocationData, SearchMode } from "../../types";
import styles from "./styles";
import commonStyles from "../../styles";

type FormData = {
  nearestTown: string;
  describeLocation: string;
  howToGetThere: string;
  bestTimeToClimb: string;
  destinationName?: string;
};

const LocationDetails = React.memo(
  function LocationDetails() {
    const { step, setStep } = useContext(StepContext);

    const searchMode = useAddDestinationStore((state) => state.searchMode);
    const selectedPlace = useAddDestinationStore(
      (state) => state.selectedPlace,
    );
    const setNewDestination = useAddDestinationStore(
      (state) => state.setNewDestination,
    );
    const newDestination = useAddDestinationStore(
      (state) => state.newDestination,
    );

    const {
      control,
      handleSubmit,
      formState: { isValid },
      reset,
      //setValues,
    } = useForm<FormData>({
      mode: "onBlur",
      defaultValues: {
        nearestTown: newDestination?.nearestTownCity || "",
        describeLocation: newDestination?.description || "",
        howToGetThere: newDestination?.gettingThere || "",
        bestTimeToClimb: newDestination?.miscInfo || "",
        destinationName: newDestination?.name || selectedPlace?.name || "",
      },
    });

    const onSubmit = async (data: FormData) => {
      const { id, name, ...placeFields } = selectedPlace || {};
      const locationData: LocationData = {
        placeId: id || "",
        ...placeFields,
        name: data.destinationName || name,
        nearestTownCity: data.nearestTown,
        description: data.describeLocation,
        gettingThere: data.howToGetThere,
        miscInfo: data.bestTimeToClimb,
      } as LocationData;

      setNewDestination(locationData);

      setStep(step + 1);
    };

    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          {Strings.addDestination.locationDetails.title}
        </Text>
        <View style={styles.formContainer}>
          {searchMode === SearchMode.Coordinates && (
            <FormInput
              name="destinationName"
              control={control}
              rules={{
                required: Strings.errors.requiredMsg,
              }}
              label={Strings.addDestination.locationForm.destinationName}
              placeholder={
                Strings.addDestination.locationForm.destinationNamePlaceholder
              }
            />
          )}
          <FormInput
            name="nearestTown"
            control={control}
            rules={{
              required: Strings.errors.requiredMsg,
            }}
            label={Strings.addDestination.locationForm.nearestTown}
            placeholder={
              Strings.addDestination.locationForm.nearestTownPlaceholder
            }
          />

          <FormInput
            name="describeLocation"
            control={control}
            rules={{
              required: Strings.errors.requiredMsg,
            }}
            label={Strings.addDestination.locationForm.describeLocation}
            placeholder={
              Strings.addDestination.locationForm.descriptionPlaceholder
            }
            multiline
            numberOfLines={4}
          />

          <FormInput
            name="howToGetThere"
            control={control}
            rules={{
              required: Strings.errors.requiredMsg,
            }}
            label={Strings.addDestination.locationForm.howToGetThere}
            placeholder={
              Strings.addDestination.locationForm.getTherePlaceholder
            }
            multiline
            numberOfLines={4}
          />

          <FormInput
            name="bestTimeToClimb"
            control={control}
            label={Strings.addDestination.locationForm.bestTimeToClimb}
            multiline
            numberOfLines={4}
            placeholder={
              Strings.addDestination.locationForm.bestTimePlaceholder
            }
          />
        </View>
        <View style={commonStyles.navButtonContainer}>
          <ImageButton
            testID="location-details-reset-button"
            onPress={() => reset()}
            type="reset"
          />
          <ImageButton
            testID="location-details-next-button"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
            type={isValid ? "next" : "disabled"}
          />
        </View>

        <Spacer height={100} />
      </ScrollView>
    );
  },
  (pp, np) => false,
);

export default LocationDetails;
