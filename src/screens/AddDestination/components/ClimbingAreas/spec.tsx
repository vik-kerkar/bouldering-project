import ClimbingAreas from ".";
import {
  render,
  screen,
  userEvent,
  fireEvent,
} from "@testing-library/react-native";
import { withQueryClient } from "@/test/utils";
import { useAddDestinationStore } from "../../state";
import strings from "@/src/constants/strings.json";
import { colors } from "@/src/theme";

const { addDestination } = strings;

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("ClimbingAreas", () => {
  beforeEach(() => {
    useAddDestinationStore.setState({
      newDestination: {
        name: "Dream Location",
        placeId: "test",
        nearestTownCity: "Test",
        description: "Test",
        gettingThere: "Test",
        state: "Test",
        country: "Test",
        lat: 12.73526, //12.73527, 77.50161
        long: 77.5016,
        county: "Test",
        district: "Test",
      },
      climbingAreas: null,
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should render", () => {
    render(withQueryClient(<ClimbingAreas />));
    expect(screen.getByText("Climbing Areas")).toBeOnTheScreen();
  });
  it("should render a map marking the new desitnation", () => {
    render(withQueryClient(<ClimbingAreas />));
    expect(screen.getByTestId("destination-map")).toBeOnTheScreen();
    const marker = screen.getByTestId("destination-marker");

    expect(marker.props.coordinate).toEqual({
      latitude: 12.73526,
      longitude: 77.5016,
    });
    expect(screen.getByText("Dream Location")).toBeOnTheScreen();
  });
  it("should render the Climbing area form on click of the `Add Climbing Area` button", async () => {
    render(withQueryClient(<ClimbingAreas />));
    const button = screen.getByText(addDestination.climbingAreas.buttonText);
    expect(
      screen.queryByPlaceholderText(
        addDestination.climbingAreas.areaNamePlaceholder,
      ),
    ).not.toBeOnTheScreen();
    await userEvent.press(button);
    expect(
      await screen.findByPlaceholderText(
        addDestination.climbingAreas.areaNamePlaceholder,
      ),
    ).toBeOnTheScreen();
    expect(button).toBeDisabled();
  });
  it("should render the LatLong input as disabled", async () => {
    render(withQueryClient(<ClimbingAreas />));
    const button = screen.getByText(addDestination.climbingAreas.buttonText);
    await userEvent.press(button);
    const latLongInput = screen.getByPlaceholderText(
      addDestination.climbingAreas.latLongPlaceholder,
    );
    expect(latLongInput).toBeDisabled();
  });
  it("should not display a marker for the climbing area on the map, when the Climbing area form is not visible", async () => {
    render(withQueryClient(<ClimbingAreas />));
    const map = screen.getByTestId("destination-map");
    fireEvent(map, "press", {
      nativeEvent: {
        coordinate: {
          latitude: 12.73536,
          longitude: 77.5026,
        },
      },
    });
    const marker = screen.queryByTestId("new-area-marker");
    expect(marker).not.toBeOnTheScreen();
  });
  it("should allow the user to mark the climbing area on the map, when the Climbing area form is visible", async () => {
    render(withQueryClient(<ClimbingAreas />));
    const button = screen.getByText(addDestination.climbingAreas.buttonText);
    await userEvent.press(button);
    expect(
      await screen.findByPlaceholderText(
        addDestination.climbingAreas.areaNamePlaceholder,
      ),
    ).toBeOnTheScreen();
    const map = screen.getByTestId("destination-map");
    fireEvent(map, "press", {
      nativeEvent: {
        coordinate: {
          latitude: 12.73536,
          longitude: 77.5026,
        },
      },
    });
    const marker = await screen.findByTestId("new-area-marker");
    expect(marker).toBeOnTheScreen();
    expect(marker.props.coordinate).toEqual({
      latitude: 12.73536,
      longitude: 77.5026,
    });
    const latLongInput = await screen.findByPlaceholderText(
      addDestination.climbingAreas.latLongPlaceholder,
    );
    expect(latLongInput.props.value).toBe("12.73536, 77.50260");
  });
  it("should allow the user to edit the Latlong input", async () => {
    render(withQueryClient(<ClimbingAreas />));
    const button = screen.getByText(addDestination.climbingAreas.buttonText);
    await userEvent.press(button);
    const latLongInput = screen.getByPlaceholderText(
      addDestination.climbingAreas.latLongPlaceholder,
    );
    expect(latLongInput).toBeDisabled();
    const editIconButton = await screen.findByTestId("icon-button");
    await userEvent.press(editIconButton);
    expect(latLongInput).not.toBeDisabled();
  });
  it("should allow the user to lock the Latlong input while editing", async () => {
    render(withQueryClient(<ClimbingAreas />));
    const button = screen.getByText(addDestination.climbingAreas.buttonText);
    await userEvent.press(button);
    const latLongInput = screen.getByPlaceholderText(
      addDestination.climbingAreas.latLongPlaceholder,
    );
    expect(latLongInput).toBeDisabled();
    const editIconButton = await screen.findByTestId("icon-button");
    await userEvent.press(editIconButton);
    expect(latLongInput).not.toBeDisabled();
    await userEvent.press(editIconButton);
    expect(latLongInput).toBeDisabled();
  });
  it("should show an error when the user enters invalid coordinates", async () => {
    render(withQueryClient(<ClimbingAreas />));
    const button = screen.getByText(addDestination.climbingAreas.buttonText);
    await userEvent.press(button);
    const latLongInput = screen.getByPlaceholderText(
      addDestination.climbingAreas.latLongPlaceholder,
    );
    const editIconButton = await screen.findByTestId("icon-button");
    await userEvent.press(editIconButton);
    await userEvent.type(latLongInput, "invalid");
    expect(latLongInput).toHaveStyle({ borderColor: colors.error });
    expect(
      screen.getByText(strings.errors.latLongInvalidMsg),
    ).toBeOnTheScreen();
  });
  it("should show an error when the user enters area coordinates which are too far from the destination", async () => {
    render(withQueryClient(<ClimbingAreas />));
    const button = screen.getByText(addDestination.climbingAreas.buttonText);
    await userEvent.press(button);
    const latLongInput = screen.getByPlaceholderText(
      addDestination.climbingAreas.latLongPlaceholder,
    );
    const editIconButton = await screen.findByTestId("icon-button");
    await userEvent.press(editIconButton);
    await userEvent.type(latLongInput, "13.73527, 77.50161");
    expect(latLongInput).toHaveStyle({ borderColor: colors.error });
    expect(
      screen.getByText(strings.errors.latLongOutOfRange),
    ).toBeOnTheScreen();
  });
  it("should allow saving of a new climbing area and render the new area after saving", async () => {
    render(withQueryClient(<ClimbingAreas />));
    const button = screen.getByText(addDestination.climbingAreas.buttonText);
    await userEvent.press(button);
    const areaNameInput = await screen.findByPlaceholderText(
      addDestination.climbingAreas.areaNamePlaceholder,
    );
    const areaDescInput = await screen.findByPlaceholderText(
      addDestination.climbingAreas.areaDescriptionPlaceholder,
    );
    await userEvent.type(areaNameInput, "Blue Water Area");
    await userEvent.type(
      areaDescInput,
      "A beautiful bouldering area next to a lagoon",
    );
    const map = screen.getByTestId("destination-map");
    fireEvent(map, "press", {
      nativeEvent: {
        coordinate: {
          latitude: 12.73536,
          longitude: 77.5026,
        },
      },
    });
    const marker = await screen.findByTestId("new-area-marker");
    expect(marker).toBeOnTheScreen();
    expect(marker.props.coordinate).toEqual({
      latitude: 12.73536,
      longitude: 77.5026,
    });

    const saveBtn = await screen.findByTestId("save-area-button");
    await userEvent.press(saveBtn);

    expect(
      screen.queryByPlaceholderText(
        addDestination.climbingAreas.areaNamePlaceholder,
      ),
    ).not.toBeOnTheScreen();
    expect(
      screen.queryByPlaceholderText(
        addDestination.climbingAreas.latLongPlaceholder,
      ),
    ).not.toBeOnTheScreen();
  });
  it("should set the default value of the area coordinates to the destination coordinates,  when the form is submitted and the latlong is empty", async () => {
    render(withQueryClient(<ClimbingAreas />));
    const button = screen.getByText(addDestination.climbingAreas.buttonText);
    await userEvent.press(button);
    const areaNameInput = await screen.findByPlaceholderText(
      addDestination.climbingAreas.areaNamePlaceholder,
    );
    await userEvent.type(areaNameInput, "Blue Water Area");

    const saveBtn = await screen.findByTestId("save-area-button");
    await userEvent.press(saveBtn);

    expect(
      screen.queryByPlaceholderText(
        addDestination.climbingAreas.latLongPlaceholder,
      ),
    ).not.toBeOnTheScreen();
    expect(screen.getByText("12.73526, 77.5016")).toBeOnTheScreen();
  });
  it("should render the new area with its marker after saving", async () => {
    render(withQueryClient(<ClimbingAreas />));
    const button = screen.getByText(addDestination.climbingAreas.buttonText);
    await userEvent.press(button);
    const areaNameInput = await screen.findByPlaceholderText(
      addDestination.climbingAreas.areaNamePlaceholder,
    );
    const areaDescInput = await screen.findByPlaceholderText(
      addDestination.climbingAreas.areaDescriptionPlaceholder,
    );
    await userEvent.type(areaNameInput, "Blue Water Area");
    await userEvent.type(
      areaDescInput,
      "A beautiful bouldering area next to a lagoon",
    );
    const map = screen.getByTestId("destination-map");
    fireEvent(map, "press", {
      nativeEvent: {
        coordinate: {
          latitude: 12.73536,
          longitude: 77.5026,
        },
      },
    });
    const marker = await screen.findByTestId("new-area-marker");
    expect(marker).toBeOnTheScreen();
    expect(marker.props.coordinate).toEqual({
      latitude: 12.73536,
      longitude: 77.5026,
    });

    const saveBtn = await screen.findByTestId("save-area-button");
    await userEvent.press(saveBtn);

    expect(
      screen.queryByPlaceholderText(
        addDestination.climbingAreas.areaNamePlaceholder,
      ),
    ).not.toBeOnTheScreen();
    expect(
      screen.queryByPlaceholderText(
        addDestination.climbingAreas.latLongPlaceholder,
      ),
    ).not.toBeOnTheScreen();

    expect(screen.getAllByText("Blue Water Area")).toHaveLength(2);
    expect(screen.getByText("12.73536, 77.5026")).toBeOnTheScreen();
    expect(
      screen.getByText("A beautiful bouldering area next to a lagoon"),
    ).toBeOnTheScreen();
    const areaMarker = await screen.findByTestId("area-marker");
    expect(areaMarker).toBeOnTheScreen();
    expect(areaMarker.props.coordinate).toEqual({
      latitude: 12.73536,
      longitude: 77.5026,
    });
  });
});
