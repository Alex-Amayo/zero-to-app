export interface NavItem {
  label: string;
  route: string;
  exact?: boolean;
}

export interface NavSection {
  title: string;
  icon: { library: string; name: string };
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Getting Started',
    icon: { library: 'Feather', name: 'code' },
    items: [
      { label: 'Installation', route: '/explore', exact: true },
      { label: 'Theming', route: '/explore/theming' },
    ],
  },
  {
    title: 'Foundation',
    icon: { library: 'Feather', name: 'book-open' },
    items: [
      { label: 'Tokens', route: '/explore/tokens' },
      { label: 'Icons', route: '/explore/icons' },
    ],
  },
  {
    title: 'Components',
    icon: { library: 'Feather', name: 'box' },
    items: [
      { label: 'Screen', route: '/explore/screen' },
      { label: 'Container', route: '/explore/container' },
      { label: 'ThemedView', route: '/explore/themed-view' },
      { label: 'Typography', route: '/explore/typography' },
      { label: 'ThemedImage', route: '/explore/themed-image' },
      { label: 'Button', route: '/explore/button' },
      { label: 'Chip', route: '/explore/chip' },
      { label: 'Slider', route: '/explore/slider' },
      { label: 'FAB', route: '/explore/fab' },
      { label: 'Collapsible', route: '/explore/collapsible' },
    ],
  },
  {
    title: 'Navigation',
    icon: { library: 'Feather', name: 'navigation' },
    items: [
      { label: 'AppTabs', route: '/explore/app-tabs' },
      { label: 'Sidebar', route: '/explore/sidebar' },
      { label: 'Drawer', route: '/explore/drawer' },
      { label: 'ThemedStack', route: '/explore/themed-stack' },
      { label: 'NativeHeader', route: '/explore/native-header' },
    ],
  },
];

export const NAV_PAGES: NavItem[] = NAV_SECTIONS.flatMap((s) => s.items);
