import {
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import App from "../app/App";

describe("App with TabNavigator", () => {
  it("should render TabNavigator with Destinations tab", async () => {
    render(
      <NavigationContainer>
        <App />
      </NavigationContainer>,
    );

    // Check that Destinations tab content is rendered
    expect(await screen.findByText("Destinations")).toBeTruthy();
  });

  it("should render TabNavigator with Add Destinations tab", async () => {
    render(
      <NavigationContainer>
        <App />
      </NavigationContainer>,
    );

    // Check that Add Destinations tab content is rendered
    expect(await screen.findByText("Add Destinations")).toBeTruthy();
  });

  it("should render the correct screen, when the appropriate tab is pressed", async () => {
    render(
      <NavigationContainer>
        <App />
      </NavigationContainer>,
    );

    // Wait for tabs to be available
    await waitFor(() => {
      expect(screen.getByText("Add Destinations")).toBeTruthy();
      expect(screen.getByText("Destinations")).toBeTruthy();
    });

    // Simulate tab navigation to Add Destinations
    fireEvent.press(screen.getByText("Add Destinations"));

    expect(screen.getByText("Add Destinations Screen")).toBeTruthy();

    // Simulate tab navigation to Destinations
    fireEvent.press(screen.getByText("Destinations"));

    expect(screen.getByText("Climbing Destinations")).toBeTruthy();
  });
});
