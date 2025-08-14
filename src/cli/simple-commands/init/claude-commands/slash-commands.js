// slash-commands.js - Create Auggie Code slash commands

import { createSparcSlashCommand, createMainSparcCommand } from './sparc-commands.js';
import { createClaudeFlowCommands } from './auggie-flow-commands.js';
import { copyTemplates } from '../template-copier.js';
import { promises as fs } from 'fs';
import { join } from 'path';

// Create Auggie Code slash commands for SPARC modes
export async function createClaudeSlashCommands(workingDir) {
  try {
    console.log('\n📝 Creating Auggie Code slash commands...');

    // Use template copier for SPARC slash commands
    const slashCommandOptions = {
      sparc: true,
      force: true,
      dryRun: false,
    };

    // Check if .roomodes exists for dynamic generation
    const roomodesPath = `${workingDir}/.roomodes`;
    try {
      const roomodesContent = await fs.readFile(roomodesPath, 'utf8');
      const roomodes = JSON.parse(roomodesContent);

      // Create slash commands for each SPARC mode
      for (const mode of roomodes.customModes) {
        const commandPath = join(workingDir, '.claude', 'commands', 'sparc', `${mode.slug}.md`);
        const commandContent = createSparcSlashCommand(mode);

        await fs.mkdir(join(workingDir, '.claude', 'commands', 'sparc'), { recursive: true });
        await fs.writeFile(commandPath, commandContent);
        console.log(`  ✓ Created slash command: /sparc-${mode.slug}`);
      }

      // Create main SPARC command
      const mainSparcCommand = createMainSparcCommand(roomodes.customModes);
      await fs.writeFile(join(workingDir, '.claude', 'commands', 'sparc.md'), mainSparcCommand);
      console.log('  ✓ Created main slash command: /sparc');
    } catch (err) {
      // Fallback to template copier if .roomodes doesn't exist
      console.log('  🔄 Using template copier for SPARC commands...');
      const copyResults = await copyTemplates(workingDir, slashCommandOptions);
      
      if (!copyResults.success) {
        console.log(`  ⚠️  Template copier failed: ${copyResults.errors.join(', ')}`);
      }
    }

    // Create auggie-flow specific commands
    await createClaudeFlowCommands(workingDir);
  } catch (err) {
    // Legacy slash command creation - silently skip if it fails
    // SPARC slash commands are already created successfully
  }
}
