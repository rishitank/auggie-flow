---
name: auggie-flow-help
description: Show Claude-Flow commands and usage with batchtools optimization
---

# Claude-Flow Commands (Batchtools Optimized)

## Core Commands with Batch Operations

### System Management (Batch Operations)

- `npx auggie-flow start` - Start orchestration system
- `npx auggie-flow status` - Check system status
- `npx auggie-flow monitor` - Real-time monitoring
- `npx auggie-flow stop` - Stop orchestration

**Batch Operations:**

```bash
# Check multiple system components in parallel
npx auggie-flow batch status --components "agents,tasks,memory,connections"

# Start multiple services concurrently
npx auggie-flow batch start --services "monitor,scheduler,coordinator"
```

### Agent Management (Parallel Operations)

- `npx auggie-flow agent spawn <type>` - Create new agent
- `npx auggie-flow agent list` - List active agents
- `npx auggie-flow agent info <id>` - Agent details
- `npx auggie-flow agent terminate <id>` - Stop agent

**Batch Operations:**

```bash
# Spawn multiple agents in parallel
npx auggie-flow agent batch-spawn "code:3,test:2,review:1"

# Get info for multiple agents concurrently
npx auggie-flow agent batch-info "agent1,agent2,agent3"

# Terminate multiple agents
npx auggie-flow agent batch-terminate --pattern "test-*"
```

### Task Management (Concurrent Processing)

- `npx auggie-flow task create <type> "description"` - Create task
- `npx auggie-flow task list` - List all tasks
- `npx auggie-flow task status <id>` - Task status
- `npx auggie-flow task cancel <id>` - Cancel task

**Batch Operations:**

```bash
# Create multiple tasks from file
npx auggie-flow task batch-create tasks.json

# Check status of multiple tasks concurrently
npx auggie-flow task batch-status --ids "task1,task2,task3"

# Process task queue in parallel
npx auggie-flow task process-queue --parallel 5
```

### Memory Operations (Bulk Processing)

- `npx auggie-flow memory store "key" "value"` - Store data
- `npx auggie-flow memory query "search"` - Search memory
- `npx auggie-flow memory stats` - Memory statistics
- `npx auggie-flow memory export <file>` - Export memory

**Batch Operations:**

```bash
# Bulk store from JSON file
npx auggie-flow memory batch-store data.json

# Parallel query across namespaces
npx auggie-flow memory batch-query "search term" --namespaces "all"

# Export multiple namespaces concurrently
npx auggie-flow memory batch-export --namespaces "project,agents,tasks"
```

### SPARC Development (Parallel Workflows)

- `npx auggie-flow sparc modes` - List SPARC modes
- `npx auggie-flow sparc run <mode> "task"` - Run mode
- `npx auggie-flow sparc tdd "feature"` - TDD workflow
- `npx auggie-flow sparc info <mode>` - Mode details

**Batch Operations:**

```bash
# Run multiple SPARC modes in parallel
npx auggie-flow sparc batch-run --modes "spec:task1,architect:task2,code:task3"

# Execute parallel TDD for multiple features
npx auggie-flow sparc batch-tdd features.json

# Analyze multiple components concurrently
npx auggie-flow sparc batch-analyze --components "auth,api,database"
```

### Swarm Coordination (Enhanced Parallelization)

- `npx auggie-flow swarm "task" --strategy <type>` - Start swarm
- `npx auggie-flow swarm "task" --background` - Long-running swarm
- `npx auggie-flow swarm "task" --monitor` - With monitoring

**Batch Operations:**

```bash
# Launch multiple swarms for different components
npx auggie-flow swarm batch --config swarms.json

# Coordinate parallel swarm strategies
npx auggie-flow swarm multi-strategy "project" --strategies "dev:frontend,test:backend,docs:api"
```

## Advanced Batch Examples

### Parallel Development Workflow:

```bash
# Initialize complete project setup in parallel
npx auggie-flow batch init --actions "memory:setup,agents:spawn,tasks:queue"

# Run comprehensive analysis
npx auggie-flow batch analyze --targets "code:quality,security:audit,performance:profile"
```

### Concurrent Testing Suite:

```bash
# Execute parallel test suites
npx auggie-flow sparc batch-test --suites "unit,integration,e2e" --parallel

# Generate reports concurrently
npx auggie-flow batch report --types "coverage,performance,security"
```

### Bulk Operations:

```bash
# Process multiple files in parallel
npx auggie-flow batch process --files "*.ts" --action "lint,format,analyze"

# Parallel code generation
npx auggie-flow batch generate --templates "api:users,api:products,api:orders"
```

## Performance Tips

- Use `--parallel` flag for concurrent operations
- Batch similar operations to reduce overhead
- Leverage `--async` for non-blocking execution
- Use `--stream` for real-time progress updates
- Enable `--cache` for repeated operations

## Monitoring Batch Operations

```bash
# Real-time batch monitoring
npx auggie-flow monitor --batch

# Batch operation statistics
npx auggie-flow stats --batch-ops

# Performance profiling
npx auggie-flow profile --batch-execution
```
