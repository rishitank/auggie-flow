import { execSync, spawn } from 'child_process';

export type Engine = 'auggie' | 'claude';

export function detectEngine(preferred?: Engine): Engine {
  if (preferred) return preferred;
  try { execSync('command -v auggie', { stdio: 'ignore', shell: true }); return 'auggie'; } catch {}
  try { execSync('command -v claude', { stdio: 'ignore', shell: true }); return 'claude'; } catch {}
  return 'claude';
}

export function resolveEngine(): Engine {
  const env = process.env.AUGGIE_FLOW_ENGINE as Engine | undefined;
  return detectEngine(env);
}

export function spawnEngine(args: string[], opts: Parameters<typeof spawn>[2]) {
  const engine = resolveEngine();
  return spawn(engine, args, opts);
}

