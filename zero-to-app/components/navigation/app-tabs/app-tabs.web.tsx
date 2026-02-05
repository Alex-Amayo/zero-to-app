import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import React, { ReactNode, useEffect } from 'react';
import { Pressable, View, StyleSheet, Platform, Image, ImageSourcePropType } from 'react-native';
import { useThemeContext } from '../../../theme';
import { Typography } from '../../ui/typography';
import { ThemedView } from '../../ui/themed-view';
import { Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { renderIcon, type PlatformIcon } from '../../../icons';
import { useLayout } from '../../../context/layout-context';

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
  /** Optional logo image to display instead of brand name (web only) */
  logoImage?: ImageSourcePropType;
  /** Array of tab configurations */
  tabs: AppTabConfig[];
  /** Optional external links to display */
  externalLinks?: AppTabsExternalLink[];
  /** App bar height (default: 64) */
  height?: number;
}

/**
 * Material 3 themed tabs component for navigation.
 * Web version with traditional top appbar layout.
 */
export default function AppTabs({
  brandName,
  logoImage,
  tabs,
  externalLinks = [],
  height = 64,
}: AppTabsProps) {
  const { setAppBarHeight } = useLayout();

  useEffect(() => {
    setAppBarHeight(height);
  }, [height, setAppBarHeight]);

  return (
    <Tabs>
      <TabList asChild>
        <CustomTabList
          brandName={brandName}
          logoImage={logoImage}
          externalLinks={externalLinks}
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
  const { values: theme } = useThemeContext();
  const spacing = theme.spacing;

  // Use webIcon if provided, otherwise fallback to materialIcon with MaterialIcons library
  const iconToRender = webIcon || (materialIcon ? { library: 'MaterialIcons' as const, name: materialIcon } : undefined);
  const iconColor = isFocused ? theme.primary : theme.onSurfaceVariant;

  return (
    <Pressable
      {...props}
      style={({ pressed, hovered }: any) => [
        styles.tabButton,
        {
          paddingHorizontal: spacing.lg,
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
      <View style={[styles.tabButtonContent, { gap: spacing.sm }]}>
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
  const { values: theme } = useThemeContext();
  const spacing = theme.spacing;

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
            paddingHorizontal: spacing.lg,
            borderRadius: theme.borderRadius,
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
        <View style={[styles.tabButtonContent, { gap: spacing.sm }]}>
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
  logoImage?: ImageSourcePropType;
  externalLinks: AppTabsExternalLink[];
  height: number;
}

export function CustomTabList({
  brandName,
  logoImage,
  externalLinks,
  height,
  children,
  ...props
}: CustomTabListProps) {
  const { values: theme } = useThemeContext();
  const spacing = theme.spacing;

  return (
    <ThemedView
      variant="appbar"
      rounded={false}
      style={[
        styles.appBar,
        {
          height,
          paddingVertical: 0,
          paddingHorizontal: spacing.xxl,
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
          { height, gap: spacing.sm },
        ]}>
        <Link href="/" style={styles.brandText}>
          {logoImage ? (
            <Image
              source={logoImage}
              style={styles.logoImage}
              resizeMode="contain"
            />
          ) : (
            <Typography variant="titleLarge" weight="medium">
              {brandName}
            </Typography>
          )}
        </Link>

        <View style={[styles.tabsContainer, { gap: spacing.xs }]}>
          {children}
        </View>

        {externalLinks.length > 0 && (
          <View style={[styles.externalLinksContainer, { gap: spacing.xs, marginLeft: spacing.lg }]}>
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
  },
  appBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  brandText: {
    marginRight: 'auto',
  },
  logoImage: {
    height: 32,
    width: 120,
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
