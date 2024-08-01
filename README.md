<p align="center">
  <img src="https://utfs.io/f/4303f89d-69c1-4d9f-a4b4-64ea767ee7cc-w7f70.png" width="500" height="auto">
</p>


**Zero To App** is a customizable boilerplate built with **React Native**, **TypeScript**, and **Expo**, designed to work seamlessly on **web**,**ios** & **android**. It integrates **Supabase** for **authentication** and **database management**. **Zustand** is included for predictable client-side state management, making it perfect for quickly setting up and launching scalable apps.  

Zero To App comes pre-configured with essential **development tools** to streamline your workflow. It includes **ESLint and Prettier** configurations with common linting rules to ensure code quality and consistency, helping you maintain clean and readable code. Additionally, it features **unit and integration tests** set up with **Jest and React Native Testing Library**, allowing you to easily build on these foundations to verify your application's functionality and reliability.

## Try A Live Demo on the Web!

### <a href="https://d57xfeu0gmhs7.cloudfront.net" target="_blank">🚀 Try Zero To App Now! 🚀</a>

## Core Frameworks and Libraries
- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript.
- [Expo](https://expo.dev/): An open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React Native and React Native Web.
- [Supabase](https://expo.dev/): An open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React.
- [Zustand](https://expo.dev/): An open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React.


## Animations
- [React Native Lottie](https://github.com/lottie-react-native/lottie-react-native): A library for rendering Adobe After Effects animations natively on mobile.

- [Expo Router](https://expo.github.io/router/docs/): A file-based routing library for Expo and React Native.
- [React Navigation](https://reactnavigation.org/): Routing and navigation for your React Native apps. (Utilized for Top Tabs on web with context from Expo-Router)

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


# Customization

Replace the assets in '/assets with yor logo, icon and splash screen images. 

## Brand Configuration

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

## Theme Configuration

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

# Screens / Pages 

- **Login**
- **Signup**
- **Account Recovery**
- **Settings**

# Components

- **Appbar**
- **Button**
- **Card**
- **Icon Button**
- **Form Separator**
- **List**
- **ListButton**
- **ListDivider**
- **Text Link**
