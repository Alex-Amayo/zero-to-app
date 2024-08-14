import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import brand from '../brand/brandConfig';

//FormErrors component to display error messages

type FormErrorsProps = {
  error: string | null;
};

export default function FormErrors({ error }: FormErrorsProps) {
  const [visible, setVisible] = useState(true);
  // Hide error after
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return error && visible ? <Text style={styles.error}>{error}</Text> : <></>;
}

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
    color: 'red',
    fontSize: brand.fontSizes.medium,
  },
});
