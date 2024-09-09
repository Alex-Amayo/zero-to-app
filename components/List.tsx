import React from 'react';
import { View, StyleSheet } from 'react-native';

type ListProps = {
  children: React.ReactNode | React.ReactNode[];
};

/**
 *
 * A list component that wraps th echildren in a container with consistent padding and gap values.
 *
 * @param {Object} props - The component's props.
 * @param {JSX.Element | JSX.Element[]} props.children - Elements to be wrapped inside the list component.
 *
 * @returns {JSX.Element} - Returns rendered list component.
 */

const List = ({ children }: ListProps): JSX.Element => {
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
