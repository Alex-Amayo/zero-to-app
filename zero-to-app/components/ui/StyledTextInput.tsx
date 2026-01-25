// 1. IMPORTS
import React, { forwardRef, useContext, useMemo } from 'react';
import {
  StyleSheet,
  View,
  TextInput as RNTextInput,
  TextInputProps,
  Platform,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useBrand } from '../../brand';
import { ThemeContext } from '../../theme';
import type { BaseComponentProps } from '../shared/types';

// 2. TYPES
const MIN_HEIGHT = 40;
const MAX_HEIGHT = 120;

// Web-specific style properties
interface WebInputStyle {
  outlineStyle?: 'none';
  WebkitAppearance?: 'none';
  MozAppearance?: 'none';
  appearance?: 'none';
}

export interface StyledTextInputProps extends BaseComponentProps, Omit<TextInputProps, 'style'> {
  value: string;
  inputHeight?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  textStyle?: StyleProp<TextStyle>;
}

// 3. COMPONENT
const StyledTextInput = forwardRef<RNTextInput, StyledTextInputProps>(({
  value,
  inputHeight,
  style,
  textStyle,
  testID,
  ...textInputProps
}, ref) => {
  const theme = useContext(ThemeContext);
  const brand = useBrand();
  const currentHeight = inputHeight || MIN_HEIGHT;
  const isSingleLine = currentHeight <= MIN_HEIGHT;

  const styles = useMemo(() => StyleSheet.create({
    container: {
      width: '100%',
      maxHeight: 200,
      padding: 5,
      alignSelf: 'center',
      borderRadius: brand.borderRadius,
    },
    textInput: {
      width: '100%',
      fontSize: brand.fontSizes.medium,
      borderWidth: 0,
      paddingHorizontal: 10,
      paddingVertical: 10,
      minHeight: MIN_HEIGHT,
    },
  }), [brand]);

  const webInputStyle: WebInputStyle = Platform.OS === 'web' ? {
    outlineStyle: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
  } : {};

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          borderColor: theme.values.borderColor,
          borderWidth: theme.values.isDark ? 0 : 1,
          backgroundColor: theme.values.isDark
            ? theme.values.borderColor
            : theme.values.backgroundColor,
        },
        style,
      ]}
    >
      <RNTextInput
        ref={ref}
        {...textInputProps}
        value={value}
        multiline={true}
        style={[
          styles.textInput,
          {
            color: theme.values.color,
            height: inputHeight ? currentHeight : undefined,
            minHeight: MIN_HEIGHT,
            maxHeight: MAX_HEIGHT,
            textAlignVertical: isSingleLine ? 'center' : 'top',
          },
          webInputStyle as TextStyle,
          textStyle,
        ]}
        placeholderTextColor={theme.values.color}
        {...(Platform.OS === 'web' && textInputProps.onKeyDown && {
          onKeyDown: textInputProps.onKeyDown as unknown as undefined,
        })}
      />
    </View>
  );
});

StyledTextInput.displayName = 'StyledTextInput';

// 4. EXPORTS
export { StyledTextInput };
