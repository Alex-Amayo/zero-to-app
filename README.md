Build cross-platform apps for **Web**, **iOS** and **Android** 

 with **React Native**, **TypeScript**, **Expo**, and **Supabase**. 

It’s designed for seamless deployment on web, iOS, and Android.

It includes built-in authentication and database management via Supabase.

## Core Frameworks and Libraries

| Library                                               | Category         | Version | Description                                                                                   |
| ----------------------------------------------------- | ---------------- | ------- | --------------------------------------------------------------------------------------------- |
| [React Native](https://reactnative.dev/)              | Framework        | Latest  | Build cross-platform mobile applications for iOS and Android.                                  |
| [Expo](https://expo.dev/)                             | Framework        | Latest  | An open-source platform for making universal native apps for Android, iOS, and the web.        |
| [TypeScript](https://www.typescriptlang.org/)         | Language         | Latest  | A typed superset of JavaScript that compiles to plain JavaScript.                               |
| [Supabase](https://supabase.com/)                     | Backend-as-a-Service | Latest  | Provides real-time databases, authentication, and storage.                                     |
| [React Query](https://react-query.tanstack.com/)      | Data Management  | Latest  | Simplifies data fetching and state management in React apps.                                   |
| [Zustand](https://zustand-demo.pmnd.rs/)              | State Management | Latest  | A minimalistic, scalable state management library for React.                                   |
| [Jest](https://jestjs.io/)                            | Testing          | Latest  | A comprehensive JavaScript testing framework for unit tests.                                   |

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
