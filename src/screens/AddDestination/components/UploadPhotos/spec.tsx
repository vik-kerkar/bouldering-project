import UploadPhotos from ".";
import { render, userEvent, screen } from "@testing-library/react-native";

import * as ImagePicker from "expo-image-picker";
import { useAddDestinationStore } from "../../state";

describe("UploadPhotos", () => {
  beforeEach(() => {
    useAddDestinationStore.setState(
      useAddDestinationStore.getInitialState(),
      true, // replace entire state
    );
  });
  it("should render", () => {
    render(<UploadPhotos />);
    expect(screen.getByText("Upload Photos")).toBeOnTheScreen();
  });

  it("should render the upload area", () => {
    render(<UploadPhotos />);
    expect(screen.getByText("Tap to upload")).toBeOnTheScreen();
    expect(screen.getByText("Open Camera")).toBeOnTheScreen();
  });

  it("should request for Image library permissions when the upload area is pressed", async () => {
    const requestMediaLibraryPermissionsAsync = jest.mocked(
      ImagePicker.requestMediaLibraryPermissionsAsync,
    );

    requestMediaLibraryPermissionsAsync.mockResolvedValue({
      granted: false,
      canAskAgain: true,
      expires: "never",
      status: ImagePicker.PermissionStatus.DENIED,
    });

    render(<UploadPhotos />);
    const uploadArea = screen.getByText("Tap to upload");
    expect(uploadArea).toBeOnTheScreen();
    await userEvent.press(uploadArea);

    expect(requestMediaLibraryPermissionsAsync).toHaveBeenCalled();
  });

  it("should not display the Image library when the upload area is pressed and permissions are denied", async () => {
    const requestMediaLibraryPermissionsAsync = jest.mocked(
      ImagePicker.requestMediaLibraryPermissionsAsync,
    );

    requestMediaLibraryPermissionsAsync.mockResolvedValue({
      granted: false,
      canAskAgain: true,
      expires: "never",
      status: ImagePicker.PermissionStatus.DENIED,
    });

    const launchImageLibraryAsync = jest.mocked(
      ImagePicker.launchImageLibraryAsync,
    );

    render(<UploadPhotos />);
    const uploadArea = screen.getByText("Tap to upload");
    expect(uploadArea).toBeOnTheScreen();
    await userEvent.press(uploadArea);

    expect(launchImageLibraryAsync).not.toHaveBeenCalled();
  });

  it("should display the Image picker when the upload area is pressed and permissions are granted", async () => {
    const requestMediaLibraryPermissionsAsync = jest.mocked(
      ImagePicker.requestMediaLibraryPermissionsAsync,
    );

    requestMediaLibraryPermissionsAsync.mockResolvedValue({
      granted: true,
      canAskAgain: true,
      expires: "never",
      status: ImagePicker.PermissionStatus.GRANTED,
    });

    const launchImageLibraryAsync = jest.mocked(
      ImagePicker.launchImageLibraryAsync,
    );

    launchImageLibraryAsync.mockResolvedValue({
      canceled: true,
      assets: null,
    });
    render(<UploadPhotos />);
    const uploadArea = screen.getByText("Tap to upload");
    expect(uploadArea).toBeOnTheScreen();
    await userEvent.press(uploadArea);

    expect(launchImageLibraryAsync).toHaveBeenCalled();
  });
  it("should display the image, when an image is chosen from the Image picker", async () => {
    const requestMediaLibraryPermissionsAsync = jest.mocked(
      ImagePicker.requestMediaLibraryPermissionsAsync,
    );

    requestMediaLibraryPermissionsAsync.mockResolvedValue({
      granted: true,
      canAskAgain: true,
      expires: "never",
      status: ImagePicker.PermissionStatus.GRANTED,
    });
    const launchImageLibraryAsync = jest.mocked(
      ImagePicker.launchImageLibraryAsync,
    );

    launchImageLibraryAsync.mockResolvedValue({
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
    });
    render(<UploadPhotos />);
    const uploadArea = screen.getByText("Tap to upload");
    expect(uploadArea).toBeOnTheScreen();
    await userEvent.press(uploadArea);

    expect(screen.getAllByLabelText("Destination Image")[0]).toBeOnTheScreen();
    expect(
      screen.getAllByLabelText("Destination Image")[0].props.source,
    ).toEqual({
      uri: "file://photo.jpg",
    });
  });
  it("should request for Camera permissions when the `Open Camera`button is pressed", async () => {
    // TODO: Implement this test
    const requestCameraPermissionsAsync = jest.mocked(
      ImagePicker.requestCameraPermissionsAsync,
    );

    requestCameraPermissionsAsync.mockResolvedValue({
      granted: false,
      canAskAgain: true,
      expires: "never",
      status: ImagePicker.PermissionStatus.DENIED,
    });

    render(<UploadPhotos />);
    const openCameraButton = screen.getByText("Open Camera");
    expect(openCameraButton).toBeOnTheScreen();
    await userEvent.press(openCameraButton);

    expect(requestCameraPermissionsAsync).toHaveBeenCalled();
  });
  it("should display the camera when the `Open Camera` button is pressed and camera permissions are granted", async () => {
    const requestCameraPermissionsAsync = jest.mocked(
      ImagePicker.requestCameraPermissionsAsync,
    );

    requestCameraPermissionsAsync.mockResolvedValue({
      granted: true,
      canAskAgain: true,
      expires: "never",
      status: ImagePicker.PermissionStatus.GRANTED,
    });

    const launchCameraAsync = jest.mocked(ImagePicker.launchCameraAsync);

    launchCameraAsync.mockResolvedValue({
      canceled: true,
      assets: null,
    });

    render(<UploadPhotos />);
    const openCameraButton = screen.getByText("Open Camera");
    expect(openCameraButton).toBeOnTheScreen();
    await userEvent.press(openCameraButton);

    expect(launchCameraAsync).toHaveBeenCalled();
  });

  it("should display the image when the camera is launched and an image is selected", async () => {
    const requestCameraPermissionsAsync = jest.mocked(
      ImagePicker.requestCameraPermissionsAsync,
    );

    requestCameraPermissionsAsync.mockResolvedValue({
      granted: true,
      canAskAgain: true,
      expires: "never",
      status: ImagePicker.PermissionStatus.GRANTED,
    });

    const launchCameraAsync = jest.mocked(ImagePicker.launchCameraAsync);

    launchCameraAsync.mockResolvedValue({
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
    });

    render(<UploadPhotos />);
    const openCameraButton = screen.getByText("Open Camera");
    expect(openCameraButton).toBeOnTheScreen();
    await userEvent.press(openCameraButton);
    expect(screen.getAllByLabelText("Destination Image")[0]).toBeOnTheScreen();
    expect(
      screen.getAllByLabelText("Destination Image")[0].props.source,
    ).toEqual({
      uri: "file://photo.jpg",
    });
  });
  it("should be able to display multiple images when the image library is opened and multiple images are selected", async () => {
    const requestMediaLibraryPermissionsAsync = jest.mocked(
      ImagePicker.requestMediaLibraryPermissionsAsync,
    );

    requestMediaLibraryPermissionsAsync.mockResolvedValue({
      granted: true,
      canAskAgain: true,
      expires: "never",
      status: ImagePicker.PermissionStatus.GRANTED,
    });
    const launchImageLibraryAsync = jest.mocked(
      ImagePicker.launchImageLibraryAsync,
    );

    launchImageLibraryAsync.mockResolvedValue({
      assets: [
        {
          assetId: "abc1234",
          base64: null,
          duration: null,
          exif: null,
          fileName: "image1.jpg",
          fileSize: 885001,
          height: 778,
          mimeType: "image/jpeg",
          pairedVideoAsset: null,
          type: "image",
          uri: "file://photo1.jpg",
          width: 1170,
        },
        {
          assetId: "abc3456",
          base64: null,
          duration: null,
          exif: null,
          fileName: "image2.jpg",
          fileSize: 885001,
          height: 778,
          mimeType: "image/jpeg",
          pairedVideoAsset: null,
          type: "image",
          uri: "file://photo2.jpg",
          width: 1170,
        },
      ],
      canceled: false,
    });
    render(<UploadPhotos />);
    const uploadArea = screen.getByText("Tap to upload");
    expect(uploadArea).toBeOnTheScreen();
    await userEvent.press(uploadArea);

    expect(screen.getAllByLabelText("Destination Image")).toHaveLength(2);
  });
  it("should render the first image as the cover image", async () => {
    const requestMediaLibraryPermissionsAsync = jest.mocked(
      ImagePicker.requestMediaLibraryPermissionsAsync,
    );

    requestMediaLibraryPermissionsAsync.mockResolvedValue({
      granted: true,
      canAskAgain: true,
      expires: "never",
      status: ImagePicker.PermissionStatus.GRANTED,
    });
    const launchImageLibraryAsync = jest.mocked(
      ImagePicker.launchImageLibraryAsync,
    );

    launchImageLibraryAsync.mockResolvedValue({
      assets: [
        {
          assetId: "abc1234",
          base64: null,
          duration: null,
          exif: null,
          fileName: "image1.jpg",
          fileSize: 885001,
          height: 778,
          mimeType: "image/jpeg",
          pairedVideoAsset: null,
          type: "image",
          uri: "file://photo1.jpg",
          width: 1170,
        },
        {
          assetId: "abc3456",
          base64: null,
          duration: null,
          exif: null,
          fileName: "image2.jpg",
          fileSize: 885001,
          height: 778,
          mimeType: "image/jpeg",
          pairedVideoAsset: null,
          type: "image",
          uri: "file://photo2.jpg",
          width: 1170,
        },
      ],
      canceled: false,
    });
    render(<UploadPhotos />);
    const uploadArea = screen.getByText("Tap to upload");
    expect(uploadArea).toBeOnTheScreen();
    await userEvent.press(uploadArea);

    expect(screen.getByHintText("Cover Image")).toBeOnTheScreen();
  });

  it("should be able to change the cover image", async () => {
    const requestMediaLibraryPermissionsAsync = jest.mocked(
      ImagePicker.requestMediaLibraryPermissionsAsync,
    );

    requestMediaLibraryPermissionsAsync.mockResolvedValue({
      granted: true,
      canAskAgain: true,
      expires: "never",
      status: ImagePicker.PermissionStatus.GRANTED,
    });
    const launchImageLibraryAsync = jest.mocked(
      ImagePicker.launchImageLibraryAsync,
    );

    launchImageLibraryAsync.mockResolvedValue({
      assets: [
        {
          assetId: "abc1234",
          base64: null,
          duration: null,
          exif: null,
          fileName: "image1.jpg",
          fileSize: 885001,
          height: 778,
          mimeType: "image/jpeg",
          pairedVideoAsset: null,
          type: "image",
          uri: "file://photo1.jpg",
          width: 1170,
        },
        {
          assetId: "abc3456",
          base64: null,
          duration: null,
          exif: null,
          fileName: "image2.jpg",
          fileSize: 885001,
          height: 778,
          mimeType: "image/jpeg",
          pairedVideoAsset: null,
          type: "image",
          uri: "file://photo2.jpg",
          width: 1170,
        },
      ],
      canceled: false,
    });
    render(<UploadPhotos />);
    const uploadArea = screen.getByText("Tap to upload");
    expect(uploadArea).toBeOnTheScreen();
    await userEvent.press(uploadArea);

    expect(screen.getByHintText("Cover Image")).toBeOnTheScreen();
    const destinationImages =
      await screen.findAllByLabelText("Destination Image");
    await userEvent.press(destinationImages[1]);

    expect(destinationImages[1].props.accessibilityHint).toEqual("Cover Image");
  });
  it("should be able to remove an image", async () => {
    const requestMediaLibraryPermissionsAsync = jest.mocked(
      ImagePicker.requestMediaLibraryPermissionsAsync,
    );

    requestMediaLibraryPermissionsAsync.mockResolvedValue({
      granted: true,
      canAskAgain: true,
      expires: "never",
      status: ImagePicker.PermissionStatus.GRANTED,
    });
    const launchImageLibraryAsync = jest.mocked(
      ImagePicker.launchImageLibraryAsync,
    );

    launchImageLibraryAsync.mockResolvedValue({
      assets: [
        {
          assetId: "abc1234",
          base64: null,
          duration: null,
          exif: null,
          fileName: "image1.jpg",
          fileSize: 885001,
          height: 778,
          mimeType: "image/jpeg",
          pairedVideoAsset: null,
          type: "image",
          uri: "file://photo1.jpg",
          width: 1170,
        },
        {
          assetId: "abc3456",
          base64: null,
          duration: null,
          exif: null,
          fileName: "image2.jpg",
          fileSize: 885001,
          height: 778,
          mimeType: "image/jpeg",
          pairedVideoAsset: null,
          type: "image",
          uri: "file://photo2.jpg",
          width: 1170,
        },
      ],
      canceled: false,
    });
    render(<UploadPhotos />);
    const uploadArea = screen.getByText("Tap to upload");
    expect(uploadArea).toBeOnTheScreen();
    await userEvent.press(uploadArea);

    expect(screen.getAllByLabelText("Destination Image")).toHaveLength(2);

    const deleteButton = screen.getByTestId("delete-image-abc3456");
    await userEvent.press(deleteButton);

    expect(screen.getAllByLabelText("Destination Image")).toHaveLength(1);
  });
});
