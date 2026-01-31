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
