import { render, screen, userEvent } from "@testing-library/react-native";

import DestinationList from "./index";
import { withQueryClient } from "@/test/utils";

import { withStackNavigator } from "@/test/utils";
import DestinationDetails from "../DestinationDetails";

const DestinationListWithStack = withStackNavigator([
  { screenName: "DestinationList", component: DestinationList },
  { screenName: "DestinationDetails", component: DestinationDetails },
]);

describe("DestinationList", () => {
  it("should render", () => {
    render(withQueryClient(<DestinationListWithStack />));
    expect(screen.getByText("Climbing Destinations")).toBeTruthy();
  });

  it("should display a list of climbing destinations", async () => {
    render(withQueryClient(<DestinationListWithStack />));
    expect(await screen.findByText("Ravugodlu")).toBeTruthy();
  });

  it("should display the destination details when a destination image is clicked", async () => {
    render(withQueryClient(<DestinationListWithStack />));
    const destinationImg = await screen.findByLabelText(
      "Ravugodlu destination image",
    );
    expect(destinationImg).toBeOnTheScreen();
    await userEvent.press(destinationImg);
    expect(await screen.findByText("Ravugodlu")).toBeOnTheScreen();

    expect(await screen.findByText("Info")).toBeOnTheScreen();
    expect(await screen.findByText("Photos")).toBeOnTheScreen();
    expect(await screen.findByText("Climbing Areas")).toBeOnTheScreen();
  });
});
