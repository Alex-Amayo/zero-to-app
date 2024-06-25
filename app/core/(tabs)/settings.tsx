import React from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import Card from "../../../components/Card";
import brand from "../../../brand/brandConfig";
import List from "../../../components/List";
import ListButton from "../../../components/ListButton";
import ListDivider from "../../../components/ListDivider";

const SettingsPage = () => {
  return (
    <View style={styles.container}>
      <View>
        <Card>
          <List>
            <ListButton text="Billing & Payments" icon="credit-card" />
            <ListDivider />
            <ListButton text="More Options" icon="more-horizontal" />
            <ListDivider />
            <ListButton
              text="Sign Out"
              icon="log-out"
              onPress={() => router.push("/login")}
            />
          </List>
        </Card>
      </View>
    </View>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: brand.colors.background,
  },
});
