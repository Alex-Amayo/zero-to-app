import React from 'react';
import { StyleSheet, View } from 'react-native';

type ListProps = {
  children: React.ReactNode | React.ReactNode[];
};

/**
 * A list component that wraps th each child in a container with consistent padding and gap values.
 */

const List = ({ children }: ListProps) => {
  return <View style={styles.list}>{children}</View>;
};

export default List;

const styles = StyleSheet.create({
  list: {
    alignSelf: 'center',
    width: '100%',
    padding: 15,
    gap: 15,
  },
});
