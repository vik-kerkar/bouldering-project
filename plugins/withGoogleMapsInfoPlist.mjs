import { withAppDelegate } from "@expo/config-plugins";

const MAPS_BLOCK =
  /(\/\/ @generated begin react-native-maps-init[^\n]*\n)[\s\S]*?(\/\/ @generated end react-native-maps-init[^\n]*)/;

const INFO_PLIST_INIT = `#if canImport(GoogleMaps)
    if let apiKey = Bundle.main.object(
      forInfoDictionaryKey: "GMSApiKey"
    ) as? String {
      GMSServices.provideAPIKey(apiKey)
    } else {
      fatalError("Missing GMSApiKey in Info.plist")
    }
#endif`;

export default function withGoogleMapsInfoPlist(config) {
  return withAppDelegate(config, (config) => {
    let contents = config.modResults.contents;

    // Find the react-native-maps generated initialisation block.
    const match = contents.match(MAPS_BLOCK);

    if (!match) {
      throw new Error(
        "Could not find react-native-maps initialisation block in AppDelegate.swift.",
      );
    }

    // Preserve Expo's generated markers, but replace the block contents.
    const updatedBlock = `${match[1]}${INFO_PLIST_INIT}\n${match[2]}`;

    // Remove the existing block from its current position.
    contents = contents.replace(match[0], "");

    // Find the React Native startup conditional.
    const insertionPoint = contents.indexOf("#if os(iOS) || os(tvOS)");

    if (insertionPoint === -1) {
      throw new Error(
        "Could not find the React Native startup section in AppDelegate.swift.",
      );
    }

    // Insert Google Maps initialisation before React Native starts.
    contents =
      contents.slice(0, insertionPoint) +
      updatedBlock +
      "\n\n    " +
      contents.slice(insertionPoint);

    config.modResults.contents = contents;

    return config;
  });
}
