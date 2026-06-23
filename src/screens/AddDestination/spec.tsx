/* eslint-disable testing-library/no-unnecessary-act */
import AddDestination from ".";
import { Alert } from "react-native";
import {
  render,
  screen,
  userEvent,
  waitFor,
  fireEvent,
} from "@testing-library/react-native";
import strings from "@/src/constants/strings.json";
import { withQueryClient } from "@/test/utils";

import * as utils from "@/src/utils/async";

import Strings from "@/src/constants/strings.json";
import { useAddDestinationStore } from "./state";

import * as ImagePicker from "expo-image-picker";

const getFormInputs = async () => ({
  nearestTownInput: await screen.findByPlaceholderText(
    Strings.addDestination.locationForm.nearestTownPlaceholder,
  ),
  descriptionInput: await screen.findByPlaceholderText(
    Strings.addDestination.locationForm.descriptionPlaceholder,
  ),
  getThereInput: await screen.findByPlaceholderText(
    Strings.addDestination.locationForm.getTherePlaceholder,
  ),
  bestTimeInput: await screen.findByPlaceholderText(
    Strings.addDestination.locationForm.bestTimePlaceholder,
  ),
});

describe("AddDestination", () => {
  beforeEach(() => {
    useAddDestinationStore.setState(
      useAddDestinationStore.getInitialState(),
      true, // replace entire state
    );
  });
  it("should render", () => {
    render(withQueryClient(<AddDestination />));
    expect(screen.getByText(strings.addDestination.headline)).toBeTruthy();
  });
  it("should display radio buttons for Destinations and Coordinates", () => {
    render(withQueryClient(<AddDestination />));
    expect(
      screen.getByText(strings.addDestination.options.destinations),
    ).toBeTruthy();
    expect(
      screen.getByText(strings.addDestination.options.coordinates),
    ).toBeTruthy();
  });

  describe("Destination mode", () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });
    afterAll(() => {
      jest.useRealTimers();
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it("should display a search input", () => {
      render(withQueryClient(<AddDestination />));
      expect(
        screen.getByPlaceholderText(
          strings.addDestination.searchPlaceholder.destination,
        ),
      ).toBeTruthy();
    });

    it("should allow the user to search for a destination", async () => {
      render(withQueryClient(<AddDestination />));
      const searchInput = screen.getByPlaceholderText(
        strings.addDestination.searchPlaceholder.destination,
      );

      expect(searchInput).toBeTruthy();
      // Test typing in the search input
      await userEvent.type(searchInput, "Test Destination");
      expect(searchInput.props.value).toBe("Test Destination");
    });

    it("should display a list of destinations, when a user types in the search input", async () => {
      await render(withQueryClient(<AddDestination />));
      const searchInput = screen.getByPlaceholderText(
        strings.addDestination.searchPlaceholder.destination,
      );

      expect(searchInput).toBeTruthy();

      await userEvent.type(searchInput, "Ravug");
      fireEvent(searchInput, "onFocus");

      await waitFor(() => {
        expect(screen.getByText("Ravugodlu")).toBeOnTheScreen();
        expect(screen.getByText("Karnataka, India")).toBeOnTheScreen();
      });
    });

    it("should hide the list of destinations, when the user focuses out of the search input", async () => {
      await render(withQueryClient(<AddDestination />));
      const searchInput = screen.getByPlaceholderText(
        strings.addDestination.searchPlaceholder.destination,
      );

      expect(searchInput).toBeTruthy();
      // Test typing in the search input
      await userEvent.type(searchInput, "Ravug");
      fireEvent(searchInput, "onFocus");

      await waitFor(() => {
        expect(screen.getByText("Ravugodlu")).toBeOnTheScreen();
        expect(screen.getByText("Karnataka, India")).toBeOnTheScreen();
      });
      // Test focusing out of the search input
      jest.restoreAllMocks();

      await userEvent.press(screen.getByTestId("add-destination-wrapper"));

      await waitFor(() => {
        expect(screen.queryByText("Ravugodlu")).not.toBeOnTheScreen();
        expect(screen.queryByText("Karnataka, India")).not.toBeOnTheScreen();
      });
    });

    it("should populate the destination name and show the stepper when a destination is selected", async () => {
      await render(withQueryClient(<AddDestination />));
      const searchInput = screen.getByPlaceholderText(
        strings.addDestination.searchPlaceholder.destination,
      );

      expect(searchInput).toBeTruthy();
      await userEvent.type(searchInput, "Ravug");
      fireEvent(searchInput, "onFocus");

      await waitFor(() => {
        expect(screen.getByText("Ravugodlu")).toBeOnTheScreen();
        expect(screen.getByText("Karnataka, India")).toBeOnTheScreen();
      });

      // Select the destination
      const destinationItem = screen.getByText("Ravugodlu");
      await userEvent.press(destinationItem);

      // Verify the destination name is populated
      expect(searchInput.props.value).toBe("Ravugodlu, Karnataka, India");
      expect(screen.getByTestId("stepper")).toBeOnTheScreen();
    });

    it("should display a message if the selected destination already exists", async () => {
      await render(withQueryClient(<AddDestination />));
      const searchInput = screen.getByPlaceholderText(
        strings.addDestination.searchPlaceholder.destination,
      );

      expect(searchInput).toBeTruthy();
      await userEvent.type(searchInput, "Hampi");
      fireEvent(searchInput, "onFocus");

      await waitFor(() => {
        expect(screen.getByText("Hampi")).toBeOnTheScreen();
        expect(screen.getByText("Karnataka, India")).toBeOnTheScreen();
      });

      // Select the destination
      const destinationItem = screen.getByText("Hampi");
      await userEvent.press(destinationItem);

      // Verify the destination name is populated
      expect(searchInput.props.value).toBe("Hampi, Karnataka, India");
      await waitFor(() => {
        expect(
          screen.getByText(strings.addDestination.destinationExists),
        ).toBeOnTheScreen();
      });
    });

    it("should hide the stepper when the selected destination is modified", async () => {
      await render(withQueryClient(<AddDestination />));
      const searchInput = screen.getByPlaceholderText(
        strings.addDestination.searchPlaceholder.destination,
      );

      expect(searchInput).toBeTruthy();
      await userEvent.type(searchInput, "Ravug");
      fireEvent(searchInput, "onFocus");

      await waitFor(() => {
        expect(screen.getByText("Ravugodlu")).toBeOnTheScreen();
        expect(screen.getByText("Karnataka, India")).toBeOnTheScreen();
      });

      // Select the destination
      const destinationItem = screen.getByText("Ravugodlu");
      await userEvent.press(destinationItem);

      // Verify the destination name is populated
      expect(searchInput.props.value).toBe("Ravugodlu, Karnataka, India");
      expect(screen.getByTestId("stepper")).toBeOnTheScreen();
      await userEvent.type(searchInput, "Ravug");

      // Verify the stepper is hidden
      expect(screen.queryByTestId("stepper")).not.toBeOnTheScreen();
    });
    it("should show the `Location Details` form when a destination is selected", async () => {
      await render(withQueryClient(<AddDestination />));
      const searchInput = screen.getByPlaceholderText(
        strings.addDestination.searchPlaceholder.destination,
      );

      await userEvent.type(searchInput, "Ravug");
      fireEvent(searchInput, "onFocus");

      await waitFor(() => {
        expect(screen.getByText("Ravugodlu")).toBeOnTheScreen();
        expect(screen.getByText("Karnataka, India")).toBeOnTheScreen();
      });

      // Select the destination
      const destinationItem = screen.getByText("Ravugodlu");
      await userEvent.press(destinationItem);

      // Verify the destination name is populated
      expect(searchInput.props.value).toBe("Ravugodlu, Karnataka, India");
      expect(screen.getByText("Location Details")).toBeOnTheScreen();
    });

    it("should be able to enter location details and proceed to the next step", async () => {
      render(withQueryClient(<AddDestination />));
      const searchInput = screen.getByPlaceholderText(
        strings.addDestination.searchPlaceholder.destination,
      );

      await userEvent.type(searchInput, "Ravug");
      fireEvent(searchInput, "onFocus");

      await waitFor(() => {
        expect(screen.getByText("Ravugodlu")).toBeOnTheScreen();
        expect(screen.getByText("Karnataka, India")).toBeOnTheScreen();
      });

      // Select the destination
      const destinationItem = screen.getByText("Ravugodlu");
      await userEvent.press(destinationItem);

      // Verify the destination name is populated
      expect(searchInput.props.value).toBe("Ravugodlu, Karnataka, India");
      expect(screen.getByText("Location Details")).toBeOnTheScreen();

      const nearestTownInput = screen.getByPlaceholderText(
        Strings.addDestination.locationForm.nearestTownPlaceholder,
      );
      await userEvent.type(nearestTownInput, "Test Town");

      const descriptionInput = screen.getByPlaceholderText(
        Strings.addDestination.locationForm.descriptionPlaceholder,
      );
      await userEvent.type(descriptionInput, "Test description");

      const getThereInput = screen.getByPlaceholderText(
        Strings.addDestination.locationForm.getTherePlaceholder,
      );
      await userEvent.type(getThereInput, "Test get there");

      const bestTimeInput = screen.getByPlaceholderText(
        Strings.addDestination.locationForm.bestTimePlaceholder,
      );
      await userEvent.type(bestTimeInput, "Test best time");

      const nextButton = screen.getByTestId("location-details-next-button");
      await userEvent.press(nextButton);
      expect(screen.getByText("Upload Photos")).toBeOnTheScreen();
    });

    it("should disable the search input after user enters location details and navigates to next step", async () => {
      await render(withQueryClient(<AddDestination />));
      const destinationsRadio = screen.getByText(
        strings.addDestination.options.destinations,
      );
      await userEvent.press(destinationsRadio);

      const searchInput = screen.getByPlaceholderText(
        strings.addDestination.searchPlaceholder.destination,
      );
      expect(searchInput).toBeTruthy();
      await userEvent.type(searchInput, "Ravug");
      fireEvent(searchInput, "onFocus");

      await waitFor(() => {
        expect(screen.getByText("Ravugodlu")).toBeOnTheScreen();
        expect(screen.getByText("Karnataka, India")).toBeOnTheScreen();
      });

      // Select the destination
      const destinationItem = screen.getByText("Ravugodlu");
      await userEvent.press(destinationItem);

      // Verify the destination name is populated
      expect(searchInput.props.value).toBe("Ravugodlu, Karnataka, India");
      expect(screen.getByText("Location Details")).toBeOnTheScreen();

      const {
        nearestTownInput,
        descriptionInput,
        getThereInput,
        bestTimeInput,
      } = await getFormInputs();
      await userEvent.type(nearestTownInput, "Test Town");

      await userEvent.type(descriptionInput, "Test description");

      await userEvent.type(getThereInput, "Test get there");

      await userEvent.type(bestTimeInput, "Test best time");

      const nextButton = screen.getByTestId("location-details-next-button");
      await userEvent.press(nextButton);

      // The search input should be disabled
      expect(searchInput).toBeDisabled();
      const prevButton = screen.getByTestId("upload-photos-prev-button");
      await userEvent.press(prevButton);

      expect(searchInput).toBeDisabled();
    });

    it("should receive a warning message when trying to navigate away without saving", async () => {
      const alertSpy = jest.spyOn(Alert, "alert");

      render(withQueryClient(<AddDestination />));
      const searchInput = screen.getByPlaceholderText(
        strings.addDestination.searchPlaceholder.destination,
      );

      await userEvent.type(searchInput, "Ravug");
      fireEvent(searchInput, "onFocus");

      await waitFor(() => {
        expect(screen.getByText("Ravugodlu")).toBeOnTheScreen();
        expect(screen.getByText("Karnataka, India")).toBeOnTheScreen();
      });

      // Select the destination
      const destinationItem = screen.getByText("Ravugodlu");
      await userEvent.press(destinationItem);

      // Verify the destination name is populated
      expect(searchInput.props.value).toBe("Ravugodlu, Karnataka, India");
      expect(screen.getByText("Location Details")).toBeOnTheScreen();

      // Try to navigate away
      const coordinatesRadio = screen.getByText("Coordinates");
      expect(coordinatesRadio).toBeOnTheScreen();
      await userEvent.press(coordinatesRadio);

      // Verify the alert is shown
      expect(alertSpy).toHaveBeenCalled();
    });

    it("should be able to switch to Coordinates mode while editing a destination", async () => {
      jest
        .spyOn(utils, "confirmUndo")
        .mockImplementation(() => Promise.resolve(true));

      render(withQueryClient(<AddDestination />));
      const searchInput = screen.getByPlaceholderText(
        strings.addDestination.searchPlaceholder.destination,
      );

      await userEvent.type(searchInput, "Ravug");
      fireEvent(searchInput, "onFocus");

      await waitFor(() => {
        expect(screen.getByText("Ravugodlu")).toBeOnTheScreen();
        expect(screen.getByText("Karnataka, India")).toBeOnTheScreen();
      });

      // Select the destination
      const destinationItem = screen.getByText("Ravugodlu");
      await userEvent.press(destinationItem);

      // Verify the destination name is populated
      expect(searchInput.props.value).toBe("Ravugodlu, Karnataka, India");
      expect(screen.getByText("Location Details")).toBeOnTheScreen();

      // Try to navigate away
      const coordinatesRadio = screen.getByText("Coordinates");
      expect(coordinatesRadio).toBeOnTheScreen();
      await userEvent.press(coordinatesRadio);
      const coordsInput = screen.getByPlaceholderText(
        strings.addDestination.searchPlaceholder.coordinates,
      );
      expect(coordsInput).toBeOnTheScreen();
    });

    it("should be able to go back to the previous step and view the saved location details", async () => {
      render(withQueryClient(<AddDestination />));

      const searchInput = screen.getByPlaceholderText(
        strings.addDestination.searchPlaceholder.destination,
      );

      await userEvent.type(searchInput, "Ravug");
      fireEvent(searchInput, "onFocus");

      await waitFor(() => {
        expect(screen.getByText("Ravugodlu")).toBeOnTheScreen();
        expect(screen.getByText("Karnataka, India")).toBeOnTheScreen();
      });

      // Select the destination
      const destinationItem = screen.getByText("Ravugodlu");
      await userEvent.press(destinationItem);

      // Verify the destination name is populated
      expect(searchInput.props.value).toBe("Ravugodlu, Karnataka, India");
      expect(screen.getByText("Location Details")).toBeOnTheScreen();
      const {
        nearestTownInput,
        descriptionInput,
        getThereInput,
        bestTimeInput,
      } = await getFormInputs();

      await userEvent.type(nearestTownInput, "Kanakpura");

      await userEvent.type(descriptionInput, "Test description");

      await userEvent.type(getThereInput, "Test get there");

      await userEvent.type(bestTimeInput, "Test best time");

      const nextButton = screen.getByTestId("location-details-next-button");
      await userEvent.press(nextButton);
      expect(screen.getByText("Upload Photos")).toBeOnTheScreen();
      const prevButton = screen.getByTestId("upload-photos-prev-button");
      await userEvent.press(prevButton);
      expect(screen.getByText("Location Details")).toBeOnTheScreen();
      const { nearestTownInput: nearestTownInput2 } = await getFormInputs();
      expect(nearestTownInput2.props.value).toBe("Kanakpura");
    });

    it("should be able to switch To Coordinates mode after entering Location details", async () => {
      jest
        .spyOn(utils, "confirmUndo")
        .mockImplementation(() => Promise.resolve(true));
      render(withQueryClient(<AddDestination />));
      const searchInput = screen.getByPlaceholderText(
        strings.addDestination.searchPlaceholder.destination,
      );
      await userEvent.type(searchInput, "Ravug");
      fireEvent(searchInput, "onFocus");

      await waitFor(() => {
        expect(screen.getByText("Ravugodlu")).toBeOnTheScreen();
        expect(screen.getByText("Karnataka, India")).toBeOnTheScreen();
      });

      // Select the destination
      const destinationItem = screen.getByText("Ravugodlu");
      await userEvent.press(destinationItem);

      // Verify the destination name is populated
      expect(searchInput.props.value).toBe("Ravugodlu, Karnataka, India");
      expect(screen.getByText("Location Details")).toBeOnTheScreen();
      const {
        nearestTownInput,
        descriptionInput,
        getThereInput,
        bestTimeInput,
      } = await getFormInputs();

      await userEvent.type(nearestTownInput, "Kanakpura");

      await userEvent.type(descriptionInput, "Test description");

      await userEvent.type(getThereInput, "Test get there");

      await userEvent.type(bestTimeInput, "Test best time");

      const nextButton = screen.getByTestId("location-details-next-button");
      await userEvent.press(nextButton);
      expect(screen.getByText("Upload Photos")).toBeOnTheScreen();
      const prevButton = screen.getByTestId("upload-photos-prev-button");
      await userEvent.press(prevButton);
      expect(screen.getByText("Location Details")).toBeOnTheScreen();
      const { nearestTownInput: nearestTownInput2 } = await getFormInputs();
      expect(nearestTownInput2.props.value).toBe("Kanakpura");

      // Switch to coordinates mode
      const coordinatesRadio = screen.getByText("Coordinates");
      await userEvent.press(coordinatesRadio);
      const coordsInput = screen.getByPlaceholderText(
        strings.addDestination.searchPlaceholder.coordinates,
      );
      expect(coordsInput).toBeOnTheScreen();
    });

    it("should be able to upload photos and proceed to the next step", async () => {
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

      render(withQueryClient(<AddDestination />));
      const searchInput = screen.getByPlaceholderText(
        strings.addDestination.searchPlaceholder.destination,
      );

      await userEvent.type(searchInput, "Ravug");
      fireEvent(searchInput, "onFocus");

      await waitFor(() => {
        expect(screen.getByText("Ravugodlu")).toBeOnTheScreen();
        expect(screen.getByText("Karnataka, India")).toBeOnTheScreen();
      });

      // Select the destination
      const destinationItem = screen.getByText("Ravugodlu");
      await userEvent.press(destinationItem);

      // Verify the destination name is populated
      expect(searchInput.props.value).toBe("Ravugodlu, Karnataka, India");
      expect(screen.getByText("Location Details")).toBeOnTheScreen();

      const nearestTownInput = screen.getByPlaceholderText(
        Strings.addDestination.locationForm.nearestTownPlaceholder,
      );
      await userEvent.type(nearestTownInput, "Test Town");

      const descriptionInput = screen.getByPlaceholderText(
        Strings.addDestination.locationForm.descriptionPlaceholder,
      );
      await userEvent.type(descriptionInput, "Test description");

      const getThereInput = screen.getByPlaceholderText(
        Strings.addDestination.locationForm.getTherePlaceholder,
      );
      await userEvent.type(getThereInput, "Test get there");

      const bestTimeInput = screen.getByPlaceholderText(
        Strings.addDestination.locationForm.bestTimePlaceholder,
      );
      await userEvent.type(bestTimeInput, "Test best time");

      const nextButton = screen.getByTestId("location-details-next-button");
      await userEvent.press(nextButton);
      expect(screen.getByText("Upload Photos")).toBeOnTheScreen();

      const uploadArea = screen.getByText("Tap to upload");
      expect(uploadArea).toBeOnTheScreen();
      await userEvent.press(uploadArea);

      const uploadedImages =
        await screen.findAllByLabelText("Destination Image");
      expect(uploadedImages[0]).toBeOnTheScreen();
      expect(
        screen.getAllByLabelText("Destination Image")[0].props.source,
      ).toEqual({
        uri: "file://photo.jpg",
      });
      await userEvent.press(screen.getByTestId("upload-photos-next-button"));
      expect(await screen.findByText("Climbing Areas")).toBeOnTheScreen();
    });

    it("should display an error message, if the user attempts to proceed with out selecting atleast 1 image", async () => {
      await render(withQueryClient(<AddDestination />));
      const searchInput = await screen.findByPlaceholderText(
        Strings.addDestination.searchPlaceholder.destination,
      );
      expect(searchInput).toBeOnTheScreen();
      await userEvent.type(searchInput, "Ravug");
      fireEvent(searchInput, "onFocus");

      await waitFor(() => {
        expect(screen.getByText("Ravugodlu")).toBeOnTheScreen();
        expect(screen.getByText("Karnataka, India")).toBeOnTheScreen();
      });

      // Select the destination
      const destinationItem = screen.getByText("Ravugodlu");
      await userEvent.press(destinationItem);

      // Verify the destination name is populated
      expect(searchInput.props.value).toBe("Ravugodlu, Karnataka, India");
      expect(screen.getByText("Location Details")).toBeOnTheScreen();

      const nearestTownInput = screen.getByPlaceholderText(
        Strings.addDestination.locationForm.nearestTownPlaceholder,
      );
      await userEvent.type(nearestTownInput, "Test Town");

      const descriptionInput = screen.getByPlaceholderText(
        Strings.addDestination.locationForm.descriptionPlaceholder,
      );
      await userEvent.type(descriptionInput, "Test description");

      const getThereInput = screen.getByPlaceholderText(
        Strings.addDestination.locationForm.getTherePlaceholder,
      );
      await userEvent.type(getThereInput, "Test get there");

      const bestTimeInput = screen.getByPlaceholderText(
        Strings.addDestination.locationForm.bestTimePlaceholder,
      );
      await userEvent.type(bestTimeInput, "Test best time");

      const nextButton = screen.getByTestId("location-details-next-button");
      await userEvent.press(nextButton);
      expect(screen.getByText("Upload Photos")).toBeOnTheScreen();

      const nextButton2 = screen.getByTestId("upload-photos-next-button");
      await userEvent.press(nextButton2);
      expect(
        screen.getByText("Please select at least one image"),
      ).toBeOnTheScreen();
    });
  });
  describe("Coordinates mode", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
    beforeAll(() => {
      jest.useFakeTimers();
    });
    afterAll(() => {
      jest.useRealTimers();
    });
    it("should display the Search box in coordinates mode, when the Coordinates radio button is clicked", async () => {
      await render(withQueryClient(<AddDestination />));
      const coordinatesRadio = await screen.findByText("Coordinates");
      expect(coordinatesRadio).toBeOnTheScreen();
      await userEvent.press(coordinatesRadio);
      const searchInput = await screen.findByPlaceholderText(
        strings.addDestination.searchPlaceholder.coordinates,
      );
      expect(searchInput).toBeOnTheScreen();
    });
    it("showld allow the user to search for coordinates in coordinates mode", async () => {
      await render(withQueryClient(<AddDestination />));
      const coordinatesRadio = screen.getByText("Coordinates");
      expect(coordinatesRadio).toBeOnTheScreen();
      await userEvent.press(coordinatesRadio);
      const searchInput = await screen.findByPlaceholderText(
        strings.addDestination.searchPlaceholder.coordinates,
      );
      expect(searchInput).toBeOnTheScreen();
      await userEvent.type(searchInput, "12.34, 56.78");
      await waitFor(() => expect(searchInput.props.value).toBe("12.34, 56.78"));
    });

    it("should not allow the user to search if the query does not match the coordinates format", async () => {
      await render(withQueryClient(<AddDestination />));
      const coordinatesRadio = screen.getByText("Coordinates");
      expect(coordinatesRadio).toBeOnTheScreen();
      await userEvent.press(coordinatesRadio);
      const searchInput = await screen.findByPlaceholderText(
        strings.addDestination.searchPlaceholder.coordinates,
      );
      expect(searchInput).toBeOnTheScreen();
      await userEvent.type(searchInput, "Railay Beach");
      expect(
        await screen.findByText(strings.errors.validationMsg),
      ).toBeOnTheScreen();
    });

    it("should clear the validation error when the user enters valid coordinates", async () => {
      await render(withQueryClient(<AddDestination />));
      const coordinatesRadio = screen.getByText("Coordinates");
      expect(coordinatesRadio).toBeOnTheScreen();
      await userEvent.press(coordinatesRadio);
      const searchInput = await screen.findByPlaceholderText(
        strings.addDestination.searchPlaceholder.coordinates,
      );
      expect(searchInput).toBeOnTheScreen();
      await userEvent.type(searchInput, "Railay Beach");
      expect(
        await screen.findByText(strings.errors.validationMsg),
      ).toBeOnTheScreen();
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, "126.34,567.78");
      await waitFor(() =>
        expect(
          screen.queryByText(strings.errors.validationMsg),
        ).not.toBeOnTheScreen(),
      );
    });
    it("should show an error when the coordinates are not found", async () => {
      await render(withQueryClient(<AddDestination />));
      const coordinatesRadio = screen.getByText("Coordinates");
      await userEvent.press(coordinatesRadio);
      const searchInput = await screen.findByPlaceholderText(
        strings.addDestination.searchPlaceholder.coordinates,
      );
      expect(searchInput).toBeOnTheScreen();
      await userEvent.type(searchInput, "123,456");
      await waitFor(() => {
        expect(screen.getByTestId("alert-circle-icon")).toBeOnTheScreen();
      });
    });
    it("should display a success icon and a stepper when the user enters accurate coordinates", async () => {
      await render(withQueryClient(<AddDestination />));
      const coordinatesRadio = screen.getByText("Coordinates");
      await userEvent.press(coordinatesRadio);

      const searchInput = await screen.findByPlaceholderText(
        strings.addDestination.searchPlaceholder.coordinates,
      );

      await userEvent.type(searchInput, "12.9716,77.5946");

      // After submitting coordinates, a destination name input should appear
      await waitFor(() => {
        const successIcon = screen.getByTestId("checked-circle-icon");
        expect(successIcon).toBeOnTheScreen();
        expect(screen.getByTestId("stepper")).toBeOnTheScreen();
      });
    });

    it("should not show the stepper when the coordinates are not found", async () => {
      await render(withQueryClient(<AddDestination />));
      const coordinatesRadio = screen.getByText("Coordinates");
      await userEvent.press(coordinatesRadio);
      const searchInput = await screen.findByPlaceholderText(
        strings.addDestination.searchPlaceholder.coordinates,
      );
      expect(searchInput).toBeOnTheScreen();
      await userEvent.type(searchInput, "123,456");
      await waitFor(() => {
        expect(screen.queryByTestId("stepper")).toBeNull();
      });
    });

    it("should not display a stepper when the user enters invalid coordinates", async () => {
      await render(withQueryClient(<AddDestination />));
      const coordinatesRadio = screen.getByText("Coordinates");
      await userEvent.press(coordinatesRadio);

      const searchInput = await screen.findByPlaceholderText(
        strings.addDestination.searchPlaceholder.coordinates,
      );

      await userEvent.type(searchInput, "12.9716,77.5946");

      await waitFor(() => {
        expect(screen.getByTestId("stepper")).toBeOnTheScreen();
      });

      await userEvent.type(searchInput, "12.9716x,77.5946");

      await waitFor(() => {
        expect(screen.queryByTestId("stepper")).toBeNull();
      });
    });

    it("should display the Destination name and the Location Details form when the user enters accurate coordinates", async () => {
      await render(withQueryClient(<AddDestination />));
      const coordinatesRadio = screen.getByText("Coordinates");
      await userEvent.press(coordinatesRadio);

      const searchInput = await screen.findByPlaceholderText(
        strings.addDestination.searchPlaceholder.coordinates,
      );

      await userEvent.type(searchInput, "12.9716,77.5946");

      // After submitting coordinates, a destination name input should appear
      await waitFor(() => {
        expect(screen.getByText("Location Details")).toBeOnTheScreen();

        const destNameInput = screen.getByPlaceholderText(
          "Enter the destination name",
        );
        expect(destNameInput).toBeOnTheScreen();
        expect(destNameInput.props.value).toBe("Ravugodlu");
      });
    });

    it("should be able to enter location details and proceed to the next step", async () => {
      await render(withQueryClient(<AddDestination />));
      const coordinatesRadio = screen.getByText("Coordinates");
      await userEvent.press(coordinatesRadio);

      const searchInput = await screen.findByPlaceholderText(
        strings.addDestination.searchPlaceholder.coordinates,
      );

      await userEvent.type(searchInput, "12.9716,77.5946");

      await waitFor(() => {
        expect(screen.getByText("Location Details")).toBeOnTheScreen();
        const destNameInput = screen.getByPlaceholderText(
          "Enter the destination name",
        );
        expect(destNameInput).toBeOnTheScreen();
        expect(destNameInput.props.value).toBe("Ravugodlu");
      });

      const nearestTownInput = await screen.findByPlaceholderText(
        Strings.addDestination.locationForm.nearestTownPlaceholder,
      );
      await userEvent.type(nearestTownInput, "Test Town");

      const descriptionInput = await screen.findByPlaceholderText(
        Strings.addDestination.locationForm.descriptionPlaceholder,
      );
      await userEvent.type(descriptionInput, "Test description");

      const getThereInput = await screen.findByPlaceholderText(
        Strings.addDestination.locationForm.getTherePlaceholder,
      );
      await userEvent.type(getThereInput, "Test get there");

      const bestTimeInput = await screen.findByPlaceholderText(
        Strings.addDestination.locationForm.bestTimePlaceholder,
      );
      await userEvent.type(bestTimeInput, "Test best time");

      const nextButton = await screen.findByTestId(
        "location-details-next-button",
      );
      await userEvent.press(nextButton);
      expect(await screen.findByText("Upload Photos")).toBeOnTheScreen();
    });

    it("should receive a warning message when trying to navigate away without saving", async () => {
      const alertSpy = jest.spyOn(Alert, "alert");

      await render(withQueryClient(<AddDestination />));
      const coordinatesRadio = screen.getByText("Coordinates");
      await userEvent.press(coordinatesRadio);

      const searchInput = await screen.findByPlaceholderText(
        strings.addDestination.searchPlaceholder.coordinates,
      );

      await userEvent.type(searchInput, "12.9716,77.5946");

      await waitFor(() => {
        expect(screen.getByText("Location Details")).toBeOnTheScreen();
        const destNameInput = screen.getByPlaceholderText(
          "Enter the destination name",
        );
        expect(destNameInput).toBeOnTheScreen();
        expect(destNameInput.props.value).toBe("Ravugodlu");
      });

      // Try to navigate away
      const destinationsRadio = await screen.findByText("Destinations");
      expect(destinationsRadio).toBeOnTheScreen();
      await userEvent.press(destinationsRadio);

      // Verify the alert is shown
      await expect(alertSpy).toHaveBeenCalled();
    });

    it("should be able to switch to Destinations mode while editing a destination in Coordinates mode", async () => {
      jest
        .spyOn(utils, "confirmUndo")
        .mockImplementation(() => Promise.resolve(true));

      await render(withQueryClient(<AddDestination />));
      const coordinatesRadio = screen.getByText("Coordinates");
      await userEvent.press(coordinatesRadio);

      const searchInput = await screen.findByPlaceholderText(
        strings.addDestination.searchPlaceholder.coordinates,
      );

      await userEvent.type(searchInput, "12.9716,77.5946");

      await waitFor(() => {
        expect(screen.getByText("Location Details")).toBeOnTheScreen();
        const destNameInput = screen.getByPlaceholderText(
          "Enter the destination name",
        );
        expect(destNameInput).toBeOnTheScreen();
        expect(destNameInput.props.value).toBe("Ravugodlu");
      });
      const {
        nearestTownInput,
        descriptionInput,
        getThereInput,
        bestTimeInput,
      } = await getFormInputs();
      await userEvent.type(nearestTownInput, "Kanakpura");
      await userEvent.type(descriptionInput, "Test description");
      await userEvent.type(getThereInput, "Test get there");
      await userEvent.type(bestTimeInput, "Test best time");

      const nextButton = await screen.findByTestId(
        "location-details-next-button",
      );
      await userEvent.press(nextButton);

      expect(screen.getByText("Upload Photos")).toBeOnTheScreen();
      const prevButton = await screen.findByTestId("upload-photos-prev-button");
      await userEvent.press(prevButton);

      const { nearestTownInput: nearestTownInput2 } = await getFormInputs();
      expect(nearestTownInput2.props.value).toBe("Kanakpura");

      // Switch to destinations mode
      const destinationsRadio = await screen.findByText("Destinations");

      // Try to navigate away
      expect(destinationsRadio).toBeOnTheScreen();
      await userEvent.press(destinationsRadio);
      const destInput = await screen.findByPlaceholderText(
        strings.addDestination.searchPlaceholder.destination,
      );
      expect(destInput).toBeOnTheScreen();
    });

    it("should display a message if the selected destination already exists", async () => {
      await render(withQueryClient(<AddDestination />));
      const coordinatesRadio = screen.getByText("Coordinates");
      await userEvent.press(coordinatesRadio);

      const searchInput = await screen.findByPlaceholderText(
        strings.addDestination.searchPlaceholder.coordinates,
      );
      expect(searchInput).toBeTruthy();
      await userEvent.type(searchInput, "15.3333,  76.4167");
      fireEvent(searchInput, "onFocus");

      await waitFor(() => {
        expect(
          screen.getByText("Destination already exists"),
        ).toBeOnTheScreen();
      });
    });
  });
});
