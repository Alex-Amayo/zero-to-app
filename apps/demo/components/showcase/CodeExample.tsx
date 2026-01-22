import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import { StyledText } from 'zero-to-app';

interface CodeExampleProps {
  code: string;
}

export const CodeExample: React.FC<CodeExampleProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (Platform.OS === 'web' && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
      } else {
        // Fallback for native - use a simple alert or toast
        // In a real app, you'd use expo-clipboard or react-native-clipboard
        if (Platform.OS === 'web') {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = code;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.codeContainer}>
        <StyledText style={styles.codeText} fontSize="sm">
          {code}
        </StyledText>
      </View>
      <Pressable onPress={handleCopy} style={styles.copyButton}>
        <StyledText fontSize="sm" color="#0a7ea4">
          {copied ? 'Copied!' : 'Copy Code'}
        </StyledText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  codeContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  codeText: {
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      web: 'monospace',
    }),
    color: '#333',
  },
  copyButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
