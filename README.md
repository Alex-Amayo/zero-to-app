<p align="center">
  <img src="https://uploads-ssl.webflow.com/6620407a7c67462e0cddbda9/668ee693b99bbbb68f1501b0_Zero%20To%20App%20-%20web-mobile.gif">
</p>

Zero To App is an easily customizable React Native boilerplate that works seamlessly on both web and mobile. The design is loosely based on Facebook's mobile app and website.
It includes pre-built template pages for your authentication flow, bottom navigation/responsive yop navigation on web and basic components that all share common styles you can easily configure from a single file.

## Try A Live Demo on the Web!

### <a href="https://d57xfeu0gmhs7.cloudfront.net" target="_blank">🚀 Try Zero To App Now! 🚀</a>

## Core Frameworks and Libraries

- [Expo](https://expo.dev/): An open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React.
- [React Native](https://reactnative.dev/): A framework for building native apps using React.
- [React Native Web](https://necolas.github.io/react-native-web/): A project to bring React Native components and APIs to the web.
- [React Native Lottie](https://github.com/lottie-react-native/lottie-react-native): A library for rendering Adobe After Effects animations natively on mobile.
- [Expo Router](https://expo.github.io/router/docs/): A file-based routing library for Expo and React Native.
- [React Navigation](https://reactnavigation.org/): Routing and navigation for your React Native apps. (Top Tabs on web with context from Expo-Router)
- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript.

## Development Tools

- [ESLint](https://eslint.org/): A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
- [Prettier](https://prettier.io/): An opinionated code formatter.
- [TypeScript ESLint](https://typescript-eslint.io/): Monorepo for all the tooling which enables ESLint to support TypeScript.

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


### Customizaytion

Replave the assets in '/assets with yor logo, icon and splash screen images. 

# Brand Configuration

The `brandConfig.ts` file defines the basic styling for the application. It uses a `Brand` object to set various typesafe style properties that you can pass down in your app.

```typescript

const brand: Brand = {
  name: 'Zero To App',
  borderRadius: 5,
  shadow: true,
  colors: {
    primary: '#1a4c9d',
    secondary: '#db4691',
  },
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  },
};

export default brand;

```

# Theme Configuration

The `themeConfig.ts` file defines the rest of the global styles  of the app, you can set properties for your light mode / dark mode by editing the respective
theme.

```typescript

//Defining light theme
export const lightTheme: ThemeValuesType = {
  color: '#000000',
  backgroundColor: '#ECF3FF',
  cardBackgroundColor: '#FFFFFF',
  highlightColor: brand.colors.primary,
  appbarColor: '#FFFFFF',
  borderColor: '#F2F2F7FF',
  shadowColor: '#000000',
  inactiveIconColor: '#65676b',
  dividerColor: '#DDDDDD',
  iconButtonBackgroundColor: '#E4E6EB',
  iconButtonIconColor: '#000000',
  isDark: false,
};

//Defining dark theme
export const darkTheme: ThemeValuesType = {
  color: '#FFFFFF',
  backgroundColor: '#242526',
  cardBackgroundColor: '#18191a',
  highlightColor: brand.colors.secondary,
  appbarColor: '#18191a',
  borderColor: '#1C1C1EFF',
  shadowColor: '',
  inactiveIconColor: '#808080',
  dividerColor: '#808080',
  iconButtonBackgroundColor: '#3a3b3c',
  iconButtonIconColor: '#FFFFFF',
  isDark: true,
};

```

## Screens / Pages 

- **Login**
- **Signup**
- **Account Recovery**
- **Settings**

## Components

- **Appbar**
- **Button**
- **Card**
- **Icon Button**
- **Form Separator**
- **List**
- **ListButton**
- **ListDivider**
- **Text Link**
