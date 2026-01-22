import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { StyledText } from 'zero-to-app';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <StyledText fontSize="xl" bold>This is a modal</StyledText>
      <Link href="/" dismissTo style={styles.link}>
        <StyledText>Go to home screen</StyledText>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
