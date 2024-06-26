import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useWindowWidth, breakpoints } from "../../hooks/useWindowWidth";
import IconButton from "../IconButton";
import brand from "../../brand/brandConfig";

type AppbarProps = {
  title?: string;
  tabs?: JSX.Element | JSX.Element[];
};

const AppbarWeb = ({ title, tabs }: AppbarProps) => {
  const windowWidth = useWindowWidth();
  if (windowWidth >= breakpoints.medium) {
    styles.webContainer = {
      ...styles.webContainer,
      ...{
        borderRadius: brand.card.borderRadius,
        shadowColor: brand.card.shadow ? "#171717" : undefined,
        shadowOffset: brand.card.shadow ? { width: -2, height: 2 } : undefined,
        shadowOpacity: brand.card.shadow ? 0.15 : undefined,
        shadowRadius: brand.card.shadow ? 3 : undefined,
        elevation: brand.card.shadow ? 20 : undefined,
      },
    };
  }
  return (
    <View
      style={{ backgroundColor: brand.colors.background, paddingBottom: 10 }}
    >
      <View style={styles.webContainer}>
        <View style={styles.appbar}>
          <Link href="/core/home">
            <Text style={styles.title}>{title}</Text>
          </Link>
          {windowWidth >= breakpoints.medium ? tabs : null}
          <View style={styles.iconContainer}>
            <IconButton iconName="search" />
            <IconButton iconName="plus" />
            <IconButton iconName="message-square" />
          </View>
        </View>
        {windowWidth <= breakpoints.medium ? (
          <View style={styles.appbarWebSmall}>{tabs}</View>
        ) : null}
      </View>
    </View>
  );
};
export default AppbarWeb;

const styles = StyleSheet.create({
  webContainer: {
    backgroundColor: brand.colors.background,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  appbar: {
    backgroundColor: brand.colors.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingHorizontal: 15,
  },
  appbarWebSmall: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    width: "100%",
    paddingHorizontal: 15,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: brand.fontSizes.large,
    fontWeight: "bold",
    marginLeft: 10,
    color: brand.colors.primary,
  },
});
