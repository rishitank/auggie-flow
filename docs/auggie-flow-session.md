# Auggie Flow Migration – Session Context

Date: 2025-08-12
Umbrella branch: feature/auggie-orchestration
PR: https://github.com/rishitank/auggie-flow/pull/1

## High-level summary
- Goal: Migrate “Claude-Flow” to “Auggie Flow”, centralize engine spawning, add TDD smoke tests, and run multi-lane sub-agent orchestration to complete the migration reliably.
- Tests: Introduced focused smoke tests for CLI/version/help/engine and basic features (swarm, terminal pool status, project create). CI runs only smoke for now.
- Orchestration: Using Git worktrees as lanes plus non-interactive Auggie instructions. Poller added to track progress automatically.

## Sub-agent Orchestration Rules (user-level)
- File: ~/.augment/rules/sub-agent-orchestration.md
- Key additions:
  - Non-Interactive Auggie Sessions (Critical): Lanes must not prompt; supply defaults; continue end-to-end; output unified diffs + exact commit messages; summarize actions and assumptions.
  - Reusable instruction template appended to each lane instruction.
  - When already inside VibeTunnel, DO NOT run `vt auggie`; use global `auggie` directly. When not inside VT, run `vt auggie` inside `zsh -lic`.

## Lanes and current status
- ci-fix-2 (gatekeeper):
  - Objective: Regenerate lock (no downgrades); ensure `npm install` + `lint:core` + `typecheck` + smoke pass locally; align CI jobs accordingly.
  - Status: Running; plan.out started; proposing minimal diffs soon.
- pr-feedback:
  - Objective: Address CodeRabbit PR #1 comments with minimal, safe diffs.
  - Batch 1 (applied):
    - Fix Jest `moduleNameMapper` regex key in tests/jest.smoke.config.js.
    - Add child cleanup for tsx/npx tsx in bin/auggie-flow.js.
    - Include bin/auggie-flow.js in package.json "files".
    - Smoke PASS.
  - Batch 2: pending (will apply after CI is green).
- engine-adapter (planned next after above):
  - Remove remaining hard-coded `claude` spawns; route via spawnEngine; add tests.
- docs-examples (planned next):
  - Prefer auggie-flow usage in README/docs; document engine selection (AUGGIE_FLOW_ENGINE/AUGGIE_FLOW_BIN) and non-interactive guidance. Add example smoke where practical.
- orchestrator-mcp (parallel, later):
  - Minimal orchestrator CLI stubs (begin/continue/end) + optional MCP pass-through/cache (tiny TTL) + Playwright MCP validation (TDD).
- security-audit (parallel, later):
  - Dependabot, dependency-review, conditional npm audit, SECURITY.md.
- benchmarks-rename (parallel, later):
  - Gradually reduce “claude-flow” references in benchmark/ scripts and docs; keep backward-compat notes.

## CI strategy
- Test job: smoke only -> `npm test -- --config tests/jest.smoke.config.js`.
- Security/quality job: `npm run lint:core` (targets src/cli, src/cli/engine, src/swarm) + `npm run typecheck`.
- Goal: Keep PR green while legacy tests are migrated in lanes.

## Dependency/tooling alignment
- TypeScript: ^5.9.3.
- @typescript-eslint/{parser,eslint-plugin}: ^8.39.1.
- Removed meta devDependency `typescript-eslint` to avoid peer/ERESOLVE churn.
- tsconfig: `isolatedModules: true`, `skipLibCheck: true` (already set).

## Files changed so far (not exhaustive)
- tests/jest.smoke.config.js: mapper regex key fix (remove leading `/` delimiter in key string).
- bin/auggie-flow.js: add SIGTERM/SIGKILL child cleanup for tsx and npx tsx fallbacks.
- package.json: include bin/auggie-flow.js in "files" list; added `lint:core` script earlier.
- .github/workflows/ci.yml: run `lint:core` in security job; run smoke tests in test job.

## Outstanding “claude” references and spawn sites
- To be addressed in engine-adapter lane:
  - src/cli/simple-commands/automation-executor.js: replace direct `spawn(engine, ...)` with spawnEngine and default to auggie when selected.
  - src/swarm/executor.ts and src/swarm/executor-v2.ts: respect engine selection or route through spawnEngine.
  - src/swarm/claude-flow-executor.ts: prefer resolveEngine/spawnEngine where practical.
  - Note: src/swarm/claude-code-interface.ts already overrides executable to `auggie` when selected.

## Lane polling and monitoring
- Script: scripts/lane-poller.cjs (CommonJS to avoid ESM friction).
- Usage:
  - One-shot: `node scripts/lane-poller.cjs`
  - Watch: `node scripts/lane-poller.cjs --watch --interval 300`
- Output log: logs/lane-progress.log
- Shows: lane branches, plan.out mtime and tail, dirty status, HEAD commit.

## Lane spawning helper
- When already inside VibeTunnel: use global `auggie` (not `vt`), via helper:
  - Script: scripts/run-lane-auggie.cjs
  - Usage: `node scripts/run-lane-auggie.cjs .worktrees/<lane>` (reads `<lane>/logs/instruction.txt`, writes plan.out/plan.err)
- When not inside VT: run `vt auggie` within fresh login shell `zsh -lic`, with preflight (nvm node v24.5.0; export AUGMENT_SESSION_AUTH; PATH prepend node_modules/.bin).

## Current branch and PR
- Umbrella branch: feature/auggie-orchestration
- PR #1: https://github.com/rishitank/auggie-flow/pull/1
- CI: failing on install/typecheck (lock inconsistencies) prior to ci-fix-2; smoke remains green. ci-fix-2 will refresh lock and align CI jobs.

## How to resume
1) Poll lanes:
   - `node scripts/lane-poller.cjs` or `--watch --interval 300` for continuous.
   - Tail plans: `tail -n 80 .worktrees/ci-fix-2/logs/plan.out` and `.../pr-feedback/logs/plan.out`.
2) Apply lane diffs when plan.out proposes them:
   - Use the lane worktree; commit with the exact messages proposed; verify with `npm install`, `npm run lint:core`, `npm run typecheck`, smoke.
   - Merge lane commits into `feature/auggie-orchestration`; push.
3) Keep merge order to minimize conflicts and keep CI green:
   - 1) ci-fix-2 → 2) pr-feedback → 3) engine-adapter → 4) docs-examples → 5/6/7) orchestrator-mcp, security-audit, benchmarks-rename.
4) PR actions (title/body/comments) should use GitHub MCP server (not shell/gh) during reviews.

## Notes and decisions
- Never downgrade dependencies; only safe upgrades (explicitly: keep TS ^5.9.3; align @typescript-eslint to ^8.39.x).
- Sub-agent orchestration must be non-interactive; fill in defaults and proceed end-to-end; produce unified diffs and exact commit messages.
- Inside VT: do not run `vt`; run global `auggie` (or `npx auggie` if absent). Outside VT: run `vt auggie` via `zsh -lic` + preflight.
- CI intentionally limited to smoke while we stabilize; broader suites will be enabled lane-by-lane.

## Quick command crib
- Start poller: `node scripts/lane-poller.cjs --watch --interval 300`
- Run lane with global auggie (inside VT): `node scripts/run-lane-auggie.cjs .worktrees/ci-fix-2`
- Verify smoke locally: `npm test -- --config tests/jest.smoke.config.js`
- Lint core: `npm run lint:core`
- Typecheck: `npm run typecheck`

## Next milestones
- ci-fix-2: regenerate lock and turn PR #1 checks green.
- pr-feedback: Batch 2 minimal fixes; post checklist summary to PR (via MCP if available).
- engine-adapter + docs-examples: merge same day; keep smoke green.

