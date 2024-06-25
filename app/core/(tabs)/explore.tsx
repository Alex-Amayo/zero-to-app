import React from "react";
import { View, Text, StyleSheet } from "react-native";
import brand from "../../../brand/brandConfig";

const ExplorePage = () => {
  return (
    <View style={styles.container}>
      <Text>Explore Page</Text>
    </View>
  );
};

export default ExplorePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: brand.colors.background,
  },
});
