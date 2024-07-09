import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconButton from '../IconButton';
import { Link } from 'expo-router';
import brand from '../../brand/brandConfig';
import { ThemeContext } from '../../theme/theme';
import ToggleIconButton from '../ToggleIconButton';

type AppbarProps = {
  title?: string;
  tabs?: JSX.Element | JSX.Element[];
};

const Appbar = ({ title, tabs }: AppbarProps) => {
  // Initialize the theme
  const theme = useContext(ThemeContext);
  //Initialize theme toggle
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <View style={{...styles.appbar, backgroundColor: theme.values.appbarColor}}>
      <Link href="/core/home">
        <Text style={{...styles.title, color: theme.values.highlightColor}}>{title}</Text>
      </Link>
      {tabs ? tabs : null}
      <View style={{...styles.iconContainer, backgroundColor: theme.values.appbarColor }}>
        <IconButton iconName="search" />
        <IconButton iconName="plus" />
        <ToggleIconButton 
              iconName='sun' 
              alternateIconName='moon' 
              onPress={toggleTheme} />
      </View>
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
