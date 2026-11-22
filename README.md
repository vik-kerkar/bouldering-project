# Welcome to your Climbing Destinations app 👋

Discover climbing destinations around the world, then add your own. This early prototype offers helpfult tips, interactive maps, image carousels, and a growing list of crags to explore.

## Features

- View climbing destinations
- Add your own climbing destinations
- Interactive maps
- Image carousels
- Upload photos
- Add climbing areas
- Helpful tips

## Tech Stack

- Expo
- React Native
- Supabase
- Tanstack Query
- Zustand
- React Native Testing Library
- TypeScript

## Get started

### Prerequisites

- Node.js (20.19.0 or higher)
- npm (10 or higher)

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file in the project root using `.env.example` as a reference:

```bash
cp .env.example .env
```

Configure the required environment variables.

You will need valid API credentials for the services used by the application, including:

- Supabase URL and anonymous key. - This will be provided upon request. Please send an email to vikkerkar@gmail.com if you would like to contribute to this project.
- Geoapify API keys - You can get these for free from [Geoapify](https://www.geoapify.com/)
- Google Maps iOS API key. - You can get one for free from [Google Cloud Console](https://console.cloud.google.com/)

Refer to `.env.example` for the required variable names.

**Note:** API credentials should not be committed to GitHub. Contributors must supply their own credentials where applicable.

### Start the app

```bash
 npx expo start
```

### Run tests

```bash
 npm test
```

### Run app in simulator

- **iOS**: To run the app in the iOS simulator, install Xcode from the Mac App Store. Once Xcode is installed, run `npx expo start` and press i to open in iOS simulator.
  [Detailed Installion Guide](https://docs.expo.dev/workflow/ios-simulator/)

- **Android**: To run the app in the Android simulator, install Android Studio from the Mac App Store. Once Android Studio is installed, run `npx expo start` and press a to open in Android simulator.
  [Detailed Installion Guide](https://docs.expo.dev/workflow/android-studio-emulator/)

### Run the app on your phone or tablet with Expo Go app

- Install the latest version of Expo Go app on your device
- Run `npx expo start`
- Scan the QR code from the app or your device camera.
- The app will download and launch on your device.

### Run the app in the iOS Simulator using a development build

If the app fails to run in the iOS simulator, you can run it using the development build

The native iOS project (`ios/`) is committed to the repository. Therefore, contributors do not need to run Expo Prebuild as part of the initial setup.

#### Prerequisites

Ensure the following tools are installed:

- macOS
- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [Xcode](https://developer.apple.com/xcode/)
- iOS Simulator runtime installed through Xcode
- [CocoaPods](https://cocoapods.org/)

#### Run Expo Prebuild to generate native iOS project and configure it with the environment variables

```bash
npx expo prebuild --platform ios
```

#### Install iOS native dependencies

Navigate to the iOS directory and install the CocoaPods dependencies:

```bash
cd ios
pod install
cd ..
```

This installs the native dependencies specified in `Podfile` and `Podfile.lock`.

#### Open the Xcode workspace

Open the generated Xcode workspace:

```bash
open ios/boulderingproject.xcworkspace
```

**Important:** Open `boulderingproject.xcworkspace`, not `boulderingproject.xcodeproj`. The workspace includes the CocoaPods dependencies required to build the application.

#### Build and install the development build

In Xcode:

1. Select the `boulderingproject` scheme.
2. Select an available iOS Simulator device (e.g. iPhone 18 Pro).
3. Select **Product → Build** (⌘ + B).
4. Wait for the build to complete successfully.
5. Select **Product → Run** (⌘ + R).

Xcode will compile the native application, install it on the selected simulator and launch it.

The first build may take several minutes because Xcode needs to compile the native dependencies.

Once the application is successfully installed, the development build is available on the simulator for subsequent development sessions.

#### Start the Metro development server

Open a terminal in the project root and start Expo in development-client mode:

```bash
npx expo start --dev-client
```

Wait until Metro reports that the development server is ready.

#### Launch the application

If the application is not already running:

- Open `boulderingproject` from the iOS Simulator Home screen.
- Alternatively, press `i` in the Expo CLI terminal to launch the iOS Simulator and attempt to open the development build.

If prompted, connect to the Metro development server. The default development server URL is:

```text
http://localhost:8081
```

The application should now load its JavaScript bundle from Metro.

#### Subsequent development sessions

After the initial native build and installation, you do not need to rebuild the application for ordinary JavaScript or TypeScript changes.

For subsequent sessions:

1. Open the iOS Simulator.
2. Start Metro from the project root:

   ```bash
   npx expo start --dev-client
   ```

3. Launch the installed `boulderingproject` application.
4. Make changes to the application code. Fast Refresh will apply supported changes automatically.

#### When is a native rebuild required?

A new native build is required when changes affect the native application, for example:

- Adding or removing native dependencies.
- Changing native iOS configuration.
- Updating the Expo SDK or React Native version.
- Changing native configuration plugins.

To rebuild and install the application from the project root:

```bash
npx expo run:ios
```

Alternatively, build and run through the Xcode workspace.

**Important:** Do not run `npx expo prebuild --clean` as part of the normal development workflow. The committed `ios/` directory contains the project's native configuration and should be preserved.

### Web support

Due to the use of native modules like `react-native-maps`, the app is currently not supported in the web browser.
