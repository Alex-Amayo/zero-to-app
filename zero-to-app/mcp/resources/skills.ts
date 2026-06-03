import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
// All files bundled into dist/mcp/server.mjs — skills are copied to dist/mcp/skills/ at build time
const skillsDir = join(__dirname, 'skills');

const skills: Array<{ name: string; uri: string; file: string; description: string }> = [
  { name: 'Setup', uri: 'zero-to-app://setup', file: 'zero-to-app-setup.md', description: 'Installation, provider setup, and peer dependencies.' },
  { name: 'Components', uri: 'zero-to-app://components', file: 'zero-to-app-components.md', description: 'Component reference table with categories and props overview.' },
  { name: 'Theme', uri: 'zero-to-app://theme', file: 'zero-to-app-theme.md', description: 'Theme system, useTheme hook, semantic tokens, and responsive patterns.' },
  { name: 'Navigation', uri: 'zero-to-app://navigation', file: 'zero-to-app-navigation.md', description: 'Navigation patterns: flat tabs, tabs with sidebar, tabs with nested stacks.' },
  { name: 'Dev', uri: 'zero-to-app://dev', file: 'zero-to-app-dev.md', description: 'Development commands, repo structure, and key files.' },
  { name: 'Contributing', uri: 'zero-to-app://contributing', file: 'zero-to-app-contributing.md', description: 'Checklist for adding new components to zero-to-app.' },
  { name: 'MCP', uri: 'zero-to-app://mcp', file: 'zero-to-app-mcp.md', description: 'How to use the zero-to-app MCP server tools effectively.' },
];

export function registerResources(server: McpServer): void {
  for (const skill of skills) {
    server.resource(
      `zero-to-app-${skill.name.toLowerCase()}`,
      skill.uri,
      { description: skill.description, mimeType: 'text/markdown' },
      async () => {
        try {
          const text = readFileSync(join(skillsDir, skill.file), 'utf-8');
          return { contents: [{ uri: skill.uri, text, mimeType: 'text/markdown' }] };
        } catch {
          return { contents: [{ uri: skill.uri, text: `Skill file not found: ${skill.file}`, mimeType: 'text/plain' }] };
        }
      },
    );
  }
}
