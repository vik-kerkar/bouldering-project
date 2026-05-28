const config = {
  preset: "jest-expo",
  setupFiles: [],
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  testEnvironment: "node",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|msw)",
  ],
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/test/__mocks__/svgMock.js",
  },
};

module.exports = config;
