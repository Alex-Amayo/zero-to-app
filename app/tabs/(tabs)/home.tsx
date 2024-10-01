import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from '../../../theme/theme';
import { useFetchUserProfile } from '../../../hooks/useFetchUserProfile';
import Card from '../../../components/Card';
import List from '../../../components/List';
import TextLink from '../../../components/TextLink';
import useAuthStore from '../../../stores/authStore/authStore';
import ListDivider from '../../../components/ListDivider';
import { StyledText } from '../../../components/StyledText';
import { router } from 'expo-router';

const HomePage = () => {
  // Initialize theme
  const theme = useContext(ThemeContext);

  // Retrieve user ID from auth store
  const { getUserId } = useAuthStore();
  const [userId, setUserId] = useState<string | null>(null);

  // Set userId on component mount
  useEffect(() => {
    const id = getUserId();
    setUserId(id); // Set the userId state when available
  }, [getUserId]);

  // Fetch user profile based on userId in the background
  const { data } = useFetchUserProfile(userId ?? '');

  // Conditional rendering logic
  const renderContent = () => {
    if (userId && data) {
      // Show personalized message if user is authenticated
      return (
        <StyledText fontSize={'lg'} align={'center'}>
          {`Let's start building, ${data?.first_name ?? 'User'}!`}
        </StyledText>
      );
    }

    // Show default message for non-authenticated users
    return (
      <StyledText fontSize={'lg'} align={'center'}>
        {'Build, launch, and iterate!'}
      </StyledText>
    );
  };

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: theme.values.backgroundColor,
      }}>
      <View style={styles.container}>
        <Card>
          <List>
            {/* Render content (personalized or default text) */}
            {renderContent()}

            <ListDivider />

            {/* Documentation link */}
            <TextLink
              text="Zero To App Documentation"
              href="https://github.com/Alex-Amayo/zero-to-app?tab=readme-ov-file#creating-an-app"
            />

            {/* Show login link if user is not authenticated */}
            {!userId ? (
              <>
                <ListDivider />
                <TextLink
                  text="Try the account authentication experience"
                  onPress={() => router.push('/auth/login')}
                />
              </>
            ) : null}
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
});
