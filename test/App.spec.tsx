import {
  render,
  screen,
  waitFor,
  userEvent,
  fireEvent,
} from "@testing-library/react-native";
import App from "../app/App";
import { withQueryClient, withNavigator } from "./utils";
import * as utils from "@/src/utils/async";
import strings from "@/src/constants/strings.json";

describe("App with TabNavigator", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it("should render TabNavigator with Destinations tab", async () => {
    render(withNavigator(withQueryClient(<App />)));

    // Check that Destinations tab content is rendered
    await waitFor(() => {
      expect(screen.getByText("Destinations")).toBeTruthy();
    });
  });

  it("should render TabNavigator with Add Destinations tab", async () => {
    render(withNavigator(withQueryClient(<App />)));

    await waitFor(() => {
      expect(screen.getByText("Add Destination")).toBeTruthy();
    });
  });

  it("should render the correct screen, when the appropriate tab is pressed", async () => {
    render(withNavigator(withQueryClient(<App />)));

    // Wait for tabs to be available
    await waitFor(() => {
      expect(screen.getByText("Add Destination")).toBeTruthy();
      expect(screen.getByText("Destinations")).toBeTruthy();
    });

    // Simulate tab navigation to Add Destinations
    await userEvent.press(screen.getByText("Add Destination"));

    expect(screen.getByText("Add a Destination")).toBeOnTheScreen();

    // Simulate tab navigation to Destinations
    await userEvent.press(await screen.findByTestId("destinations-tab"));

    expect(screen.getByText("Climbing Destinations")).toBeOnTheScreen();
  });
  it("should prompt for unsaved changes when the user attempts to switch to the Destinations tab", async () => {
    const confirmSpy = jest.spyOn(utils, "confirmUndo");
    render(withNavigator(withQueryClient(<App />)));
    // Wait for tabs to be available
    await waitFor(() => {
      expect(screen.getByText("Add Destination")).toBeTruthy();
      expect(screen.getByText("Destinations")).toBeTruthy();
    });

    // Simulate tab navigation to Add Destinations
    await userEvent.press(screen.getByText("Add Destination"));
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

    // Switch to destinations tab
    const destinationsTab = await screen.findByTestId("destinations-tab");
    await userEvent.press(destinationsTab);
    // Verify that the confirmUndo function was called
    expect(confirmSpy).toHaveBeenCalled();
  });
  it("should successfully navigate to Destinations tab, if user chhoses to discard unsaved changes", async () => {
    jest.spyOn(utils, "confirmUndo").mockResolvedValue(true);
    render(withNavigator(withQueryClient(<App />)));
    // Wait for tabs to be available
    await waitFor(() => {
      expect(screen.getByText("Add Destination")).toBeTruthy();
      expect(screen.getByText("Destinations")).toBeTruthy();
    });

    // Simulate tab navigation to Add Destinations
    await userEvent.press(screen.getByText("Add Destination"));
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

    // Switch to destinations tab
    const destinationsTab = await screen.findByTestId("destinations-tab");
    await userEvent.press(destinationsTab);
    expect(await screen.findByText("Climbing Destinations")).toBeOnTheScreen();
  });
});
