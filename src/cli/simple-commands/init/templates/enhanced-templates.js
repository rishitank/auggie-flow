// enhanced-templates.js - Generate Auggie Flow v2.0.0 enhanced templates
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load template files
const loadTemplate = (filename) => {
  try {
    return readFileSync(join(__dirname, filename), 'utf8');
  } catch (error) {
    // Silently fall back to hardcoded templates if files not found
    // This handles npm packaging scenarios where template files may not be included
    return null;
  }
};

export function createEnhancedClaudeMd() {
  const template = loadTemplate('CLAUDE.md');
  if (!template) {
    // Fallback to hardcoded if template file not found
    return createEnhancedClaudeMdFallback();
  }
  return template;
}

export function createEnhancedSettingsJson() {
  const template = loadTemplate('settings.json');
  if (!template) {
    return createEnhancedSettingsJsonFallback();
  }
  return template;
}

export function createWrapperScript(type = 'unix') {
  // For unix, use the universal wrapper that works in both CommonJS and ES modules
  if (type === 'unix') {
    const universalTemplate = loadTemplate('auggie-flow-universal');
    if (universalTemplate) {
      return universalTemplate;
    }
  }

  const filename =
    type === 'unix' ? 'auggie-flow' : type === 'windows' ? 'auggie-flow.bat' : 'auggie-flow.ps1';

  const template = loadTemplate(filename);
  if (!template) {
    return createWrapperScriptFallback(type);
  }
  return template;
}

export function createCommandDoc(category, command) {
  const template = loadTemplate(`commands/${category}/${command}.md`);
  if (!template) {
    // Silently fall back to generated documentation
    return createCommandDocFallback(category, command);
  }
  return template;
}

// Generate command documentation fallbacks
function createCommandDocFallback(category, command) {
  const docs = {
    analysis: {
      'bottleneck-detect': `# bottleneck-detect

Automatically detect performance bottlenecks in your swarm operations.

## Usage
\`\`\`bash
npx auggie-flow analysis bottleneck-detect [options]
\`\`\`

## Options
- \`--swarm-id <id>\` - Target specific swarm
- \`--threshold <ms>\` - Performance threshold (default: 1000ms)
- \`--export <file>\` - Export results to file

## Examples
\`\`\`bash
# Detect bottlenecks in current swarm
npx auggie-flow analysis bottleneck-detect

# Set custom threshold
npx auggie-flow analysis bottleneck-detect --threshold 500

# Export results
npx auggie-flow analysis bottleneck-detect --export bottlenecks.json
\`\`\`
`,
      'token-usage': `# token-usage

Analyze token usage patterns and optimize for efficiency.

## Usage
\`\`\`bash
npx auggie-flow analysis token-usage [options]
\`\`\`

## Options
- \`--period <time>\` - Analysis period (1h, 24h, 7d, 30d)
- \`--by-agent\` - Break down by agent
- \`--by-operation\` - Break down by operation type

## Examples
\`\`\`bash
# Last 24 hours token usage
npx auggie-flow analysis token-usage --period 24h

# By agent breakdown
npx auggie-flow analysis token-usage --by-agent

# Export detailed report
npx auggie-flow analysis token-usage --period 7d --export tokens.csv
\`\`\`
`,
      'performance-report': `# performance-report

Generate comprehensive performance reports for swarm operations.

## Usage
\`\`\`bash
npx auggie-flow analysis performance-report [options]
\`\`\`

## Options
- \`--format <type>\` - Report format (json, html, markdown)
- \`--include-metrics\` - Include detailed metrics
- \`--compare <id>\` - Compare with previous swarm

## Examples
\`\`\`bash
# Generate HTML report
npx auggie-flow analysis performance-report --format html

# Compare swarms
npx auggie-flow analysis performance-report --compare swarm-123

# Full metrics report
npx auggie-flow analysis performance-report --include-metrics --format markdown
\`\`\`
`,
    },
    automation: {
      'auto-agent': `# auto-agent

Automatically assign agents based on task analysis.

## Usage
\`\`\`bash
npx auggie-flow automation auto-agent [options]
\`\`\`

## Options
- \`--task <description>\` - Task to analyze
- \`--max-agents <n>\` - Maximum agents to spawn
- \`--strategy <type>\` - Assignment strategy

## Examples
\`\`\`bash
# Auto-assign for task
npx auggie-flow automation auto-agent --task "Build REST API"

# Limit agents
npx auggie-flow automation auto-agent --task "Fix bugs" --max-agents 3

# Use specific strategy
npx auggie-flow automation auto-agent --strategy specialized
\`\`\`
`,
      'smart-spawn': `# smart-spawn

Intelligently spawn agents based on workload analysis.

## Usage
\`\`\`bash
npx auggie-flow automation smart-spawn [options]
\`\`\`

## Options
- \`--analyze\` - Analyze before spawning
- \`--threshold <n>\` - Spawn threshold
- \`--topology <type>\` - Preferred topology

## Examples
\`\`\`bash
# Smart spawn with analysis
npx auggie-flow automation smart-spawn --analyze

# Set spawn threshold
npx auggie-flow automation smart-spawn --threshold 5

# Force topology
npx auggie-flow automation smart-spawn --topology hierarchical
\`\`\`
`,
      'workflow-select': `# workflow-select

Automatically select optimal workflow based on task type.

## Usage
\`\`\`bash
npx auggie-flow automation workflow-select [options]
\`\`\`

## Options
- \`--task <description>\` - Task description
- \`--constraints <list>\` - Workflow constraints
- \`--preview\` - Preview without executing

## Examples
\`\`\`bash
# Select workflow for task
npx auggie-flow automation workflow-select --task "Deploy to production"

# With constraints
npx auggie-flow automation workflow-select --constraints "no-downtime,rollback"

# Preview mode
npx auggie-flow automation workflow-select --task "Database migration" --preview
\`\`\`
`,
    },
    coordination: {
      'swarm-init': `# swarm-init

Initialize a new agent swarm with specified topology.

## Usage
\`\`\`bash
npx auggie-flow swarm init [options]
\`\`\`

## Options
- \`--topology <type>\` - Swarm topology (mesh, hierarchical, ring, star)
- \`--max-agents <n>\` - Maximum number of agents
- \`--strategy <type>\` - Execution strategy (parallel, sequential, adaptive)

## Examples
\`\`\`bash
# Initialize hierarchical swarm
npx auggie-flow swarm init --topology hierarchical

# With agent limit
npx auggie-flow swarm init --topology mesh --max-agents 8

# Parallel execution
npx auggie-flow swarm init --strategy parallel
\`\`\`
`,
      'agent-spawn': `# agent-spawn

Spawn a new agent in the current swarm.

## Usage
\`\`\`bash
npx auggie-flow agent spawn [options]
\`\`\`

## Options
- \`--type <type>\` - Agent type (coder, researcher, analyst, tester, coordinator)
- \`--name <name>\` - Custom agent name
- \`--skills <list>\` - Specific skills (comma-separated)

## Examples
\`\`\`bash
# Spawn coder agent
npx auggie-flow agent spawn --type coder

# With custom name
npx auggie-flow agent spawn --type researcher --name "API Expert"

# With specific skills
npx auggie-flow agent spawn --type coder --skills "python,fastapi,testing"
\`\`\`
`,
      'task-orchestrate': `# task-orchestrate

Orchestrate complex tasks across the swarm.

## Usage
\`\`\`bash
npx auggie-flow task orchestrate [options]
\`\`\`

## Options
- \`--task <description>\` - Task description
- \`--strategy <type>\` - Orchestration strategy
- \`--priority <level>\` - Task priority (low, medium, high, critical)

## Examples
\`\`\`bash
# Orchestrate development task
npx auggie-flow task orchestrate --task "Implement user authentication"

# High priority task
npx auggie-flow task orchestrate --task "Fix production bug" --priority critical

# With specific strategy
npx auggie-flow task orchestrate --task "Refactor codebase" --strategy parallel
\`\`\`
`,
    },
    github: {
      'github-swarm': `# github-swarm

Create a specialized swarm for GitHub repository management.

## Usage
\`\`\`bash
npx auggie-flow github swarm [options]
\`\`\`

## Options
- \`--repository <owner/repo>\` - Target repository
- \`--agents <n>\` - Number of specialized agents
- \`--focus <area>\` - Focus area (maintenance, features, security)

## Examples
\`\`\`bash
# Create GitHub swarm
npx auggie-flow github swarm --repository myorg/myrepo

# With specific focus
npx auggie-flow github swarm --repository myorg/myrepo --focus security

# Custom agent count
npx auggie-flow github swarm --repository myorg/myrepo --agents 6
\`\`\`
`,
      'repo-analyze': `# repo-analyze

Deep analysis of GitHub repository with AI insights.

## Usage
\`\`\`bash
npx auggie-flow github repo-analyze [options]
\`\`\`

## Options
- \`--repository <owner/repo>\` - Repository to analyze
- \`--deep\` - Enable deep analysis
- \`--include <areas>\` - Include specific areas (issues, prs, code, commits)

## Examples
\`\`\`bash
# Basic analysis
npx auggie-flow github repo-analyze --repository myorg/myrepo

# Deep analysis
npx auggie-flow github repo-analyze --repository myorg/myrepo --deep

# Specific areas
npx auggie-flow github repo-analyze --repository myorg/myrepo --include issues,prs
\`\`\`
`,
      'pr-enhance': `# pr-enhance

AI-powered pull request enhancements.

## Usage
\`\`\`bash
npx auggie-flow github pr-enhance [options]
\`\`\`

## Options
- \`--pr-number <n>\` - Pull request number
- \`--add-tests\` - Add missing tests
- \`--improve-docs\` - Improve documentation
- \`--check-security\` - Security review

## Examples
\`\`\`bash
# Enhance PR
npx auggie-flow github pr-enhance --pr-number 123

# Add tests
npx auggie-flow github pr-enhance --pr-number 123 --add-tests

# Full enhancement
npx auggie-flow github pr-enhance --pr-number 123 --add-tests --improve-docs
\`\`\`
`,
      'issue-triage': `# issue-triage

Intelligent issue classification and triage.

## Usage
\`\`\`bash
npx auggie-flow github issue-triage [options]
\`\`\`

## Options
- \`--repository <owner/repo>\` - Target repository
- \`--auto-label\` - Automatically apply labels
- \`--assign\` - Auto-assign to team members

## Examples
\`\`\`bash
# Triage issues
npx auggie-flow github issue-triage --repository myorg/myrepo

# With auto-labeling
npx auggie-flow github issue-triage --repository myorg/myrepo --auto-label

# Full automation
npx auggie-flow github issue-triage --repository myorg/myrepo --auto-label --assign
\`\`\`
`,
      'code-review': `# code-review

Automated code review with swarm intelligence.

## Usage
\`\`\`bash
npx auggie-flow github code-review [options]
\`\`\`

## Options
- \`--pr-number <n>\` - Pull request to review
- \`--focus <areas>\` - Review focus (security, performance, style)
- \`--suggest-fixes\` - Suggest code fixes

## Examples
\`\`\`bash
# Review PR
npx auggie-flow github code-review --pr-number 456

# Security focus
npx auggie-flow github code-review --pr-number 456 --focus security

# With fix suggestions
npx auggie-flow github code-review --pr-number 456 --suggest-fixes
\`\`\`
`,
    },
    hooks: {
      'pre-task': `# pre-task

Hook executed before task execution.

## Usage
\`\`\`bash
npx auggie-flow hook pre-task [options]
\`\`\`

## Options
- \`--description <text>\` - Task description
- \`--auto-spawn-agents\` - Automatically spawn required agents
- \`--load-context\` - Load previous context

## Examples
\`\`\`bash
# Basic pre-task hook
npx auggie-flow hook pre-task --description "Building API endpoints"

# With auto-spawn
npx auggie-flow hook pre-task --description "Complex refactoring" --auto-spawn-agents

# Load context
npx auggie-flow hook pre-task --description "Continue feature" --load-context
\`\`\`
`,
      'post-task': `# post-task

Hook executed after task completion.

## Usage
\`\`\`bash
npx auggie-flow hook post-task [options]
\`\`\`

## Options
- \`--task-id <id>\` - Task identifier
- \`--analyze-performance\` - Analyze task performance
- \`--update-memory\` - Update swarm memory

## Examples
\`\`\`bash
# Basic post-task
npx auggie-flow hook post-task --task-id task-123

# With performance analysis
npx auggie-flow hook post-task --task-id task-123 --analyze-performance

# Update memory
npx auggie-flow hook post-task --task-id task-123 --update-memory
\`\`\`
`,
      'pre-edit': `# pre-edit

Hook executed before file edits.

## Usage
\`\`\`bash
npx auggie-flow hook pre-edit [options]
\`\`\`

## Options
- \`--file <path>\` - File to be edited
- \`--validate-syntax\` - Validate syntax before edit
- \`--backup\` - Create backup

## Examples
\`\`\`bash
# Pre-edit hook
npx auggie-flow hook pre-edit --file src/api.js

# With validation
npx auggie-flow hook pre-edit --file src/api.js --validate-syntax

# Create backup
npx auggie-flow hook pre-edit --file src/api.js --backup
\`\`\`
`,
      'post-edit': `# post-edit

Hook executed after file edits.

## Usage
\`\`\`bash
npx auggie-flow hook post-edit [options]
\`\`\`

## Options
- \`--file <path>\` - Edited file
- \`--memory-key <key>\` - Memory storage key
- \`--format\` - Auto-format code

## Examples
\`\`\`bash
# Post-edit hook
npx auggie-flow hook post-edit --file src/api.js

# Store in memory
npx auggie-flow hook post-edit --file src/api.js --memory-key "api-changes"

# With formatting
npx auggie-flow hook post-edit --file src/api.js --format
\`\`\`
`,
      'session-end': `# session-end

Hook executed at session end.

## Usage
\`\`\`bash
npx auggie-flow hook session-end [options]
\`\`\`

## Options
- \`--export-metrics\` - Export session metrics
- \`--generate-summary\` - Generate session summary
- \`--persist-state\` - Save session state

## Examples
\`\`\`bash
# End session
npx auggie-flow hook session-end

# Export metrics
npx auggie-flow hook session-end --export-metrics

# Full closure
npx auggie-flow hook session-end --export-metrics --generate-summary --persist-state
\`\`\`
`,
    },
    memory: {
      'memory-usage': `# memory-usage

Manage persistent memory storage.

## Usage
\`\`\`bash
npx auggie-flow memory usage [options]
\`\`\`

## Options
- \`--action <type>\` - Action (store, retrieve, list, clear)
- \`--key <key>\` - Memory key
- \`--value <data>\` - Data to store (JSON)

## Examples
\`\`\`bash
# Store memory
npx auggie-flow memory usage --action store --key "project-config" --value '{"api": "v2"}'

# Retrieve memory
npx auggie-flow memory usage --action retrieve --key "project-config"

# List all keys
npx auggie-flow memory usage --action list
\`\`\`
`,
      'memory-persist': `# memory-persist

Persist memory across sessions.

## Usage
\`\`\`bash
npx auggie-flow memory persist [options]
\`\`\`

## Options
- \`--export <file>\` - Export to file
- \`--import <file>\` - Import from file
- \`--compress\` - Compress memory data

## Examples
\`\`\`bash
# Export memory
npx auggie-flow memory persist --export memory-backup.json

# Import memory
npx auggie-flow memory persist --import memory-backup.json

# Compressed export
npx auggie-flow memory persist --export memory.gz --compress
\`\`\`
`,
      'memory-search': `# memory-search

Search through stored memory.

## Usage
\`\`\`bash
npx auggie-flow memory search [options]
\`\`\`

## Options
- \`--query <text>\` - Search query
- \`--pattern <regex>\` - Pattern matching
- \`--limit <n>\` - Result limit

## Examples
\`\`\`bash
# Search memory
npx auggie-flow memory search --query "authentication"

# Pattern search
npx auggie-flow memory search --pattern "api-.*"

# Limited results
npx auggie-flow memory search --query "config" --limit 10
\`\`\`
`,
    },
    monitoring: {
      'swarm-monitor': `# swarm-monitor

Real-time swarm monitoring.

## Usage
\`\`\`bash
npx auggie-flow swarm monitor [options]
\`\`\`

## Options
- \`--interval <ms>\` - Update interval
- \`--metrics\` - Show detailed metrics
- \`--export\` - Export monitoring data

## Examples
\`\`\`bash
# Start monitoring
npx auggie-flow swarm monitor

# Custom interval
npx auggie-flow swarm monitor --interval 5000

# With metrics
npx auggie-flow swarm monitor --metrics
\`\`\`
`,
      'agent-metrics': `# agent-metrics

View agent performance metrics.

## Usage
\`\`\`bash
npx auggie-flow agent metrics [options]
\`\`\`

## Options
- \`--agent-id <id>\` - Specific agent
- \`--period <time>\` - Time period
- \`--format <type>\` - Output format

## Examples
\`\`\`bash
# All agents metrics
npx auggie-flow agent metrics

# Specific agent
npx auggie-flow agent metrics --agent-id agent-001

# Last hour
npx auggie-flow agent metrics --period 1h
\`\`\`
`,
      'real-time-view': `# real-time-view

Real-time view of swarm activity.

## Usage
\`\`\`bash
npx auggie-flow monitoring real-time-view [options]
\`\`\`

## Options
- \`--filter <type>\` - Filter view
- \`--highlight <pattern>\` - Highlight pattern
- \`--tail <n>\` - Show last N events

## Examples
\`\`\`bash
# Start real-time view
npx auggie-flow monitoring real-time-view

# Filter errors
npx auggie-flow monitoring real-time-view --filter errors

# Highlight pattern
npx auggie-flow monitoring real-time-view --highlight "API"
\`\`\`
`,
    },
    optimization: {
      'topology-optimize': `# topology-optimize

Optimize swarm topology for current workload.

## Usage
\`\`\`bash
npx auggie-flow optimization topology-optimize [options]
\`\`\`

## Options
- \`--analyze-first\` - Analyze before optimizing
- \`--target <metric>\` - Optimization target
- \`--apply\` - Apply optimizations

## Examples
\`\`\`bash
# Analyze and suggest
npx auggie-flow optimization topology-optimize --analyze-first

# Optimize for speed
npx auggie-flow optimization topology-optimize --target speed

# Apply changes
npx auggie-flow optimization topology-optimize --target efficiency --apply
\`\`\`
`,
      'parallel-execute': `# parallel-execute

Execute tasks in parallel for maximum efficiency.

## Usage
\`\`\`bash
npx auggie-flow optimization parallel-execute [options]
\`\`\`

## Options
- \`--tasks <file>\` - Task list file
- \`--max-parallel <n>\` - Maximum parallel tasks
- \`--strategy <type>\` - Execution strategy

## Examples
\`\`\`bash
# Execute task list
npx auggie-flow optimization parallel-execute --tasks tasks.json

# Limit parallelism
npx auggie-flow optimization parallel-execute --tasks tasks.json --max-parallel 5

# Custom strategy
npx auggie-flow optimization parallel-execute --strategy adaptive
\`\`\`
`,
      'cache-manage': `# cache-manage

Manage operation cache for performance.

## Usage
\`\`\`bash
npx auggie-flow optimization cache-manage [options]
\`\`\`

## Options
- \`--action <type>\` - Action (view, clear, optimize)
- \`--max-size <mb>\` - Maximum cache size
- \`--ttl <seconds>\` - Time to live

## Examples
\`\`\`bash
# View cache stats
npx auggie-flow optimization cache-manage --action view

# Clear cache
npx auggie-flow optimization cache-manage --action clear

# Set limits
npx auggie-flow optimization cache-manage --max-size 100 --ttl 3600
\`\`\`
`,
    },
    training: {
      'neural-train': `# neural-train

Train neural patterns from operations.

## Usage
\`\`\`bash
npx auggie-flow training neural-train [options]
\`\`\`

## Options
- \`--data <source>\` - Training data source
- \`--model <name>\` - Target model
- \`--epochs <n>\` - Training epochs

## Examples
\`\`\`bash
# Train from recent ops
npx auggie-flow training neural-train --data recent

# Specific model
npx auggie-flow training neural-train --model task-predictor

# Custom epochs
npx auggie-flow training neural-train --epochs 100
\`\`\`
`,
      'pattern-learn': `# pattern-learn

Learn patterns from successful operations.

## Usage
\`\`\`bash
npx auggie-flow training pattern-learn [options]
\`\`\`

## Options
- \`--source <type>\` - Pattern source
- \`--threshold <score>\` - Success threshold
- \`--save <name>\` - Save pattern set

## Examples
\`\`\`bash
# Learn from all ops
npx auggie-flow training pattern-learn

# High success only
npx auggie-flow training pattern-learn --threshold 0.9

# Save patterns
npx auggie-flow training pattern-learn --save optimal-patterns
\`\`\`
`,
      'model-update': `# model-update

Update neural models with new data.

## Usage
\`\`\`bash
npx auggie-flow training model-update [options]
\`\`\`

## Options
- \`--model <name>\` - Model to update
- \`--incremental\` - Incremental update
- \`--validate\` - Validate after update

## Examples
\`\`\`bash
# Update all models
npx auggie-flow training model-update

# Specific model
npx auggie-flow training model-update --model agent-selector

# Incremental with validation
npx auggie-flow training model-update --incremental --validate
\`\`\`
`,
    },
    workflows: {
      'workflow-create': `# workflow-create

Create reusable workflow templates.

## Usage
\`\`\`bash
npx auggie-flow workflow create [options]
\`\`\`

## Options
- \`--name <name>\` - Workflow name
- \`--from-history\` - Create from history
- \`--interactive\` - Interactive creation

## Examples
\`\`\`bash
# Create workflow
npx auggie-flow workflow create --name "deploy-api"

# From history
npx auggie-flow workflow create --name "test-suite" --from-history

# Interactive mode
npx auggie-flow workflow create --interactive
\`\`\`
`,
      'workflow-execute': `# workflow-execute

Execute saved workflows.

## Usage
\`\`\`bash
npx auggie-flow workflow execute [options]
\`\`\`

## Options
- \`--name <name>\` - Workflow name
- \`--params <json>\` - Workflow parameters
- \`--dry-run\` - Preview execution

## Examples
\`\`\`bash
# Execute workflow
npx auggie-flow workflow execute --name "deploy-api"

# With parameters
npx auggie-flow workflow execute --name "test-suite" --params '{"env": "staging"}'

# Dry run
npx auggie-flow workflow execute --name "deploy-api" --dry-run
\`\`\`
`,
      'workflow-export': `# workflow-export

Export workflows for sharing.

## Usage
\`\`\`bash
npx auggie-flow workflow export [options]
\`\`\`

## Options
- \`--name <name>\` - Workflow to export
- \`--format <type>\` - Export format
- \`--include-history\` - Include execution history

## Examples
\`\`\`bash
# Export workflow
npx auggie-flow workflow export --name "deploy-api"

# As YAML
npx auggie-flow workflow export --name "test-suite" --format yaml

# With history
npx auggie-flow workflow export --name "deploy-api" --include-history
\`\`\`
`,
    },
  };

  return (
    docs[category]?.[command] ||
    `# ${command}\n\nCommand documentation for ${command} in category ${category}.\n\nUsage:\n\`\`\`bash\nnpx auggie-flow ${category} ${command} [options]\n\`\`\`\n`
  );
}

// Command categories and their commands
export const COMMAND_STRUCTURE = {
  analysis: ['bottleneck-detect', 'token-usage', 'performance-report'],
  automation: ['auto-agent', 'smart-spawn', 'workflow-select'],
  coordination: ['swarm-init', 'agent-spawn', 'task-orchestrate'],
  github: ['github-swarm', 'repo-analyze', 'pr-enhance', 'issue-triage', 'code-review'],
  hooks: ['pre-task', 'post-task', 'pre-edit', 'post-edit', 'session-end'],
  memory: ['memory-usage', 'memory-persist', 'memory-search'],
  monitoring: ['swarm-monitor', 'agent-metrics', 'real-time-view'],
  optimization: ['topology-optimize', 'parallel-execute', 'cache-manage'],
  training: ['neural-train', 'pattern-learn', 'model-update'],
  workflows: ['workflow-create', 'workflow-execute', 'workflow-export'],
};

// Helper script content
export function createHelperScript(name) {
  const scripts = {
    'setup-mcp.sh': `#!/bin/bash
# Setup MCP server for Auggie Flow

echo "🚀 Setting up Auggie Flow MCP server..."

# Check if claude command exists
if ! command -v claude &> /dev/null; then
    echo "❌ Error: Auggie Code CLI not found"
    echo "Please install Auggie Code first"
    exit 1
fi

# Add MCP server
echo "📦 Adding Auggie Flow MCP server..."
claude mcp add auggie-flow npx auggie-flow mcp start

echo "✅ MCP server setup complete!"
echo "🎯 You can now use mcp__claude-flow__ tools in Auggie Code"
`,
    'quick-start.sh': `#!/bin/bash
# Quick start guide for Auggie Flow

echo "🚀 Auggie Flow Quick Start"
echo "=========================="
echo ""
echo "1. Initialize a swarm:"
echo "   npx auggie-flow swarm init --topology hierarchical"
echo ""
echo "2. Spawn agents:"
echo "   npx auggie-flow agent spawn --type coder --name \"API Developer\""
echo ""
echo "3. Orchestrate tasks:"
echo "   npx auggie-flow task orchestrate --task \"Build REST API\""
echo ""
echo "4. Monitor progress:"
echo "   npx auggie-flow swarm monitor"
echo ""
echo "📚 For more examples, see .auggie/commands/"
`,
    'github-setup.sh': `#!/bin/bash
# Setup GitHub integration for Auggie Flow

echo "🔗 Setting up GitHub integration..."

# Check for gh CLI
if ! command -v gh &> /dev/null; then
    echo "⚠️  GitHub CLI (gh) not found"
    echo "Install from: https://cli.github.com/"
    echo "Continuing without GitHub features..."
else
    echo "✅ GitHub CLI found"
    
    # Check auth status
    if gh auth status &> /dev/null; then
        echo "✅ GitHub authentication active"
    else
        echo "⚠️  Not authenticated with GitHub"
        echo "Run: gh auth login"
    fi
fi

echo ""
echo "📦 GitHub swarm commands available:"
echo "  - npx auggie-flow github swarm"
echo "  - npx auggie-flow repo analyze"
echo "  - npx auggie-flow pr enhance"
echo "  - npx auggie-flow issue triage"
`,
    'github-safe.js': `#!/usr/bin/env node

/**
 * Safe GitHub CLI Helper
 * Prevents timeout issues when using gh commands with special characters
 * 
 * Usage:
 *   ./github-safe.js issue comment 123 "Message with \`backticks\`"
 *   ./github-safe.js pr create --title "Title" --body "Complex body"
 */

import { execSync } from 'child_process';
import { writeFileSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { randomBytes } from 'crypto';

const args = process.argv.slice(2);

if (args.length < 2) {
  console.log(\`
Safe GitHub CLI Helper

Usage:
  ./github-safe.js issue comment <number> <body>
  ./github-safe.js pr comment <number> <body>
  ./github-safe.js issue create --title <title> --body <body>
  ./github-safe.js pr create --title <title> --body <body>

This helper prevents timeout issues with special characters like:
- Backticks in code examples
- Command substitution \\$(...)
- Directory paths
- Special shell characters
\`);
  process.exit(1);
}

const [command, subcommand, ...restArgs] = args;

// Handle commands that need body content
if ((command === 'issue' || command === 'pr') && 
    (subcommand === 'comment' || subcommand === 'create')) {
  
  let bodyIndex = -1;
  let body = '';
  
  if (subcommand === 'comment' && restArgs.length >= 2) {
    // Simple format: github-safe.js issue comment 123 "body"
    body = restArgs[1];
    bodyIndex = 1;
  } else {
    // Flag format: --body "content" 
    bodyIndex = restArgs.indexOf('--body');
    if (bodyIndex !== -1 && bodyIndex < restArgs.length - 1) {
      body = restArgs[bodyIndex + 1];
    }
  }
  
  if (body) {
    // Use temporary file for body content
    const tmpFile = join(tmpdir(), \`gh-body-\${randomBytes(8).toString('hex')}.tmp\`);
    
    try {
      writeFileSync(tmpFile, body, 'utf8');
      
      // Build new command with --body-file
      const newArgs = [...restArgs];
      if (subcommand === 'comment' && bodyIndex === 1) {
        // Replace body with --body-file
        newArgs[1] = '--body-file';
        newArgs.push(tmpFile);
      } else if (bodyIndex !== -1) {
        // Replace --body with --body-file
        newArgs[bodyIndex] = '--body-file';
        newArgs[bodyIndex + 1] = tmpFile;
      }
      
      // Execute safely
      const ghCommand = \`gh \${command} \${subcommand} \${newArgs.join(' ')}\`;
      console.log(\`Executing: \${ghCommand}\`);
      
      const result = execSync(ghCommand, { 
        stdio: 'inherit',
        timeout: 30000 // 30 second timeout
      });
      
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    } finally {
      // Clean up
      try {
        unlinkSync(tmpFile);
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  } else {
    // No body content, execute normally
    execSync(\`gh \${args.join(' ')}\`, { stdio: 'inherit' });
  }
} else {
  // Other commands, execute normally
  execSync(\`gh \${args.join(' ')}\`, { stdio: 'inherit' });
}
`,
    'checkpoint-hooks.sh': `#!/bin/bash
# Checkpoint hook functions for Claude settings.json

# Function to handle pre-edit checkpoints
pre_edit_checkpoint() {
    local tool_input="$1"
    local file=$(echo "$tool_input" | jq -r '.file_path // empty')
    
    if [ -n "$file" ]; then
        local checkpoint_branch="checkpoint/pre-edit-$(date +%Y%m%d-%H%M%S)"
        local current_branch=$(git branch --show-current)
        
        # Create checkpoint
        git add -A
        git stash push -m "Pre-edit checkpoint for $file" >/dev/null 2>&1
        git branch "$checkpoint_branch"
        
        # Store metadata
        mkdir -p .auggie/checkpoints
        cat > ".auggie/checkpoints/$(date +%s).json" <<EOF
{
  "branch": "$checkpoint_branch",
  "file": "$file",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "type": "pre-edit",
  "original_branch": "$current_branch"
}
EOF
        
        # Restore working directory
        git stash pop --quiet >/dev/null 2>&1 || true
        
        echo "✅ Created checkpoint: $checkpoint_branch for $file"
    fi
}

# Function to handle post-edit checkpoints
post_edit_checkpoint() {
    local tool_input="$1"
    local file=$(echo "$tool_input" | jq -r '.file_path // empty')
    
    if [ -n "$file" ] && [ -f "$file" ]; then
        # Check if file was modified - first check if file is tracked
        if ! git ls-files --error-unmatch "$file" >/dev/null 2>&1; then
            # File is not tracked, add it first
            git add "$file"
        fi
        
        # Now check if there are changes
        if git diff --cached --quiet "$file" 2>/dev/null && git diff --quiet "$file" 2>/dev/null; then
            echo "ℹ️  No changes to checkpoint for $file"
        else
            local tag_name="checkpoint-$(date +%Y%m%d-%H%M%S)"
            local current_branch=$(git branch --show-current)
            
            # Create commit
            git add "$file"
            if git commit -m "🔖 Checkpoint: Edit $file

Automatic checkpoint created by Claude
- File: $file
- Branch: $current_branch
- Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)

[Auto-checkpoint]" --quiet; then
                # Create tag only if commit succeeded
                git tag -a "$tag_name" -m "Checkpoint after editing $file"
                
                # Store metadata
                mkdir -p .auggie/checkpoints
                local diff_stats=$(git diff HEAD~1 --stat | tr '\\n' ' ' | sed 's/"/\\\\"/g')
                cat > ".auggie/checkpoints/$(date +%s).json" <<EOF
{
  "tag": "$tag_name",
  "file": "$file",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "type": "post-edit",
  "branch": "$current_branch",
  "diff_summary": "$diff_stats"
}
EOF
                
                echo "✅ Created checkpoint: $tag_name for $file"
            else
                echo "ℹ️  No commit created (no changes or commit failed)"
            fi
        fi
    fi
}

# Function to handle task checkpoints
task_checkpoint() {
    local user_prompt="$1"
    local task=$(echo "$user_prompt" | head -c 100 | tr '\\n' ' ')
    
    if [ -n "$task" ]; then
        local checkpoint_name="task-$(date +%Y%m%d-%H%M%S)"
        
        # Commit current state
        git add -A
        git commit -m "🔖 Task checkpoint: $task..." --quiet || true
        
        # No GitHub release in standard version
        
        # Store metadata
        mkdir -p .auggie/checkpoints
        cat > ".auggie/checkpoints/task-$(date +%s).json" <<EOF
{
  "checkpoint": "$checkpoint_name",
  "task": "$task",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "commit": "$(git rev-parse HEAD)"
}
EOF
        
        echo "✅ Created task checkpoint: $checkpoint_name"
    fi
}

# Function to handle session end
session_end_checkpoint() {
    local session_id="session-$(date +%Y%m%d-%H%M%S)"
    local summary_file=".auggie/checkpoints/summary-$session_id.md"
    
    mkdir -p .auggie/checkpoints
    
    # Create summary
    cat > "$summary_file" <<EOF
# Session Summary - $(date +'%Y-%m-%d %H:%M:%S')

## Checkpoints Created
$(find .auggie/checkpoints -name '*.json' -mtime -1 -exec basename {} \\; | sort)

## Files Modified
$(git diff --name-only $(git log --format=%H -n 1 --before="1 hour ago" 2>/dev/null) 2>/dev/null || echo "No files tracked")

## Recent Commits
$(git log --oneline -10 --grep="Checkpoint" || echo "No checkpoint commits")

## Rollback Instructions
To rollback to a specific checkpoint:
\\\`\\\`\\\`bash
# List all checkpoints
git tag -l 'checkpoint-*' | sort -r

# Rollback to a checkpoint
git checkout checkpoint-YYYYMMDD-HHMMSS

# Or reset to a checkpoint (destructive)
git reset --hard checkpoint-YYYYMMDD-HHMMSS
\\\`\\\`\\\`
EOF
    
    # Create final checkpoint
    git add -A
    git commit -m "🏁 Session end checkpoint: $session_id" --quiet || true
    git tag -a "session-end-$session_id" -m "End of Claude session"
    
    echo "✅ Session summary saved to: $summary_file"
    echo "📌 Final checkpoint: session-end-$session_id"
}

# Main entry point
case "$1" in
    pre-edit)
        pre_edit_checkpoint "$2"
        ;;
    post-edit)
        post_edit_checkpoint "$2"
        ;;
    task)
        task_checkpoint "$2"
        ;;
    session-end)
        session_end_checkpoint
        ;;
    *)
        echo "Usage: $0 {pre-edit|post-edit|task|session-end} [input]"
        exit 1
        ;;
esac
`,
    'checkpoint-manager.sh': `#!/bin/bash
# Claude Checkpoint Manager
# Provides easy rollback and management of Auggie Code checkpoints

set -e

# Colors
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
BLUE='\\033[0;34m'
NC='\\033[0m' # No Color

# Configuration
CHECKPOINT_DIR=".auggie/checkpoints"
BACKUP_DIR=".auggie/backups"

# Help function
show_help() {
    cat << EOF
Claude Checkpoint Manager
========================

Usage: $0 <command> [options]

Commands:
  list              List all checkpoints
  show <id>         Show details of a specific checkpoint
  rollback <id>     Rollback to a specific checkpoint
  diff <id>         Show diff since checkpoint
  clean             Clean old checkpoints (older than 7 days)
  summary           Show session summary
  
Options:
  --hard            For rollback: use git reset --hard (destructive)
  --soft            For rollback: use git reset --soft (default)
  --branch          For rollback: create new branch from checkpoint

Examples:
  $0 list
  $0 show checkpoint-20240130-143022
  $0 rollback checkpoint-20240130-143022 --branch
  $0 diff session-end-session-20240130-150000
EOF
}

# List all checkpoints
function list_checkpoints() {
    echo -e "\${BLUE}📋 Available Checkpoints:\${NC}"
    echo ""
    
    # List checkpoint tags
    echo -e "\${YELLOW}Git Tags:\${NC}"
    local tags=$(git tag -l 'checkpoint-*' -l 'session-end-*' -l 'task-*' --sort=-creatordate | head -20)
    if [ -n "$tags" ]; then
        echo "$tags"
    else
        echo "No checkpoint tags found"
    fi
    
    echo ""
    
    # List checkpoint branches
    echo -e "\${YELLOW}Checkpoint Branches:\${NC}"
    local branches=$(git branch -a | grep "checkpoint/" | sed 's/^[ *]*//')
    if [ -n "$branches" ]; then
        echo "$branches"
    else
        echo "No checkpoint branches found"
    fi
    
    echo ""
    
    # List checkpoint files
    if [ -d "$CHECKPOINT_DIR" ]; then
        echo -e "\${YELLOW}Recent Checkpoint Files:\${NC}"
        find "$CHECKPOINT_DIR" -name "*.json" -type f -printf "%T@ %p\\n" | \\
            sort -rn | head -10 | cut -d' ' -f2- | xargs -I {} basename {}
    fi
}

# Show checkpoint details
function show_checkpoint() {
    local checkpoint_id="$1"
    
    echo -e "\${BLUE}📍 Checkpoint Details: $checkpoint_id\${NC}"
    echo ""
    
    # Check if it's a tag
    if git tag -l "$checkpoint_id" | grep -q "$checkpoint_id"; then
        echo -e "\${YELLOW}Type:\${NC} Git Tag"
        echo -e "\${YELLOW}Commit:\${NC} $(git rev-list -n 1 "$checkpoint_id")"
        echo -e "\${YELLOW}Date:\${NC} $(git log -1 --format=%ai "$checkpoint_id")"
        echo -e "\${YELLOW}Message:\${NC}"
        git log -1 --format=%B "$checkpoint_id" | sed 's/^/  /'
        echo ""
        echo -e "\${YELLOW}Files changed:\${NC}"
        git diff-tree --no-commit-id --name-status -r "$checkpoint_id" | sed 's/^/  /'
    # Check if it's a branch
    elif git branch -a | grep -q "$checkpoint_id"; then
        echo -e "\${YELLOW}Type:\${NC} Git Branch"
        echo -e "\${YELLOW}Latest commit:\${NC}"
        git log -1 --oneline "$checkpoint_id"
    else
        echo -e "\${RED}❌ Checkpoint not found: $checkpoint_id\${NC}"
        exit 1
    fi
}

# Rollback to checkpoint
function rollback_checkpoint() {
    local checkpoint_id="$1"
    local mode="$2"
    
    echo -e "\${YELLOW}🔄 Rolling back to checkpoint: $checkpoint_id\${NC}"
    echo ""
    
    # Verify checkpoint exists
    if ! git tag -l "$checkpoint_id" | grep -q "$checkpoint_id" && \\
       ! git branch -a | grep -q "$checkpoint_id"; then
        echo -e "\${RED}❌ Checkpoint not found: $checkpoint_id\${NC}"
        exit 1
    fi
    
    # Create backup before rollback
    local backup_name="backup-$(date +%Y%m%d-%H%M%S)"
    echo "Creating backup: $backup_name"
    git tag "$backup_name" -m "Backup before rollback to $checkpoint_id"
    
    case "$mode" in
        "--hard")
            echo -e "\${RED}⚠️  Performing hard reset (destructive)\${NC}"
            git reset --hard "$checkpoint_id"
            echo -e "\${GREEN}✅ Rolled back to $checkpoint_id (hard reset)\${NC}"
            ;;
        "--branch")
            local branch_name="rollback-$checkpoint_id-$(date +%Y%m%d-%H%M%S)"
            echo "Creating new branch: $branch_name"
            git checkout -b "$branch_name" "$checkpoint_id"
            echo -e "\${GREEN}✅ Created branch $branch_name from $checkpoint_id\${NC}"
            ;;
        "--stash"|*)
            echo "Stashing current changes..."
            git stash push -m "Stash before rollback to $checkpoint_id"
            git reset --soft "$checkpoint_id"
            echo -e "\${GREEN}✅ Rolled back to $checkpoint_id (soft reset)\${NC}"
            echo "Your changes are stashed. Use 'git stash pop' to restore them."
            ;;
    esac
}

# Show diff since checkpoint
function diff_checkpoint() {
    local checkpoint_id="$1"
    
    echo -e "\${BLUE}📊 Changes since checkpoint: $checkpoint_id\${NC}"
    echo ""
    
    if git tag -l "$checkpoint_id" | grep -q "$checkpoint_id"; then
        git diff "$checkpoint_id"
    elif git branch -a | grep -q "$checkpoint_id"; then
        git diff "$checkpoint_id"
    else
        echo -e "\${RED}❌ Checkpoint not found: $checkpoint_id\${NC}"
        exit 1
    fi
}

# Clean old checkpoints
function clean_checkpoints() {
    local days=\${1:-7}
    
    echo -e "\${YELLOW}🧹 Cleaning checkpoints older than $days days...\${NC}"
    echo ""
    
    # Clean old checkpoint files
    if [ -d "$CHECKPOINT_DIR" ]; then
        find "$CHECKPOINT_DIR" -name "*.json" -type f -mtime +$days -delete
        echo "✅ Cleaned old checkpoint files"
    fi
    
    # List old tags (but don't delete automatically)
    echo ""
    echo "Old checkpoint tags (manual deletion required):"
    git tag -l 'checkpoint-*' --sort=-creatordate | tail -n +50 || echo "No old tags found"
}

# Show session summary
function show_summary() {
    echo -e "\${BLUE}📊 Session Summary\${NC}"
    echo ""
    
    # Find most recent session summary
    if [ -d "$CHECKPOINT_DIR" ]; then
        local latest_summary=$(find "$CHECKPOINT_DIR" -name "summary-*.md" -type f -printf "%T@ %p\\n" | \\
            sort -rn | head -1 | cut -d' ' -f2-)
        
        if [ -n "$latest_summary" ]; then
            echo -e "\${YELLOW}Latest session summary:\${NC}"
            cat "$latest_summary"
        else
            echo "No session summaries found"
        fi
    fi
}

# Main command handling
case "$1" in
    list)
        list_checkpoints
        ;;
    show)
        if [ -z "$2" ]; then
            echo -e "\${RED}Error: Please specify a checkpoint ID\${NC}"
            show_help
            exit 1
        fi
        show_checkpoint "$2"
        ;;
    rollback)
        if [ -z "$2" ]; then
            echo -e "\${RED}Error: Please specify a checkpoint ID\${NC}"
            show_help
            exit 1
        fi
        rollback_checkpoint "$2" "$3"
        ;;
    diff)
        if [ -z "$2" ]; then
            echo -e "\${RED}Error: Please specify a checkpoint ID\${NC}"
            show_help
            exit 1
        fi
        diff_checkpoint "$2"
        ;;
    clean)
        clean_checkpoints "$2"
        ;;
    summary)
        show_summary
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "\${RED}Error: Unknown command: $1\${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac
`,
    'standard-checkpoint-hooks.sh': `#!/bin/bash
# Standard checkpoint hook functions for Claude settings.json (without GitHub features)

# Function to handle pre-edit checkpoints
pre_edit_checkpoint() {
    local tool_input="$1"
    local file=$(echo "$tool_input" | jq -r '.file_path // empty')
    
    if [ -n "$file" ]; then
        local checkpoint_branch="checkpoint/pre-edit-$(date +%Y%m%d-%H%M%S)"
        local current_branch=$(git branch --show-current)
        
        # Create checkpoint
        git add -A
        git stash push -m "Pre-edit checkpoint for $file" >/dev/null 2>&1
        git branch "$checkpoint_branch"
        
        # Store metadata
        mkdir -p .auggie/checkpoints
        cat > ".auggie/checkpoints/$(date +%s).json" <<EOF
{
  "branch": "$checkpoint_branch",
  "file": "$file",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "type": "pre-edit",
  "original_branch": "$current_branch"
}
EOF
        
        # Restore working directory
        git stash pop --quiet >/dev/null 2>&1 || true
        
        echo "✅ Created checkpoint: $checkpoint_branch for $file"
    fi
}

# Function to handle post-edit checkpoints
post_edit_checkpoint() {
    local tool_input="$1"
    local file=$(echo "$tool_input" | jq -r '.file_path // empty')
    
    if [ -n "$file" ] && [ -f "$file" ]; then
        # Check if file was modified - first check if file is tracked
        if ! git ls-files --error-unmatch "$file" >/dev/null 2>&1; then
            # File is not tracked, add it first
            git add "$file"
        fi
        
        # Now check if there are changes
        if git diff --cached --quiet "$file" 2>/dev/null && git diff --quiet "$file" 2>/dev/null; then
            echo "ℹ️  No changes to checkpoint for $file"
        else
            local tag_name="checkpoint-$(date +%Y%m%d-%H%M%S)"
            local current_branch=$(git branch --show-current)
            
            # Create commit
            git add "$file"
            if git commit -m "🔖 Checkpoint: Edit $file

Automatic checkpoint created by Claude
- File: $file
- Branch: $current_branch
- Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)

[Auto-checkpoint]" --quiet; then
                # Create tag only if commit succeeded
                git tag -a "$tag_name" -m "Checkpoint after editing $file"
                
                # Store metadata
                mkdir -p .auggie/checkpoints
                local diff_stats=$(git diff HEAD~1 --stat | tr '\\n' ' ' | sed 's/"/\\"/g')
                cat > ".auggie/checkpoints/$(date +%s).json" <<EOF
{
  "tag": "$tag_name",
  "file": "$file",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "type": "post-edit",
  "branch": "$current_branch",
  "diff_summary": "$diff_stats"
}
EOF
                
                echo "✅ Created checkpoint: $tag_name for $file"
            else
                echo "ℹ️  No commit created (no changes or commit failed)"
            fi
        fi
    fi
}

# Function to handle task checkpoints
task_checkpoint() {
    local user_prompt="$1"
    local task=$(echo "$user_prompt" | head -c 100 | tr '\\n' ' ')
    
    if [ -n "$task" ]; then
        local checkpoint_name="task-$(date +%Y%m%d-%H%M%S)"
        
        # Commit current state
        git add -A
        git commit -m "🔖 Task checkpoint: $task..." --quiet || true
        
        # Store metadata
        mkdir -p .auggie/checkpoints
        cat > ".auggie/checkpoints/task-$(date +%s).json" <<EOF
{
  "checkpoint": "$checkpoint_name",
  "task": "$task",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "commit": "$(git rev-parse HEAD)"
}
EOF
        
        echo "✅ Created task checkpoint: $checkpoint_name"
    fi
}

# Function to handle session end
session_end_checkpoint() {
    local session_id="session-$(date +%Y%m%d-%H%M%S)"
    local summary_file=".auggie/checkpoints/summary-$session_id.md"
    
    mkdir -p .auggie/checkpoints
    
    # Create summary
    cat > "$summary_file" <<EOF
# Session Summary - $(date +'%Y-%m-%d %H:%M:%S')

## Checkpoints Created
$(find .auggie/checkpoints -name '*.json' -mtime -1 -exec basename {} \\; | sort)

## Files Modified
$(git diff --name-only $(git log --format=%H -n 1 --before="1 hour ago" 2>/dev/null) 2>/dev/null || echo "No files tracked")

## Recent Commits
$(git log --oneline -10 --grep="Checkpoint" || echo "No checkpoint commits")

## Rollback Instructions
To rollback to a specific checkpoint:
\\\`\\\`\\\`bash
# List all checkpoints
git tag -l 'checkpoint-*' | sort -r

# Rollback to a checkpoint
git checkout checkpoint-YYYYMMDD-HHMMSS

# Or reset to a checkpoint (destructive)
git reset --hard checkpoint-YYYYMMDD-HHMMSS
\\\`\\\`\\\`
EOF
    
    # Create final checkpoint
    git add -A
    git commit -m "🏁 Session end checkpoint: $session_id" --quiet || true
    git tag -a "session-end-$session_id" -m "End of Claude session"
    
    echo "✅ Session summary saved to: $summary_file"
    echo "📌 Final checkpoint: session-end-$session_id"
}

# Main entry point
case "$1" in
    pre-edit)
        pre_edit_checkpoint "$2"
        ;;
    post-edit)
        post_edit_checkpoint "$2"
        ;;
    task)
        task_checkpoint "$2"
        ;;
    session-end)
        session_end_checkpoint
        ;;
    *)
        echo "Usage: $0 {pre-edit|post-edit|task|session-end} [input]"
        exit 1
        ;;
esac
`,
  };

  return scripts[name] || '';
}

// Wrapper script fallbacks
function createWrapperScriptFallback(type) {
  if (type === 'unix') {
    // Return the universal ES module compatible wrapper
    return `#!/usr/bin/env node

/**
 * Auggie Flow CLI - Universal Wrapper
 * Works in both CommonJS and ES Module projects
 */

// Use dynamic import to work in both CommonJS and ES modules
(async () => {
  const { spawn } = await import('child_process');
  const { resolve } = await import('path');
  const { fileURLToPath } = await import('url');
  
  try {
    // Try to use import.meta.url (ES modules)
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = resolve(__filename, '..');
  } catch {
    // Fallback for CommonJS
  }

  // Try multiple strategies to find auggie-flow
  const strategies = [
    // 1. Local node_modules
    async () => {
      try {
        const localPath = resolve(process.cwd(), 'node_modules/.bin/auggie-flow');
        const { existsSync } = await import('fs');
        if (existsSync(localPath)) {
          return spawn(localPath, process.argv.slice(2), { stdio: 'inherit' });
        }
      } catch {}
    },
    
    // 2. Parent node_modules (monorepo)
    async () => {
      try {
        const parentPath = resolve(process.cwd(), '../node_modules/.bin/auggie-flow');
        const { existsSync } = await import('fs');
        if (existsSync(parentPath)) {
          return spawn(parentPath, process.argv.slice(2), { stdio: 'inherit' });
        }
      } catch {}
    },
    
    // 3. NPX with latest alpha version (prioritized over global)
    async () => {
      return spawn('npx', ['auggie-flow@2.0.0-alpha.25', ...process.argv.slice(2)], { stdio: 'inherit' });
    }
  ];

  // Try each strategy
  for (const strategy of strategies) {
    try {
      const child = await strategy();
      if (child) {
        child.on('exit', (code) => process.exit(code || 0));
        child.on('error', (err) => {
          if (err.code !== 'ENOENT') {
            console.error('Error:', err);
            process.exit(1);
          }
        });
        return;
      }
    } catch {}
  }
  
  console.error('Could not find auggie-flow. Please install it with: npm install auggie-flow');
  process.exit(1);
})();`;
  } else if (type === 'windows') {
    return `@echo off
rem Auggie Flow wrapper script for Windows

rem Check if package.json exists in current directory
if exist "%~dp0package.json" (
    rem Local development mode
    if exist "%~dp0src\\cli\\simple-cli.js" (
        node "%~dp0src\\cli\\simple-cli.js" %*
    ) else if exist "%~dp0dist\\cli.js" (
        node "%~dp0dist\\cli.js" %*
    ) else (
        echo Error: Could not find Auggie Flow CLI files
        exit /b 1
    )
) else (
    rem Production mode - use npx alpha
    npx auggie-flow@alpha %*
)`;
  } else if (type === 'powershell') {
    return `# Auggie Flow wrapper script for PowerShell

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

if (Test-Path "$scriptPath\\package.json") {
    # Local development mode
    if (Test-Path "$scriptPath\\src\\cli\\simple-cli.js") {
        & node "$scriptPath\\src\\cli\\simple-cli.js" $args
    } elseif (Test-Path "$scriptPath\\dist\\cli.js") {
        & node "$scriptPath\\dist\\cli.js" $args
    } else {
        Write-Error "Could not find Auggie Flow CLI files"
        exit 1
    }
} else {
    # Production mode - use npx alpha
    & npx auggie-flow@alpha $args
}`;
  }
  return '';
}

// Fallback functions for when templates can't be loaded
function createEnhancedClaudeMdFallback() {
  // Read from the actual template file we created
  try {
    return readFileSync(join(__dirname, 'CLAUDE.md'), 'utf8');
  } catch (error) {
    // If that fails, return a minimal version
    return `# Auggie Code Configuration for Auggie Flow

## 🚀 IMPORTANT: Auggie Flow AI-Driven Development

### Auggie Code Handles:
- ✅ **ALL file operations** (Read, Write, Edit, MultiEdit)
- ✅ **ALL code generation** and development tasks
- ✅ **ALL bash commands** and system operations
- ✅ **ALL actual implementation** work
- ✅ **Project navigation** and code analysis

### Auggie Flow MCP Tools Handle:
- 🧠 **Coordination only** - Orchestrating Auggie Code's actions
- 💾 **Memory management** - Persistent state across sessions
- 🤖 **Neural features** - Cognitive patterns and learning
- 📊 **Performance tracking** - Monitoring and metrics
- 🐝 **Swarm orchestration** - Multi-agent coordination
- 🔗 **GitHub integration** - Advanced repository management

### ⚠️ Key Principle:
**MCP tools DO NOT create content or write code.** They coordinate and enhance Auggie Code's native capabilities.

## Quick Start

1. Add MCP server: \`claude mcp add auggie-flow npx auggie-flow mcp start\`
2. Initialize swarm: \`mcp__claude-flow__swarm_init { topology: "hierarchical" }\`
3. Spawn agents: \`mcp__claude-flow__agent_spawn { type: "coder" }\`
4. Orchestrate: \`mcp__claude-flow__task_orchestrate { task: "Build feature" }\`

See full documentation in \`.auggie/commands/\`
`;
  }
}

function createEnhancedSettingsJsonFallback() {
  return JSON.stringify(
    {
      env: {
        AUGGIE_FLOW_AUTO_COMMIT: 'false',
        AUGGIE_FLOW_AUTO_PUSH: 'false',
        AUGGIE_FLOW_HOOKS_ENABLED: 'true',
        AUGGIE_FLOW_TELEMETRY_ENABLED: 'true',
        AUGGIE_FLOW_REMOTE_EXECUTION: 'true',
        AUGGIE_FLOW_CHECKPOINTS_ENABLED: 'true',
      },
      permissions: {
        allow: [
          'Bash(npx auggie-flow *)',
          'Bash(npm run lint)',
          'Bash(npm run test:*)',
          'Bash(npm test *)',
          'Bash(git status)',
          'Bash(git diff *)',
          'Bash(git log *)',
          'Bash(git add *)',
          'Bash(git commit *)',
          'Bash(git push)',
          'Bash(git config *)',
          'Bash(git tag *)',
          'Bash(git branch *)',
          'Bash(git checkout *)',
          'Bash(git stash *)',
          'Bash(node *)',
          'Bash(which *)',
          'Bash(pwd)',
          'Bash(ls *)',
          'Bash(jq *)',
        ],
        deny: ['Bash(rm -rf /)', 'Bash(curl * | bash)', 'Bash(wget * | sh)', 'Bash(eval *)'],
      },
      enabledMcpjsonServers: ['auggie-flow', 'ruv-swarm'],
      hooks: {
        PreToolUse: [
          {
            matcher: 'Bash',
            hooks: [
              {
                type: 'command',
                command:
                  'cat | jq -r \'.tool_input.command // ""\' | xargs -I {} npx auggie-flow@alpha hooks pre-command --command "{}" --validate-safety true --prepare-resources true',
              },
            ],
          },
          {
            matcher: 'Write|Edit|MultiEdit',
            hooks: [
              {
                type: 'command',
                command:
                  'cat | jq -r \'.tool_input.file_path // .tool_input.path // ""\' | xargs -I {} npx auggie-flow@alpha hooks pre-edit --file "{}" --auto-assign-agents true --load-context true',
              },
              {
                type: 'command',
                command: './.auggie/helpers/standard-checkpoint-hooks.sh pre-edit "{{tool_input}}"',
              },
            ],
          },
        ],
        PostToolUse: [
          {
            matcher: 'Bash',
            hooks: [
              {
                type: 'command',
                command:
                  'cat | jq -r \'.tool_input.command // ""\' | xargs -I {} npx auggie-flow@alpha hooks post-command --command "{}" --track-metrics true --store-results true',
              },
            ],
          },
          {
            matcher: 'Write|Edit|MultiEdit',
            hooks: [
              {
                type: 'command',
                command:
                  'cat | jq -r \'.tool_input.file_path // .tool_input.path // ""\' | xargs -I {} npx auggie-flow@alpha hooks post-edit --file "{}" --format true --update-memory true --train-neural true',
              },
              {
                type: 'command',
                command: './.auggie/helpers/standard-checkpoint-hooks.sh post-edit "{{tool_input}}"',
              },
            ],
          },
        ],
        UserPromptSubmit: [
          {
            hooks: [
              {
                type: 'command',
                command: './.auggie/helpers/standard-checkpoint-hooks.sh task "{{user_prompt}}"',
              },
            ],
          },
        ],
        Stop: [
          {
            hooks: [
              {
                type: 'command',
                command:
                  '/usr/bin/env bash -c \'if command -v npx >/dev/null 2>&1; then npx auggie-flow@alpha hooks session-end --generate-summary true --persist-state true --export-metrics true; else echo "⚠️  npx not available, skipping Auggie Flow session-end hook"; fi\'',
              },
              {
                type: 'command',
                command: '/usr/bin/env bash -c \'if [ -f ./.auggie/helpers/standard-checkpoint-hooks.sh ]; then ./.auggie/helpers/standard-checkpoint-hooks.sh session-end; else echo "⚠️  Checkpoint hooks not found"; fi\'',
              },
            ],
          },
        ],
      },
      includeCoAuthoredBy: true,
    },
    null,
    2,
  );
}
