import React from 'react';
import { Text, StyleSheet } from 'react-native';
import brand from '../brand/brandConfig';

//FormErrors component to display error messages

type FormErrorsProps = {
  error: string | null;
};

export default function FormErrors({ error }: FormErrorsProps) {
  return error ? <Text style={styles.error}>{error}</Text> : <></>;
}

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
    color: 'red',
    fontSize: brand.fontSizes.medium,
  },
});
