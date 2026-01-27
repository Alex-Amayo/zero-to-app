import React, { createContext, useContext } from 'react';
import { Brand } from './brandConfig';

// Brand context type
type BrandContextType = Brand;

// Create the context
const BrandContext = createContext<BrandContextType | undefined>(undefined);

// BrandProvider component
type BrandProviderProps = {
  brand: Brand;
  children: React.ReactNode;
};

export const BrandProvider = ({ brand, children }: BrandProviderProps) => {
  return <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>;
};

/**
 * Hook to access the current brand configuration.
 * Must be used within a `<ZeroToApp>` or `<BrandProvider>` provider.
 *
 * @returns The brand configuration containing colors, spacing, fontSizes, logo, etc.
 * @throws Error if used outside of a ZeroToApp or BrandProvider
 *
 * @example
 * ```tsx
 * function MyHeader() {
 *   const brand = useBrand();
 *
 *   return (
 *     <View style={{ padding: brand.spacing.md }}>
 *       <Image source={brand.logo.light} />
 *       <Text style={{ fontSize: brand.fontSizes.large }}>
 *         {brand.name}
 *       </Text>
 *     </View>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Access brand colors directly
 * function ColoredBox() {
 *   const { colors, spacing } = useBrand();
 *
 *   return (
 *     <View style={{
 *       backgroundColor: colors.primaryContainer,
 *       padding: spacing.lg,
 *       borderRadius: 8,
 *     }}>
 *       <Text style={{ color: colors.onPrimaryContainer }}>
 *         Brand colored content
 *       </Text>
 *     </View>
 *   );
 * }
 * ```
 */
export const useBrand = (): Brand => {
  const context = useContext(BrandContext);

  if (context === undefined) {
    throw new Error(
      'useBrand must be used within a <ZeroToApp> provider.\n\n' +
        'Make sure your component is wrapped with ZeroToApp:\n\n' +
        '  import { ZeroToApp, createBrand } from "zero-to-app";\n\n' +
        '  const brand = createBrand({\n' +
        '    name: "My App",\n' +
        '    colors: { colorSeed: { primary: "#6750A4" } },\n' +
        '    fontSizes: { small: 14, medium: 16, large: 20, xlarge: 25 },\n' +
        '    spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 40 },\n' +
        '    borderRadius: 8,\n' +
        '  });\n\n' +
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

