import { startMcpServer } from './server.js';
import { runSkillsCommand } from './skills-command.js';

const command = process.argv[2];

switch (command) {
  case 'mcp':
    await startMcpServer();
    break;

  case 'skills':
    runSkillsCommand();
    break;

  default:
    console.log(`zero-to-app CLI\n`);
    console.log('Usage: zero-to-app <command>\n');
    console.log('Commands:');
    console.log('  mcp     Start the MCP server for Claude Code / Claude Desktop');
    console.log('  skills  Install Claude Skills into .claude/skills/\n');
    console.log('Examples:');
    console.log('  npx zero-to-app mcp');
    console.log('  npx zero-to-app skills');
    if (command && command !== '--help' && command !== 'help') {
      console.error(`\nUnknown command: ${command}`);
      process.exit(1);
    }
    break;
}
