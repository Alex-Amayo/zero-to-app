import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ToggleIconButton } from '../../../ui/button';
import { router } from 'expo-router';
import { ThemeContext } from '../../../theme';
import { useDimensions, breakpoints } from '../../../hooks';

/**
 * Icons to be rendered inside appbar on both web and mobile
 * @returns Rendered IconButtonGroup
 */
const IconButtonGroup = () => {
  //Initialize theme toggle
  const { toggleTheme } = useContext(ThemeContext);
  const dimensions = useDimensions();
  
  return (
    <View
      style={{
        ...styles.buttonGroup,
        width: dimensions.breakpoint !== 'small' ? 150 : 'auto',
        justifyContent: 'flex-end',
      }}>
      <View style={styles.iconContainer}>
        <ToggleIconButton iconName="sun" alternateIconName="moon" onPress={toggleTheme} />
      </View>
    </View>
  );
};
export default IconButtonGroup;

const styles = StyleSheet.create({
  buttonGroup: {
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});
