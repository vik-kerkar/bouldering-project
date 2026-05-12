const config = {
  preset: "jest-expo",
  setupFiles: ["./test/jest.setup.ts"],
  setupFilesAfterEnv: ["@testing-library/jest-native"],
  testEnvironment: "node",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
};

module.exports = config;
