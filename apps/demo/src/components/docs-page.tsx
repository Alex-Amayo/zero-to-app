import React from 'react';
import { Platform, View } from 'react-native';
import { Typography, Screen, NativeHeader, useSidebar, useTheme } from 'zero-to-app';

interface DocsPageProps {
  title: string;
  description: string;
  /** Which side the sidebar icon appears. @default 'left' */
  sidebarIcon?: 'left' | 'right';
  children: React.ReactNode;
}

export function DocsPage({ title, description, sidebarIcon = 'left', children }: DocsPageProps) {
  const { open } = useSidebar();
  const { spacing } = useTheme();

  return (
    <>
      <NativeHeader rightIcon={`sidebar.${sidebarIcon}`} onRightPress={open} androidRightIcon="menu" />
      <Screen scrollable variant="background" edges={['bottom']}>
        <View style={{ paddingHorizontal: spacing.xxl, gap: spacing.xxl }}>
          {Platform.OS !== 'android' && (
            <View style={{ gap: spacing.xs }}>
              <Typography variant="headlineMedium" weight="bold">
                {title}
              </Typography>
              <Typography variant="bodyMedium" muted>
                {description}
              </Typography>
            </View>
          )}
          {children}
        </View>
      </Screen>
    </>
  );
}
