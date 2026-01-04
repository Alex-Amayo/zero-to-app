import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInputContentSizeChangeEventData,
  ActivityIndicator,
} from 'react-native';
import { IconButton } from '../../ui';
import { useBrand } from '../../brand';
import { ThemeContext } from '../../theme';

const PLACEHOLDER_COLOR = '#999999'; // Grey color for placeholder text

// Web-specific textarea component for reliable auto-resize
const WebTextarea = ({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor,
  style,
  onKeyDown,
  inputHeight,
  setInputHeight,
  isSingleLine,
  maxHeight,
  isTyping,
  fontSize,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  placeholderTextColor: string;
  style: any;
  onKeyDown?: (e: any) => void;
  inputHeight: number;
  setInputHeight: (height: number) => void;
  isSingleLine: boolean;
  maxHeight: number;
  isTyping: boolean;
  fontSize: number;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = React.useCallback(() => {
    if (textareaRef.current) {
      // Reset height to auto to get accurate scrollHeight
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const clampedHeight = Math.max(MIN_HEIGHT, Math.min(scrollHeight, maxHeight));
      setInputHeight(clampedHeight);
      textareaRef.current.style.height = `${clampedHeight}px`;
    }
  }, [maxHeight, setInputHeight]);

  // Only adjust height when user is typing (not in initial dummy state)
  useEffect(() => {
    if (isTyping) {
      // Use requestAnimationFrame to ensure DOM is ready
      const rafId = requestAnimationFrame(() => {
        adjustHeight();
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, [value, adjustHeight, isTyping]);

  const handleInput = (e: any) => {
    onChangeText(e.target.value);
    // Height adjustment happens in useEffect
  };

  const handleKeyDown = (e: any) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  // Flatten style array and extract values
  const flattenedStyle = Array.isArray(style) 
    ? Object.assign({}, ...style.filter(Boolean))
    : style || {};
  
  // Extract padding values from flattened style
  const paddingHorizontal = flattenedStyle.paddingHorizontal || flattenedStyle.paddingLeft || 10;
  const paddingVertical = flattenedStyle.paddingVertical || flattenedStyle.paddingTop || 10;
  
  // Extract color explicitly - it's critical for web
  const textColor = flattenedStyle.color;

  // Set placeholder color via CSS
  useEffect(() => {
    if (textareaRef.current && placeholderTextColor) {
      const textarea = textareaRef.current;
      const styleId = 'chat-input-placeholder-style';
      let styleElement = document.getElementById(styleId) as HTMLStyleElement;
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
      }
      // Use a data attribute to target this specific textarea
      textarea.setAttribute('data-placeholder-color', placeholderTextColor);
      styleElement.textContent = `textarea[data-placeholder-color="${placeholderTextColor}"]::placeholder { color: ${placeholderTextColor} !important; }`;
    }
  }, [placeholderTextColor]);
  
  return React.createElement('textarea', {
    ref: textareaRef,
    value: value,
    onChange: handleInput,
    onKeyDown: handleKeyDown,
    placeholder: placeholder,
    style: {
      height: `${inputHeight}px`,
      resize: 'none',
      overflow: 'hidden',
      fontFamily: flattenedStyle.fontFamily || 'inherit',
      fontSize: flattenedStyle.fontSize || fontSize,
      lineHeight: flattenedStyle.lineHeight || 'inherit',
      color: textColor || '#000000', // Explicitly set color, don't rely on inherit
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      paddingLeft: paddingHorizontal,
      paddingRight: paddingHorizontal,
      paddingTop: paddingVertical,
      paddingBottom: paddingVertical,
      margin: 0,
      display: 'inline-block',
      verticalAlign: isSingleLine ? 'middle' : 'top',
      width: '100%',
      boxSizing: 'border-box',
    },
  });
};

interface ChatInputProps {
  isLoading: boolean;
  sendMessage: (message: string) => void;
  maxHeight?: number;
}

const MIN_HEIGHT = 40; // One line height
const DEFAULT_MAX_HEIGHT = 120; // Maximum height (4-5 lines)

const ChatInput = ({ isLoading, sendMessage, maxHeight = DEFAULT_MAX_HEIGHT }: ChatInputProps): React.JSX.Element => {
  const theme = useContext(ThemeContext);
  const brand = useBrand();
  const [message, setMessage] = useState('');
  const [inputHeight, setInputHeight] = useState(MIN_HEIGHT);
  const textInputRef = useRef<TextInput>(null);
  const isSingleLine = inputHeight <= MIN_HEIGHT;
  const isTyping = message.length > 0;
  const borderRadius = isTyping ? brand.borderRadius : 9999;

  const handleChangeText = (text: string) => {
    setMessage(text);
  };

  const handleSubmit = () => {
    if (!isLoading && message.trim()) {
      sendMessage(message);
      setMessage('');
      setInputHeight(MIN_HEIGHT); // Reset height when message is sent
    }
  };

  // Mobile: Enter sends message
  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (Platform.OS !== 'web' && e.nativeEvent.key === 'Enter') {
      handleSubmit();
    }
  };

  // Web: Enter sends message, Shift+Enter creates newline
  const handleKeyDown = (e: any) => {
    if (Platform.OS === 'web' && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleContentSizeChange = (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
    const { height } = e.nativeEvent.contentSize;
    const clampedHeight = Math.max(MIN_HEIGHT, Math.min(height, maxHeight));
    setInputHeight(clampedHeight);
  };

  // Reset height when message is cleared
  useEffect(() => {
    if (!message) {
      setInputHeight(MIN_HEIGHT);
    }
  }, [message]);

  return (
    <View style={[styles.container, { backgroundColor: theme.values.cardBackgroundColor, borderRadius, ...(!theme.values.isDark && { borderColor: theme.values.borderColor, borderWidth: 1 }) }, Platform.OS === 'web' && { maxWidth: 1000 }]}>
      <View
        style={[
          styles.inputRow,
          {
            backgroundColor: theme.values.cardBackgroundColor,
            borderRadius,
          },
        ]}>
        {/* State 1: Not typing - buttons on same row */}
        {!isTyping && (
          <View style={styles.leftActionButtons}>
            <IconButton
              onPress={() => {}}
              iconName={'plus'}
            />
          </View>
        )}

        {/* Input wrapper */}
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            {Platform.OS === 'web' ? (
              <WebTextarea
                value={message}
                onChangeText={handleChangeText}
                placeholder={isTyping ? undefined : 'Ask anything'}
                placeholderTextColor={PLACEHOLDER_COLOR}
                onKeyDown={handleKeyDown}
                inputHeight={inputHeight}
                setInputHeight={setInputHeight}
                isSingleLine={isSingleLine}
                maxHeight={maxHeight}
                isTyping={isTyping}
                fontSize={brand.fontSizes.medium}
                style={[
                  styles.textInput,
                  {
                    color: theme.values.color,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  },
                  styles.webInput,
                ]}
              />
            ) : (
              <TextInput
                ref={textInputRef}
                value={message}
                scrollEnabled={inputHeight >= maxHeight}
                onChangeText={handleChangeText}
                placeholder={isTyping ? undefined : 'Ask anything'}
                placeholderTextColor={PLACEHOLDER_COLOR}
                onKeyPress={handleKeyPress}
                onContentSizeChange={handleContentSizeChange}
                multiline={true}
                style={[
                  styles.textInput,
                  {
                    color: theme.values.color,
                    textAlignVertical: isSingleLine ? 'center' : 'top',
                    maxHeight: maxHeight,
                  },
                ]}
              />
            )}
          </View>
        </View>

        {/* State 1: Not typing - buttons on same row */}
        {!isTyping && (
          <View style={styles.rightActionButtons}>
            {/* Microphone icon - always visible */}
            <IconButton
              onPress={() => {}}
              iconName={'mic'}
            />

            {/* Send button */}
            <View style={styles.sendButtonWrapper}>
              {isLoading ? (
                <ActivityIndicator size="small" color={brand.colors.primary} />
              ) : (
                <IconButton
                  onPress={handleSubmit}
                  iconName={'send'}
                  color={'#FFFFFF'}
                  backgroundColor={brand.colors.primary}
                />
              )}
            </View>
          </View>
        )}
      </View>

      {/* State 2: Typing - buttons in separate row below */}
      {isTyping && (
        <View style={[styles.actionButtonsRow, { backgroundColor: theme.values.cardBackgroundColor }]}>
          <View style={styles.leftActionButtons}>
            <IconButton
              onPress={() => {}}
              iconName={'plus'}
            />
          </View>

          <View style={styles.rightActionButtons}>
            {/* Microphone icon */}
            <IconButton
              onPress={() => {}}
              iconName={'mic'}
            />

            {/* Send button */}
            <View style={styles.sendButtonWrapper}>
              {isLoading ? (
                <ActivityIndicator size="small" color={brand.colors.primary} />
              ) : (
                <IconButton
                  onPress={handleSubmit}
                  iconName={'send'}
                  color={'#FFFFFF'}
                  backgroundColor={brand.colors.primary}
                />
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    gap: 20,
    padding: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10 ,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  leftActionButtons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightActionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
  },
  inputContainer: {
    width: '100%',
    ...Platform.select({
      web: {
        overflow: 'scroll',
        scrollbarWidth: 'none',
      },
    }),
  },
  textInput: {
    width: '100%',
    fontSize: 16,
    borderWidth: 0,
  },
  webInput: {
    // @ts-ignore - Web-specific styles
    outlineStyle: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
  },
  sendButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatInput;
