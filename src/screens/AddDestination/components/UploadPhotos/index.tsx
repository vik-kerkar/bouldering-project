import {
  Pressable,
  Text,
  Image,
  Alert,
  ScrollView,
  View,
  FlatList,
} from "react-native";
import styles from "./styles";
import commonStyles from "../../styles";
import Strings from "@/src/constants/strings.json";
import { PhotoIcon, CloseIcon } from "@/assets/icons";

import * as ImagePicker from "expo-image-picker";
import { useShallow } from "zustand/react/shallow";

import { useContext, useState } from "react";
import * as Device from "expo-device";
import { StepContext } from "../../context/stepContext";
import { UploadedImage } from "../../types";

import { useAddDestinationStore } from "../../state";

import { ImageButton, Button, Spacer } from "@/src/components";

const UploadPhotos = () => {
  const { step, setStep } = useContext(StepContext);
  const [validationError, setValidationError] = useState<null | string>(null);
  const { images, setImages } = useAddDestinationStore(
    useShallow((state) => ({
      images: state.images,
      setImages: state.setImages,
    })),
  );

  const getImagesFromAssets = (assets: ImagePicker.ImagePickerAsset[]) => {
    return assets.map((asset, index) => ({
      uri: asset.uri,
      assetId: asset.assetId || "",
      fileName: asset.fileName || "",
      fileSize: asset.fileSize || 0,
      default: !images?.length && index === 0 ? true : false,
      mimeType: asset.mimeType || "image/jpeg",
    }));
  };

  const pickFromLibrary = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImages: UploadedImage[] = getImagesFromAssets(result.assets);
      setImages([...(images || []), ...newImages]);
      setValidationError(null);
    }
  };

  const pickFromCamera = async () => {
    if (!Device.isDevice) {
      return Alert.alert("Camera unavailable", "Please use a physical device.");
    }
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the camera is required.",
      );
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImages: UploadedImage[] = getImagesFromAssets(result.assets);
      setImages([...(images || []), ...newImages]);
      setValidationError(null);
    }
  };

  const selectDefaultImage = (index: number) => {
    const updatedImages = images?.map((image, imageIndex) => {
      image.default = imageIndex === index;
      return image;
    });
    setImages(updatedImages!);
  };

  const removeImage = (assetId: string) => {
    const imagesAfterDelete = images?.filter(
      (image) => image.assetId !== assetId,
    );
    setImages(imagesAfterDelete!);
  };

  const handlePrevPress = () => setStep(step - 1);

  const handleNextPress = () => {
    if (!images || images?.length === 0) {
      setValidationError(Strings.addDestination.uploadPhotos.validationError);
      return;
    }
    setStep(step + 1);
  };
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {Strings.addDestination.uploadPhotos.title}
      </Text>
      <Pressable style={styles.uploadContainer} onPress={pickFromLibrary}>
        <PhotoIcon />
        <Text style={styles.label}>Tap to upload</Text>
        <Text style={styles.label}>OR</Text>
        <Button label="Open Camera" type="secondary" onPress={pickFromCamera} />
      </Pressable>
      {validationError && (
        <Text style={styles.validationError}>{validationError}</Text>
      )}
      {images && (
        <FlatList
          data={images}
          numColumns={2}
          keyExtractor={(item) => item.assetId}
          scrollEnabled={false}
          style={{
            position: "relative",
          }}
          renderItem={({ item, index }) => (
            <Pressable
              key={item.assetId}
              onPress={() => selectDefaultImage(index)}
            >
              <>
                <Image
                  source={{ uri: item.uri }}
                  style={[
                    styles.image,
                    item.default ? styles.defaultImage : {},
                  ]}
                  accessibilityLabel="Destination Image"
                  {...(item.default
                    ? { accessibilityHint: "Cover Image" }
                    : {})}
                />
                <Pressable
                  style={styles.deleteIcon}
                  onPress={() => removeImage(item.assetId)}
                  testID={`delete-image-${item.assetId}`}
                >
                  <CloseIcon fill="#000" stroke="#000" />
                </Pressable>
              </>
            </Pressable>
          )}
        />
      )}
      <View style={commonStyles.navButtonContainer}>
        <ImageButton
          testID="upload-photos-prev-button"
          onPress={handlePrevPress}
          type="previous"
        />

        <ImageButton
          testID="upload-photos-next-button"
          onPress={handleNextPress}
          type="next"
        />
      </View>
      <Spacer height={100} />
    </ScrollView>
  );
};

export default UploadPhotos;
