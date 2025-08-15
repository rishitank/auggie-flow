# Initialization Scenarios and Examples

## Overview

This guide provides detailed examples of different initialization scenarios for various project types, team setups, and development workflows. Each scenario includes complete setup instructions and expected outcomes.

## Scenario Categories

### 1. New Project Scenarios
### 2. Existing Project Migration
### 3. Team Setup Scenarios
### 4. Specialized Project Types
### 5. Enterprise Deployments

---

## 1. New Project Scenarios

### Scenario 1.1: Solo Developer - Web Application

**Context:** Individual developer starting a new React web application

```bash
# Quick optimized setup
npx -y auggie-flow@latest init --sparc --force

# Verify setup
./auggie-flow sparc modes
./auggie-flow status
```

**Expected Output:**
```
📁 Initializing in: /home/dev/my-web-app
🚀 Initializing SPARC development environment...
  ✓ Created CLAUDE.md (SPARC-enhanced)
  ✓ Created memory-bank.md
  ✓ Created coordination.md
  ✓ Created memory/ directory
  ✓ Created .claude/commands/ directory
  ✅ SPARC environment initialized successfully
  ✓ Created 20+ Auggie Code slash commands

Next steps:
1. Review and customize the generated files for your project
2. Run './auggie-flow start' to begin the orchestration system
3. Use './auggie-flow' instead of 'npx auggie-flow' for all commands
4. Use 'claude --dangerously-skip-permissions' for unattended operation
5. Use Auggie Code slash commands: /sparc, /sparc-architect, /sparc-tdd, etc.
```

**Follow-up Tasks:**
```bash
# Start development workflow
./auggie-flow sparc "create React app with routing and state management"

# Verify SPARC modes available
./auggie-flow sparc modes --verbose
```

### Scenario 1.2: Team Lead - Microservices Project

**Context:** Team lead setting up a new microservices architecture project

```bash
# Initialize with force for latest optimizations
mkdir microservices-project && cd microservices-project
npx -y auggie-flow@latest init --sparc --force

# Customize for microservices
./auggie-flow sparc run architect "design microservices architecture"
```

**Custom Configuration:**
Create `microservices-config.json`:
```json
{
  "services": ["user-service", "auth-service", "api-gateway"],
  "database": "postgresql",
  "messaging": "rabbitmq",
  "deployment": "kubernetes"
}
```

**Team Setup:**
```bash
# Create team-specific modes
./auggie-flow config set team.size 8
./auggie-flow config set team.experience "senior"
./auggie-flow config set project.type "microservices"

# Generate service templates
for service in user-service auth-service api-gateway; do
  ./auggie-flow sparc run architect "design $service with PostgreSQL and Docker"
done
```

### Scenario 1.3: Startup - MVP Development 

**Context:** Startup team building an MVP quickly

```bash
# Fast MVP setup
npx -y auggie-flow@latest init --sparc --force
./auggie-flow config set development.speed "fast"
./auggie-flow config set quality.threshold 0.7  # Lower for MVP

# Start MVP development
./auggie-flow sparc "build user authentication and basic CRUD API"
```

**MVP-Specific CLAUDE.md customization:**
```markdown
## MVP Development Focus
- Speed over perfection
- Core features only
- 70% test coverage minimum
- Deploy early, iterate fast
- Technical debt acceptable for now
```

---

## 2. Existing Project Migration

### Scenario 2.1: Legacy Codebase Integration

**Context:** Adding Claude-Flow to existing 2-year-old Node.js project

```bash
# Backup existing configuration
cp -r . ../project-backup

# Initialize in existing project
npx auggie-flow@latest init --sparc --force

# Review generated vs existing files
diff CLAUDE.md CLAUDE.md.backup || echo "New file created"
```

**Migration Checklist:**
- [ ] Backup existing files
- [ ] Run init with --force
- [ ] Merge existing documentation
- [ ] Update .gitignore
- [ ] Test with simple SPARC command
- [ ] Train team on new workflow

**Example Migration Script:**
```bash
#!/bin/bash
# migrate-to-auggie-flow.sh

echo "🔄 Migrating existing project to Claude-Flow..."

# Backup
mkdir -p migration-backup
cp README.md migration-backup/ 2>/dev/null || true
cp package.json migration-backup/
cp -r docs/ migration-backup/ 2>/dev/null || true

# Initialize
npx -y auggie-flow@latest init --sparc --force

# Merge existing docs
if [ -f migration-backup/README.md ]; then
  echo "## Existing Documentation" >> CLAUDE.md
  cat migration-backup/README.md >> CLAUDE.md
fi

echo "✅ Migration complete. Review CLAUDE.md and test with:"
echo "   ./auggie-flow sparc modes"
```

### Scenario 2.2: Converting from Other AI Tools

**Context:** Team switching from GitHub Copilot to Claude-Flow

```bash
# Remove existing AI tool configurations
rm -rf .github/copilot/
rm .vscode/extensions.json 2>/dev/null || true

# Initialize Claude-Flow
npx -y auggie-flow@latest init --sparc --force

# Configure for team transition
echo "# Migration from GitHub Copilot

## Key Differences
- Use './auggie-flow sparc' instead of copilot suggestions
- SPARC methodology provides structured development
- Memory system maintains context across sessions
- Multi-agent coordination for complex tasks

## Training Schedule
- Week 1: Basic SPARC commands
- Week 2: TDD workflow
- Week 3: Advanced coordination
- Week 4: Full workflow adoption
" >> CLAUDE.md
```

---

## 3. Team Setup Scenarios

### Scenario 3.1: Large Development Team (20+ developers)

**Context:** Enterprise team with multiple squads

```bash
# Initialize shared configuration
npx -y auggie-flow@latest init --sparc --force

# Configure for large team
./auggie-flow config set team.size 25
./auggie-flow config set coordination.strategy "hierarchical"
./auggie-flow config set memory.sharedAccess true
```

**Team-Specific Directory Structure:**
```
project/
├── teams/
│   ├── frontend-squad/
│   │   └── CLAUDE-frontend.md
│   ├── backend-squad/
│   │   └── CLAUDE-backend.md
│   └── platform-squad/
│       └── CLAUDE-platform.md
├── shared/
│   ├── standards.md
│   └── workflows.md
└── CLAUDE.md  # Main configuration
```

**Squad-Specific Setup:**
```bash
# Frontend squad
cd teams/frontend-squad
./auggie-flow config set focus "react,typescript,testing"
./auggie-flow sparc run architect "component library architecture"

# Backend squad  
cd teams/backend-squad
./auggie-flow config set focus "nodejs,postgresql,api-design"
./auggie-flow sparc run architect "microservices with GraphQL"
```

### Scenario 3.2: Distributed Remote Team

**Context:** Global team across time zones

```bash
# Initialize with async-friendly settings
npx -y auggie-flow@latest init --sparc --force
./auggie-flow config set team.distribution "global"
./auggie-flow config set workflow.async true
```

**Async Workflow Configuration:**
```markdown
## Remote Team Workflow

### Time Zone Considerations
- All communication in memory system
- Async code reviews via ./auggie-flow review
- Daily sync via shared memory queries
- Documentation-first development

### Memory Usage Patterns
- Store decisions: ./auggie-flow memory store decision-2024-06-16 "API versioning strategy"
- Share context: ./auggie-flow memory store context-feature-auth "Current auth implementation status"
- Query updates: ./auggie-flow memory query --since yesterday
```

### Scenario 3.3: Junior Developer Onboarding

**Context:** Onboarding new junior developers

```bash
# Initialize with learning mode
npx -y auggie-flow@latest init --sparc --force
./auggie-flow config set learning.mode true
./auggie-flow config set assistance.level "high"
```

**Learning-Focused CLAUDE.md:**
```markdown
## Junior Developer Guidance

### Learning Path
1. Start with ./auggie-flow sparc tdd "simple function"
2. Progress to ./auggie-flow sparc run architect "small component"
3. Practice with ./auggie-flow sparc run code "feature implementation"
4. Advanced: ./auggie-flow swarm "complex feature"

### Code Review Process
- Every commit includes ./auggie-flow sparc run review
- Pair programming with senior dev weekly
- Documentation required for all features
- Test coverage minimum 85%

### Available Learning Commands
- /sparc-learn - Step-by-step learning mode
- /sparc-explain - Explain code concepts
- /sparc-best-practices - Show best practices for current task
```

---

## 4. Specialized Project Types

### Scenario 4.1: Machine Learning Project

**Context:** Data science team building ML models

```bash
# ML-focused initialization
npx -y auggie-flow@latest init --sparc --force

# Add ML-specific modes
echo '{
  "ml-data-prep": {
    "description": "Data preparation and feature engineering",
    "systemPrompt": "Focus on data quality, feature engineering, and pipeline creation...",
    "tools": ["pandas", "sklearn", "jupyter"]
  },
  "ml-model-dev": {
    "description": "Model development and training",
    "systemPrompt": "Develop, train, and validate machine learning models...",
    "tools": ["tensorflow", "pytorch", "mlflow"]
  },
  "ml-deploy": {
    "description": "Model deployment and monitoring",
    "systemPrompt": "Deploy models to production with monitoring...",
    "tools": ["docker", "kubernetes", "prometheus"]
  }
}' > .roomodes.ml
```

**ML Workflow:**
```bash
# Data exploration
./auggie-flow sparc run ml-data-prep "analyze customer dataset for churn prediction"

# Model development
./auggie-flow sparc run ml-model-dev "build XGBoost classifier with hyperparameter tuning"

# Model deployment
./auggie-flow sparc run ml-deploy "deploy model to Kubernetes with A/B testing"
```

### Scenario 4.2: DevOps Infrastructure Project

**Context:** DevOps team managing infrastructure as code

```bash
# DevOps-focused setup
npx -y auggie-flow@latest init --sparc --force

# Configure for infrastructure
./auggie-flow config set project.type "infrastructure"
./auggie-flow config set tools.primary "terraform,ansible,kubernetes"
```

**Infrastructure-Specific Modes:**
```bash
# Add to .roomodes
./auggie-flow config add-mode infra-design "Design cloud infrastructure architecture"
./auggie-flow config add-mode infra-code "Write Terraform and Ansible code"
./auggie-flow config add-mode infra-security "Security review for infrastructure"
./auggie-flow config add-mode infra-monitor "Set up monitoring and alerting"
```

**DevOps Workflow:**
```bash
# Infrastructure design
./auggie-flow sparc run infra-design "AWS architecture for high-availability web app"

# Infrastructure as code
./auggie-flow sparc run infra-code "Terraform modules for EKS cluster"

# Security review
./auggie-flow sparc run infra-security "review security groups and IAM policies"
```

### Scenario 4.3: Mobile App Development

**Context:** Mobile team building React Native app

```bash
# Mobile-focused initialization
mkdir mobile-app && cd mobile-app
npx -y auggie-flow@latest init --sparc --force

# Configure for mobile development
./auggie-flow config set platform "mobile"
./auggie-flow config set framework "react-native"
```

**Mobile-Specific Configuration:**
```markdown
## Mobile Development Configuration

### Platform Considerations
- iOS and Android compatibility
- Performance optimization critical
- Offline-first approach
- Battery usage optimization

### Testing Strategy
- Unit tests with Jest
- Component tests with React Native Testing Library
- E2E tests with Detox
- Device testing on multiple form factors

### Deployment Pipeline
- Automated builds with Fastlane
- App Store and Play Store deployment
- Beta testing with TestFlight/Internal Testing
```

---

## 5. Enterprise Deployments

### Scenario 5.1: Enterprise with Compliance Requirements

**Context:** Financial services company with SOX compliance

```bash
# Compliance-aware initialization
npx -y auggie-flow@latest init --sparc --force
./auggie-flow config set compliance.required true
./auggie-flow config set audit.logging true
```

**Compliance Configuration:**
```markdown
## Compliance Requirements

### SOX Compliance
- All code changes must be reviewed
- Audit trail for all AI-generated code
- Change control process mandatory
- Security review required for all features

### AI Code Review Process
1. ./auggie-flow sparc run code "feature implementation"
2. ./auggie-flow sparc run security-review "compliance check"
3. Human senior developer review
4. Compliance officer approval
5. Deployment approval

### Audit Commands
- ./auggie-flow audit log --since "2024-01-01"
- ./auggie-flow audit export --format compliance
- ./auggie-flow memory export audit-backup.json
```

### Scenario 5.2: Enterprise Multi-Region Deployment

**Context:** Global enterprise with regional teams

```bash
# Multi-region setup
for region in us-east eu-west asia-pacific; do
  mkdir -p regions/$region
  cd regions/$region
  npx -y auggie-flow@latest init --sparc --force --region $region
  cd ../..
done
```

**Regional Configuration:**
```bash
# US East (primary)
cd regions/us-east
./auggie-flow config set region.primary true
./auggie-flow config set timezone "America/New_York"

# EU West
cd regions/eu-west  
./auggie-flow config set region.gdpr true
./auggie-flow config set timezone "Europe/London"

# Asia Pacific
cd regions/asia-pacific
./auggie-flow config set region.latency-sensitive true
./auggie-flow config set timezone "Asia/Tokyo"
```

---

## Troubleshooting Common Scenarios

### Issue 1: Permission Denied During Init

**Symptom:**
```
Error: Permission denied creating directory '.claude'
```

**Solution:**
```bash
# Check directory permissions
ls -la

# Fix permissions
sudo chown -R $USER:$USER .
chmod 755 .

# Retry initialization
npx auggie-flow@latest init --sparc --force
```

### Issue 2: Existing Files Conflict

**Symptom:**
```
Warning: The following files already exist: CLAUDE.md, .roomodes
Use --force to overwrite existing files
```

**Solution:**
```bash
# Backup existing files
mkdir backup-$(date +%Y%m%d)
cp CLAUDE.md .roomodes backup-$(date +%Y%m%d)/

# Force initialization
npx auggie-flow@latest init --sparc --force

# Merge important customizations
# Review backup files and merge needed changes
```

### Issue 3: Network Issues During SPARC Setup

**Symptom:**
```
Error: create-sparc failed, creating basic SPARC structure manually...
```

**Solution:**
```bash
# Check network connectivity
curl -I https://registry.npmjs.org/create-sparc

# If network is fine, clear npm cache
npm cache clean --force

# Retry with verbose logging
npx auggie-flow@latest init --sparc --force --verbose
```

### Issue 4: Template Generation Errors

**Symptom:**
```
Error: Failed to generate template: ReferenceError: createSparcClaudeMd is not defined
```

**Solution:**
```bash
# Update to latest version
npm uninstall -g auggie-flow
npm install -g auggie-flow@latest

# Clear any cached templates
rm -rf ~/.npm/_cacache/

# Retry initialization
npx -y auggie-flow@latest init --sparc --force
```

## Validation Checklist

After any initialization scenario, verify:

- [ ] `./auggie-flow --version` works
- [ ] `./auggie-flow sparc modes` lists all modes
- [ ] `./auggie-flow status` shows healthy system
- [ ] Auggie Code slash commands available (type `/` in Auggie Code)
- [ ] Memory system initialized: `./auggie-flow memory stats`
- [ ] Test simple task: `./auggie-flow sparc "hello world function"`

## Next Steps

1. Choose the scenario that best matches your situation
2. Follow the step-by-step instructions
3. Customize configurations for your specific needs
4. Validate the setup using the checklist
5. Train your team on the new workflow

For additional help:
- [Troubleshooting Guide](./troubleshooting.md)
- [Best Practices](./best-practices.md)
- [Advanced Configuration](./advanced-configuration.md)