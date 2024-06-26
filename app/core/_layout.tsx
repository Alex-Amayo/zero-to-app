import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <View style={styles.container}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Layout;
