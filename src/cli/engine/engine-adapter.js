import { execSync, spawn } from 'child_process';

/**
 * Detects which engine to use based on preference and availability
 * @param {string} [preferred] - Preferred engine ('auggie' or 'claude')
 * @returns {string} The selected engine
 */
export function detectEngine(preferred) {
  if (preferred) {
    if (preferred !== 'auggie' && preferred !== 'claude') {
      console.warn(`Invalid engine preference: ${preferred}. Using default detection.`);
    } else {
      return preferred;
    }
  }
  try { execSync('command -v auggie', { stdio: 'ignore', shell: true }); return 'auggie'; } catch {}
  try { execSync('command -v claude', { stdio: 'ignore', shell: true }); return 'claude'; } catch {}
  return 'auggie';
}

/**
 * Resolves the engine to use based on environment configuration
 * @returns {string} The resolved engine
 */
export function resolveEngine() {
  const env = process.env.AUGGIE_FLOW_ENGINE;
  return detectEngine(env);
}

/**
 * Spawns an engine process with the given arguments
 * @param {string[]} args - Command line arguments
 * @param {object} opts - Spawn options
 * @returns {import('child_process').ChildProcess} The spawned process
 */
export function spawnEngine(args, opts) {
  if (!Array.isArray(args)) {
    throw new TypeError('args must be an array');
  }
  const engine = resolveEngine();
  return spawn(engine, args, opts);
}

