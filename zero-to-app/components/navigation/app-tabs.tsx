import React from 'react';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useTheme } from '../../theme';

/**
 * External link configuration for AppTabs
 */
export interface AppTabsExternalLink {
  /** Link label text */
  label: string;
  /** External URL href */
  href: string;
}

/**
 * SF Symbol icon configuration for iOS
 */
export interface SFSymbolIcon {
  /** Default state SF Symbol name */
  default: string;
  /** Selected state SF Symbol name */
  selected: string;
}

/**
 * Material Design icon name for Android
 */
export type MaterialIconName = string;

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
  /** iOS SF Symbol icon configuration (must include both default and selected states) */
  sfSymbol: SFSymbolIcon;
  /** Android Material Design icon name */
  materialIcon: MaterialIconName;
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
 * Native platform tabs for mobile (iOS/Android).
 * Uses true native tabs with liquid glass effect on iOS.
 * For web, see app-tabs.web.tsx
 */
export default function AppTabs({
  tabs,
}: AppTabsProps) {
  const { values: theme } = useTheme();

  return (
    <NativeTabs
      tintColor={theme.primary}
      iconColor={theme.onSurfaceVariant}>
      {tabs.map((tab) => (
        <NativeTabs.Trigger key={tab.name} name={tab.name}>
          <NativeTabs.Trigger.Icon
            sf={tab.sfSymbol as any}
            md={tab.materialIcon}
          />
          <NativeTabs.Trigger.Label>{tab.label}</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
