import * as ImagePicker from "expo-image-picker";

export const imagePickerResult = {
  assets: [
    {
      assetId: null,
      base64: null,
      duration: null,
      exif: null,
      fileName: null,
      fileSize: 885001,
      height: 778,
      mimeType: "image/jpeg",
      pairedVideoAsset: null,
      type: "image",
      uri: "file://photo.jpg",
      width: 1170,
    },
  ],
  canceled: false,
};

export const medialLibraryPermissionResponse = {
  granted: true,
  canAskAgain: true,
  expires: "never",
  status: ImagePicker.PermissionStatus.GRANTED,
};
