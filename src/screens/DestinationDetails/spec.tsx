import {
  render,
  screen,
  userEvent,
  within,
} from "@testing-library/react-native";

import DestinationList from "../DestinationList";

import strings from "@/src/constants/strings.json";

import { withQueryClient, withStackNavigator } from "@/test/utils";
import DestinationDetails from ".";

const DestinationListWithStack = withStackNavigator([
  { screenName: "DestinationList", component: DestinationList },
  { screenName: "DestinationDetails", component: DestinationDetails },
]);

describe("DestinationDetails", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  it("should render", async () => {
    render(withQueryClient(<DestinationListWithStack />));
    const destinationImg = await screen.findByLabelText(
      "Ravugodlu destination image",
    );
    expect(destinationImg).toBeOnTheScreen();
    await userEvent.press(destinationImg);
    expect(await screen.findByText("Ravugodlu")).toBeOnTheScreen();

    expect(await screen.findByText("Info")).toBeOnTheScreen();
    expect(await screen.findByText("Photos")).toBeOnTheScreen();
    expect(await screen.findByText("Areas")).toBeOnTheScreen();
  });

  describe("Image Carousel", () => {
    it("should render", async () => {
      render(withQueryClient(<DestinationListWithStack />));
      const destinationImg = await screen.findByLabelText(
        "Ravugodlu destination image",
      );
      expect(destinationImg).toBeOnTheScreen();
      await userEvent.press(destinationImg);

      // Find the carousel container
      const carousel = await screen.findByLabelText(
        "destination-image-carousel",
      );
      expect(carousel).toBeOnTheScreen();
    });

    it("should render the destination images", async () => {
      render(withQueryClient(<DestinationListWithStack />));
      const destinationImg = await screen.findByLabelText(
        "Ravugodlu destination image",
      );
      expect(destinationImg).toBeOnTheScreen();
      await userEvent.press(destinationImg);

      // Find the carousel container
      const carousel = await screen.findByLabelText(
        "destination-image-carousel",
      );
      expect(carousel).toBeOnTheScreen();

      // Find the images in the carousel
      const images = await within(carousel).findAllByRole("image");
      expect(images).toHaveLength(3);
    });

    it("should display the dot indicators", async () => {
      render(withQueryClient(<DestinationListWithStack />));
      const destinationImg = await screen.findByLabelText(
        "Ravugodlu destination image",
      );
      expect(destinationImg).toBeOnTheScreen();
      await userEvent.press(destinationImg);

      // Find the carousel container
      const carousel = await screen.findByLabelText(
        "destination-image-carousel",
      );
      expect(carousel).toBeOnTheScreen();

      // Find the images in the carousel
      const dots = await within(carousel).findAllByLabelText("carousel-dot");
      expect(dots).toHaveLength(3);
    });

    it("should change the image when the dot indicator is clicked", async () => {
      render(withQueryClient(<DestinationListWithStack />));
      const destinationImg = await screen.findByLabelText(
        "Ravugodlu destination image",
      );
      expect(destinationImg).toBeOnTheScreen();
      await userEvent.press(destinationImg);

      // Find the carousel container
      const carousel = await screen.findByLabelText(
        "destination-image-carousel",
      );
      expect(carousel).toBeOnTheScreen();

      // Find the images in the carousel
      const dots = await within(carousel).findAllByLabelText("carousel-dot");
      await userEvent.press(dots[1]);

      const images = await within(carousel).findAllByRole("image");

      expect(images[1]).toHaveAccessibilityState({ selected: true });
      await userEvent.press(dots[2]);
      expect(images[1]).toHaveAccessibilityState({ selected: false });

      expect(images[2]).toHaveAccessibilityState({ selected: true });
    });
  });
  describe("Destination tabs", () => {
    it("should render", async () => {
      render(withQueryClient(<DestinationListWithStack />));
      const destinationImg = await screen.findByLabelText(
        "Ravugodlu destination image",
      );
      expect(destinationImg).toBeOnTheScreen();
      await userEvent.press(destinationImg);

      const tabList = await screen.findByRole("tablist");
      expect(tabList).toBeOnTheScreen();

      expect(within(tabList).getByText("Info")).toBeOnTheScreen();
      expect(within(tabList).getByText("Photos")).toBeOnTheScreen();
      expect(within(tabList).getByText("Areas")).toBeOnTheScreen();
    });

    it("should render destination info", async () => {
      render(withQueryClient(<DestinationListWithStack />));
      const { info } = strings.destinationDetails;
      const destinationImg = await screen.findByLabelText(
        "Ravugodlu destination image",
      );
      expect(destinationImg).toBeOnTheScreen();
      await userEvent.press(destinationImg);

      const tabList = await screen.findByRole("tablist");
      expect(tabList).toBeOnTheScreen();
      const infoTab = within(tabList).getByText("Info");
      await userEvent.press(infoTab);
      expect(await screen.findByText(info.gpsCoordinates)).toBeOnTheScreen();
      expect(await screen.findByText(info.aboutThePlace)).toBeOnTheScreen();
      expect(await screen.findByText(info.howToGetThere)).toBeOnTheScreen();
      expect(await screen.findByText(info.nearestTownCity)).toBeOnTheScreen();
    });

    it("should render destination photos", async () => {
      render(withQueryClient(<DestinationListWithStack />));
      const destinationImg = await screen.findByLabelText(
        "Ravugodlu destination image",
      );
      expect(destinationImg).toBeOnTheScreen();
      await userEvent.press(destinationImg);

      const tabList = await screen.findByRole("tablist");
      expect(tabList).toBeOnTheScreen();
      const photosTab = within(tabList).getByText("Photos");
      await userEvent.press(photosTab);

      expect(
        await screen.findByLabelText("Destination photo 1"),
      ).toBeOnTheScreen();
      expect(
        await screen.findByLabelText("Destination photo 2"),
      ).toBeOnTheScreen();
      expect(
        await screen.findByLabelText("Destination photo 3"),
      ).toBeOnTheScreen();
    });

    it("should render a map with marker showing the destination location", async () => {
      render(withQueryClient(<DestinationListWithStack />));
      const destinationImg = await screen.findByLabelText(
        "Ravugodlu destination image",
      );
      expect(destinationImg).toBeOnTheScreen();
      await userEvent.press(destinationImg);

      const tabList = await screen.findByRole("tablist");
      expect(tabList).toBeOnTheScreen();
      const areasTab = within(tabList).getByText("Areas");
      await userEvent.press(areasTab);

      expect(await screen.findByTestId("destination-map")).toBeOnTheScreen();
      const marker = await screen.findByTestId("destination-marker");
      expect(marker.props.coordinate).toEqual({
        latitude: 12.73221,
        longitude: 77.49886,
      });
    });

    it("should render marker on Map for each climbing area associated with that destination", async () => {
      render(withQueryClient(<DestinationListWithStack />));
      const destinationImg = await screen.findByLabelText(
        "Ravugodlu destination image",
      );
      expect(destinationImg).toBeOnTheScreen();
      await userEvent.press(destinationImg);

      const tabList = await screen.findByRole("tablist");
      expect(tabList).toBeOnTheScreen();
      const areasTab = within(tabList).getByText("Areas");
      await userEvent.press(areasTab);

      expect(await screen.findByTestId("destination-map")).toBeOnTheScreen();

      const areaMarkers = await screen.findAllByTestId("area-marker");
      expect(areaMarkers).toHaveLength(2);
      expect(areaMarkers[0].props.coordinate).toEqual({
        latitude: 12.7375,
        longitude: 77.5038,
      });
      expect(areaMarkers[1].props.coordinate).toEqual({
        latitude: 12.7367,
        longitude: 77.5031,
      });
    });

    it("should render the list of climbing areas associated with that destination", async () => {
      render(withQueryClient(<DestinationListWithStack />));
      const { areas } = strings.destinationDetails;

      const destinationImg = await screen.findByLabelText(
        "Ravugodlu destination image",
      );
      expect(destinationImg).toBeOnTheScreen();
      await userEvent.press(destinationImg);

      const tabList = await screen.findByRole("tablist");
      expect(tabList).toBeOnTheScreen();
      const areasTab = within(tabList).getByText("Areas");
      await userEvent.press(areasTab);

      const climbingAreaView = await screen.findByLabelText(areas);

      expect(
        await within(climbingAreaView).findByText("Pinkathon"),
      ).toBeOnTheScreen();
      expect(
        await within(climbingAreaView).findByText("12.7375, 77.5038"),
      ).toBeOnTheScreen();

      expect(
        await within(climbingAreaView).findByText("Red Sea area"),
      ).toBeOnTheScreen();
      expect(
        await within(climbingAreaView).findByText("12.7367, 77.5031"),
      ).toBeOnTheScreen();
    });
  });
});
