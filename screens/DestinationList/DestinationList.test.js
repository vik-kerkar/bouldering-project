import { render, screen, within } from "@testing-library/react-native";

import App from "../../app/App";
import { withNavigation } from "../../test/utils";

const AppWithNavigation = withNavigation(App);

describe("App", () => {
  it("should render", () => {
    render(<AppWithNavigation />);
    expect(screen.getByText("Bouldering Destinations")).toBeOnTheScreen();
  });

  it("should display a list of climbing destinations", () => {
    render(<AppWithNavigation />);
    const destinationList = screen.getByRole("list");
    expect(destinationList).toBeOnTheScreen();
    const { getByText } = within(destinationList);
    expect(getByText("Ravugodlu")).toBeOnTheScreen();
  });
});
