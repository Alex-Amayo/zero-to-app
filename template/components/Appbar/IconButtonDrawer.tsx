import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../IconButton';
import ToggleIconButton from '../ToggleIconButton';
import { router } from 'expo-router';
import { ThemeContext } from '../../theme/theme';
import useAuthStore from '../../stores/authStore/authStore';

/**
 * Icons to be rendered inside appbar on both web and mobile
 * @returns Rendered IconButtonDrawer
 */
const IconButtonDrawer = () => {
  //Initialize theme toggle
  const { toggleTheme } = useContext(ThemeContext);
  // Retrieve logOut from auth store
  const { logOut, isAuthenticated } = useAuthStore();

  const handleLogOut = () => {
    logOut();
    router.push('/auth/login');
  };

  return (
    <View style={styles.appbar}>
      <View style={styles.iconContainer}>
        <IconButton iconName="search" onPress={() => {}} />
        <ToggleIconButton iconName="sun" alternateIconName="moon" onPress={toggleTheme} />
        {!isAuthenticated() ? (
          <IconButton
            iconName="user"
            onPress={() => {
              router.push('auth/login');
            }}
          />
        ) : (
          <IconButton iconName="log-out" onPress={handleLogOut} />
        )}
      </View>
    </View>
  );
};
export default IconButtonDrawer;

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
});
