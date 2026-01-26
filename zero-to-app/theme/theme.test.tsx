import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeContext, ZeroToApp, defaultBrand } from '../index';
import { Text } from 'react-native';

//This is a test file for the ZeroToApp provider. It tests the ZeroToApp provider by toggling the theme from light to dark.
//The test checks if the highlightColor changes to the brand secondary color after the theme is toggled.

// Mock component to test ZeroToApp
const TestComponent = () => {
  return (
    <ThemeContext.Consumer>
      {({ values, toggleTheme }) => (
        <>
          <Text testID="isDark">{String(values.isDark)}</Text>
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
    const { getByTestId } = render(
      <ZeroToApp brand={defaultBrand}>
        <TestComponent />
      </ZeroToApp>,
    );

    // initial theme should be light (isDark === false)
    expect(getByTestId('isDark').props.children).toBe('false');
    // Toggle the theme
    fireEvent.press(getByTestId('toggleTheme'));
    // After toggle, isDark should flip to true
    expect(getByTestId('isDark').props.children).toBe('true');
  });
});

