import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import React, { ReactNode } from 'react';
import { Pressable, View, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../../../theme';
import { Typography } from '../../ui/typography';
import { ThemedView } from '../../ui/themed-view';
import { Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { renderIcon, type PlatformIcon } from '../../../icons';

/**
 * External link configuration for AppTabs
 */
export interface AppTabsExternalLink {
  /** Link label text */
  label: string;
  /** External URL href */
  href: string;
  /** Optional icon configuration */
  icon?: PlatformIcon | string;
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
  /** Optional iOS SF Symbol icon configuration (must include both default and selected states) */
  sfSymbol?: SFSymbolIcon;
  /** Optional Android Material Design icon name */
  materialIcon?: MaterialIconName;
  /** Optional web-specific icon configuration */
  webIcon?: PlatformIcon | string;
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
  /** App bar height (default: 64) */
  height?: number;
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
  height = 64,
}: AppTabsProps) {
  return (
    <Tabs>
      <TabList asChild>
        <CustomTabList
          brandName={brandName}
          externalLinks={externalLinks}
          maxWidth={maxWidth}
          height={height}>
          {tabs.map((tab) => (
            <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
              <TabButton
                height={height}
                webIcon={tab.webIcon}
                materialIcon={tab.materialIcon}>
                {tab.label}
              </TabButton>
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
  height?: number;
  webIcon?: PlatformIcon | string;
  materialIcon?: string;
}

export function TabButton({ children, isFocused, height, webIcon, materialIcon, ...props }: TabButtonProps) {
  const { values: theme } = useTheme();

  // Use webIcon if provided, otherwise fallback to materialIcon with MaterialIcons library
  const iconToRender = webIcon || (materialIcon ? { library: 'MaterialIcons' as const, name: materialIcon } : undefined);
  const iconColor = isFocused ? theme.primary : theme.onSurfaceVariant;

  return (
    <Pressable
      {...props}
      style={({ pressed, hovered }: any) => [
        styles.tabButton,
        {
          paddingHorizontal: theme.tokens.elevation.level4,
          borderRadius: theme.tokens.elevation.level2,
          height,
          justifyContent: 'center',
        },
        pressed && { opacity: 0.7 },
        hovered && {
          backgroundColor: theme.isDark
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(0, 0, 0, 0.05)',
        },
      ]}>
      <View style={styles.tabButtonContent}>
        {iconToRender && renderIcon(iconToRender, 'MaterialIcons', 20, iconColor)}
        <Typography
          variant="labelLarge"
          weight="medium"
          color={iconColor}
          style={styles.tabButtonText}>
          {children}
        </Typography>
      </View>
      {isFocused && (
        <View
          style={[
            styles.activeIndicator,
            {
              backgroundColor: theme.primary,
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
            },
          ]}
        />
      )}
    </Pressable>
  );
}

interface ExternalLinkButtonProps {
  href: string;
  label: string;
  height?: number;
  icon?: PlatformIcon | string;
}

function ExternalLinkButton({ href, label, height, icon }: ExternalLinkButtonProps) {
  const { values: theme } = useTheme();

  const handlePress = async (event: any) => {
    if (Platform.OS !== 'web') {
      event.preventDefault();
      await openBrowserAsync(href, {
        presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
      });
    }
  };

  return (
    <Link href={href as any} target="_blank" onPress={handlePress} asChild>
      <Pressable
        style={({ pressed, hovered }: any) => [
          styles.tabButton,
          {
            paddingHorizontal: theme.tokens.elevation.level4,
            borderRadius: theme.tokens.elevation.level2,
            height,
            justifyContent: 'center',
          },
          pressed && { opacity: 0.7 },
          hovered && {
            backgroundColor: theme.isDark
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.05)',
          },
        ]}>
        <View style={styles.tabButtonContent}>
          {icon && renderIcon(icon, 'MaterialIcons', 20, theme.onSurfaceVariant)}
          <Typography
            variant="labelLarge"
            weight="medium"
            color={theme.onSurfaceVariant}
            style={styles.tabButtonText}>
            {label}
          </Typography>
        </View>
      </Pressable>
    </Link>
  );
}

interface CustomTabListProps extends TabListProps {
  brandName: string;
  externalLinks: AppTabsExternalLink[];
  maxWidth: number;
  height: number;
}

export function CustomTabList({
  brandName,
  externalLinks,
  maxWidth,
  height,
  children,
  ...props
}: CustomTabListProps) {
  const { values: theme } = useTheme();

  // Calculate tonal surface color overlay (8% primary for elevation level 2)
  const getSurfaceWithTonalElevation = () => {
    const baseColor = theme.surfaceContainer;
    // Return base color - tonal elevation is already handled by variant="appbar"
    return baseColor;
  };

  return (
    <ThemedView
      variant="appbar"
      style={[
        styles.appBar,
        {
          paddingVertical: 0,
          paddingHorizontal: theme.tokens.elevation.level5,
          shadowColor: theme.shadow,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        },
      ]}>
      <View
        {...props}
        style={[
          styles.appBarContent,
          {
            maxWidth,
            gap: theme.tokens.elevation.level3,
          },
        ]}>
        <Typography variant="titleMedium" weight="bold" style={styles.brandText}>
          {brandName}
        </Typography>

        <View style={[styles.tabsContainer, { gap: theme.tokens.elevation.level1 }]}>
          {children}
        </View>

        {externalLinks.length > 0 && (
          <View style={[styles.externalLinksContainer, { gap: theme.tokens.elevation.level1, marginLeft: theme.tokens.elevation.level4 }]}>
            {externalLinks.map((link, index) => (
              <ExternalLinkButton key={index} href={link.href} label={link.label} height={height} icon={link.icon} />
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
    // @ts-ignore - Web-only transition property
    transition: 'background-color 0.2s ease, opacity 0.15s ease',
  },
  tabButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tabButtonText: {
    fontWeight: '500',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    // @ts-ignore - Web-only transition property
    transition: 'opacity 0.2s ease',
  },
  externalLinksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
