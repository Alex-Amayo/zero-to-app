import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ThemeContext } from '../theme/theme';

type FormSeparatorProps = {
  text?: string;
};

/**
 * Form separator component that displays a full width horizontal line separating two components
 */

const FormSeparator = ({ text }: FormSeparatorProps) => {
  // Initialize theme
  const theme = useContext(ThemeContext);
  return (
    <View style={styles.separator}>
      <View style={styles.line} />
      {
        //if text is present display text in theme color
        text ? <Text style={{ ...styles.text, color: theme.values.color }}>{text}</Text> : null
      }
      <View style={styles.line} />
    </View>
  );
};

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
    marginHorizontal: 10,
  },
});

export default FormSeparator;
