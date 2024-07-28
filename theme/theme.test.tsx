import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider, ThemeContext } from './theme';
import { Text } from 'react-native';
import brand from '../brand/brandConfig';

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

    expect(getByTestId('highlightColor').props.children).toBe(brand.colors.primary); // Check if the highlightColor is the same as the brand primary color

    fireEvent.press(getByTestId('toggleTheme'));

    expect(getByTestId('highlightColor').props.children).toBe(brand.colors.secondary); // Check if the highlightColor is the same as the brand secondary color
  });
});
