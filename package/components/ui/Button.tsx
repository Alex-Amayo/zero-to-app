import React, { useContext, useMemo } from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import * as Icons from '@expo/vector-icons';
import { useBrand } from '../../brand';
import { StyledText } from './StyledText';
import { ThemeContext } from '../../theme';

type IconLibrary = keyof typeof Icons;

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  secondary?: boolean;
  loading?: boolean;
  icon?: {
    library: IconLibrary;
    name: string;
    size?: number;
    color?: string;
  };
  iconPosition?: 'left' | 'right';
  style?: any;
};

/**
 * A reusable button component that can be customized with different styles,
 * loading states, and behavior based on props. It can also display an optional icon.
 */

const Button = ({
  title,
  secondary,
  loading,
  icon,
  onPress,
  iconPosition = 'right',
  style,
}: ButtonProps) => {
  const theme = useContext(ThemeContext);
  const brand = useBrand();
  
  const styles = useMemo(() => StyleSheet.create({
    primary: {
      maxHeight: 100,
      minWidth: 200,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      borderRadius: brand.borderRadius,
      backgroundColor: brand.colors.primary,
    },
    secondary: {
      maxHeight: 100,
      minWidth: 200,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      borderRadius: brand.borderRadius,
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: brand.colors.secondary,
    },
    contentContainer: {
      flexDirection: 'row', // Ensures icon and text are in a row
      alignItems: 'center', // Vertically centers icon and text
      justifyContent: 'center', // Horizontally centers icon and text
    },
    icon: {
      marginLeft: 8, // Adds spacing between icon and text
    },
  }), [brand]);
  
  return loading ? (
    <View>
      <ActivityIndicator
        size="small"
        color={secondary ? brand.colors.secondary : brand.colors.primary}
      />
    </View>
  ) : (
    <Pressable onPress={onPress} style={[secondary ? styles.secondary : styles.primary, style]}>
      <View style={styles.contentContainer}>
        {icon && iconPosition === 'left' && (
          <View style={{ marginRight: 8 }}>
            {icon.library && Icons[icon.library]
              ? React.createElement(Icons[icon.library], {
                  name: icon.name,
                  size: icon.size || 20,
                  color: icon.color || (!secondary ? '#fff' : theme.values.color),
                })
              : null}
          </View>
        )}
        <StyledText
          fontSize={'sm'}
          color={!secondary ? '#FFFFFF' : theme.values.color}
          fontWeight={500}
          numberOfLines={1}
          align="center">
          {title}
        </StyledText>
        {icon && iconPosition === 'right' && (
          <View style={{ marginLeft: 8 }}>
            {icon.library && Icons[icon.library]
              ? React.createElement(Icons[icon.library], {
                  name: icon.name,
                  size: icon.size || 20,
                  color: icon.color || (!secondary ? '#fff' : theme.values.color),
                })
              : null}
          </View>
        )}
      </View>
    </Pressable>
  );
};

export { Button };
