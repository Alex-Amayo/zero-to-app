import type { ViewStyle, TextStyle, ImageStyle, StyleProp, AccessibilityRole } from 'react-native';

// Base props for ALL components
export interface BaseComponentProps {
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

// Props for interactive components (buttons, links, tiles)
export interface InteractiveComponentProps extends BaseComponentProps {
  disabled?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
}

// Props for components with loading states
export interface LoadableComponentProps {
  loading?: boolean;
}

// Props for container components
export interface ContainerComponentProps extends BaseComponentProps {
  children: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
}
