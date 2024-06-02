import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type FormSeparatorProps = {
  text: string;
}

const FormSeparator = ({ text }: FormSeparatorProps) => (
  <View style={styles.separator}>
    <View style={styles.line} />
    <Text style={styles.text}>{text}</Text>
    <View style={styles.line} />
  </View>
);

const styles = StyleSheet.create({
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#d7dade',
    flex: 1,
  },
  text: {
    textAlign: 'center',
    color: '#d7dade',
    marginHorizontal: 10,
  },
});

export default FormSeparator;