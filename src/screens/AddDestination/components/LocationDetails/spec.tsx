import LocationDetails from ".";
import { render, screen, userEvent } from "@testing-library/react-native";
import Strings from "@/src/constants/strings.json";
import { withQueryClient } from "@/test/utils";

describe("LocationDetails", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  it("should render", async () => {
    render(withQueryClient(<LocationDetails />));
    expect(screen.getByText("Location Details")).toBeOnTheScreen();
  });

  it("should render the location fields", () => {
    render(withQueryClient(<LocationDetails />));
    expect(
      screen.getByText(Strings.addDestination.locationForm.nearestTown),
    ).toBeOnTheScreen();
    expect(
      screen.getByText(Strings.addDestination.locationForm.describeLocation),
    ).toBeOnTheScreen();
    expect(
      screen.getByText(Strings.addDestination.locationForm.howToGetThere),
    ).toBeOnTheScreen();
    expect(
      screen.getByText(Strings.addDestination.locationForm.bestTimeToClimb),
    ).toBeOnTheScreen();
  });

  it("should allow the user to submit location details, after all mandatory fields are entered", async () => {
    render(withQueryClient(<LocationDetails />));
    expect(screen.getByTestId("location-details-next-button")).toBeDisabled();
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

    expect(
      screen.getByTestId("location-details-next-button"),
    ).not.toBeDisabled();
  });

  it("should reset the form if the reset button is pressed", async () => {
    render(withQueryClient(<LocationDetails />));
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

    const resetButton = screen.getByTestId("location-details-reset-button");
    await userEvent.press(resetButton);

    expect(screen.getByTestId("location-details-next-button")).toBeDisabled();
    expect(nearestTownInput).toHaveTextContent("");
    expect(descriptionInput).toHaveTextContent("");
    expect(getThereInput).toHaveTextContent("");
    expect(bestTimeInput).toHaveTextContent("");
  });
});
