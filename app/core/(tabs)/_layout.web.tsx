import brand from "../../../brand/brandConfig";
import Feather from "@expo/vector-icons/Feather";
import AppbarWeb from "../../../components/Appbar/AppbarWeb";
import { View, TouchableOpacity } from "react-native";
import {
  useWindowWidth,
  breakpoints,
} from "../../../hooks/useWindowWidth";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <MaterialTopTabs
        tabBar={(props) => <MyTabBar {...props} />}
        tabBarPosition="top"
        screenOptions={{
          tabBarActiveTintColor: brand.colors.primary,
          tabBarInactiveTintColor: "gray",
        }}
      >
        <MaterialTopTabs.Screen name="home" options={{ title: "home" }} />
        <MaterialTopTabs.Screen name="explore" options={{ title: "explore" }} />
        <MaterialTopTabs.Screen
          name="settings"
          options={{ title: "settings" }}
        />
      </MaterialTopTabs>
    </View>
  );
}

type MyTabBarProps = {
  state: TabNavigationState<ParamListBase>;
  descriptors: any;
  navigation: any;
  position: any;
};

// Define the icon mapping object
const iconMapping: { [key: string]: string } = {
  home: "home",
  explore: "compass",
  settings: "settings",
  // Add more mappings as needed
};

function MyTabBar({ state, descriptors, navigation }: MyTabBarProps) {
  return (
    <AppbarWeb
      title={brand.name}
      tabs={
        <View
          style={{
            flexDirection: "row",
            height: "100%",
            width: useWindowWidth() >= breakpoints.medium ? "50%" : "100%",
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const title = options.title || route.name; // Use the title from options, or fallback to route name

            // Determine if the current route is focused
            const isFocused = state.index === index;
            const iconName = iconMapping[
              route.name
            ] as keyof typeof Feather.glyphMap;

            return (
              <TouchableOpacity
                key={route.key} // Ensure each button has a unique key
                onPress={() => {
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });
                  if (!event.defaultPrevented) {
                    // Navigate to the route
                    navigation.navigate(route.name);
                  }
                }}
                style={{
                  flex: 1,
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: brand.colors.primary,
                  borderBottomWidth: isFocused ? 2 : 0,
                }}
              >
                <Feather
                  size={20}
                  name={iconName}
                  color={isFocused ? brand.colors.primary : "#656469"}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      }
    />
  );
}
