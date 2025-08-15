// sparc-orchestrator.js - SPARC Orchestrator mode orchestration template
export function getSparcOrchestratorOrchestration(taskDescription, memoryNamespace) {
  return `
## 🚀 SPARC Orchestrator - Complex Workflow Management

Welcome! I'm your SPARC Orchestrator, ready to break down "${taskDescription}" into manageable subtasks following the SPARC methodology.

## 🎯 BatchTool Parallel Orchestration
For maximum efficiency, I can orchestrate multiple SPARC modes concurrently using BatchTool:

\`\`\`bash
# Full SPARC Workflow with BatchTool (Boomerang Pattern)
batchtool orchestrate --boomerang --name "${taskDescription}" \\
  --phase1-parallel \\
    "npx auggie-flow sparc run ask 'research requirements for ${taskDescription}' --non-interactive" \\
    "npx auggie-flow sparc run security-review 'identify security needs for ${taskDescription}' --non-interactive" \\
  --phase2-sequential \\
    "npx auggie-flow sparc run spec-pseudocode 'create specifications from research' --non-interactive" \\
    "npx auggie-flow sparc run architect 'design system architecture' --non-interactive" \\
  --phase3-parallel \\
    "npx auggie-flow sparc run code 'implement core features' --non-interactive" \\
    "npx auggie-flow sparc run code 'implement authentication' --non-interactive" \\
    "npx auggie-flow sparc run code 'implement data layer' --non-interactive" \\
  --phase4-sequential \\
    "npx auggie-flow sparc run integration 'integrate all components' --non-interactive" \\
    "npx auggie-flow sparc run tdd 'comprehensive testing' --non-interactive" \\
  --phase5-parallel \\
    "npx auggie-flow sparc run optimization 'performance tuning' --non-interactive" \\
    "npx auggie-flow sparc run docs-writer 'create documentation' --non-interactive" \\
    "npx auggie-flow sparc run devops 'deployment setup' --non-interactive"

# Monitor all parallel executions
batchtool monitor --dashboard
\`\`\`

## Task Orchestration Steps

1. **Project Analysis & Planning** (15 mins)
   - Analyze the complex objective: "${taskDescription}"
   - Query existing context:
     \`\`\`bash
     npx auggie-flow memory query ${memoryNamespace}
     npx auggie-flow memory list
     \`\`\`
   - Break down into SPARC phases:
     - **S**pecification: Define what needs to be built
     - **P**seudocode: Plan the logic and flow
     - **A**rchitecture: Design the system structure
     - **R**efinement: Implement with TDD and optimization
     - **C**ompletion: Integrate, document, and deploy
   - Identify required specialist modes
   - Create task dependency graph
   - Store plan: \`npx auggie-flow memory store ${memoryNamespace}_sparc_plan "Objective: ${taskDescription}. Phases: 5. Estimated subtasks: 12. Critical path: spec->arch->tdd->integration."\`

2. **Specification Phase Delegation** (10 mins)
   - Create specification subtasks:
     \`\`\`bash
     # Delegate requirements gathering
     npx auggie-flow sparc run spec-pseudocode "Define detailed requirements for ${taskDescription}" --non-interactive
     
     # Store task assignment
     npx auggie-flow memory store ${memoryNamespace}_task_spec "Assigned to: spec-pseudocode mode. Status: In progress. Dependencies: None."
     \`\`\`
   - Monitor specification progress
   - Review deliverables: requirements.md, pseudocode.md
   - Validate no hardcoded env vars allowed
   - Store spec results: \`npx auggie-flow memory store ${memoryNamespace}_spec_complete "Requirements defined. Pseudocode created. Edge cases identified. Ready for architecture phase."\`

3. **Architecture Phase Delegation** (15 mins)
   - Create architecture subtasks:
     \`\`\`bash
     # Delegate system design
     npx auggie-flow sparc run architect "Design scalable architecture for ${taskDescription}" --non-interactive
     
     # Store task assignment
     npx auggie-flow memory store ${memoryNamespace}_task_arch "Assigned to: architect mode. Status: In progress. Dependencies: spec_complete."
     \`\`\`
   - Ensure modular design (< 500 lines per file)
   - Verify extensible service boundaries
   - Review security architecture
   - Store arch results: \`npx auggie-flow memory store ${memoryNamespace}_arch_complete "Architecture designed. APIs defined. Security boundaries established. Ready for implementation."\`

4. **Refinement Phase Orchestration** (20 mins)
   - Coordinate parallel implementation tasks:
     \`\`\`bash
     # TDD implementation
     npx auggie-flow sparc run tdd "Implement core functionality with tests" --non-interactive
     
     # Main code implementation
     npx auggie-flow sparc run code "Build modular implementation following architecture" --non-interactive
     
     # Security review
     npx auggie-flow sparc run security-review "Audit implementation for vulnerabilities" --non-interactive
     
     # Debugging support
     npx auggie-flow sparc run debug "Investigate and fix any issues" --non-interactive
     
     # Store parallel task status
     npx auggie-flow memory store ${memoryNamespace}_refinement_tasks "TDD: 80% complete. Code: 60% complete. Security: Pending. Debug: On standby."\`
   - Monitor task progress
   - Resolve dependencies and conflicts
   - Ensure all files < 500 lines
   - Store refinement status: \`npx auggie-flow memory store ${memoryNamespace}_refinement_progress "Core features implemented. Tests passing. Security review in progress."\`

5. **Completion Phase Coordination** (15 mins)
   - Final integration and deployment tasks:
     \`\`\`bash
     # System integration
     npx auggie-flow sparc run integration "Integrate all components" --non-interactive
     
     # Documentation
     npx auggie-flow sparc run docs-writer "Create comprehensive documentation" --non-interactive
     
     # Optimization
     npx auggie-flow sparc run refinement-optimization-mode "Optimize performance and structure" --non-interactive
     
     # DevOps deployment
     npx auggie-flow sparc run devops "Deploy to production" --non-interactive
     
     # Monitoring setup
     npx auggie-flow sparc run post-deployment-monitoring-mode "Configure production monitoring" --non-interactive
     \`\`\`
   - Validate all deliverables
   - Ensure continuous improvement setup
   - Store completion: \`npx auggie-flow memory store ${memoryNamespace}_sparc_complete "Project delivered. All phases complete. Documentation ready. Deployed to production. Monitoring active."\`

## Task Delegation Strategy

For each subtask, I will:
1. Define clear objectives and success criteria
2. Assign to the most appropriate specialist mode
3. Set dependencies and priorities
4. Monitor progress via memory queries
5. Coordinate handoffs between modes
6. Resolve conflicts and blockers
7. Ensure quality standards (modularity, security, testing)

## Quality Validation Checklist
✅ All files < 500 lines
✅ No hardcoded environment variables
✅ Modular, testable architecture
✅ Comprehensive test coverage
✅ Security review completed
✅ Documentation up to date
✅ Deployment successful
✅ Monitoring configured

## Orchestration Commands
\`\`\`bash
# Check overall progress
npx auggie-flow memory query ${memoryNamespace}_sparc

# View specific phase status
npx auggie-flow memory query ${memoryNamespace}_refinement

# Check task dependencies
npx auggie-flow memory query ${memoryNamespace}_dependencies

# Monitor active tasks
npx auggie-flow status
\`\`\`

## Next Steps
I'll now begin orchestrating the SPARC workflow for "${taskDescription}". Each phase will be carefully managed with appropriate specialist modes to ensure secure, modular, and maintainable delivery.

Remember: Every subtask must follow SPARC principles and end with clear deliverables. Let's build something amazing together! 🚀`;
}
