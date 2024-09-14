import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconButton from '../IconButton';
import { Link, router } from 'expo-router';
import brand from '../../brand/brandConfig';
import { ThemeContext } from '../../theme/theme';
import IconButtonDrawer from './IconButtonDrawer';

type AppbarProps = {
  title?: string;
  tabs?: JSX.Element | JSX.Element[];
};

/**
 * Non-responsive appbar  that displays on the top  of the screen for mobile devices.
 */
const Appbar = ({ title, tabs }: AppbarProps) => {
  // Initialize the theme
  const theme = useContext(ThemeContext);
  return (
    <View style={{ ...styles.appbar, backgroundColor: theme.values.appbarColor }}>
      <Link href="/core/home">
        <Text style={{ ...styles.title, color: theme.values.highlightColor }}>{title}</Text>
      </Link>
      {tabs ? tabs : null}
      <IconButtonDrawer />
    </View>
  );
};

export default Appbar;

const styles = StyleSheet.create({
  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    fontSize: brand.fontSizes.large,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
