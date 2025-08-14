# Migrating from Auggie Flow to Auggie Flow

This guide explains how to use Auggie Flow while preserving backward compatibility with Auggie Flow commands.

- New binary: `auggie-flow` (parallel to `auggie-flow`)
- Engine preference: set `AUGGIE_FLOW_ENGINE=auggie` to force using Auggie CLI
- UI and orchestration commands now reference Auggie where available

Common commands:
- `auggie-flow help`
- `AUGGIE_FLOW_ENGINE=auggie auggie-flow swarm ...`
- `AUGGIE_FLOW_ENGINE=auggie node src/cli/simple-cli.js ...`

Notes:
- If `auggie` is not installed, the system falls back to `claude` when possible.
- You can override the flow binary via `AUGGIE_FLOW_BIN=auggie-flow` for UI spawns.

