Launch on **Web**, **iOS**, **Android** Simultaneously with **React Native** & **Supabase!**

## Core Frameworks and Libraries

| Library                                               | Category              | Version | Description                                                                                     |
| ----------------------------------------------------- | --------------------- | ------- | ----------------------------------------------------------------------------------------------- |
| [React Native](https://reactnative.dev/)              | Framework             | Latest  | A popular framework for building cross-platform mobile applications for iOS and Android.        |
| [TypeScript](https://www.typescriptlang.org/)         | Language              | Latest  | A statically typed superset of JavaScript that enhances development efficiency and code quality. |
| [Expo](https://expo.dev/)                             | Development Platform  | Latest  | A platform that simplifies the development and deployment of React Native apps across platforms. |
| [Zustand](https://zustand-demo.pmnd.rs/)              | State Management      | Latest  | A small, fast, and flexible state management library for React applications.                    |
| [React Query](https://react-query.tanstack.com/)      | Data Management       | Latest  | A powerful tool for data fetching, caching, and synchronization in React applications.          |
| [Supabase](https://supabase.com/)                     | Backend-as-a-Service  | Latest  | An open-source Firebase alternative providing authentication, databases, and storage.           |
| [Jest](https://jestjs.io/)                            | Testing Framework     | Latest  | A comprehensive testing framework for JavaScript, with a focus on simplicity and support for unit tests. |


## Development Tools
- [ESLint](https://eslint.org/): A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
- [Prettier](https://prettier.io/): An opinionated code formatter.

## Animations
- [React Native Lottie](https://github.com/lottie-react-native/lottie-react-native): A library for rendering Adobe After Effects animations natively on mobile.

## Navigation
- [Expo Router](https://expo.github.io/router/docs/): A file-based routing library for Expo and React Native.
- [React Navigation](https://reactnavigation.org/): Routing and navigation for your React Native apps. (Utilized for Top Tabs on web with context from Expo-Router)



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
