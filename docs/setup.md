# 🚀 Auggie Flow v2.0.0 Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Installation Methods](#installation-methods)
4. [Initial Configuration](#initial-configuration)
5. [Environment Setup](#environment-setup)
6. [Verification](#verification)
7. [Advanced Setup](#advanced-setup)
8. [Troubleshooting](#troubleshooting)

## ✅ Prerequisites

### System Requirements
- **Node.js**: v20.0.0 or higher (v22 recommended)
- **NPM**: v10.0.0 or higher
- **Operating System**: Windows 10+, macOS 11+, or Linux
- **Memory**: 4GB RAM minimum (8GB recommended)
- **Disk Space**: 500MB free space

### Check Prerequisites
```bash
# Check Node.js version
node --version  # Should be v20.0.0 or higher

# Check NPM version
npm --version  # Should be v10.0.0 or higher

# Check available disk space
df -h .  # Linux/macOS
# or use File Explorer on Windows
```

## 🚀 Quick Start

The fastest way to get started with Auggie Flow v2.0.0:

```bash
# One-command setup with full enterprise features
npx auggie-flow@2.0.0 init --sparc

# Start orchestration immediately
./auggie-flow start --ui --port 3000
```

This creates a complete enterprise environment with:
- ✅ Local `./auggie-flow` wrapper script
- ✅ `.claude/` configuration directory
- ✅ `CLAUDE.md` with ruv-swarm integration docs
- ✅ 27 MCP tools for swarm intelligence
- ✅ Docker support files
- ✅ GitHub workflow automation

## 📦 Installation Methods

### Method 1: NPX Quick Start (Recommended)
```bash
# Initialize with enterprise features and ruv-swarm
npx auggie-flow@2.0.0 init --sparc

# Or minimal setup
npx auggie-flow@2.0.0 init --minimal

# With Docker support
npx auggie-flow@2.0.0 init --docker
```

### Method 2: Global Installation
```bash
# Install globally
npm install -g auggie-flow@2.0.0

# Verify installation
auggie-flow --version

# Initialize in any directory
auggie-flow init --sparc
```

### Method 3: Project Installation
```bash
# Add to existing project
npm install auggie-flow@2.0.0 --save-dev

# Add to package.json scripts
npm pkg set scripts.flow="auggie-flow"
npm pkg set scripts.flow:start="auggie-flow start --ui"
npm pkg set scripts.flow:swarm="auggie-flow swarm"

# Initialize
npx auggie-flow init --sparc
```

### Method 4: Docker Installation
```bash
# Pull official image
docker pull ruvnet/auggie-flow:2.0.0

# Run with volume mapping
docker run -it -v $(pwd):/app -p 3000:3000 ruvnet/auggie-flow:2.0.0 init --sparc
```

## ⚙️ Initial Configuration

### 1. Run Initialization
```bash
./auggie-flow init --sparc
```

You'll be prompted for:
- **Project name**: Your project identifier
- **MCP integration**: Enable Model Context Protocol (recommended: Yes)
- **GitHub integration**: Enable workflow automation (recommended: Yes)
- **Docker support**: Add Docker configuration (optional)
- **Memory persistence**: Enable cross-session memory (recommended: Yes)

### 2. Configuration Structure
After initialization, your project will have:
```
your-project/
├── auggie-flow          # Executable wrapper script
├── .claude/             # Configuration directory
│   ├── config.json      # Main configuration
│   ├── settings.json    # User preferences
│   ├── commands/        # Custom commands
│   └── templates/       # Project templates
├── CLAUDE.md           # Integration documentation
├── memory/             # Persistent memory storage
└── logs/               # System logs
```

### 3. Customize Configuration
Edit `.claude/config.json`:
```json
{
  "version": "2.0.0",
  "features": {
    "mcp": true,
    "swarm": true,
    "github": true,
    "docker": false,
    "monitoring": true
  },
  "ui": {
    "port": 3000,
    "theme": "dark",
    "autoOpen": true
  },
  "swarm": {
    "defaultTopology": "hierarchical",
    "maxAgents": 8,
    "parallelExecution": true
  }
}
```

## 🌍 Environment Setup

### 1. Environment Variables
Create `.env` file:
```bash
# Auggie Flow Configuration
CLAUDE_FLOW_PORT=3000
CLAUDE_FLOW_UI_THEME=dark
CLAUDE_FLOW_LOG_LEVEL=info

# MCP Configuration
MCP_SERVER_PORT=3001
MCP_TIMEOUT=30000

# Swarm Configuration
SWARM_MAX_AGENTS=8
SWARM_DEFAULT_TOPOLOGY=hierarchical
SWARM_PARALLEL_EXECUTION=true

# Memory Configuration
MEMORY_PERSISTENCE=true
MEMORY_BACKUP_INTERVAL=3600000

# Optional: API Keys
GITHUB_TOKEN=your_github_token
OPENAI_API_KEY=your_openai_key
```

### 2. Shell Configuration

#### Bash/Zsh
Add to `~/.bashrc` or `~/.zshrc`:
```bash
# Auggie Flow aliases
alias cf="./auggie-flow"
alias cfs="./auggie-flow start --ui"
alias cfswarm="./auggie-flow swarm"
alias cfsparc="./auggie-flow sparc"

# Add current directory to PATH for auggie-flow
export PATH="$PATH:."
```

#### PowerShell (Windows)
Add to PowerShell profile:
```powershell
# Auggie Flow aliases
Set-Alias cf ".\auggie-flow"
Set-Alias cfs ".\auggie-flow start --ui"
Set-Alias cfswarm ".\auggie-flow swarm"
Set-Alias cfsparc ".\auggie-flow sparc"
```

### 3. IDE Configuration

#### VS Code
Create `.vscode/settings.json`:
```json
{
  "auggie-flow.enable": true,
  "auggie-flow.ui.port": 3000,
  "auggie-flow.swarm.autoStart": true,
  "terminal.integrated.env.linux": {
    "CLAUDE_FLOW_CONFIG": "${workspaceFolder}/.claude"
  }
}
```

## ✅ Verification

### 1. Check Installation
```bash
# Verify version
./auggie-flow --version
# Expected: auggie-flow/2.0.0 darwin-arm64 node-v22.11.0

# Check system status
./auggie-flow status
# Should show all components as "Ready"
```

### 2. Test Core Features
```bash
# Start UI
./auggie-flow start --ui
# Visit http://localhost:3000

# Spawn test agent
./auggie-flow agent spawn researcher --name "TestBot"

# Run simple SPARC command
./auggie-flow sparc run code "create hello world function"
```

### 3. Verify MCP Integration
```bash
# Check MCP server
./auggie-flow mcp status

# List available tools
./auggie-flow mcp tools

# Should show 27+ tools including:
# - swarm_init
# - agent_spawn
# - task_orchestrate
# - memory_usage
# - neural_train
```

### 4. Test Swarm Features
```bash
# Initialize swarm
./auggie-flow swarm init --topology mesh --max-agents 3

# Run test swarm
./auggie-flow swarm "analyze this codebase" --monitor
```

## 🔧 Advanced Setup

### 1. Custom Command Directory
```bash
# Create custom commands
mkdir -p .claude/commands

# Add custom command
cat > .claude/commands/my-workflow.js << 'EOF'
module.exports = {
  name: 'my-workflow',
  description: 'Custom development workflow',
  action: async (args) => {
    console.log('Running custom workflow...');
    // Your custom logic here
  }
};
EOF
```

### 2. Memory Bank Configuration
```bash
# Initialize memory with custom settings
./auggie-flow memory init --size 100mb --compression gzip

# Configure auto-backup
./auggie-flow memory config --auto-backup --interval 1h
```

### 3. Performance Optimization
```bash
# Enable performance features
./auggie-flow config set performance.cache true
./auggie-flow config set performance.parallelAgents 8
./auggie-flow config set performance.tokenOptimization true
```

### 4. Security Configuration
```bash
# Set up access control
./auggie-flow security init

# Configure audit logging
./auggie-flow audit config --enable --retention 90d

# Set up API key encryption
./auggie-flow security encrypt-keys
```

### 5. CI/CD Integration

#### GitHub Actions
```yaml
# .github/workflows/auggie-flow.yml
name: Auggie Flow CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npx auggie-flow@2.0.0 init --ci
      - run: ./auggie-flow test
      - run: ./auggie-flow swarm "run tests" --parallel
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Permission Denied
```bash
# Solution: Make wrapper executable
chmod +x auggie-flow

# Or use npm/npx
npx auggie-flow start
```

#### 2. Port Already in Use
```bash
# Change port
./auggie-flow start --ui --port 3001

# Or kill existing process
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000   # Windows
```

#### 3. MCP Connection Failed
```bash
# Check MCP server
./auggie-flow mcp diagnose

# Restart MCP
./auggie-flow mcp restart

# Check logs
tail -f logs/mcp-server.log
```

#### 4. Memory Issues
```bash
# Clear memory cache
./auggie-flow memory clear --cache

# Rebuild memory index
./auggie-flow memory rebuild

# Check memory usage
./auggie-flow memory stats
```

### Diagnostic Commands
```bash
# Full system diagnostic
./auggie-flow diagnose --full

# Component-specific checks
./auggie-flow diagnose --mcp
./auggie-flow diagnose --swarm
./auggie-flow diagnose --memory

# Generate diagnostic report
./auggie-flow diagnose --report > diagnostic-report.txt
```

## 📚 Next Steps

1. **Read the Documentation**
   - [Migration Guide](./MIGRATION_GUIDE.md) - If upgrading from Deno
   - [API Reference](./API_REFERENCE.md) - Complete command list
   - [GitHub Integration](./GITHUB_INTEGRATION.md) - Workflow automation

2. **Try Example Workflows**
   ```bash
   # Development workflow
   ./auggie-flow sparc run architect "design REST API"
   
   # Testing workflow
   ./auggie-flow swarm "comprehensive test suite" --strategy testing
   
   # Deployment workflow
   ./auggie-flow sparc run devops "setup CI/CD pipeline"
   ```

3. **Join the Community**
   - [GitHub Discussions](https://github.com/ruvnet/claude-code-flow/discussions)
   - [Discord Server](https://discord.gg/auggie-flow)
   - [YouTube Tutorials](https://youtube.com/@auggie-flow)

## 🎯 Quick Reference Card

```bash
# Essential Commands
./auggie-flow init --sparc        # Initialize with all features
./auggie-flow start --ui          # Start with web interface
./auggie-flow status              # Check system health
./auggie-flow swarm "task"        # Run multi-agent task
./auggie-flow sparc run code      # SPARC code generation
./auggie-flow agent spawn type    # Create new agent
./auggie-flow memory store/query  # Memory operations
./auggie-flow monitor             # Real-time monitoring

# Keyboard Shortcuts (in UI)
Ctrl/Cmd + K    # Command palette
Ctrl/Cmd + P    # Quick file search
Ctrl/Cmd + T    # New terminal
Ctrl/Cmd + S    # Save current state
```

---

**🎉 Setup Complete! You're ready to use Auggie Flow v2.0.0**

For additional help, run: `./auggie-flow help` or visit our [documentation](https://github.com/ruvnet/claude-code-flow/docs).