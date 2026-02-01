import React, { ReactNode } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { Typography } from '../ui/typography';
import { ThemedView } from '../ui/themed-view';

// Import expo-router types
import type { TabTriggerSlotProps, TabListProps } from 'expo-router/ui';

// Gracefully handle missing expo-router context for Storybook/testing
let ExpoTabs: any;
let ExpoTabList: any;
let ExpoTabTrigger: any;
let ExpoTabSlot: any;
let hasExpoRouter = false;

try {
  const expoRouterUI = require('expo-router/ui');
  ExpoTabs = expoRouterUI.Tabs;
  ExpoTabList = expoRouterUI.TabList;
  ExpoTabTrigger = expoRouterUI.TabTrigger;
  ExpoTabSlot = expoRouterUI.TabSlot;
  hasExpoRouter = true;
} catch (e) {
  console.warn('expo-router/ui not available, using fallback components');
}

// Fallback components for when expo-router context is not available
const FallbackTabs = ({ children, style, ...props }: any) => (
  <View style={[{ flex: 1 }, style]} {...props}>{children}</View>
);

const FallbackTabList = ({ children, asChild, style, ...props }: any) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, props);
  }
  return <View style={style} {...props}>{children}</View>;
};

const FallbackTabTrigger = ({ children, asChild, name, href, ...props }: any) => {
  const isFocused = name === 'home'; // Mock: first tab always focused in fallback
  const handlePress = () => console.log(`Tab pressed: ${name} (${href})`);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      isFocused,
      onPress: handlePress
    } as any);
  }

  return (
    <Pressable {...props} onPress={handlePress}>
      {children}
    </Pressable>
  );
};

const FallbackTabSlot = ({ style, ...props }: any) => (
  <View style={style} {...props} />
);

// Allow overriding components for testing/storybook, or use fallbacks if expo-router unavailable
const Tabs = (global as any).__TABS_OVERRIDE__ || (hasExpoRouter ? ExpoTabs : FallbackTabs);
const TabList = (global as any).__TABLIST_OVERRIDE__ || (hasExpoRouter ? ExpoTabList : FallbackTabList);
const TabTrigger = (global as any).__TABTRIGGER_OVERRIDE__ || (hasExpoRouter ? ExpoTabTrigger : FallbackTabTrigger);
const TabSlot = (global as any).__TABSLOT_OVERRIDE__ || (hasExpoRouter ? ExpoTabSlot : FallbackTabSlot);

/**
 * External link configuration for AppTabs
 */
export interface AppTabsExternalLink {
  /** Link label text */
  label: string;
  /** Link component (should include href and navigation logic) */
  component: ReactNode;
}

/**
 * Tab configuration for AppTabs
 */
export interface AppTabConfig {
  /** Unique tab name (used for routing) */
  name: string;
  /** Tab route href */
  href: string;
  /** Tab display label */
  label: string;
}

/**
 * Props for AppTabs component
 */
export interface AppTabsProps {
  /** Brand or app name to display */
  brandName: string;
  /** Array of tab configurations */
  tabs: AppTabConfig[];
  /** Optional external links to display */
  externalLinks?: AppTabsExternalLink[];
  /** Maximum content width (default: 1200) */
  maxWidth?: number;
}

/**
 * Material 3 themed tabs component for navigation.
 * Mobile version with floating bottom tab bar.
 */
export default function AppTabs({
  brandName,
  tabs,
  externalLinks = [],
  maxWidth = 1200,
}: AppTabsProps) {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList
          brandName={brandName}
          externalLinks={externalLinks}
          maxWidth={maxWidth}>
          {tabs.map((tab) => (
            <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
              <TabButton>{tab.label}</TabButton>
            </TabTrigger>
          ))}
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

interface TabButtonProps extends TabTriggerSlotProps {
  children: ReactNode;
}

export function TabButton({ children, isFocused, ...props }: TabButtonProps) {
  const { values: theme } = useTheme();

  return (
    <Pressable {...props} style={({ pressed }) => pressed && { opacity: 0.7 }}>
      <ThemedView
        color={
          isFocused
            ? theme.secondaryContainer
            : theme.surfaceContainerHigh
        }
        style={[
          styles.tabButtonView,
          { borderRadius: theme.tokens.elevation.level2 * 2 },
        ]}>
        <Typography
          variant="labelMedium"
          weight="medium"
          color={isFocused ? theme.onSecondaryContainer : theme.onSurfaceVariant}>
          {children}
        </Typography>
      </ThemedView>
    </Pressable>
  );
}

interface CustomTabListProps extends TabListProps {
  brandName: string;
  externalLinks: AppTabsExternalLink[];
  maxWidth: number;
}

export function CustomTabList({
  brandName,
  externalLinks,
  maxWidth,
  children,
  ...props
}: CustomTabListProps) {
  const { values: theme } = useTheme();

  return (
    <View
      {...props}
      style={[
        styles.tabListContainer,
        { padding: theme.tokens.elevation.level3 * 2 },
      ]}>
      <ThemedView
        variant="surfaceContainer"
        style={[
          styles.innerContainer,
          {
            paddingVertical: theme.tokens.elevation.level2,
            paddingHorizontal: theme.tokens.elevation.level5,
            borderRadius: theme.tokens.elevation.level5,
            gap: theme.tokens.elevation.level2,
            maxWidth,
          },
        ]}>
        <Typography variant="labelLarge" weight="bold" style={styles.brandText}>
          {brandName}
        </Typography>

        {children}

        {externalLinks.length > 0 && (
          <View style={[styles.externalLinksContainer, { gap: theme.tokens.elevation.level3 }]}>
            {externalLinks.map((link, index) => (
              <View key={index}>{link.component}</View>
            ))}
          </View>
        )}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
  brandText: {
    marginRight: 'auto',
  },
  tabButtonView: {
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  externalLinksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
