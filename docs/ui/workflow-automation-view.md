# Workflow & Automation View Documentation

## Overview

The WorkflowAutomationView provides a comprehensive interface for all workflow and automation tools in Auggie Flow. It implements 11 workflow-related MCP tools with rich UI components including a visual workflow builder, SPARC modes integration, and pipeline management.

## Features

### 1. Visual Workflow Builder
- **Drag-and-drop interface** with 6 component types:
  - 🎯 Trigger - Start workflow events
  - ⚡ Action - Execute operations
  - 🔀 Condition - Branching logic
  - 🔁 Loop - Iteration controls
  - 🔀 Parallel - Concurrent execution
  - 🎯 SPARC Mode - Integrate development modes

### 2. Implemented Tools (11 Total)

#### Workflow Management
- `workflow_create` - Create custom workflows with visual builder
- `workflow_execute` - Execute saved workflows
- `workflow_template` - Manage workflow templates

#### Automation
- `automation_setup` - Configure automation rules
- `trigger_setup` - Set up event triggers
- `scheduler_manage` - Task scheduling with calendar view

#### Pipeline & CI/CD
- `pipeline_create` - Build CI/CD pipelines
- `batch_process` - Batch processing operations
- `parallel_execute` - Parallel task execution

#### Advanced Features
- `sparc_mode` - Run SPARC development modes
- `task_orchestrate` - Complex task orchestration

### 3. SPARC Modes Integration

All 15 SPARC modes are integrated:
- 🏗️ Architect - System Design
- 💻 Code - Implementation
- 🧪 TDD - Test-Driven Development
- 🐛 Debug - Issue Resolution
- 🔒 Security Review
- 📝 Documentation Writer
- 🔗 Integration Specialist
- 📊 Post-Deployment Monitoring
- ⚡ Refinement & Optimization
- 🔧 DevOps Engineer
- 🎛️ MCP Tool Specialist
- 🐝 Swarm Orchestrator
- ❓ Interactive Assistant
- 🎓 Tutorial Creator
- 🔨 Generic Task Handler

#### Boomerang Pattern
The view supports the boomerang orchestration pattern for iterative development:
1. Research Phase → 2. Design Phase → 3. Implementation Phase → 4. Testing Phase → 5. Refinement Phase → Loop Back

### 4. User Interface Components

#### Overview Tab
- Statistics dashboard showing active workflows, pipelines, rules, and scheduled tasks
- Quick action buttons for common operations
- Recent activity log

#### Workflows Tab
- Visual workflow builder with drag-and-drop
- Component palette and properties panel
- Saved workflows grid

#### Automation Tab
- Rule builder with trigger events and actions
- Active rules management
- Event trigger configuration

#### Pipelines Tab
- CI/CD pipeline builder
- Pipeline monitor with real-time status
- Execution history

#### Scheduler Tab
- Task scheduling interface
- Calendar view for scheduled tasks
- Support for one-time, recurring, and cron schedules

#### SPARC Modes Tab
- Mode selector with descriptions
- Task configuration
- Boomerang pattern orchestration
- Execution history

#### Batch & Parallel Tab
- Batch processing configuration
- Parallel task management
- Execution monitor

## Usage

### In Browser Mode

```javascript
import { WorkflowAutomationView } from './views/WorkflowAutomationView.js';
import { EventBus } from './core/EventBus.js';

const eventBus = new EventBus();
const container = document.getElementById('workflow-container');
const viewConfig = {
  id: 'workflow',
  name: 'Workflow & Automation',
  icon: '🔄'
};

const workflowView = new WorkflowAutomationView(container, eventBus, viewConfig);
await workflowView.initialize();
await workflowView.render();
```

### In Terminal Mode

```javascript
const workflowView = new WorkflowAutomationView(null, eventBus, viewConfig);
await workflowView.render({ mode: 'terminal' });
```

## Event Integration

The view emits events through the EventBus:

```javascript
// Tool execution
eventBus.on('tool:execute', (data) => {
  console.log(`Tool ${data.tool} executed with params:`, data.params);
});

// Tool results
eventBus.on('tool:executed', (data) => {
  console.log(`Tool ${data.tool} completed:`, data.result);
});
```

## Styling

The view includes comprehensive CSS styling for:
- Dark theme with Auggie Flow branding
- Responsive design for mobile devices
- Smooth transitions and animations
- Drag-and-drop visual feedback
- Status indicators and progress bars

## File Location

- **Main View**: `/src/ui/web-ui/views/WorkflowAutomationView.js`
- **Test File**: `/tests/web-ui/test-workflow-view.js`
- **Documentation**: `/docs/ui/workflow-automation-view.md`

## Integration Points

1. **UIManager**: Registered as 'WorkflowAutomationView' component
2. **MCPIntegrationLayer**: Executes all 11 workflow tools
3. **EventBus**: Handles tool execution and results
4. **ViewManager**: Manages view lifecycle and transitions

## Future Enhancements

1. **Workflow Marketplace** - Share and download workflow templates
2. **Version Control** - Track workflow changes over time
3. **Collaboration** - Multi-user workflow editing
4. **Analytics** - Workflow performance metrics
5. **AI Suggestions** - Smart workflow recommendations