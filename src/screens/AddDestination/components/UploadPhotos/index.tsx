import {
  Pressable,
  ScrollView,
  Text,
  Image,
  Alert,
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
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {Strings.addDestination.uploadPhotos.title}
      </Text>
      <Pressable style={styles.uploadContainer} onPress={pickFromLibrary}>
        <PhotoIcon />
        <Text style={styles.label}>Tap to upload</Text>
        <Text style={styles.label}>OR</Text>
        <Pressable style={styles.cameraButton} onPress={pickFromCamera}>
          <Text style={styles.label}>Open Camera</Text>
        </Pressable>
      </Pressable>
      {validationError && !images && (
        <Text style={styles.validationError}>{validationError}</Text>
      )}
      {images && (
        <ScrollView horizontal>
          <FlatList
            data={images}
            numColumns={3}
            keyExtractor={(item) => item.assetId}
            style={{ position: "relative" }}
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
        </ScrollView>
      )}
      <View style={commonStyles.navButtonContainer}>
        <Pressable
          style={commonStyles.navButton}
          testID="upload-photos-prev-button"
          onPress={() => setStep(step - 1)}
        >
          <Image
            source={require("@/assets/images/nav-button-prev.png")}
            style={[commonStyles.navButtonImage]}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable
          style={commonStyles.navButton}
          testID="upload-photos-next-button"
          onPress={() => {
            if (images && images?.length > 0) {
              setValidationError("");
              setStep(step + 1);
            } else {
              setValidationError(
                Strings.addDestination.uploadPhotos.validationError,
              );
            }
          }}
        >
          <Image
            source={require("@/assets/images/nav-button-next.png")}
            style={commonStyles.navButtonImage}
            resizeMode="contain"
          />
        </Pressable>
      </View>
      <View style={commonStyles.spacer} />
    </ScrollView>
  );
};

export default UploadPhotos;
