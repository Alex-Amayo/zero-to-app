import React from 'react';
import { View, StyleSheet } from 'react-native';

interface PreviewContainerProps {
  children: React.ReactNode;
}

export const PreviewContainer: React.FC<PreviewContainerProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginVertical: 8,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
