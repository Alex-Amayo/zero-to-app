import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Typography } from 'zero-to-app';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Typography variant="displaySmall" weight="bold">This is a modal</Typography>
      <Link href="/" dismissTo style={styles.link}>
        <Typography>Go to home screen</Typography>
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
