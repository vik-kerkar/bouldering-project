import AddDestination from ".";
import {
  render,
  screen,
  userEvent,
  waitFor,
  fireEvent,
} from "@testing-library/react-native";
import strings from "@/src/constants/strings.json";
import { withQueryClient } from "@/test/utils";

import * as utils from "@/src/utils";

describe("AddDestination", () => {
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
    beforeEach(() => {
      jest.spyOn(utils, "delay").mockImplementation(() => Promise.resolve());
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

      fireEvent(searchInput, "onBlur");

      await waitFor(() => {
        expect(screen.queryByText("Ravugodlu")).not.toBeOnTheScreen();
        expect(screen.queryByText("Karnataka, India")).not.toBeOnTheScreen();
      });
    });

    it("should populate the destination name and show the steeper when a destination is selected", async () => {
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
  });
  describe("Coordinates mode", () => {
    it("should display the Search box in coordinates mode, when the Coordinates radio button is clicked", async () => {
      await render(withQueryClient(<AddDestination />));
      const coordinatesRadio = screen.getByText("Coordinates");
      expect(coordinatesRadio).toBeOnTheScreen();
      await userEvent.press(coordinatesRadio);
      const searchInput = screen.getByPlaceholderText(
        strings.addDestination.searchPlaceholder.coordinates,
      );
      expect(searchInput).toBeOnTheScreen();
    });
    it("showld allow the user to search for coordinates in coordinates mode", async () => {
      await render(withQueryClient(<AddDestination />));
      const coordinatesRadio = screen.getByText("Coordinates");
      expect(coordinatesRadio).toBeOnTheScreen();
      await userEvent.press(coordinatesRadio);
      const searchInput = screen.getByPlaceholderText(
        strings.addDestination.searchPlaceholder.coordinates,
      );
      expect(searchInput).toBeOnTheScreen();
      await userEvent.type(searchInput, "12.34, 56.78");
      expect(searchInput.props.value).toBe("12.34, 56.78");
    });

    it("should not allow the user to search if the query does not match the coordinates format", async () => {
      await render(withQueryClient(<AddDestination />));
      const coordinatesRadio = screen.getByText("Coordinates");
      expect(coordinatesRadio).toBeOnTheScreen();
      await userEvent.press(coordinatesRadio);
      const searchInput = screen.getByPlaceholderText(
        strings.addDestination.searchPlaceholder.coordinates,
      );
      expect(searchInput).toBeOnTheScreen();
      await userEvent.type(searchInput, "Railay Beach");
      expect(screen.getByText(strings.errors.validationMsg)).toBeOnTheScreen();
    });

    it("should clear the validation error when the user enters valid coordinates", async () => {
      await render(withQueryClient(<AddDestination />));
      const coordinatesRadio = screen.getByText("Coordinates");
      expect(coordinatesRadio).toBeOnTheScreen();
      await userEvent.press(coordinatesRadio);
      const searchInput = screen.getByPlaceholderText(
        strings.addDestination.searchPlaceholder.coordinates,
      );
      expect(searchInput).toBeOnTheScreen();
      await userEvent.type(searchInput, "Railay Beach");
      expect(screen.getByText(strings.errors.validationMsg)).toBeOnTheScreen();
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, "126.34,567.78");
      expect(
        screen.queryByText(strings.errors.validationMsg),
      ).not.toBeOnTheScreen();
    });
    it("should show an error when the coordinates are not found", async () => {
      await render(withQueryClient(<AddDestination />));
      const coordinatesRadio = screen.getByText("Coordinates");
      await userEvent.press(coordinatesRadio);
      const searchInput = screen.getByPlaceholderText(
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

      const searchInput = screen.getByPlaceholderText(
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
      const searchInput = screen.getByPlaceholderText(
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

      const searchInput = screen.getByPlaceholderText(
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
  });
});
