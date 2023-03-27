# Map for solar power potentials:

This project is a cross platform mobile application called “Solar” which will allow a users to select a house from a Map and calculate the solar power potential from the rooftop of the given house.

The goal of the project is to enable both individual users (searching their own properties) and solar panel advisors whom will be able to search and save multiple properties, to gather and analyse additional data about a houses solar power potentials before investing in applying solar panels to the rooftop. I believe this convenient method of gathering a properties solar panel potentials could encourage more houses to invest in renewable energies leading to a reduction in emissions and energy costs within households.

## **Prerequisites**

Before running the project, ensure you have the following software installed on your system:

1. Node.js **[https://nodejs.org/](https://nodejs.org/)**
2. Yarn

   ```
   npm install -g yarn
   ```

3. React Native CLI

   ```
   npm install -g react-native-cli
   ```

4. Android Studio (for Android development)
5. Xcode (for iOS development)

## **Installation**

1. Clone the repository to your local machine:

```
git clone https://github.com/VanillaSpoon/SolarApp.git
```

1. Navigate to the project directory:

```
cd SolarApp
```

1. Install dependencies using Yarn:

```
yarn install
```

## **Running the project**

### **For Android**

1. Make sure you have an Android emulator running or an Android device connected to your computer.
2. Start the Metro Bundler:

```
yarn start
```

1. In a separate terminal, run the following command to build and launch the app on the Android emulator or device:

```
yarn android
```

### **For iOS**

```
cd ios && pod install && cd ..
```

1. Make sure you have Xcode installed and configured on your system.
2. Start the Metro Bundler:

```
yarn start
```

1. In a separate terminal
2. Run the following command to build and launch the app on the iOS simulator:

```
yarn ios
```

# **Running the Project in Expo Go**

Follow these steps to run the project using the Expo Go app on your Android or iOS device:

## **Prerequisites**

1. Node.js **[https://nodejs.org/](https://nodejs.org/)**
2. Yarn

   ```
   npm install -g yarn
   ```

3. Install the Expo CLI by running the following command in your terminal or command prompt:

   ```
   npm install -g expo-cli
   ```

4. Install the Expo Go app on your Android or iOS device:
   - Android: **[Expo Go on Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US)**
   - iOS: **[Expo Go on App Store](https://apps.apple.com/app/apple-store/id982107779)**

## **Setting Up the Project**

1. Clone this repository to your local machine using the following command:

   ```
   git clone https://github.com/VanillaSpoon/SolarApp.git
   ```

2. Navigate to the project directory:

   ```
   cd SolarApp
   ```

3. Install the project dependencies:

   ```
   yarn install
   ```

   ```
   cd ios && pod install && cd ..
   ```

## **Running the Project**

1. Start the Expo development server:

   ```
   expo start
   ```

   ### Within the Metro Bundler:

   1. Set the connection type to Tunnel.
   2. Scan the QR code with your testing device using either:
      1. Expo go - app for android
      2. Camera - For apple (which will then bring you to the expo go app)

2. Wait for the application to render.
   **Problems encountered and progress so far**
