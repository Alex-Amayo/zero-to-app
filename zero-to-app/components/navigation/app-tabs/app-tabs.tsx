import React, { ReactNode } from 'react';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useThemeContext } from '../../../theme';

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
  /** Optional iOS SF Symbol icon configuration (must include both default and selected states) */
  sfSymbol?: SFSymbolIcon;
  /** Optional Android Material Design icon name */
  materialIcon?: MaterialIconName;
  /** Optional web icon (web only) */
  webIcon?: any;
}

/**
 * External link configuration (web only)
 */
export interface AppTabsExternalLink {
  label: string;
  href: string;
  icon?: any;
}

/**
 * Props for AppTabs component
 */
export interface AppTabsProps {
  /** Brand or app name to display */
  brandName?: string;
  /** Optional logo image */
  logoImage?: ReactNode;
  /** Array of tab configurations */
  tabs: AppTabConfig[];
  /** External links shown in the app bar (web only) */
  externalLinks?: AppTabsExternalLink[];
  /** App bar height in pixels (web only) */
  height?: number;
  /** Called when hamburger is pressed (native only) */
  onPrimaryMenuPress?: () => void;
}

/**
 * Native platform tabs for mobile (iOS/Android).
 * Uses true native tabs with liquid glass effect on iOS.
 * For web, see app-tabs.web.tsx
 */
export default function AppTabs({
  tabs,
}: AppTabsProps) {
  const { values: theme } = useThemeContext();

  return (
    <NativeTabs
      tintColor={theme.primary}
      iconColor={theme.onSurfaceVariant}>
      {tabs.map((tab) => (
        <NativeTabs.Trigger key={tab.name} name={tab.name}>
          {(tab.sfSymbol || tab.materialIcon) && (
            <NativeTabs.Trigger.Icon
              sf={tab.sfSymbol as any}
              md={tab.materialIcon}
            />
          )}
          <NativeTabs.Trigger.Label>{tab.label}</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
