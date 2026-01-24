import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StyledText } from './StyledText';

interface NotificationBadgeProps {
  count: number;
  maxCount?: number;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({ 
  count, 
  maxCount = 99 
}) => {
  if (count <= 0) return null;

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  return (
    <View style={styles.badge}>
      <StyledText 
        color="white" 
        fontSize="sm"
        fontWeight={600}
        align="center"
      >
        {displayCount}
      </StyledText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#CC3366', // Using brand primary color
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
});
