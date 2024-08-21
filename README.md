## Zero To App
Zero to App helps build scalable cross-platform apps with React Native and Supabase. React Native helps reach users seamlessly across Web, iPhone, and Android platforms. Supabase provides seamless authentication and a PostgreSQL backend. 

## Stack

| Library                                               | Category              | Version | Description                                                                                     |
| ----------------------------------------------------- | --------------------- | ------- | ----------------------------------------------------------------------------------------------- |
| [TypeScript](https://www.typescriptlang.org/)         | Language              | Latest  | A statically typed superset of JavaScript that enhances development efficiency and code quality. |
| [React Native](https://reactnative.dev/)              | Framework             | 0.74.5  | A popular framework for building cross-platform mobile applications for iOS and Android.        |
| [React](https://react.dev/)                           | Library               | 18.2.0  | A JavaScript library for building user interfaces, primarily for web applications.              |
| [Expo](https://expo.dev/)                             | SDK  | 51.0.26 | A platform that simplifies the development and deployment of React Native apps across platforms. |
| [Expo Router](https://expo.dev/router)                | Routing Library       | 3.5.21  | A routing library for managing navigation in Expo applications.                                |
| [Supabase](https://supabase.com/)                     | Backend-as-a-Service  | 2.45.0  | An open-source Firebase alternative providing authentication, databases, and storage.           |
| [React Query](https://react-query.tanstack.com/)      | Data Management       | 5.51.21 | A powerful tool for data fetching, caching, and synchronization in React applications.          |
| [Zustand](https://zustand-demo.pmnd.rs/)              | State Management      | 4.5.4   | A small, fast, and flexible state management library for React applications.                    |
| [Lottie React Native](https://airbnb.io/lottie/#/react-native) | Animation Library     | 6.7.0   | A library for rendering Adobe After Effects animations in React Native applications.           |
| [Jest](https://jestjs.io/)                            | Testing Framework     | 29.7.0  | A comprehensive testing framework for JavaScript, with a focus on simplicity and support for unit tests. |


## Development Tools
- [ESLint](https://eslint.org/): A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
- [Prettier](https://prettier.io/): An opinionated code formatter.



## Getting Started

### Installation

First, clone the repository:

```bash
npx zero-to-app my-app
```

Start the app:

```bash
yarn start
```


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
- **Home**
- **Explore**
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
