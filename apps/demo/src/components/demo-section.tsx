import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Typography, useTheme, renderIcon } from 'zero-to-app';
import { Highlight, themes } from 'prism-react-renderer';
import * as Clipboard from 'expo-clipboard';

interface DemoSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  code?: string;
}

type Tab = 'preview' | 'code';

// Dot-grid background — web uses CSS radial-gradient, native falls back to a
// slightly distinct surface so the preview area is still visually framed.
function dotGridStyle(isDark: boolean) {
  if (Platform.OS !== 'web') return {};
  const dot = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.09)';
  return {
    backgroundImage: `radial-gradient(circle, ${dot} 1px, transparent 1px)`,
    backgroundSize: '22px 22px',
  } as any;
}

export function DemoSection({ title, description, children, code }: DemoSectionProps) {
  const theme = useTheme();
  const { spacing, shape, surfaceContainerLow, surfaceContainerHigh, outline, primary, onPrimary, onSurfaceVariant, isDark } = theme;
  const [tab, setTab] = useState<Tab>('preview');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!code) return;
    await Clipboard.setStringAsync(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const borderColor = outline;
  const codeBg = isDark ? '#0d1117' : '#f6f8fa';
  const codeHeaderBg = isDark ? '#161b22' : '#eef0f3';
  const codeBorderColor = isDark ? '#30363d' : '#d0d7de';

  return (
    <View style={{ gap: spacing.sm }}>
      <Typography variant="titleMedium" weight="medium">{title}</Typography>
      {description && (
        <Typography variant="bodySmall" muted>{description}</Typography>
      )}

      <View style={[styles.card, { borderRadius: shape.surfaceBorderRadius, borderColor }]}>
        {/* Pill segment tab bar */}
        {code && (
          <View style={[styles.tabBar, { borderBottomColor: borderColor, backgroundColor: surfaceContainerLow }]}>
            <View style={[styles.segmentTrack, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', borderRadius: 20 }]}>
              {(['preview', 'code'] as Tab[]).map((t) => (
                <Pressable
                  key={t}
                  onPress={() => setTab(t)}
                  style={[
                    styles.segmentPill,
                    { borderRadius: 18 },
                    tab === t && { backgroundColor: primary },
                  ]}
                >
                  <Typography
                    variant="labelSmall"
                    weight={tab === t ? 'medium' : 'regular'}
                    color={tab === t ? onPrimary : onSurfaceVariant}
                  >
                    {t === 'preview' ? 'Preview' : 'Code'}
                  </Typography>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* Preview pane — dot-grid canvas */}
        {(!code || tab === 'preview') && (
          <View
            style={[
              styles.preview,
              { padding: spacing.xl, gap: spacing.lg, backgroundColor: surfaceContainerLow },
              dotGridStyle(isDark),
            ]}
          >
            {children}
          </View>
        )}

        {/* Code pane */}
        {code && tab === 'code' && (
          <View>
            {/* Code pane header with copy button */}
            <View style={[styles.codeHeader, { backgroundColor: codeHeaderBg, borderBottomColor: codeBorderColor }]}>
              <View style={[styles.langBadge, { backgroundColor: isDark ? '#21262d' : '#dce0e5' }]}>
                <Text style={[styles.langText, { color: onSurfaceVariant }]}>tsx</Text>
              </View>
              <Pressable
                onPress={handleCopy}
                style={({ pressed }) => [
                  styles.copyButton,
                  {
                    backgroundColor: pressed ? surfaceContainerHigh : 'transparent',
                    borderRadius: shape.surfaceBorderRadius,
                  },
                ]}
                accessibilityLabel="Copy code"
                accessibilityRole="button"
              >
                {renderIcon(
                  { name: copied ? 'check' : 'copy', library: 'Feather' },
                  'Feather',
                  14,
                  copied ? primary : onSurfaceVariant,
                )}
              </Pressable>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ backgroundColor: codeBg }}
              contentContainerStyle={styles.codeBody}
            >
              <Highlight
                theme={isDark ? themes.vsDark : themes.github}
                code={code.trim()}
                language="tsx"
              >
                {({ tokens, getTokenProps }) => (
                  <View>
                    {tokens.map((line, i) => (
                      <View key={i} style={{ flexDirection: 'row' }}>
                        {line.map((token, key) => {
                          const { style, children } = getTokenProps({ token });
                          return (
                            <Text
                              key={key}
                              style={{
                                color: (style as { color?: string })?.color ?? (isDark ? '#adbac7' : '#24292f'),
                                fontFamily: 'monospace',
                                fontSize: 13,
                                lineHeight: 22,
                              }}
                            >
                              {children as string}
                            </Text>
                          );
                        })}
                      </View>
                    ))}
                  </View>
                )}
              </Highlight>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  segmentTrack: {
    flexDirection: 'row',
    padding: 2,
    gap: 2,
  },
  segmentPill: {
    paddingVertical: 5,
    paddingHorizontal: 14,
  },
  preview: {
    minHeight: 80,
  },
  codeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  langBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
  },
  langText: {
    fontFamily: 'monospace',
    fontSize: 11,
  },
  copyButton: {
    padding: 4,
  },
  codeBody: {
    padding: 16,
  },
});
