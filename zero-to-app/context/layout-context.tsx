import React, { createContext, useState, useContext, useCallback } from 'react';

/**
 * Layout context state for app-level dimensions
 */
export interface LayoutContextType {
  /** Height of the app bar in pixels */
  appBarHeight: number;
  /** Set the app bar height */
  setAppBarHeight: (height: number) => void;
}

// Sentinel value to detect missing provider
const MISSING_PROVIDER = Symbol('MISSING_PROVIDER');

// Create context with sentinel
const LayoutContext = createContext<LayoutContextType | typeof MISSING_PROVIDER>(MISSING_PROVIDER);

export interface LayoutProviderProps {
  children: React.ReactNode;
  /** Initial app bar height. @default 64 */
  defaultAppBarHeight?: number;
}

/**
 * Layout state provider component.
 * Provides app-level layout information like AppBar height.
 *
 * Note: This is automatically included in ZeroToApp provider,
 * so you typically don't need to wrap your app with this directly.
 *
 * @example
 * ```tsx
 * <LayoutProvider>
 *   <App />
 * </LayoutProvider>
 * ```
 */
export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  defaultAppBarHeight = 64,
}) => {
  const [appBarHeight, setAppBarHeightState] = useState(defaultAppBarHeight);

  const setAppBarHeight = useCallback((height: number) => {
    setAppBarHeightState(height);
  }, []);

  const value: LayoutContextType = {
    appBarHeight,
    setAppBarHeight,
  };

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
};

/**
 * Hook to access layout information (AppBar height, etc).
 * Must be used within a LayoutProvider (automatically included in ZeroToApp).
 *
 * @returns Layout context with appBarHeight and setter
 * @throws Error if used outside of LayoutProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { appBarHeight } = useLayout();
 *
 *   return (
 *     <View style={{ marginTop: appBarHeight }}>
 *       <Text>Content below app bar</Text>
 *     </View>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Setting the app bar height (typically done by AppTabs)
 * function MyAppBar() {
 *   const { setAppBarHeight } = useLayout();
 *
 *   useEffect(() => {
 *     setAppBarHeight(72); // Custom height
 *   }, []);
 *
 *   return <AppBar />;
 * }
 * ```
 */
export const useLayout = (): LayoutContextType => {
  const context = useContext(LayoutContext);

  if (context === MISSING_PROVIDER) {
    throw new Error(
      'useLayout must be used within a LayoutProvider.\n\n' +
        'LayoutProvider is automatically included in ZeroToApp:\n\n' +
        '  import { ZeroToApp, createBrand } from "zero-to-app";\n\n' +
        '  const brand = createBrand({ ... });\n\n' +
        '  function App() {\n' +
        '    return (\n' +
        '      <ZeroToApp brand={brand}>\n' +
        '        <YourComponent />\n' +
        '      </ZeroToApp>\n' +
        '    );\n' +
        '  }'
    );
  }

  return context;
};
