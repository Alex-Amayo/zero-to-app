import { useTheme, Screen, ThemedView, Typography, Button } from 'zero-to-app';
import { Image } from 'expo-image';
import {router} from "expo-router";


export default function HomeScreen() {
  const { spacing } = useTheme();
  return (
    <Screen
      scrollable
      variant="background"
      edges={['top']}
    >
      <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.lg }}>
        <Image source={require('@/assets/images/zero-to-app.png')} style={{ width: 200, height: 200 }} />
        <Typography variant="titleLarge">
          Welcome to&nbsp;Zero To App
        </Typography>
        <Typography variant={"titleMedium"}>
          Material 3 based UI library for React Native.
        </Typography>
        <Button title="Explore Components" variant="elevated" onPress={() => {router.push('/explore')}}/>
      </ThemedView>

    </Screen>
  );
}
