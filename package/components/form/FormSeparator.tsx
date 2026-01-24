import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../../theme';

type FormSeparatorProps = {
  text?: string;
};

function FormSeparator({ text }: FormSeparatorProps) {
  const theme = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <View style={[styles.line, { backgroundColor: theme.values.dividerColor }]} />
      {text && (
        <Text style={[styles.text, { color: theme.values.color }]}>{text}</Text>
      )}
      <View style={[styles.line, { backgroundColor: theme.values.dividerColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
  },
  text: {
    marginHorizontal: 15,
    fontSize: 14,
  },
});

export { FormSeparator };
