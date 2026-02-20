import { useTheme, ThemedView, Typography, renderIcon } from 'zero-to-app';
import { Pressable, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  multiline?: boolean;
}

export function CodeBlock({ code, multiline = false }: CodeBlockProps) {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ThemedView
      variant="surfaceContainer"
      style={[
        styles.base,
        multiline ? styles.multiline : styles.row,
        { borderRadius: theme.borderRadius.md },
      ]}
    >
      {!multiline && (
        <Typography variant="bodyMedium" color={theme.onSurfaceVariant} style={styles.prompt}>$</Typography>
      )}
      <Typography variant="bodyMedium" style={[styles.code, { color: theme.onSurface }]}>
        {code}
      </Typography>
      <Pressable
        onPress={handleCopy}
        style={({ pressed }) => [
          styles.copyButton,
          { backgroundColor: pressed ? theme.surfaceContainerHigh : 'transparent', borderRadius: theme.borderRadius.sm },
        ]}
        accessibilityLabel="Copy to clipboard"
        accessibilityRole="button"
      >
        {renderIcon(
          { name: copied ? 'check' : 'copy', library: 'Feather' },
          'Feather',
          16,
          copied ? theme.primary : theme.onSurfaceVariant,
        )}
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  base: {
    padding: 16,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  multiline: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  prompt: {
    opacity: 0.4,
    fontFamily: 'monospace',
  },
  code: {
    fontFamily: 'monospace',
    flex: 1,
  },
  copyButton: {
    padding: 4,
  },
});
