// architect.js - Architect mode orchestration template
export function getArchitectOrchestration(taskDescription, memoryNamespace) {
  return `
## Task Orchestration Steps

1. **Requirements Analysis** (10 mins)
   - Analyze the user's request: "${taskDescription}"
   - Query existing project context: \`npx auggie-flow memory query ${memoryNamespace}\`
   - Identify core components, services, and modular boundaries
   - List external dependencies and integration points
   - Document scalability and security requirements
   - Store findings: \`npx auggie-flow memory store ${memoryNamespace}_requirements "Core components: X, Y, Z. External deps: API-A, Service-B. Security: OAuth2, RLS policies needed."\`

2. **System Architecture Design** (20 mins)
   - Create modular architecture diagram using Mermaid syntax
   - Define clear service boundaries and responsibilities
   - Design API contracts between components
   - Plan data flow and state management patterns
   - Ensure NO hardcoded secrets or env values in design
   - Create extensible integration points
   - Store architecture: \`npx auggie-flow memory store ${memoryNamespace}_architecture "Microservices: auth-service, user-service, data-processor. APIs: REST for external, gRPC for internal. State: Event-sourced with CQRS."\`

3. **Technical Specifications** (15 mins)
   - Define detailed interface contracts (OpenAPI/AsyncAPI)
   - Specify data models and database schemas
   - Plan security boundaries and authentication flows
   - Document performance and scaling considerations
   - Define configuration management strategy
   - Store specs: \`npx auggie-flow memory store ${memoryNamespace}_tech_specs "Auth: JWT with refresh tokens. DB: PostgreSQL with read replicas. Cache: Redis. Config: Environment-based with secrets manager."\`

4. **Modular Implementation Plan** (10 mins)
   - Break system into modules < 500 lines each
   - Create development phases with clear milestones
   - Define testing strategy (unit, integration, e2e)
   - Plan deployment and rollback procedures
   - Identify tasks for other SPARC modes
   - Store plan: \`npx auggie-flow memory store ${memoryNamespace}_implementation_plan "Phase 1: Core auth (tdd mode). Phase 2: User management (code mode). Phase 3: Integration (integration mode)."\`

5. **Directory Safety**
   - **IMPORTANT**: All files should be created in the current working directory
   - **DO NOT** create files in system directories or node_modules
   - For named projects, create a subdirectory: \\\`mkdir project-name && cd project-name\\\`
   - Use relative paths from your working directory
   - Example structure:
     \\\`\\\`\\\`
     ./ (current directory)
     ├── architecture/
     │   ├── system-overview.md
     │   └── api-specifications.md
     └── implementation-plan.md
     \\\`\\\`\\\`

6. **Deliverables**
   - architecture/
     - system-overview.md (with Mermaid diagrams)
     - api-specifications.md (OpenAPI/AsyncAPI specs)
     - data-models.md (schemas with relationships)
     - security-architecture.md (auth flows, boundaries)
     - deployment-architecture.md (infrastructure design)
   - implementation-plan.md (phased approach with SPARC mode assignments)

## Next Steps - Sequential and Background Execution
After completing architecture, delegate to appropriate modes:

### Sequential Mode (for simple tasks):
- \`npx auggie-flow sparc run spec-pseudocode "Create detailed pseudocode for ${taskDescription}" --non-interactive\`
- \`npx auggie-flow sparc run security-review "Review architecture for vulnerabilities" --non-interactive\`

### Background Swarm Mode (for complex implementation):
- \`npx auggie-flow swarm "Implement complete ${taskDescription} based on architecture" --strategy development --background --monitor\`
- \`npx auggie-flow swarm "Create comprehensive test suite for ${taskDescription}" --strategy testing --background --parallel\`
- \`npx auggie-flow swarm "Generate complete documentation for ${taskDescription}" --strategy research --background\`

## 🐝 Enhanced Architecture with Background Swarms
Leverage background swarm processing for complex architecture tasks:

\`\`\`bash
# Background research swarm for comprehensive analysis
npx auggie-flow swarm "Research and analyze all architectural patterns for ${taskDescription}" \\
  --strategy research --background --parallel --monitor \\
  --output ./architecture-research

# Background development swarm for proof of concepts
npx auggie-flow swarm "Create architectural proof of concepts and prototypes for ${taskDescription}" \\
  --strategy development --background --testing --monitor \\
  --output ./architecture-prototypes

# Background documentation swarm for comprehensive specs
npx auggie-flow swarm "Generate complete technical specifications and API documentation for ${taskDescription}" \\
  --strategy research --background --parallel \\
  --output ./architecture-docs

# Monitor all background swarms
npx auggie-flow status
npx auggie-flow monitor

# Sequential architecture refinement with background support
npx auggie-flow sparc run architect "Initial system design for ${taskDescription}" --non-interactive
npx auggie-flow swarm "Refine architecture based on security and performance analysis" \\
  --strategy optimization --background --review --testing \\
  --output ./architecture-refined
\`\`\`

## 🔄 Hybrid SPARC-Swarm Workflow
Combine SPARC modes with background swarms for optimal efficiency:

\`\`\`bash
# Phase 1: Quick architecture analysis (SPARC)
npx auggie-flow sparc run architect "Core system design" --non-interactive

# Phase 2: Parallel background research (Swarm)
npx auggie-flow swarm "Deep dive research into scalability patterns" --strategy research --background &
npx auggie-flow swarm "Security analysis and threat modeling" --strategy analysis --background &
npx auggie-flow swarm "Performance benchmarking and optimization research" --strategy optimization --background &

# Phase 3: Implementation swarm (Background)
npx auggie-flow swarm "Full implementation of ${taskDescription} architecture" \\
  --strategy development --background --parallel --monitor --testing \\
  --max-agents 8 --output ./implementation

# Monitor progress
npx auggie-flow status
tail -f ./swarm-runs/*/swarm.log
\`\`\``;
}
