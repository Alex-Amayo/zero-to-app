import { Image } from 'expo-image';
import { Platform, StyleSheet, View } from 'react-native';

import { HelloWave } from '../../components/hello-wave';
import ParallaxScrollView from '../../components/parallax-scroll-view';
import { StyledText, Button } from 'zero-to-app';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('../../assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <View style={styles.titleContainer}>
        <StyledText fontSize="xl" bold>Welcome!</StyledText>
        <HelloWave />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Get Started"
          onPress={() => alert('Button pressed!')}
          icon={{ library: 'Feather', name: 'arrow-right', size: 20 }}
          iconPosition="right"
        />
      </View>
      <View style={styles.stepContainer}>
        <StyledText fontSize="lg" bold>Step 1: Try it</StyledText>
        <StyledText>
          Edit <StyledText bold>app/(tabs)/index.tsx</StyledText> to see changes.
          Press{' '}
          <StyledText bold>
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </StyledText>{' '}
          to open developer tools.
        </StyledText>
      </View>
      <View style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <StyledText fontSize="lg" bold>Step 2: Explore</StyledText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <StyledText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </StyledText>
      </View>
      <View style={styles.stepContainer}>
        <StyledText fontSize="lg" bold>Step 3: Get a fresh start</StyledText>
        <StyledText>
          {`When you're ready, run `}
          <StyledText bold>npm run reset-project</StyledText> to get a fresh{' '}
          <StyledText bold>app</StyledText> directory. This will move the current{' '}
          <StyledText bold>app</StyledText> to{' '}
          <StyledText bold>app-example</StyledText>.
        </StyledText>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonContainer: {
    marginBottom: 16,
    marginTop: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
