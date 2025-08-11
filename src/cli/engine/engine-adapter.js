import { execSync, spawn } from 'child_process';

export function detectEngine(preferred) {
  if (preferred) return preferred;
  try { execSync('command -v auggie', { stdio: 'ignore', shell: true }); return 'auggie'; } catch {}
  try { execSync('command -v claude', { stdio: 'ignore', shell: true }); return 'claude'; } catch {}
  return 'claude';
}

export function resolveEngine() {
  const env = process.env.AUGGIE_FLOW_ENGINE;
  return detectEngine(env);
}

export function spawnEngine(args, opts) {
  const engine = resolveEngine();
  return spawn(engine, args, opts);
}

