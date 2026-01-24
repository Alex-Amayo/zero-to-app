import React, { useContext } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import * as Icons from '@expo/vector-icons';
import { ThemeContext } from '../../theme';
import { StyledText } from '../ui';

type IconLibrary = keyof typeof Icons;

export interface ActionRowProps {
  title: string;
  subtitle?: string;
  icon?: {
    library: IconLibrary;
    name: string;
    size?: number;
    color?: string;
  };
  onPress?: () => void;
  rightElement?: React.ReactNode; // For chevron, badge, switch, etc.
  variant?: 'default' | 'button' | 'link';
  disabled?: boolean;
  uppercase?: boolean;
}

/**
 * A flexible action row component that displays title, optional subtitle, icon, and right element.
 * Supports multiple variants and integrates with the design system theme.
 */
export const ActionRow = ({
  title,
  subtitle,
  icon,
  onPress,
  rightElement,
  variant = 'default',
  disabled = false,
  uppercase = false,
}: ActionRowProps) => {
  const theme = useContext(ThemeContext);

  // Render icon if provided
  const renderIcon = () => {
    if (!icon) return null;

    const IconComponent = Icons[icon.library];
    if (!IconComponent) return null;

    const iconColor = icon.color || theme.values.color;
    const iconSize = icon.size || 25;

    return (
      <View style={styles.iconContainer}>
        {React.createElement(IconComponent, {
          name: icon.name,
          size: iconSize,
          color: iconColor,
        })}
      </View>
    );
  };

  const content = (
    <View style={styles.content}>
      <View style={styles.leftSection}>
        {renderIcon()}
        <View style={styles.textContainer}>
          <StyledText bold uppercase={uppercase}>
            {title}
          </StyledText>
          {subtitle && (
            <StyledText fontSize="sm" muted>
              {subtitle}
            </StyledText>
          )}
        </View>
      </View>
      {rightElement && <View style={styles.rightSection}>{rightElement}</View>}
    </View>
  );

  if (onPress && !disabled) {
    return (
      <Pressable
        style={[styles.actionRow, disabled && styles.disabled]}
        onPress={onPress}
        disabled={disabled}>
        {content}
      </Pressable>
    );
  }

  return <View style={[styles.actionRow, disabled && styles.disabled]}>{content}</View>;
};

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  rightSection: {
    marginLeft: 10,
  },
  disabled: {
    opacity: 0.5,
  },
});

