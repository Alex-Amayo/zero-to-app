import React, { useState } from 'react';
import { View, Pressable, ScrollView, Text } from 'react-native';
import { Typography, ThemedView, useTheme } from 'zero-to-app';
import { Highlight, themes } from 'prism-react-renderer';

interface DemoSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  code?: string;
}

type Tab = 'preview' | 'code';

export function DemoSection({ title, description, children, code }: DemoSectionProps) {
  const { spacing, shape, surfaceContainerLow, outline, primary, onSurfaceVariant, isDark } = useTheme();
  const [tab, setTab] = useState<Tab>('preview');

  return (
    <View style={{ gap: spacing.sm }}>
      <Typography variant="titleMedium" weight="medium">
        {title}
      </Typography>
      {description && (
        <Typography variant="bodySmall" muted>
          {description}
        </Typography>
      )}

      <View style={{ borderRadius: shape.surfaceBorderRadius, borderWidth: 1, borderColor: outline, overflow: 'hidden' }}>
        {/* Tab bar */}
        {code && (
          <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: outline, backgroundColor: surfaceContainerLow }}>
            {(['preview', 'code'] as Tab[]).map((t) => (
              <Pressable
                key={t}
                onPress={() => setTab(t)}
                style={{
                  paddingVertical: spacing.sm,
                  paddingHorizontal: spacing.lg,
                  borderBottomWidth: 2,
                  borderBottomColor: tab === t ? primary : 'transparent',
                  marginBottom: -1,
                }}
              >
                <Typography
                  variant="labelMedium"
                  weight={tab === t ? 'medium' : 'regular'}
                  color={tab === t ? primary : onSurfaceVariant}
                >
                  {t === 'preview' ? 'Preview' : 'Code'}
                </Typography>
              </Pressable>
            ))}
          </View>
        )}

        {/* Preview pane */}
        {(!code || tab === 'preview') && (
          <ThemedView
            color={surfaceContainerLow}
            style={{ padding: spacing.xl, gap: spacing.lg }}
          >
            {children}
          </ThemedView>
        )}

        {/* Code pane */}
        {code && tab === 'code' && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ backgroundColor: isDark ? '#1e1e1e' : '#f8f8f8' }}
            contentContainerStyle={{ padding: spacing.lg }}
          >
            <Highlight
              theme={isDark ? themes.vsDark : themes.vsLight}
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
                              color: (style as { color?: string })?.color ?? (isDark ? '#d4d4d4' : '#393a34'),
                              fontFamily: 'monospace',
                              fontSize: 12,
                              lineHeight: 20,
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
        )}
      </View>
    </View>
  );
}
