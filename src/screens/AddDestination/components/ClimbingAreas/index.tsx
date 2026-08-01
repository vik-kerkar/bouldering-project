import { useState, useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { MapPressEvent, Marker } from "react-native-maps";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import {
  Map,
  Button,
  FormInput,
  IconButton,
  ImageButton,
  Snackbar,
  AreaMarker,
  ClimbingArea,
} from "@/src/components";

import { useSaveDestination } from "../../api/useSaveDestination";

import { useAddDestinationStore } from "../../state";
import { StepContext } from "../../context/stepContext";

import styles from "./styles";
import commonStyles from "../../styles";

import strings from "@/src/constants/strings.json";

import { validateDistance } from "./module";
import { validateCoordinates } from "../../module";

import { RootTabParamList } from "@/app/types";
import { Coordinate, ClimbingArea as IClimbingArea } from "../../types";

type NavigationProp = BottomTabNavigationProp<
  RootTabParamList,
  "Add Destination"
>;

type FormData = {
  areaName: string;
  latLong: string;
  areaDescription: string;
};

const ClimbingAreas = () => {
  const { addDestination, errors } = strings;

  const mutation = useSaveDestination();

  const navigation = useNavigation<NavigationProp>();

  const {
    newDestination,
    newArea,
    setNewArea,
    climbingAreas,
    setClimbingAreas,
    resetState,
    images,
  } = useAddDestinationStore(
    useShallow((state) => ({
      newArea: state.newArea,
      setNewArea: state.setNewArea,
      climbingAreas: state.climbingAreas,
      setClimbingAreas: state.setClimbingAreas,
      newDestination: state.newDestination,
      setNewDestination: state.setNewDestination,
      resetState: state.reset,
      images: state.images,
    })),
  );

  const { step, setStep } = useContext(StepContext);

  const { control, setValue, handleSubmit, reset } = useForm<FormData>({
    mode: "onBlur",
  });

  const [showForm, setShowForm] = useState<boolean>(false);
  const [isEditingLatLong, setIsEditingLatLong] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(false);

  const handleMapSelection = (event: MapPressEvent) => {
    if (!showForm) {
      return;
    }
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setNewArea({
      latitude: parseFloat(latitude.toFixed(5)),
      longitude: parseFloat(longitude.toFixed(5)),
    });
    setValue("latLong", `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
  };

  const handleEditLatLong = () => {
    setIsEditingLatLong(!isEditingLatLong);
  };

  const clearClimbingArea = () => {
    //  Clear and hide the form
    reset();
    setShowForm(false);
    // Reset the marker
    setNewArea(null);
  };

  const saveArea = (data: FormData) => {
    const [latitude, longitude] = data.latLong
      ? data.latLong.split(",").map(Number)
      : [newDestination!.lat, newDestination!.long];

    const area: IClimbingArea = {
      areaName: data.areaName,
      areaDescription: data.areaDescription,
      latitude,
      longitude,
    };
    // TODO: Add the new area to the climbing areas list
    if (!climbingAreas) {
      setClimbingAreas([area]);
    } else {
      setClimbingAreas([...climbingAreas, area]);
    }
    clearClimbingArea();
  };

  const handlePrevPress = () => {
    setStep(step - 1);
  };

  const generateError = (error: Error) => {
    if (error.name === errors.storageApi.name) {
      error.message = errors.storageApi.message;
    }
    const { name, message } = error as Error;
    setError(`${name}: ${message}`);
  };

  const handleSaveDestination = async () => {
    setSaveButtonDisabled(true);
    try {
      const savedDestination = await mutation.mutateAsync({
        images,
        newDestination: newDestination!,
        climbingAreas,
      });

      // reset the state
      resetState();
      setSaveButtonDisabled(false);
      setStep(1);

      navigation.navigate("Destinations", {
        screen: "DestinationDetails",
        params: {
          destinationId: savedDestination.id,
        },
      });
    } catch (error: unknown) {
      console.log(JSON.stringify(error));
      generateError(error as Error);
    }
  };

  const renderClimbingAreaForm = () => (
    <View style={styles.formContainer}>
      <FormInput
        name="areaName"
        control={control}
        rules={{
          required: errors.requiredMsg,
        }}
        placeholder={addDestination.climbingAreas.areaNamePlaceholder}
      />
      <FormInput
        name="latLong"
        control={control}
        rules={{
          validate: {
            isValidFormat: validateCoordinates,
            isWithinRange: (value) =>
              validateDistance(value, {
                latitude: newDestination!.lat,
                longitude: newDestination!.long,
              }),
          },
        }}
        placeholder={addDestination.climbingAreas.latLongPlaceholder}
        icon={isEditingLatLong ? "LockIcon" : "EditIcon"}
        onIconPress={handleEditLatLong}
        disabled={!isEditingLatLong}
      />
      <FormInput
        name="areaDescription"
        control={control}
        multiline
        numberOfLines={4}
        placeholder={addDestination.climbingAreas.areaDescriptionPlaceholder}
      />
      <View style={styles.buttonContainer}>
        <IconButton
          iconName="SaveIcon"
          testID="save-area-button"
          onPress={handleSubmit(saveArea)}
        />
        <IconButton
          iconName="CancelIcon"
          testID="cancel-area-button"
          onPress={clearClimbingArea}
        />
      </View>
    </View>
  );

  const renderNewAreaMarker = (newArea: Coordinate) => (
    <Marker
      testID="new-area-marker"
      coordinate={{
        latitude: newArea.latitude,
        longitude: newArea.longitude,
      }}
    >
      <View style={styles.newAreaMarker} />
    </Marker>
  );

  const renderSavedAreaMarkers = () =>
    climbingAreas?.map((area, index) => <AreaMarker key={index} area={area} />);
  return (
    <ScrollView>
      <Text style={styles.title}>{addDestination.climbingAreas.title}</Text>
      <Map
        latitude={newDestination?.lat as number}
        longitude={newDestination?.long as number}
        destinationName={newDestination?.name as string}
        onPress={handleMapSelection}
        testID="destination-map"
        zoomLevel={-7}
      >
        {newArea && renderNewAreaMarker(newArea)}
        {renderSavedAreaMarkers()}
      </Map>
      <View style={styles.buttonContainer}>
        <Button
          type="secondary"
          label={addDestination.climbingAreas.buttonText}
          onPress={() => setShowForm(true)}
          disabled={showForm}
        />
      </View>
      {showForm && renderClimbingAreaForm()}

      {climbingAreas && (
        <View>
          {climbingAreas.map((area, index) => (
            <ClimbingArea key={index} area={area} />
          ))}
        </View>
      )}
      <View style={commonStyles.navButtonContainer}>
        <ImageButton
          type="previous"
          testID="climbingArea-prev-button"
          onPress={handlePrevPress}
        />
        <ImageButton
          type={saveButtonDisabled ? "disabled-save" : "save"}
          testID="climbingArea-save-button"
          onPress={handleSaveDestination}
          disabled={saveButtonDisabled}
        />
      </View>
      <Snackbar
        visible={!!error}
        message={error!}
        onDismiss={() => setError(null)}
        action={{
          label: "Retry",
          onPress: handleSaveDestination,
        }}
      />
    </ScrollView>
  );
};

export default ClimbingAreas;
