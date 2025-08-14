# Orchestrator + MCP migration notes (Auggie lane)

## What changed
- CLI alias: auggie-flow now points to the same dispatcher as auggie-flow
- Orchestrator lifecycle stubs: `orchestrator begin | continue | end`
  - Minimal placeholders to enable workflows/scripts to stabilize during migration
- MCP bridge: forward non-SPARC tools to an injected Auggie Code MCP client when present, with a tiny 2s in-memory cache

## Why
- Stabilize CLI surface for Auggie Flow users
- Provide a safe shim toward richer orchestrator lifecycle handling
- Improve MCP interoperability without large refactors

## Verify quickly
1) Check alias
   - `./auggie-flow --help` (should mirror `./auggie-flow --help`)
2) Orchestrator stubs
   - `./auggie-flow orchestrator begin`
   - `./auggie-flow orchestrator continue`
   - `./auggie-flow orchestrator end`
   - Expect informative stub messages
3) MCP pass-through (when MCP client injected)
   - Start Auggie Code MCP server and wrapper
   - Call a tool twice; the second call should hit the tiny cache

## Notes
- No behavior changes for existing commands
- The orchestrator stubs are intentionally minimal; deeper wiring can be layered incrementally
- The MCP cache (2s TTL) is conservative and only reduces immediate duplicate calls

## Next steps (optional)
- Wire orchestrator stubs to event bus + checkpoints
- Add unit tests for MCP forwarding and cache TTL
- Expand orchestrator lifecycle to support resumable checkpoints in core

