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
    ],
  },
  {
    title: 'AI Integration',
    icon: { library: 'Feather', name: 'zap' },
    items: [
      { label: 'MCP and Skills', route: '/explore/mcp' },
    ],
  },
  {
    title: 'Theming',
    icon: { library: 'Feather', name: 'droplet' },
    items: [
      { label: 'Overview', route: '/explore/theming' },
      { label: 'Tokens', route: '/explore/tokens' },
    ],
  },
  {
    title: 'Navigation',
    icon: { library: 'Feather', name: 'navigation' },
    items: [
      { label: 'Overview', route: '/explore/nav-overview' },
      { label: 'Tabs', route: '/explore/nav-tabs' },
      { label: 'Sidebar', route: '/explore/nav-sidebar' },
      { label: 'Stack & Headers', route: '/explore/nav-stack' },
      { label: 'Hooks', route: '/explore/nav-hooks' },
    ],
  },
  {
    title: 'Foundation',
    icon: { library: 'Feather', name: 'book-open' },
    items: [
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
      { label: 'Avatar', route: '/explore/avatar' },
      { label: 'Button', route: '/explore/button' },
      { label: 'Chip', route: '/explore/chip' },
      { label: 'Divider', route: '/explore/divider' },
      { label: 'Slider', route: '/explore/slider' },
      { label: 'Switch', route: '/explore/switch' },
      { label: 'SegmentedControl', route: '/explore/segmented-control' },
      { label: 'FAB', route: '/explore/fab' },
      { label: 'List', route: '/explore/list' },
      { label: 'Modal', route: '/explore/modal' },
      { label: 'ProgressIndicator', route: '/explore/progress-indicator' },
      { label: 'TextInput', route: '/explore/text-input' },
      { label: 'Collapsible', route: '/explore/collapsible' },
    ],
  },
];

export const NAV_PAGES: NavItem[] = NAV_SECTIONS.flatMap((s) => s.items);
