import React, { useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import {
  Button,
  Typography,
  ThemedView,
  Screen,
  Sidebar,
  SidebarHeader,
  SidebarSection,
  SidebarItem,
  SidebarFooter,
  useSidebar,
  useDimensions,
  breakpoints,
} from 'zero-to-app';

export default function ExploreScreen() {
  const { open } = useSidebar();
  const { width } = useDimensions();
  const isDesktop = width >= breakpoints.large;
  const [selectedItem, setSelectedItem] = useState('home');

  const handleItemPress = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <Screen variant="background" edges={['top', 'bottom']}>
      <View style={styles.container}>
      {/* Sidebar */}
      <Sidebar
        header={
          <SidebarHeader
            title="Zero to App"
            subtitle="Demo Sidebar"
          />
        }
        footer={
          <SidebarFooter>
            <Typography variant="labelSmall" muted>
              © 2024 Zero to App
            </Typography>
            <Typography variant="labelSmall" muted>
              v1.0.0
            </Typography>
          </SidebarFooter>
        }
      >
        <SidebarSection title="Main">
          <SidebarItem
            icon={{ library: 'Feather', name: 'home' }}
            label="Home"
            active={selectedItem === 'home'}
            onPress={() => handleItemPress('home')}
          />
          <SidebarItem
            icon={{ library: 'Feather', name: 'compass' }}
            label="Explore"
            active={selectedItem === 'explore'}
            onPress={() => handleItemPress('explore')}
          />
          <SidebarItem
            icon={{ library: 'Feather', name: 'settings' }}
            label="Settings"
            active={selectedItem === 'settings'}
            onPress={() => handleItemPress('settings')}
          />
          <SidebarItem
            icon={{ library: 'Feather', name: 'user' }}
            label="Profile"
            active={selectedItem === 'profile'}
            onPress={() => handleItemPress('profile')}
          />
        </SidebarSection>

        <SidebarSection title="Help">
          <SidebarItem
            icon={{ library: 'Feather', name: 'help-circle' }}
            label="Help"
            active={selectedItem === 'help'}
            onPress={() => handleItemPress('help')}
          />
          <SidebarItem
            icon={{ library: 'Feather', name: 'log-out' }}
            label="Logout"
            active={selectedItem === 'logout'}
            onPress={() => handleItemPress('logout')}
          />
        </SidebarSection>
      </Sidebar>

      {/* Main content area */}
      <ThemedView
        variant="background"
        style={[
          styles.content,
          // Add left margin for persistent sidebar on desktop
          isDesktop && styles.contentWithSidebar,
        ]}
      >
        <View style={styles.body}>
          {/* Show menu button on mobile */}
          {!isDesktop && (
            <Button
              title="Menu"
              icon={{ library: 'Feather', name: 'menu' }}
              iconPosition="left"
              variant="text"
              onPress={open}
            />
          )}

          <Typography variant="headlineMedium" weight="bold">
            Explore
          </Typography>

          <ThemedView variant="surface" style={styles.card}>
            <Typography variant="titleLarge" weight="medium">
              Selected: {selectedItem.charAt(0).toUpperCase() + selectedItem.slice(1)}
            </Typography>

            <Typography variant="bodyMedium" style={styles.description}>
              This is the Explore screen demonstrating the Sidebar component from zero-to-app.
            </Typography>

            <Typography variant="bodySmall" muted style={styles.description}>
              <Typography variant="bodySmall" weight="bold">
                Desktop (≥1024px):
              </Typography>
              {' '}Persistent sidebar on the left
            </Typography>

            <Typography variant="bodySmall" muted style={styles.description}>
              <Typography variant="bodySmall" weight="bold">
                Mobile/Tablet (&lt;1024px):
              </Typography>
              {' '}Drawer that slides from left with backdrop
            </Typography>

            <Typography variant="bodySmall" muted style={styles.description}>
              <Typography variant="bodySmall" weight="bold">
                Control:
              </Typography>
              {' '}Use useSidebar() hook to open/close/toggle the drawer
            </Typography>
          </ThemedView>

          <ThemedView variant="surface" style={styles.card}>
            <Typography variant="titleMedium" weight="medium">
              Platform Information
            </Typography>

            <Typography variant="bodyMedium" style={styles.description}>
              Platform: {Platform.OS}
            </Typography>

            <Typography variant="bodyMedium" style={styles.description}>
              Screen width: {Math.round(width)}px
            </Typography>

            <Typography variant="bodyMedium" style={styles.description}>
              Layout: {isDesktop ? 'Desktop' : 'Mobile'}
            </Typography>
          </ThemedView>
        </View>
      </ThemedView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
  contentWithSidebar: {
    marginLeft: 280, // Sidebar width from tokens
  },
  body: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  card: {
    padding: 24,
    borderRadius: 12,
    gap: 12,
  },
  description: {
    marginTop: 4,
  },
});
