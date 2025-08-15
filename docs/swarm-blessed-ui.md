# Auggie Flow Swarm Mode - Blessed UI Implementation

## Overview

The blessed UI implementation provides a terminal-based user interface for the Auggie Flow Swarm Mode that solves the "Raw mode is not supported" error by using `node-pty` to spawn Claude in pseudo-terminals. This approach works from the console without requiring VS Code integration.

## Features

- **Multi-pane terminal UI** - Split view showing orchestrator and agents
- **Pseudo-terminal support** - Uses node-pty to avoid TTY issues
- **Real-time monitoring** - Live updates of swarm activity
- **Interactive controls** - Tab to switch panes, q to quit
- **System logging** - Dedicated log pane for system messages

## Installation

The UI automatically installs its dependencies when first run:
- `blessed` - Terminal UI framework
- `node-pty` - Pseudo-terminal support

## Usage

### Basic Usage
```bash
# Using the UI wrapper (automatically adds --ui flag)
./bin/auggie-flow-swarm-ui "Your objective here"

# Or directly with the enhanced demo
./swarm-demo-enhanced.ts "Your objective here" --ui

# With options
./swarm-demo-enhanced.ts "Build a REST API" --ui --strategy development --max-agents 3
```

### UI Layout

```
┌─────────────────────────────────────────────────────────────┐
│            🐝 Claude Swarm Orchestrator                     │
│            Objective: Build a REST API                      │
├─────────────────────┬───────────────────────────────────────┤
│ Master Orchestrator │ Agents                                │
│                     ├─────────────────────────────────────  │
│ [Claude output      │ Developer - agent-123                 │
│  appears here]      │ Task: Implementing REST endpoints     │
│                     ├─────────────────────────────────────  │
│                     │ Researcher - agent-456                │
│                     │ Task: Finding best practices          │
│                     └─────────────────────────────────────  │
├─────────────────────────────────────────────────────────────┤
│ System Log                                                  │
│ [10:23:45] Swarm initialized successfully                   │
│ [10:23:46] Spawning master orchestrator...                  │
└─────────────────────────────────────────────────────────────┘
│     Press q to quit | Tab to switch panes | Ctrl+C to stop │
└─────────────────────────────────────────────────────────────┘
```

### Controls

- **q** or **Ctrl+C** - Quit the application
- **Tab** - Switch focus between panes
- **Mouse** - Click to focus and scroll in panes
- **Arrow keys** - Scroll in focused pane

## How It Works

1. **Pseudo-Terminal Creation**: Each Claude instance runs in a pseudo-terminal created by `node-pty`, which provides full TTY support.

2. **Agent Detection**: The UI monitors the orchestrator's output for agent spawn commands and creates new panes automatically.

3. **Real-time Updates**: All output is streamed in real-time to the respective panes.

4. **Process Management**: The UI manages all spawned processes and ensures clean shutdown.

## Architecture

```
swarm-demo-enhanced.ts
    │
    ├── Detects --ui flag
    ├── Writes prompt to temp file
    ├── Installs npm dependencies
    └── Spawns node process
            │
            └── swarm-blessed-ui.js
                    │
                    ├── Creates blessed UI
                    ├── Spawns orchestrator with node-pty
                    ├── Monitors for agent spawns
                    └── Manages agent pseudo-terminals
```

## Implementation Details

### Key Components

1. **swarm-demo-enhanced.ts**
   - Enhanced version of swarm-demo.ts
   - Adds `--ui` flag support
   - Handles dependency installation
   - Launches the Node.js UI script

2. **scripts/swarm-blessed-ui.js**
   - Node.js script using blessed and node-pty
   - Creates the terminal UI
   - Manages pseudo-terminal processes
   - Handles agent spawn detection

3. **bin/auggie-flow-swarm-ui**
   - Convenience wrapper that automatically adds --ui flag
   - Makes it easier to use the UI mode

### Pseudo-Terminal Configuration

```javascript
const orchestratorPty = pty.spawn('claude', [
  orchestrationPrompt,
  '--allowedTools', buildTools(),
  // ... other args
], {
  name: 'xterm-color',
  cols: paneWidth - 2,
  rows: paneHeight - 2,
  cwd: process.cwd(),
  env: { /* swarm environment */ }
});
```

### Agent Spawn Detection

The UI monitors the orchestrator output for patterns like:
```
auggie-flow agent spawn <type> --name "<name>" --task "<task>"
```

When detected, it creates a new agent pane in the UI.

## Advantages Over Direct Terminal Spawning

1. **No TTY errors** - Pseudo-terminals provide full TTY support
2. **Better visibility** - All agents visible in one window
3. **Easier monitoring** - System log shows all activity
4. **Cross-platform** - Works on macOS, Linux, and Windows
5. **No VS Code dependency** - Works from any terminal

## Limitations

1. **Simulated agents** - Currently shows placeholder output for agents (full multi-agent spawning requires MCP integration)
2. **Node.js dependency** - Requires Node.js for the UI
3. **Terminal size** - Limited by terminal dimensions

## Future Enhancements

1. **Real agent spawning** - When MCP tools are available
2. **Agent communication visualization** - Show message passing
3. **Task progress tracking** - Visual progress bars
4. **Export functionality** - Save swarm execution logs
5. **Configuration UI** - Interactive swarm configuration

## Troubleshooting

### "Cannot find module 'blessed'"
The UI automatically installs dependencies. If this fails:
```bash
cd /tmp/swarm-ui-temp-dir
npm install blessed node-pty
```

### UI doesn't start
Check that Node.js is installed:
```bash
node --version
```

### Claude not found
Ensure Claude CLI is in your PATH:
```bash
which claude
```

### Terminal too small
The UI requires at least 80x24 terminal size. Resize your terminal window.

## Example Workflows

### Research Task
```bash
./bin/auggie-flow-swarm-ui "Research best practices for microservices" \
  --strategy research \
  --research \
  --max-agents 4
```

### Development Task
```bash
./bin/auggie-flow-swarm-ui "Build a user authentication system" \
  --strategy development \
  --parallel \
  --review
```

### Analysis Task
```bash
./bin/auggie-flow-swarm-ui "Analyze this codebase for performance issues" \
  --strategy analysis \
  --coordinator
```