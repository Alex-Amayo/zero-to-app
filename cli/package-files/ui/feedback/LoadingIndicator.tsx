//A spinner component that uses theme values to style the spinner.

import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemeContext } from '../../theme';

/**
 * Loading indicator
 */

const LoadingIndicator = () => {
  // Initialize theme
  const theme = useContext(ThemeContext);

  return <ActivityIndicator size="large" color={theme.values.highlightColor} />;
};

export { LoadingIndicator };
