import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeContext, ZeroToApp, createBrand } from '../index';
import { Text } from 'react-native';

//This is a test file for the ZeroToApp provider. It tests the ZeroToApp provider by toggling the theme from light to dark.
//The test checks if the highlightColor changes to the brand secondary color after the theme is toggled.

// Mock component to test ZeroToApp
const TestComponent = () => {
  return (
    <ThemeContext.Consumer>
      {({ values, toggleTheme }) => (
        <>
          <Text testID="highlightColor">{values.highlightColor}</Text>
          <Text testID="color">{values.color}</Text>
          <Text onPress={toggleTheme} testID="toggleTheme">
            Toggle Theme
          </Text>
        </>
      )}
    </ThemeContext.Consumer>
  );
};

// Test ZeroToApp by toggling theme from light to dark
describe('ZeroToApp', () => {
  it('toggles theme from light to dark', () => {
    const brand = createBrand({
      name: 'Test App',
      colors: { primary: '#ff0000', secondary: '#00ff00', backgroundColor: '#ffffff' },
      fontSizes: { small: 12, medium: 14, large: 18, xlarge: 24 },
      spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 40 },
      borderRadius: 8,
    });
    const { getByTestId } = render(
      <ZeroToApp brand={brand}>
        <TestComponent />
      </ZeroToApp>,
    );

    // Check initial highlightColor is the same as the brand primary color
    expect(getByTestId('highlightColor').props.children).toBe(brand.colors.primary);
    // Toggle the theme
    fireEvent.press(getByTestId('toggleTheme'));

    // Check if the highlightColor changed to the brand secondary color
    expect(getByTestId('highlightColor').props.children).toBe(brand.colors.secondary);
  });
});

