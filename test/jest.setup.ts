import "@testing-library/jest-native/extend-expect";
import { server } from "./mockApi/setup";
import "dotenv/config";

// Setup MSW
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () =>
  jest.fn(() => Promise.resolve()),
);

jest.mock("expo-image-picker", () => {
  const actual = jest.requireActual("expo-image-picker");

  return {
    ...actual,
    requestMediaLibraryPermissionsAsync: jest.fn(),
    launchImageLibraryAsync: jest.fn(),
    requestCameraPermissionsAsync: jest.fn(),
    launchCameraAsync: jest.fn(),
  };
});

jest.mock("expo-device", () => {
  return {
    isDevice: true,
  };
});

jest.mock("expo-file-system", () => {
  return {
    File: jest.fn().mockImplementation(() => ({
      base64: jest.fn(),
    })),
  };
});

jest.mock("base64-arraybuffer", () => ({
  decode: jest.fn(),
}));
