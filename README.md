## Zero To App

Zero to App helps build scalable cross-platform apps with React Native and Supabase. React Native helps reach users seamlessly across Web, iPhone, and Android platforms. Supabase provides seamless authentication and a PostgreSQL backend.

## Stack

| Library                                                        | Category             | Version | Description                                                                                              |
| -------------------------------------------------------------- | -------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| [TypeScript](https://www.typescriptlang.org/)                  | Language             | Latest  | A statically typed superset of JavaScript that enhances development efficiency and code quality.         |
| [React Native](https://reactnative.dev/)                       | Framework            | 0.74.5  | A popular framework for building cross-platform mobile applications for iOS and Android.                 |
| [React](https://react.dev/)                                    | Library              | 18.2.0  | A JavaScript library for building user interfaces, primarily for web applications.                       |
| [Expo](https://expo.dev/)                                      | SDK                  | 51.0.26 | A platform that simplifies the development and deployment of React Native apps across platforms.         |
| [Expo Router](https://expo.dev/router)                         | Routing Library      | 3.5.21  | A routing library for managing navigation in Expo applications.                                          |
| [Supabase](https://supabase.com/)                              | Backend-as-a-Service | 2.45.0  | An open-source Firebase alternative providing authentication, databases, and storage.                    |
| [React Query](https://react-query.tanstack.com/)               | Data Management      | 5.51.21 | A powerful tool for data fetching, caching, and synchronization in React applications.                   |
| [Zustand](https://zustand-demo.pmnd.rs/)                       | State Management     | 4.5.4   | A small, fast, and flexible state management library for React applications.                             |
| [Lottie React Native](https://airbnb.io/lottie/#/react-native) | Animation Library    | 6.7.0   | A library for rendering Adobe After Effects animations in React Native applications.                     |
| [Jest](https://jestjs.io/)                                     | Testing Framework    | 29.7.0  | A comprehensive testing framework for JavaScript, with a focus on simplicity and support for unit tests. |

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

## Setting Up Supabase

1. Visit the [Supabase Dashboard](https://app.supabase.com/). Create a new project by following the prompts.

2. Go to **Connect your project**, select Mobile Frameworks and Expo React Native. Copy the API Keys provided. 
3. In your Expo React Native project, create a `.env` file in the root and paste the API Keys. 

    ```bash
    EXPO_PUBLIC_SUPABASE_URL=<your-supabase-url>
    EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
    ```
    
That's it! Your app is now connected to Supabase!

## Brand Configuration

The `brandConfig.ts` file defines let's you quickly style the app template to fit your brand.
```typescript
const brand: Brand = {
  name: 'Zero To App',
  colors: {
    primary: '#1a4c9d',
    secondary: '#db4691',
    appbarColor: '#ffffff',
    backgroundColor: '#f0f2f5',
  },
  borderRadius: 10,
  shadows: true,
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  },
  logo: {
    light: 'https://utfs.io/f/6f54a643-3891-4def-9ee0-75165f57ffc2-1zbfv.png',
    dark: 'https://utfs.io/f/0f641941-fe3a-447e-bff3-a9ea1201006c-qkt02w.png',
  },
};

export default brand;
```

## Theme Configuration

The `themeConfig.ts` file defines deeper styles of the app, you can set properties for your light mode / dark mode by editing the respective
theme. The values here are passed down to individual components as well as screen.

```typescript
//Defining light theme
export const lightTheme: ThemeValuesType = {
  color: '#050505', // Text color
  backgroundColor: brand.backgroundColor, // Background color of light theme derived from brandConfig
  cardBackgroundColor: '#ffffff', // Background color of cards
  highlightColor: brand.colors.primary, //Primary color of the brand derived from brandConfig
  appbarColor: '#ffffff', // App bar color
  borderColor: '#ced0d4', // Border color
  shadowColor: '#000000', // Shadow color
  inactiveIconColor: '#606770', // Inactive icon color
  dividerColor: '#dddfe2', // Divider color
  iconButtonBackgroundColor: '#e4e6eb', // Background color of icon buttons
  iconButtonIconColor: '#050505', // Icon color for icon buttons
  isDark: false,
};

//Defining dark theme
export const darkTheme: ThemeValuesType = {
  color: '#e4e6eb', // Text color
  backgroundColor: '#18191a', // Background color of the entire app
  cardBackgroundColor: '#242526', // Background color of cards
  highlightColor: brand.colors.secondary, //Primary color of the brand derived from brandConfig
  appbarColor: '#242526', // App bar color
  borderColor: '#3e4042', // Border color
  shadowColor: '#000000', // Shadow color
  inactiveIconColor: '#b0b3b8', // Inactive icon color
  dividerColor: '#3e4042', // Divider color
  iconButtonBackgroundColor: '#3a3b3c', // Background color of icon buttons
  iconButtonIconColor: '#e4e6eb', // Icon color for icon buttons
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
