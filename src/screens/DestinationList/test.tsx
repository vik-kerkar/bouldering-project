import { render, screen } from "@testing-library/react-native";

import DestinationList from "./index";

const mockDestinations = [
  {
    id: 1,
    name: "Ravugodlu",
    url: "https://example.com/ravugodlu.jpg",
    description: "A beautiful climbing destination",
  },
];

describe("DestinationList", () => {
  it("should render", () => {
    render(<DestinationList destinations={mockDestinations} />);
    expect(screen.getByText("Climbing Destinations")).toBeTruthy();
  });

  it("should display a list of climbing destinations", () => {
    render(<DestinationList destinations={mockDestinations} />);
    expect(screen.getByText("Ravugodlu")).toBeTruthy();
  });
});
