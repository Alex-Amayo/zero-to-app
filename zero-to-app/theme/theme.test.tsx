import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ZeroToApp, useTheme } from './theme';
import { defaultBrand } from '../brand/defaultBrand';
import { Text } from 'react-native';

// This is a test file for the ZeroToApp provider. It tests the ZeroToApp provider by toggling the theme from light to dark.
// The test checks if the isDark value changes after the theme is toggled.

// Mock component to test ZeroToApp using the useTheme hook
const TestComponent = () => {
  const { values, toggleTheme } = useTheme();

  return (
    <>
      <Text testID="isDark">{String(values.isDark)}</Text>
      <Text onPress={toggleTheme} testID="toggleTheme">
        Toggle Theme
      </Text>
    </>
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

