// 1. IMPORTS
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
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { IconButton } from '../ui';
import { useBrand } from '../../brand';
import { ThemeContext } from '../../theme';
import type { BaseComponentProps, LoadableComponentProps } from '../shared/types';

// 2. TYPES
const MIN_HEIGHT = 40;
const DEFAULT_MAX_HEIGHT = 120;
const PLACEHOLDER_COLOR = '#999999';

interface WebTextareaStyleInput {
  paddingHorizontal?: number;
  paddingLeft?: number;
  paddingVertical?: number;
  paddingTop?: number;
  fontFamily?: string;
  fontSize?: number;
  lineHeight?: number | string;
  color?: string;
}

interface WebTextareaProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  placeholderTextColor: string;
  style: StyleProp<TextStyle>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  inputHeight: number;
  setInputHeight: (height: number) => void;
  isSingleLine: boolean;
  maxHeight: number;
  isTyping: boolean;
  fontSize: number;
}

export interface ChatInputProps extends BaseComponentProps, LoadableComponentProps {
  onSendMessage: (message: string) => void;
  maxHeight?: number;
}

// 3. INTERNAL COMPONENTS

// Web-specific textarea component for reliable auto-resize
// Uses type assertions for DOM APIs since this code only runs on web platform
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
}: WebTextareaProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textareaRef = useRef<any>(null);

  const adjustHeight = React.useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight as number;
      const clampedHeight = Math.max(MIN_HEIGHT, Math.min(scrollHeight, maxHeight));
      setInputHeight(clampedHeight);
      textarea.style.height = `${clampedHeight}px`;
    }
  }, [maxHeight, setInputHeight]);

  useEffect(() => {
    if (isTyping) {
      const rafId = requestAnimationFrame(() => {
        adjustHeight();
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, [value, adjustHeight, isTyping]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInput = (e: any) => {
    onChangeText(e.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyDown = (e: any) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  // Flatten style array and extract values
  const flattenedStyle: WebTextareaStyleInput = Array.isArray(style)
    ? Object.assign({}, ...style.filter(Boolean))
    : (style as WebTextareaStyleInput) || {};

  const paddingHorizontal = flattenedStyle.paddingHorizontal || flattenedStyle.paddingLeft || 10;
  const paddingVertical = flattenedStyle.paddingVertical || flattenedStyle.paddingTop || 10;
  const textColor = flattenedStyle.color;

  // Set placeholder color via CSS (web-only)
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const textarea = textareaRef.current;
    if (textarea && placeholderTextColor) {
      const styleId = 'chat-input-placeholder-style';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const doc = (globalThis as any).document;
      if (!doc) return;

      let styleElement = doc.getElementById(styleId);
      if (!styleElement) {
        styleElement = doc.createElement('style');
        styleElement.id = styleId;
        doc.head.appendChild(styleElement);
      }
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
      color: textColor || '#000000',
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
      boxSizing: 'border-box' as const,
    },
  });
};

// 4. MAIN COMPONENT
const ChatInput = ({
  loading = false,
  onSendMessage,
  maxHeight = DEFAULT_MAX_HEIGHT,
  style,
  testID,
}: ChatInputProps): React.JSX.Element => {
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
    if (!loading && message.trim()) {
      onSendMessage(message);
      setMessage('');
      setInputHeight(MIN_HEIGHT);
    }
  };

  // Mobile: Enter sends message
  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (Platform.OS !== 'web' && e.nativeEvent.key === 'Enter') {
      handleSubmit();
    }
  };

  // Web: Enter sends message, Shift+Enter creates newline
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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

  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    {
      backgroundColor: theme.values.cardBackgroundColor,
      borderRadius,
      ...(!theme.values.isDark && {
        borderColor: theme.values.borderColor,
        borderWidth: 1,
      }),
    },
    Platform.OS === 'web' && { maxWidth: 1000 },
    style,
  ];

  return (
    <View
      testID={testID}
      style={containerStyle}
      accessibilityRole="none"
      accessibilityLabel="Chat input area"
    >
      <View
        style={[
          styles.inputRow,
          {
            backgroundColor: theme.values.cardBackgroundColor,
            borderRadius,
          },
        ]}
      >
        {/* State 1: Not typing - buttons on same row */}
        {!isTyping && (
          <View style={styles.leftActionButtons}>
            <IconButton
              onPress={() => {}}
              iconName="plus"
              accessibilityLabel="Add attachment"
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
                accessibilityLabel="Message input"
                accessibilityHint="Type your message here"
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
            <IconButton
              onPress={() => {}}
              iconName="mic"
              accessibilityLabel="Voice input"
            />
            <View style={styles.sendButtonWrapper}>
              {loading ? (
                <ActivityIndicator size="small" color={brand.colors.primary} />
              ) : (
                <IconButton
                  onPress={handleSubmit}
                  iconName="send"
                  color="#FFFFFF"
                  backgroundColor={brand.colors.primary}
                  accessibilityLabel="Send message"
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
              iconName="plus"
              accessibilityLabel="Add attachment"
            />
          </View>

          <View style={styles.rightActionButtons}>
            <IconButton
              onPress={() => {}}
              iconName="mic"
              accessibilityLabel="Voice input"
            />
            <View style={styles.sendButtonWrapper}>
              {loading ? (
                <ActivityIndicator size="small" color={brand.colors.primary} />
              ) : (
                <IconButton
                  onPress={handleSubmit}
                  iconName="send"
                  color="#FFFFFF"
                  backgroundColor={brand.colors.primary}
                  accessibilityLabel="Send message"
                />
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

// Static styles - layout structure doesn't depend on theme/brand
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
    gap: 10,
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
    // Web-specific styles handled inline in WebTextarea
  },
  sendButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// 5. EXPORTS
export { ChatInput };
