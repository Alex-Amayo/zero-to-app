import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../../../theme/theme';
import { useFetchUserProfile } from '../../../hooks/useFetchUserProfile';
import brand from '../../../brand/brandConfig';
import Card from '../../../components/Card';
import List from '../../../components/List';
import TextLink from '../../../components/TextLink';
import useAuthStore from '../../../stores/authStore/authStore';
import LoadingIndicator from '../../../components/LoadingIndicator';
import ListDivider from '../../../components/ListDivider';
import { StyledText } from '../../../components/StyledText';
import { router } from 'expo-router';

const HomePage = () => {
  // Initialize theme
  const theme = useContext(ThemeContext);
  
  // Retrieve user ID from auth store (or null/undefined if not authenticated)
  const { getUserId } = useAuthStore();
  const userId = getUserId();

  // Fetch user profile only if userId is available
  const { data, isLoading } = useFetchUserProfile(userId ?? '');

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: theme.values.backgroundColor,
      }}>
      <View style={styles.container}>
        <Card>
          <List>
            {/* Show loading indicator if fetching user data */}
            {isLoading ? (
              <LoadingIndicator />
            ) : userId ? (
              // Display personalized message for authenticated users
              <StyledText lg center>
                {'Let\'s start building ' + (data?.first_name) + '!'}
              </StyledText>
            ) : (
              // Display message for non-authenticated users
              <StyledText lg center>
                {'Build launch and iterate!'}
              </StyledText>
            )}
            <ListDivider />
            <TextLink text="Zero To App Documentation" href="https://google.com" />
            <ListDivider />
            { !userId ? <TextLink text="Try the account authentication experience" onPress={() => router.push('auth/login')} /> : null }
            

          </List>
        </Card>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 300,
  },
  title: {
    fontSize: brand.fontSizes.large,
    textAlign: 'center',
  },
});
