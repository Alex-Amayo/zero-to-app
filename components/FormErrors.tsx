import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import brand from '../brand/brandConfig';

type FormErrorsProps = {
  error: string | null;
  clearError?: () => void;
};

/**
 * FormErrors component to display error messages in forms.
 * The error message will be visible for 1 second before being hidden.
 * Returns the form error element if the error prop is not null and visible is true.
 * 
 * @param {string | null} error - error message to be displayed
 * @param {() => void} [clearError] - optional function to clear the error in state/store
 * 
 * @returns {JSX.Element} - returns FormError if error is not null and visible is true
 */
export default function FormErrors({ error, clearError }: FormErrorsProps): JSX.Element {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (clearError) {
          clearError();
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return error && visible ? <Text style={styles.error}>{error}</Text> : <></>;
}

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
    color: 'red',
    fontSize: brand.fontSizes.medium,
  },
});
