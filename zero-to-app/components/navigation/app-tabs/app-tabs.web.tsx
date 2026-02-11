import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import React, { ReactNode, useState, useEffect } from 'react';
import { Pressable, View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { useThemeContext } from '../../../theme';
import { Typography } from '../../ui/typography';
import { ThemedView } from '../../ui/themed-view';
import { Link, usePathname } from 'expo-router';
import { renderIcon, type PlatformIcon } from '../../../icons';
import { useLayout } from '../../../context/layout-context';
import { useDimensions, breakpoints } from '../../../hooks';
import { useSidebar } from '../../../context/sidebar-context';
import { Drawer } from '../drawer/drawer';

/**
 * External link configuration for AppTabs
 */
export interface AppTabsExternalLink {
  label: string;
  href: string;
  icon?: PlatformIcon | string;
}

/**
 * SF Symbol icon configuration for iOS
 */
export interface SFSymbolIcon {
  default: string;
  selected: string;
}

export type MaterialIconName = string;

/**
 * Tab configuration for AppTabs
 */
export interface AppTabConfig {
  name: string;
  href: string;
  label: string;
  sfSymbol?: SFSymbolIcon;
  materialIcon?: MaterialIconName;
  webIcon?: PlatformIcon | string;
}

/**
 * Props for AppTabs component
 */
export interface AppTabsProps {
  brandName: string;
  logoImage?: ImageSourcePropType;
  tabs: AppTabConfig[];
  externalLinks?: AppTabsExternalLink[];
  height?: number;
  /** Native-only: called when hamburger is pressed on native platforms */
  onPrimaryMenuPress?: () => void;
}

/**
 * Material 3 themed tabs component for navigation.
 * Responsive: right-side drawer on mobile, horizontal tabs on desktop.
 */
export default function AppTabs({
  brandName,
  logoImage,
  tabs,
  externalLinks = [],
  height = 64,
}: AppTabsProps) {
  const { setAppBarHeight } = useLayout();
  const { width } = useDimensions();
  const isMobile = width < breakpoints.large;
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setAppBarHeight(height);
  }, [height, setAppBarHeight]);

  // Close drawer on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <Tabs>
      <TabList asChild>
        <CustomTabList
          brandName={brandName}
          logoImage={logoImage}
          externalLinks={externalLinks}
          height={height}
          isMobile={isMobile}
          onMenuPress={() => setMenuOpen(true)}>
          {tabs.map((tab) => (
            <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
              <TabButton height={height} webIcon={tab.webIcon} materialIcon={tab.materialIcon}>
                {tab.label}
              </TabButton>
            </TabTrigger>
          ))}
        </CustomTabList>
      </TabList>

      <TabSlot style={{ height: '100%' }} />

      {isMobile && (
        <Drawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} side="right">
          {tabs.map((tab) => {
            const icon = tab.webIcon || (tab.materialIcon
              ? { library: 'MaterialIcons' as const, name: tab.materialIcon }
              : undefined);
            const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/');
            return (
              <DrawerMenuItem
                key={tab.name}
                href={tab.href}
                label={tab.label}
                icon={icon}
                active={isActive}
              />
            );
          })}

          {externalLinks.length > 0 && <DrawerDivider />}

          {externalLinks.map((link, i) => (
            <DrawerMenuItem
              key={i}
              href={link.href}
              label={link.label}
              icon={link.icon}
              external
            />
          ))}
        </Drawer>
      )}
    </Tabs>
  );
}

// --- Tab bar button (desktop) ---

interface TabButtonProps extends TabTriggerSlotProps {
  children: ReactNode;
  height?: number;
  webIcon?: PlatformIcon | string;
  materialIcon?: string;
}

function TabButton({ children, isFocused, height, webIcon, materialIcon, ...props }: TabButtonProps) {
  const { values: theme } = useThemeContext();
  const spacing = theme.spacing;

  const iconToRender = webIcon || (materialIcon ? { library: 'MaterialIcons' as const, name: materialIcon } : undefined);
  const iconColor = isFocused ? theme.primary : theme.onSurfaceVariant;

  return (
    <Pressable
      {...props}
      style={({ pressed, hovered }: any) => [
        styles.tabButton,
        { paddingHorizontal: spacing.lg, height, justifyContent: 'center' },
        pressed && { opacity: 0.7 },
        hovered && { backgroundColor: theme.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' },
      ]}>
      <View style={[styles.tabButtonContent, { gap: spacing.sm }]}>
        {iconToRender && renderIcon(iconToRender, 'MaterialIcons', 20, iconColor)}
        <Typography variant="labelLarge" weight="medium" color={iconColor}>
          {children}
        </Typography>
      </View>
      {isFocused && (
        <View style={[styles.activeIndicator, { backgroundColor: theme.primary }]} />
      )}
    </Pressable>
  );
}

// --- Custom tab list (the app bar) ---

interface CustomTabListProps extends TabListProps {
  brandName: string;
  logoImage?: ImageSourcePropType;
  externalLinks: AppTabsExternalLink[];
  height: number;
  isMobile: boolean;
  onMenuPress: () => void;
}

function CustomTabList({
  brandName,
  logoImage,
  externalLinks,
  height,
  isMobile,
  onMenuPress,
  children,
  ...props
}: CustomTabListProps) {
  const { values: theme } = useThemeContext();
  const spacing = theme.spacing;
  const { hasSidebar, open: openSidebar } = useSidebar();

  const showSidebarTrigger = isMobile && hasSidebar;

  return (
    <ThemedView
      variant="appbar"
      rounded={false}
      style={[styles.appBar, { height, paddingHorizontal: spacing.xxl }]}>
      <View {...props} style={[styles.appBarContent, { height, gap: spacing.sm }]}>
        {showSidebarTrigger && (
          <Pressable
            onPress={openSidebar}
            style={({ pressed }: any) => [
              styles.iconButton,
              { padding: spacing.xs, borderRadius: theme.borderRadius, marginRight: spacing.sm },
              pressed && { opacity: 0.7 },
            ]}>
            {renderIcon({ library: 'Feather', name: 'chevron-left' }, 'Feather', 20, theme.onSurface)}
          </Pressable>
        )}

        <Link href="/" style={styles.brand}>
          <View style={[styles.brandContent, { gap: spacing.sm }]}>
            {logoImage && <Image source={logoImage} style={styles.logo} resizeMode="contain" />}
            <Typography variant="titleLarge" weight="medium">{brandName}</Typography>
          </View>
        </Link>

        {!isMobile && (
          <>
            <View style={[styles.tabs, { gap: spacing.xs }]}>{children}</View>
            {externalLinks.length > 0 && (
              <View style={[styles.tabs, { gap: spacing.xs, marginLeft: spacing.lg }]}>
                {externalLinks.map((link, i) => (
                  <ExternalLinkButton key={i} {...link} height={height} />
                ))}
              </View>
            )}
          </>
        )}

        {isMobile && (
          <Pressable
            onPress={onMenuPress}
            style={({ pressed }: any) => [
              styles.iconButton,
              { padding: spacing.sm, borderRadius: theme.borderRadius },
              pressed && { opacity: 0.7 },
            ]}>
            {renderIcon({ library: 'Feather', name: 'menu' }, 'Feather', 24, theme.onSurface)}
          </Pressable>
        )}
      </View>
    </ThemedView>
  );
}

// --- Desktop external link button ---

function ExternalLinkButton({ href, label, height, icon }: AppTabsExternalLink & { height: number }) {
  const { values: theme } = useThemeContext();
  const spacing = theme.spacing;

  return (
    <Link href={href as any} target="_blank" asChild>
      <Pressable
        style={({ pressed, hovered }: any) => [
          styles.tabButton,
          { paddingHorizontal: spacing.lg, height, justifyContent: 'center', borderRadius: theme.borderRadius },
          pressed && { opacity: 0.7 },
          hovered && { backgroundColor: theme.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' },
        ]}>
        <View style={[styles.tabButtonContent, { gap: spacing.sm }]}>
          {icon && renderIcon(icon, 'MaterialIcons', 20, theme.onSurfaceVariant)}
          <Typography variant="labelLarge" weight="medium" color={theme.onSurfaceVariant}>
            {label}
          </Typography>
        </View>
      </Pressable>
    </Link>
  );
}

// --- Drawer menu item ---

function DrawerMenuItem({
  href,
  label,
  icon,
  active,
  external,
}: {
  href: string;
  label: string;
  icon?: PlatformIcon | string;
  active?: boolean;
  external?: boolean;
}) {
  const { values: theme } = useThemeContext();
  const spacing = theme.spacing;
  const tokens = theme.tokens.sidebar;
  const backgroundColor = active ? tokens.itemActiveBg : 'transparent';
  const textColor = active ? tokens.itemActiveText : tokens.itemText;

  return (
    <Link href={href as any} {...(external ? { target: '_blank' } : {})} asChild>
      <Pressable
        style={({ pressed, hovered }: any) => [
          styles.drawerItem,
          { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, backgroundColor },
          hovered && !active && { backgroundColor: tokens.itemHoverBg },
          pressed && { opacity: 0.7 },
        ]}>
        <View style={[styles.drawerItemContent, { gap: spacing.md }]}>
          {icon && (
            <View style={styles.drawerItemIcon}>
              {renderIcon(icon, 'MaterialIcons', 20, textColor)}
            </View>
          )}
          <Typography variant="labelLarge" weight="medium" color={textColor}>
            {label}
          </Typography>
          {external && renderIcon({ library: 'Feather', name: 'external-link' }, 'Feather', 14, theme.onSurfaceVariant)}
        </View>
      </Pressable>
    </Link>
  );
}

function DrawerDivider() {
  const { values: theme } = useThemeContext();
  return <View style={[styles.divider, { backgroundColor: theme.tokens.sidebar.divider }]} />;
}

// --- Styles ---

const styles = StyleSheet.create({
  appBar: { width: '100%', flexDirection: 'row' },
  appBarContent: { flexDirection: 'row', alignItems: 'center', width: '100%' },
  brand: { marginRight: 'auto' },
  brandContent: { flexDirection: 'row', alignItems: 'center' },
  logo: { height: 32, width: 32 },
  tabs: { flexDirection: 'row', alignItems: 'center' },
  tabButton: { position: 'relative' },
  tabButtonContent: { flexDirection: 'row', alignItems: 'center' },
  activeIndicator: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, borderTopLeftRadius: 2, borderTopRightRadius: 2 },
  iconButton: { alignItems: 'center', justifyContent: 'center' },
  drawerItem: { minHeight: 48, justifyContent: 'center' },
  drawerItemContent: { flexDirection: 'row', alignItems: 'center' },
  drawerItemIcon: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  divider: { height: 1, marginVertical: 8 },
});
