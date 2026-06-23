import { View, Text, ScrollView, Pressable, Image } from "react-native";
import styles from "./styles";
import commonStyles from "../../styles";
import Strings from "@/src/constants/strings.json";

import { LocationData, SearchMode } from "../../types";

import { useForm } from "react-hook-form";

import FormInput from "@/src/components/FormInput";

import { StepContext } from "../../context/stepContext";
import React, { useContext } from "react";
import { useAddDestinationStore } from "../../state";

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
        nearestTown: newDestination?.nearest_town_city || "",
        describeLocation: newDestination?.description || "",
        howToGetThere: newDestination?.getting_there || "",
        bestTimeToClimb: newDestination?.misc_info || "",
        destinationName: newDestination?.name || selectedPlace?.name || "",
      },
    });

    const onSubmit = async (data: FormData) => {
      const { id, name, ...placeFields } = selectedPlace || {};
      const locationData: LocationData = {
        place_id: id || "",
        ...placeFields,
        name: data.destinationName || name,
        nearest_town_city: data.nearestTown,
        description: data.describeLocation,
        getting_there: data.howToGetThere,
        misc_info: data.bestTimeToClimb,
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
          <Pressable
            style={commonStyles.navButton}
            testID="location-details-reset-button"
            onPress={() => reset()}
          >
            <Image
              source={require("@/assets/images/nav-button-reset.png")}
              style={commonStyles.navButtonImage}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable
            style={commonStyles.navButton}
            testID="location-details-next-button"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            <Image
              source={
                isValid
                  ? require("@/assets/images/nav-button-next.png")
                  : require("@/assets/images/nav-button-disabled.png")
              }
              style={commonStyles.navButtonImage}
              resizeMode="contain"
            />
          </Pressable>
        </View>

        <View style={commonStyles.spacer}></View>
      </ScrollView>
    );
  },
  (pp, np) => false,
);

export default LocationDetails;
