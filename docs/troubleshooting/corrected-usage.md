# Auggie Flow v2.0.0 - Correct Command Usage Guide

## ✅ CORRECT COMMAND USAGE

All commands must be prefixed with `auggie-flow`:

### 🧠 Swarm Commands
```bash
# CORRECT:
auggie-flow swarm "Build a REST API with authentication"
auggie-flow swarm "Research cloud patterns" --strategy research
auggie-flow swarm "Optimize performance" --max-agents 3 --parallel

# INCORRECT:
swarm "Build a REST API"  # ❌ Won't work
```

### 🐙 GitHub Commands
```bash
# CORRECT:
auggie-flow github pr-manager "create feature PR with tests"
auggie-flow github gh-coordinator "setup CI/CD pipeline"
auggie-flow github release-manager "prepare v2.0.0 release"

# INCORRECT:
github pr-manager "create PR"  # ❌ Won't work
```

### 🤖 Agent Commands
```bash
# CORRECT:
auggie-flow agent spawn researcher --name "DataBot"
auggie-flow agent list --verbose
auggie-flow agent terminate agent-123

# INCORRECT:
agent spawn researcher  # ❌ Won't work
spawn researcher  # ❌ Won't work
```

### 💾 Memory Commands
```bash
# CORRECT:
auggie-flow memory store architecture "microservices pattern"
auggie-flow memory get architecture
auggie-flow memory query "API design"

# INCORRECT:
memory store key value  # ❌ Won't work
```

### 🚀 SPARC Commands
```bash
# CORRECT:
auggie-flow sparc "design authentication system"
auggie-flow sparc architect "design microservices"
auggie-flow sparc tdd "user registration feature"

# INCORRECT:
sparc architect "design"  # ❌ Won't work
```

### 📋 Other Commands
```bash
# CORRECT:
auggie-flow init --sparc
auggie-flow start --ui --swarm
auggie-flow status --verbose
auggie-flow task create research "Market analysis"
auggie-flow config set terminal.poolSize 15
auggie-flow mcp status
auggie-flow monitor --watch
auggie-flow batch create-config my-batch.json

# INCORRECT:
init --sparc  # ❌ Won't work
start --ui  # ❌ Won't work
status  # ❌ Won't work
```

## 🔍 GET HELP

### Main Help
```bash
auggie-flow --help
auggie-flow help
auggie-flow  # (no arguments also shows help)
```

### Command-Specific Help
```bash
auggie-flow swarm --help
auggie-flow github --help
auggie-flow agent --help
auggie-flow memory --help
auggie-flow sparc --help
auggie-flow init --help
auggie-flow help swarm
auggie-flow help github
# ... etc for any command
```

## 🚀 QUICK START

```bash
# 1. Initialize with SPARC
npx auggie-flow@2.0.0 init --sparc

# 2. Start orchestration
auggie-flow start --ui --swarm

# 3. Deploy a swarm
auggie-flow swarm "Build REST API" --strategy development --parallel

# 4. Use GitHub automation
auggie-flow github pr-manager "coordinate release"

# 5. Check status
auggie-flow status --verbose
```

## 📝 IMPORTANT NOTES

1. **Always prefix with `auggie-flow`** - The commands won't work without it
2. **Use quotes for objectives** - Especially with spaces: `"Build REST API"`
3. **Check help for options** - Each command has specific options
4. **Use --help liberally** - Detailed help is available for every command

## 🎯 INSTALLATION

### Global Installation (Recommended)
```bash
npm install -g auggie-flow@2.0.0
auggie-flow init --sparc
```

### Local Installation
```bash
npm install auggie-flow@2.0.0
npx auggie-flow init --sparc
```

### Direct NPX Usage
```bash
npx auggie-flow@2.0.0 init --sparc
npx auggie-flow@2.0.0 swarm "Build app"
```

---

Remember: All commands require the `auggie-flow` prefix. When in doubt, use `auggie-flow --help` or `auggie-flow <command> --help` for guidance!