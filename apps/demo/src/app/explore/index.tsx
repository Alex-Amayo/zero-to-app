import { Screen, Typography, NativeHeader, useSidebar, useTheme } from 'zero-to-app';
import { View } from 'react-native';
import { CodeBlock } from '../../components/code-block';
import { DocsPagination } from '../../components/docs-pagination';

export default function GettingStartedPage() {
  const { open } = useSidebar();
  const { spacing } = useTheme();

  return (
    <>
      <NativeHeader rightIcon="sidebar.left" onRightPress={open} />
      <Screen scrollable variant="background" edges={['bottom']}>
        <View style={{ paddingHorizontal: spacing.xxl, gap: spacing.xxl }}>
          <View style={{ gap: spacing.xs }}>
            <Typography variant="headlineMedium" weight="bold">
              Getting Started
            </Typography>
            <Typography variant="bodyMedium" muted>
              Add Zero To App to your Expo project in two steps.
            </Typography>
          </View>

          <View style={{ gap: spacing.md }}>
            <Typography variant="titleLarge" weight="bold">
              Installation
            </Typography>
            <Typography variant="bodyMedium" muted>
              Install the package using Expo&apos;s install command to ensure SDK version compatibility.
            </Typography>
            <CodeBlock code="npx expo install zero-to-app" />
          </View>

          <View style={{ gap: spacing.md }}>
            <Typography variant="titleLarge" weight="bold">
              Usage
            </Typography>
            <Typography variant="bodyMedium" muted>
              Wrap your root layout with the <Typography variant="bodyMedium" style={{ fontFamily: 'monospace' }}>ZeroToApp</Typography> provider. This sets up theming, spacing, and context for all components.
            </Typography>
            <CodeBlock
              multiline
              code={"import { ZeroToApp } from 'zero-to-app';\n\nexport default function RootLayout() {\n  return (\n    <ZeroToApp>\n      <Stack />\n    </ZeroToApp>\n  );\n}"}
            />
          </View>
          <DocsPagination />
        </View>
      </Screen>
    </>
  );
}
