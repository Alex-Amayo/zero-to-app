import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider, ThemeContext } from './theme';
import { Text } from 'react-native';

// Mock component to test ThemeProvider
const TestComponent = () => {
  return (
    <ThemeContext.Consumer>
      {({ values, toggleTheme }) => (
        <>
          <Text testID="backgroundColor">{values.backgroundColor}</Text>
          <Text testID="color">{values.color}</Text>
          <Text onPress={toggleTheme} testID="toggleTheme">
            Toggle Theme
          </Text>
        </>
      )}
    </ThemeContext.Consumer>
  );
};

describe('ThemeProvider', () => {
  it('toggles theme from light to dark', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(getByTestId('backgroundColor').props.children).toBe('#FFFFFF'); // Light theme background color
    expect(getByTestId('color').props.children).toBe('#000000'); // Light theme text color

    fireEvent.press(getByTestId('toggleTheme')); // Toggle theme

    expect(getByTestId('backgroundColor').props.children).toBe('#000000'); // Dark theme background color
    expect(getByTestId('color').props.children).toBe('#FFFFFF'); // Dark theme text color
  });
});
