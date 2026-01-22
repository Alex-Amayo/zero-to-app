import { Image } from 'expo-image';
import { Platform, StyleSheet, View } from 'react-native';

import { Collapsible } from '../../components/ui/collapsible';
import { ExternalLink } from '../../components/external-link';
import ParallaxScrollView from '../../components/parallax-scroll-view';
import { StyledText } from 'zero-to-app';
import { IconSymbol } from '../../components/ui/icon-symbol';
import { Fonts } from '../../constants/theme';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <View style={styles.titleContainer}>
        <StyledText
          fontSize="xl"
          bold
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Explore
        </StyledText>
      </View>
      <StyledText>This app includes example code to help you get started.</StyledText>
      <Collapsible title="File-based routing">
        <StyledText>
          This app has two screens:{' '}
          <StyledText bold>app/(tabs)/index.tsx</StyledText> and{' '}
          <StyledText bold>app/(tabs)/explore.tsx</StyledText>
        </StyledText>
        <StyledText>
          The layout file in <StyledText bold>app/(tabs)/_layout.tsx</StyledText>{' '}
          sets up the tab navigator.
        </StyledText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <StyledText>Learn more</StyledText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <StyledText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <StyledText bold>w</StyledText> in the terminal running this project.
        </StyledText>
      </Collapsible>
      <Collapsible title="Images">
        <StyledText>
          For static images, you can use the <StyledText bold>@2x</StyledText> and{' '}
          <StyledText bold>@3x</StyledText> suffixes to provide files for
          different screen densities
        </StyledText>
        <Image
          source={require('../../assets/images/react-logo.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <StyledText>Learn more</StyledText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <StyledText>
          This template has light and dark mode support. The{' '}
          <StyledText bold>useColorScheme()</StyledText> hook lets you inspect
          what the user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
        </StyledText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <StyledText>Learn more</StyledText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <StyledText>
          This template includes an example of an animated component. The{' '}
          <StyledText bold>components/HelloWave.tsx</StyledText> component uses
          the powerful{' '}
          <StyledText bold style={{ fontFamily: Fonts.mono }}>
            react-native-reanimated
          </StyledText>{' '}
          library to create a waving hand animation.
        </StyledText>
        {Platform.select({
          ios: (
            <StyledText>
              The <StyledText bold>components/ParallaxScrollView.tsx</StyledText>{' '}
              component provides a parallax effect for the header image.
            </StyledText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
