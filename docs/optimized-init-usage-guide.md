# Optimized Initialization Usage Guide

## Quick Start

The optimized initialization (`--sparc --force`) is the recommended way to set up Claude-Flow for maximum performance and productivity.

```bash
# ⭐ Recommended setup for new projects
npx -y auggie-flow@latest init --sparc --force
```

## Complete Usage Guide

### 1. Pre-Installation Checklist

Before initializing, ensure your environment is ready:

```bash
# Verify system requirements
node --version    # Should be 16.0.0 or higher
npm --version     # Should be 8.0.0 or higher
git --version     # For version control integration

# Check directory permissions
pwd               # Confirm you're in the right directory
ls -la           # Verify write permissions
```

### 2. Initialization Commands

#### Recommended Optimized Setup
```bash
# For new projects (recommended)
npx -y auggie-flow@latest init --sparc --force

# For existing projects with customizations
# (Backup first)
cp CLAUDE.md CLAUDE.md.backup 2>/dev/null || true
npx auggie-flow@latest init --sparc --force
```

#### Alternative Setups
```bash
# Standard SPARC (without optimizations)
npx auggie-flow@latest init --sparc

# Minimal setup (basic features only)
npx auggie-flow@latest init --minimal

# Preview what will be created (dry run)
npx auggie-flow@latest init --sparc --force --dry-run
```

### 3. Post-Installation Verification

After initialization, verify everything is working:

```bash
# Test local executable
./auggie-flow --version

# Check SPARC modes are available
./auggie-flow sparc modes

# Verify memory system
./auggie-flow memory stats

# Test a simple SPARC command
./auggie-flow sparc "create a hello world function"

# Check system status
./auggie-flow status
```

### 4. Understanding What Gets Created

#### Directory Structure
```
your-project/
├── CLAUDE.md                 # AI-readable project instructions (optimized)
├── memory-bank.md           # Memory system documentation
├── coordination.md          # Agent coordination guide
├── .roomodes               # SPARC mode definitions (optimized prompts)
├── ./auggie-flow           # Local executable wrapper
├── .claude/
│   ├── commands/           # Auggie Code slash commands
│   │   ├── sparc/         # SPARC-specific commands
│   │   ├── sparc-architect.md
│   │   ├── sparc-code.md
│   │   ├── sparc-tdd.md
│   │   └── ... (20+ commands)
│   └── logs/              # Session logs
├── memory/
│   ├── agents/           # Agent-specific memory
│   ├── sessions/         # Session storage
│   └── auggie-flow-data.json # Persistence database
└── coordination/
    ├── memory_bank/      # Shared memory
    ├── subtasks/         # Task breakdown
    └── orchestration/    # Workflow coordination
```

#### Key Files Explained

**CLAUDE.md (Optimized Version)**
- Enhanced with performance-tuned instructions
- Pre-configured best practices
- Optimized prompt patterns
- Quality gates and success criteria

**.roomodes (Optimized Version)**
- 20+ SPARC development modes
- Streamlined system prompts (20% fewer tokens)
- Mode-specific tool restrictions
- Performance-optimized context windows

**Auggie Code Slash Commands**
- `/sparc` - Main SPARC orchestrator
- `/sparc-architect` - System design mode
- `/sparc-code` - Implementation mode
- `/sparc-tdd` - Test-driven development
- And 15+ more specialized modes

### 5. First Steps After Installation

#### Step 1: Customize for Your Project
```bash
# Edit CLAUDE.md to add project-specific context
echo "

## Project-Specific Context
- Project Type: [web-app/api/mobile/cli/etc]
- Tech Stack: [React, Node.js, PostgreSQL, etc]
- Team Size: [solo/small/large]
- Experience Level: [junior/mixed/senior]
" >> CLAUDE.md

# Configure project settings
./auggie-flow config set project.type "web-app"
./auggie-flow config set team.size 5
./auggie-flow config set team.experience "mixed"
```

#### Step 2: Test Core Functionality
```bash
# Start with a simple task
./auggie-flow sparc "create a simple calculator function with tests"

# Try different modes
./auggie-flow sparc run architect "design user authentication system"
./auggie-flow sparc run tdd "implement user registration"
./auggie-flow sparc run security-review "review authentication code"
```

#### Step 3: Set Up Team Collaboration
```bash
# Initialize shared memory
./auggie-flow memory store "project-start" "Project initialized with optimized Claude-Flow setup"

# Create team guidelines
./auggie-flow sparc run docs-writer "create team development guidelines"

# Set up monitoring
./auggie-flow start --daemon  # Optional: run orchestrator in background
```

### 6. Performance Optimization Tips

#### Monitor Performance
```bash
# Enable performance monitoring
./auggie-flow config set monitoring.enabled true

# Track response times
./auggie-flow monitor --focus performance

# Analyze token usage
./auggie-flow memory query --stats
```

#### Optimize for Your Use Case
```bash
# Web development optimization
./auggie-flow config set focus "frontend,backend,api-design"
./auggie-flow config set testing.coverage 85
./auggie-flow config set security.level "high"

# Mobile development optimization
./auggie-flow config set platform "mobile"
./auggie-flow config set performance.priority "battery-life"

# API development optimization
./auggie-flow config set api.style "RESTful"
./auggie-flow config set documentation.auto true
```

### 7. Advanced Configuration

#### Custom SPARC Modes
Create project-specific modes by editing `.roomodes`:

```json
{
  "database-design": {
    "description": "Database schema and query optimization",
    "systemPrompt": "You are a database architect. Focus on efficient schemas, proper indexing, and optimized queries. Always consider data normalization, performance implications, and scalability.",
    "tools": ["sql-analyzer", "schema-validator"],
    "configuration": {
      "temperature": 0.7,
      "maxTokens": 4000,
      "focusAreas": ["performance", "scalability", "data-integrity"]
    }
  }
}
```

#### Team-Specific Customizations
```bash
# Create team configuration file
cat > team-config.json << 'EOF'
{
  "codingStandards": {
    "maxLineLength": 120,
    "indentation": "2-space",
    "namingConvention": "camelCase",
    "testCoverage": 85
  },
  "workflowPreferences": {
    "commitFrequency": "feature",
    "reviewRequired": true,
    "deploymentStrategy": "continuous"
  },
  "qualityGates": {
    "linting": "strict",
    "typeChecking": "strict",
    "securityScan": "required"
  }
}
EOF

# Apply team configuration
./auggie-flow config import team-config.json
```

### 8. Integration with Development Workflow

#### Git Integration
```bash
# Add Claude-Flow files to git
git add CLAUDE.md .roomodes .claude/ memory-bank.md coordination.md
git commit -m "feat: Add optimized Claude-Flow configuration

🤖 Generated with Claude-Flow v1.0.50
- Optimized SPARC modes for faster AI responses
- 20+ Auggie Code slash commands
- Memory system for persistent context
- Complete development workflow integration"

# Create .gitignore entries
echo "
# Claude-Flow
memory/auggie-flow-data.json
.claude/logs/
coordination/memory_bank/*.temp
" >> .gitignore
```

#### CI/CD Integration
```yaml
# .github/workflows/auggie-flow-quality.yml
name: Claude-Flow Quality Check
on: [push, pull_request]

jobs:
  quality-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Claude-Flow
        run: npm install -g auggie-flow
      
      - name: Validate Configuration
        run: |
          ./auggie-flow config validate
          ./auggie-flow sparc modes --validate
      
      - name: Run Quality Gates
        run: |
          ./auggie-flow sparc run security-review "automated security scan"
          ./auggie-flow sparc run code-review "automated code quality check"
```

### 9. Team Onboarding

#### New Team Member Setup
```bash
# Quick onboarding script
#!/bin/bash
echo "🚀 Setting up Claude-Flow for new team member..."

# Clone project
git clone <project-repo>
cd <project-directory>

# Verify Claude-Flow setup
if [ ! -f "./auggie-flow" ]; then
  echo "⚠️  Claude-Flow not initialized. Running setup..."
  npx -y auggie-flow@latest init --sparc --force
fi

# Test functionality
./auggie-flow --version
./auggie-flow sparc modes

# Set up personal configuration
./auggie-flow config set user.name "$(git config user.name)"
./auggie-flow config set user.experience "junior"  # or senior/intermediate

echo "✅ Claude-Flow setup complete!"
echo "Try: ./auggie-flow sparc 'hello world function'"
```

#### Team Training Materials
```bash
# Generate training documentation
./auggie-flow sparc run docs-writer "create Claude-Flow training guide for new developers"

# Create example tasks
./auggie-flow memory store "training-examples" "
1. Basic function: ./auggie-flow sparc 'create utility function'
2. TDD workflow: ./auggie-flow sparc tdd 'user validation'
3. Architecture: ./auggie-flow sparc run architect 'system design'
4. Review process: ./auggie-flow sparc run review 'code quality check'
"
```

### 10. Maintenance and Updates

#### Regular Maintenance
```bash
# Weekly maintenance script
#!/bin/bash
echo "🔧 Claude-Flow weekly maintenance..."

# Update to latest version
npx auggie-flow@latest --version

# Clean up old memory entries
./auggie-flow memory cleanup --days 30

# Backup configuration
./auggie-flow memory export backup-$(date +%Y%m%d).json

# Check system health
./auggie-flow status

echo "✅ Maintenance complete"
```

#### Update Process
```bash
# Before updating
./auggie-flow memory export pre-update-backup.json
cp CLAUDE.md CLAUDE.md.backup
cp .roomodes .roomodes.backup

# Update to latest version
npm uninstall -g auggie-flow
npm install -g auggie-flow@latest

# Reinitialize with latest optimizations
npx auggie-flow@latest init --sparc --force

# Merge customizations from backup
# (Manual review recommended)
```

### 11. Troubleshooting Common Issues

#### Performance Issues
```bash
# Debug slow responses
./auggie-flow config set logging.level debug
./auggie-flow monitor --performance

# Check token usage
./auggie-flow memory stats --verbose

# Optimize prompts
./auggie-flow config set prompts.optimize true
```

#### Configuration Issues
```bash
# Reset to defaults
./auggie-flow config reset

# Validate configuration
./auggie-flow config validate

# Regenerate corrupted files
rm .roomodes CLAUDE.md
npx auggie-flow@latest init --sparc --force
```

### 12. Best Practices Summary

#### Do's
✅ Always use `--sparc --force` for new projects  
✅ Backup before major updates  
✅ Customize for your project type  
✅ Monitor performance regularly  
✅ Train team on optimized workflows  
✅ Use version control for configurations  

#### Don'ts
❌ Don't skip the verification steps  
❌ Don't ignore performance monitoring  
❌ Don't customize without understanding  
❌ Don't update without backing up  
❌ Don't use standard init for new projects  

### 13. Getting Help

#### Built-in Help
```bash
# Command help
./auggie-flow init --help
./auggie-flow sparc --help
./auggie-flow --help

# Mode information
./auggie-flow sparc info architect
./auggie-flow sparc modes --verbose
```

#### Community Resources
- **Documentation**: https://github.com/ruvnet/claude-code-flow/docs
- **Issues**: https://github.com/ruvnet/claude-code-flow/issues
- **Discussions**: https://github.com/ruvnet/claude-code-flow/discussions

#### Success Metrics

Track these metrics to measure optimization success:
- Response time: Target <5s for simple tasks
- Token usage: ~20% reduction vs standard
- Success rate: >85% first-attempt success
- Code quality: >85/100 automated score
- Team satisfaction: >8/10 developer happiness

## Conclusion

The optimized initialization provides a powerful foundation for AI-assisted development. By following this guide, you'll maximize the benefits of Claude-Flow's enhanced performance while maintaining code quality and team productivity.

Remember: The optimization is just the beginning. Customize for your specific needs, monitor performance, and continuously improve your development workflow.