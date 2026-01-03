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

// useBrand hook for components to consume brand values
export const useBrand = (): Brand => {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};

