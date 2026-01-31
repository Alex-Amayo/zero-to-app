import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import React, { ReactNode } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { Typography } from '../ui/Typography';
import { ThemedView } from '../ui/ThemedView';

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
 * Web version with traditional top appbar layout.
 */
export default function AppTabs({
  brandName,
  tabs,
  externalLinks = [],
  maxWidth = 1200,
}: AppTabsProps) {
  return (
    <Tabs>
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
      <TabSlot style={{ height: '100%' }} />
    </Tabs>
  );
}

interface TabButtonProps extends TabTriggerSlotProps {
  children: ReactNode;
}

export function TabButton({ children, isFocused, ...props }: TabButtonProps) {
  const { values: theme } = useTheme();

  return (
    <Pressable
      {...props}
      style={({ pressed, hovered }: any) => [
        styles.tabButton,
        {
          paddingVertical: theme.tokens.elevation.level2,
          paddingHorizontal: theme.tokens.elevation.level3,
          borderRadius: theme.tokens.elevation.level2,
        },
        pressed && { opacity: 0.7 },
        hovered && {
          backgroundColor: theme.isDark
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(0, 0, 0, 0.05)',
        },
      ]}>
      <Typography
        variant="labelLarge"
        weight="medium"
        color={isFocused ? theme.primary : theme.onSurfaceVariant}
        style={styles.tabButtonText}>
        {children}
      </Typography>
      {isFocused && (
        <View
          style={[
            styles.activeIndicator,
            { backgroundColor: theme.primary },
          ]}
        />
      )}
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
    <ThemedView
      variant="appbar"
      style={[
        styles.appBar,
        {
          borderBottomWidth: 1,
          borderBottomColor: theme.outlineVariant,
          paddingVertical: theme.tokens.elevation.level3,
          paddingHorizontal: theme.tokens.elevation.level5,
        },
      ]}>
      <View
        {...props}
        style={[
          styles.appBarContent,
          {
            maxWidth,
            gap: theme.tokens.elevation.level5,
          },
        ]}>
        <Typography variant="titleMedium" weight="bold" style={styles.brandText}>
          {brandName}
        </Typography>

        <View style={[styles.tabsContainer, { gap: theme.tokens.elevation.level2 }]}>
          {children}
        </View>

        {externalLinks.length > 0 && (
          <View style={[styles.externalLinksContainer, { gap: theme.tokens.elevation.level3 }]}>
            {externalLinks.map((link, index) => (
              <View key={index}>{link.component}</View>
            ))}
          </View>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  appBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  appBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  brandText: {
    marginRight: 'auto',
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabButton: {
    position: 'relative',
  },
  tabButtonText: {
    fontWeight: '500',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  externalLinksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
