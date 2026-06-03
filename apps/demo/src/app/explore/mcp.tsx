import { Typography } from 'zero-to-app';
import { View } from 'react-native';
import { CodeBlock } from '../../components/code-block';
import { DocsPagination } from '../../components/docs-pagination';
import { DocsPage } from '../../components/docs-page';

const CLAUDE_CODE_CONFIG = `{
  "mcpServers": {
    "zero-to-app": {
      "command": "npx",
      "args": ["zero-to-app", "mcp"]
    }
  }
}`;

const LOCAL_CONFIG = `{
  "mcpServers": {
    "zero-to-app": {
      "command": "node",
      "args": ["./node_modules/zero-to-app/dist/mcp/server.mjs"]
    }
  }
}`;

const CLAUDE_DESKTOP_CONFIG = `{
  "mcpServers": {
    "zero-to-app": {
      "command": "npx",
      "args": ["zero-to-app", "mcp"]
    }
  }
}`;

export default function McpPage() {
  return (
    <DocsPage
      title="MCP Server"
      description="Give Claude live access to component props, theme tokens, and code generation — no docs tab required."
    >
          <View style={{ gap: 12 }}>
            <Typography variant="titleLarge" weight="bold">
              What it does
            </Typography>
            <Typography variant="bodyMedium" muted>
              The zero-to-app MCP server runs locally alongside Claude Code or Claude Desktop. When you ask Claude to build a screen or generate a brand config, it calls the server mid-conversation to get accurate props, real token names, and working code snippets — rather than guessing from training data.
            </Typography>
          </View>

          <View style={{ gap: 12 }}>
            <Typography variant="titleLarge" weight="bold">
              Claude Code setup
            </Typography>
            <Typography variant="bodyMedium" muted>
              Add to your project&apos;s <Typography variant="bodyMedium" style={{ fontFamily: 'monospace' }}>.mcp.json</Typography> file. Works via npx with no extra install:
            </Typography>
            <CodeBlock variant="code" filename=".mcp.json" language="json" code={CLAUDE_CODE_CONFIG} />
            <Typography variant="bodyMedium" muted>
              Or if zero-to-app is already installed in the project:
            </Typography>
            <CodeBlock variant="code" filename=".mcp.json" language="json" code={LOCAL_CONFIG} />
          </View>

          <View style={{ gap: 12 }}>
            <Typography variant="titleLarge" weight="bold">
              Claude Desktop setup
            </Typography>
            <Typography variant="bodyMedium" muted>
              Add the same config to your Claude Desktop settings under MCP Servers:
            </Typography>
            <CodeBlock variant="code" filename="claude_desktop_config.json" language="json" code={CLAUDE_DESKTOP_CONFIG} />
          </View>

          <View style={{ gap: 12 }}>
            <Typography variant="titleLarge" weight="bold">
              Available tools
            </Typography>
            <Typography variant="bodyMedium" muted>
              Claude calls these automatically — you never need to name a tool yourself.
            </Typography>

            {[
              { name: 'list_components', desc: 'Browse all 28 components grouped by category (layout, controls, navigation, etc.).' },
              { name: 'get_component', desc: 'Get real props, variants, defaults, and usage examples for any component by name.' },
              { name: 'search_components', desc: 'Find the right component from a description — "expandable section", "toggle", "image with fallback".' },
              { name: 'get_theme_tokens', desc: 'Look up semantic token names for any component or the full token tree.' },
              { name: 'generate_palette', desc: 'Generate a complete 30-role M3 color palette from a hex seed color.' },
              { name: 'generate_brand_config', desc: 'Output a complete createBrand() configuration from a name and primary color.' },
              { name: 'generate_navigation', desc: 'Scaffold flat tabs, tabs + sidebar, or tabs + nested stack — wired to expo-router.' },
            ].map((tool) => (
              <View key={tool.name} style={{ gap: 6 }}>
                <Typography variant="labelLarge" style={{ fontFamily: 'monospace' }}>
                  {tool.name}
                </Typography>
                <Typography variant="bodyMedium" muted>
                  {tool.desc}
                </Typography>
              </View>
            ))}
          </View>

          <View style={{ gap: 12 }}>
            <Typography variant="titleLarge" weight="bold">
              Resources
            </Typography>
            <Typography variant="bodyMedium" muted>
              The six zero-to-app skill docs are also exposed as MCP resources — Claude reads them automatically when relevant context is needed.
            </Typography>
            {[
              'zero-to-app://setup',
              'zero-to-app://components',
              'zero-to-app://theme',
              'zero-to-app://navigation',
              'zero-to-app://dev',
              'zero-to-app://mcp',
            ].map((uri) => (
              <Typography key={uri} variant="bodyMedium" style={{ fontFamily: 'monospace' }}>
                {uri}
              </Typography>
            ))}
          </View>

      <DocsPagination />
    </DocsPage>
  );
}
