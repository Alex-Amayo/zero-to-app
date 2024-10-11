import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeContext, ThemeProvider } from './theme';
import { Text } from 'react-native';
import brand from '../brand/brandConfig';

//This is a test file for the theme provider. It tests the theme provider by toggling the theme from light to dark.
//The test checks if the highlightColor changes to the brand secondary color after the theme is toggled.

// Mock component to test ThemeProvider
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

// Test ThemeProvider by toggling theme from light to dark
describe('ThemeProvider', () => {
  it('toggles theme from light to dark', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    // Check initial highlightColor is the same as the brand primary color
    expect(getByTestId('highlightColor').props.children).toBe(brand.colors.primary);
    // Toggle the theme
    fireEvent.press(getByTestId('toggleTheme'));

    // Check if the highlightColor changed to the brand secondary color
    expect(getByTestId('highlightColor').props.children).toBe(brand.colors.secondary);
  });
});
