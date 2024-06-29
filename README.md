<p align="center">
  <img src="https://uploads-ssl.webflow.com/6535b557dfd7d23795a6744e/66806a45fbcab3ee0a274730_Zero%20To%20App%20GIF.gif">
</p>

Zero To App is an easily customizable React Native boilerplate that works seamlessly on both web and mobile. The design is loosely based on Facebook's mobile app and website. 
It includes pre-built template pages for your authentication flow, bottom navigation, and basic components that all share common styles you can easily configure from a single file. 

## Try A Live Demo on the Web!
### [🚀 Try Zero To App Now! 🚀](https://d57xfeu0gmhs7.cloudfront.net)



### Core Frameworks and Libraries
- [Expo](https://expo.dev/): An open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React.
- [React Native](https://reactnative.dev/): A framework for building native apps using React.
- [React Native Web](https://necolas.github.io/react-native-web/): A project to bring React Native components and APIs to the web.
- [React Native Lottie](https://github.com/lottie-react-native/lottie-react-native): A library for rendering Adobe After Effects animations natively on mobile.
- [Expo Router](https://expo.github.io/router/docs/): A file-based routing library for Expo and React Native.
- [React Navigation](https://reactnavigation.org/): Routing and navigation for your React Native apps.
- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript.

### Development Tools
- [ESLint](https://eslint.org/): A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
- [Prettier](https://prettier.io/): An opinionated code formatter.
- [TypeScript ESLint](https://typescript-eslint.io/): Monorepo for all the tooling which enables ESLint to support TypeScript.


## Included Authentication Screen/Page Templates
- **Login**
- **Signup**
- **Account Recovery**
- **Settings**


## Getting Started

### Installation

First, clone the repository:

```bash
git clone https://github.com/alex-amayo/zerotoapp.git
cd zerotoapp
```

Install dependencies using npm:
```bash
npm install
```

Start the app:
```bash
npx expo start
```

# Brand Configuration
The `brandConfig.ts` file defines the styling for the application. It uses a `Brand` object to set various typesafe style properties that you can pass down in your app.
This is not to be confused with a theme (dark mode/ light mode) Which will be confugured in a later iteration of the boilerplate using the Context API.

 The properties set in brand/brand.ts will style most of the compoents that come pre-built giving you a custom look for your app. 

```typescript
import { Colors, FontSizes, Card, Name } from "./brandTypes";

interface Brand {
  colors: Colors;
  fontSizes: FontSizes;
  card: Card;
  name: Name;
}

const brand: Brand = {
  name: "Zero To App",
  colors: {
    primary: "#1a4c9d",
    secondary: "#db4691",
    background: "#ffffff",
    text: "#333333",
    textAlternate: "#ffffff",
  },
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  },
  card: {
    borderRadius: 5,
    shadow: true,
    shadowOpacity: 0.25,
    elevation: 5,
    cardBackground: "#ffffff",
  },
};

export default brand;

```
  
## Provided Components

- **Appbar**
- **Button**
- **Card**
- **Icon Button**
- **Form Separator**
- **List**
- **ListButton**
- **ListDivider**
- **Text Link**
