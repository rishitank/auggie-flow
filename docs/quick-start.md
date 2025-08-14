# Quick Start Guide

Get up and running with Claude-Flow in just a few minutes! This guide will walk you through installation, basic configuration, and your first agent orchestration.

## Prerequisites

- **Node.js 18+** or **Deno 1.40+**
- **Terminal access** (Command Prompt, PowerShell, Terminal, etc.)
- **Internet connection** for package installation

## Installation

### Option 1: NPX (Recommended for Quick Start)

Run Claude-Flow instantly without installation:

```bash
npx auggie-flow
```

This will download and run the latest version, perfect for trying out the system.

### Option 2: Global Installation

Install globally for permanent access:

```bash
npm install -g auggie-flow
```

Verify installation:

```bash
auggie-flow --version
```

### Option 3: Deno Installation

For Deno users:

```bash
deno install --allow-all --name auggie-flow https://raw.githubusercontent.com/ruvnet/claude-code-flow/main/src/cli/index.ts
```

## First Run

### 1. Initialize Configuration

Create your first configuration file:

```bash
auggie-flow config init
```

This creates a `auggie-flow.config.json` file in your current directory with sensible defaults:

```json
{
  "orchestrator": {
    "maxConcurrentAgents": 5,
    "taskQueueSize": 50,
    "healthCheckInterval": 30000
  },
  "memory": {
    "backend": "sqlite",
    "cacheSizeMB": 100,
    "conflictResolution": "crdt"
  },
  "terminal": {
    "type": "auto",
    "poolSize": 3,
    "commandTimeout": 300000
  }
}
```

### 2. Start the Orchestrator

Launch the Claude-Flow system:

```bash
auggie-flow start
```

You should see output like:

```
🧠 Claude-Flow v1.0.0 - Advanced AI Agent Orchestration System

✅ Configuration loaded: ./auggie-flow.config.json
✅ Memory system initialized (SQLite backend)
✅ Terminal pool created (3 terminals)
✅ MCP server started on stdio transport
✅ Orchestrator ready - Listening for commands

Press Ctrl+C to stop
```

### 3. Open a New Terminal

Keep the orchestrator running and open a new terminal window for commands.

## Your First Agent

### Spawn a Research Agent

Create your first AI agent:

```bash
auggie-flow agent spawn researcher --name "Research Assistant" --description "Helps with research tasks"
```

Expected output:

```
✅ Agent spawned successfully
Agent ID: agent_1704123456789_researcher
Name: Research Assistant
Type: researcher
Status: active
Terminal: terminal_1
```

### List Active Agents

See all your agents:

```bash
auggie-flow agent list
```

Output:

```
┌──────────────────────────────────┬─────────────────────┬────────────┬──────────┬─────────────┐
│ Agent ID                         │ Name                │ Type       │ Status   │ Terminal    │
├──────────────────────────────────┼─────────────────────┼────────────┼──────────┼─────────────┤
│ agent_1704123456789_researcher   │ Research Assistant  │ researcher │ active   │ terminal_1  │
└──────────────────────────────────┴─────────────────────┴────────────┴──────────┴─────────────┘
```

## Your First Task

### Create a Research Task

Assign work to your agent:

```bash
auggie-flow task create research "Research the latest developments in large language models in 2024" --assign-to agent_1704123456789_researcher
```

Output:

```
✅ Task created successfully
Task ID: task_1704123456790_research
Type: research
Description: Research the latest developments in large language models in 2024
Status: pending
Assigned to: agent_1704123456789_researcher
Priority: normal
```

### Monitor Task Progress

Check task status:

```bash
auggie-flow task status task_1704123456790_research
```

Watch live updates:

```bash
auggie-flow task status task_1704123456790_research --watch
```

### View Task Results

Once completed, view the results:

```bash
auggie-flow task list --status completed
```

## Interactive Mode (REPL)

For an interactive experience, use the REPL mode:

```bash
auggie-flow repl
```

This opens an interactive prompt where you can run commands without prefixing `auggie-flow`:

```
🧠 Claude-Flow REPL v1.0.0
Type 'help' for available commands or 'exit' to quit.

auggie-flow> agent list
auggie-flow> task create analysis "Analyze the research findings"
auggie-flow> memory query --category research
auggie-flow> exit
```

## Working with Memory

### Query Agent Memory

View what your agents have learned:

```bash
auggie-flow memory query --category research --limit 5
```

### Export Memory

Save agent memories for backup or sharing:

```bash
auggie-flow memory export research-backup.json --category research
```

### View Memory Statistics

See memory usage and statistics:

```bash
auggie-flow memory stats
```

Output:

```
📊 Memory Statistics

Total Items: 15
Categories:
  - research: 8 items
  - analysis: 4 items
  - task: 3 items

Storage:
  - Backend: SQLite
  - Size: 2.3 MB
  - Cache Hit Rate: 87.5%
  - Last Sync: 2 minutes ago
```

## Example Workflow

Here's a complete workflow to demonstrate Claude-Flow's capabilities:

### 1. Multi-Agent Setup

```bash
# Spawn different types of agents
auggie-flow agent spawn researcher --name "Data Researcher"
auggie-flow agent spawn analyst --name "Data Analyst" 
auggie-flow agent spawn coordinator --name "Project Manager"
```

### 2. Create Workflow File

Create `research-workflow.json`:

```json
{
  "name": "AI Research Workflow",
  "description": "Comprehensive AI research and analysis",
  "tasks": [
    {
      "id": "research-phase",
      "type": "research",
      "description": "Research current AI trends and breakthrough technologies",
      "assignTo": "researcher",
      "priority": "high",
      "timeout": 600000
    },
    {
      "id": "analysis-phase",
      "type": "analysis", 
      "description": "Analyze research findings and identify key patterns",
      "dependencies": ["research-phase"],
      "assignTo": "analyst",
      "priority": "high"
    },
    {
      "id": "report-phase",
      "type": "report",
      "description": "Create comprehensive report with recommendations",
      "dependencies": ["analysis-phase"],
      "assignTo": "coordinator",
      "priority": "normal"
    }
  ]
}
```

### 3. Execute Workflow

```bash
auggie-flow workflow execute research-workflow.json
```

### 4. Monitor Progress

```bash
auggie-flow workflow status research-workflow --watch
```

## Next Steps

Now that you have Claude-Flow running, explore these advanced features:

### 🔧 Configuration
- [Configuration Guide](./configuration.md) - Customize Claude-Flow behavior
- [Memory System](./memory-system.md) - Advanced memory management
- [Terminal Integration](./terminal-integration.md) - Terminal customization

### 🤖 Agent Management  
- [Agent Management](./agent-management.md) - Advanced agent features
- [Task Orchestration](./task-orchestration.md) - Complex workflows
- [Examples](./examples/) - Real-world scenarios

### 🚀 Advanced Features
- [MCP Integration](./mcp-integration.md) - Tool integration
- [API Reference](./api/) - Programmatic usage
- [Deployment Guide](./deployment/) - Production setup

## Common Commands Reference

Here are the most frequently used commands:

```bash
# System Management
auggie-flow start                    # Start orchestrator
auggie-flow status                   # System status
auggie-flow config show             # View configuration

# Agent Management
auggie-flow agent spawn <type>       # Create agent
auggie-flow agent list               # List agents
auggie-flow agent terminate <id>     # Stop agent

# Task Management
auggie-flow task create <type> <desc> # Create task
auggie-flow task list                # List tasks
auggie-flow task status <id>         # Task status

# Memory Management
auggie-flow memory query             # Query memory
auggie-flow memory stats             # Memory statistics
auggie-flow memory export <file>     # Export data

# Interactive Mode
auggie-flow repl                     # Start REPL mode
```

## Getting Help

If you encounter any issues:

1. **Check the logs**: Add `--verbose` to any command for detailed output
2. **Validate configuration**: Run `auggie-flow config validate`
3. **System status**: Run `auggie-flow status` to check system health
4. **Documentation**: Visit the [Troubleshooting Guide](./troubleshooting.md)
5. **Community**: Ask questions in [GitHub Discussions](https://github.com/ruvnet/claude-code-flow/discussions)

## What's Next?

You're now ready to explore Claude-Flow's full capabilities! Consider:

- Setting up [custom agent types](./agent-management.md#custom-agents)
- Creating [complex workflows](./task-orchestration.md#workflow-templates)
- Integrating with [external tools](./mcp-integration.md)
- Deploying to [production environments](./deployment/)

Happy orchestrating! 🚀