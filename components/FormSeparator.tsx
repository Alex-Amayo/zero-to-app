import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { ThemeContext } from '../theme/theme';

type FormSeparatorProps = {
  text?: string;
};

/**
 * Form separator component that displays a horizontal line separatig two components wih optional text in the center
 *
 * @param {string} [text ] - optional text to be displayed in the center of the separator
 *
 * @returns {JSX.Element} FormSeparator component
 */

const FormSeparator = ({ text }: FormSeparatorProps): JSX.Element => {
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
