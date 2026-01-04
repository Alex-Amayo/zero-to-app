import React, { useContext, useMemo } from 'react';
import {
  StyleSheet,
  View,
  TextInput as RNTextInput,
  TextInputProps,
  Platform,
} from 'react-native';
import { useBrand } from '../../brand';
import { ThemeContext } from '../../theme';

// Define props for the StyledTextInput component
interface CustomTextInputProps extends TextInputProps {
  value: string;
  inputHeight?: number; // Dynamic height for the input
  onKeyDown?: (e: any) => void; // Web-specific key handler
}

const StyledTextInput = (props: CustomTextInputProps): React.JSX.Element => {
  const { value, inputHeight, ...textInputProps } = props;
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
      borderWidth: 0, // Remove any internal border from the StyledTextInput
      paddingHorizontal: 10,
      paddingVertical: 10,
      minHeight: MIN_HEIGHT,
    },
    webInput: {
      // @ts-ignore - Web-specific styles
      outlineStyle: 'none',
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      appearance: 'none',
    },
  }), [brand]);
  
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: theme.values.borderColor,
          borderWidth: theme.values.isDark ? 0 : 1,
          backgroundColor: theme.values.isDark
            ? theme.values.borderColor
            : theme.values.backgroundColor,
        },
      ]}>
      <RNTextInput
        {...textInputProps}
        onKeyPress={props.onKeyPress} // Forward onKeyPress prop
        onContentSizeChange={props.onContentSizeChange} // Forward onContentSizeChange prop
        value={value}
        multiline={true}
        style={[
          styles.textInput,
          {
            color: theme.values.color,
            height: inputHeight ? currentHeight : undefined, // Only set height if provided
            minHeight: MIN_HEIGHT,
            maxHeight: MAX_HEIGHT,
            textAlignVertical: isSingleLine ? 'center' : 'top',
          },
          Platform.OS === 'web' && styles.webInput,
        ]}
        placeholderTextColor={theme.values.color}
        // @ts-ignore - onKeyDown is web-specific and not in React Native types
        onKeyDown={props.onKeyDown}
      />
    </View>
  );
};

export { StyledTextInput };

const MIN_HEIGHT = 40;
const MAX_HEIGHT = 120;
