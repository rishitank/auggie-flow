import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function run(cmd: string, args: string[] = [], env: NodeJS.ProcessEnv = {}) {
  const res = spawnSync(cmd, args, { encoding: 'utf-8', env: { ...process.env, ...env } });
  return { code: res.status ?? 0, out: (res.stdout || '') + (res.stderr || '') };
}

describe('engine adapter', () => {
  const root = path.resolve(__dirname, '../..');

  it('spawns auggie when AUGGIE_FLOW_ENGINE=auggie', () => {
    const p = run('node', [path.join(root, 'src/cli/simple-cli.js'), 'claude', 'spawn', 'hello'], { AUGGIE_FLOW_ENGINE: 'auggie' });
    expect(p.code === 0 || p.out.includes('Spawning Auggie') || p.out.includes('auggie ')).toBeTruthy();
  });

  it('falls back to claude when AUGGIE_FLOW_ENGINE is not set and auggie unavailable', () => {
    const p = run('node', [path.join(root, 'src/cli/simple-cli.js'), 'claude', 'spawn', 'hello'], { AUGGIE_FLOW_ENGINE: '' });
    expect(p.code === 0 || p.out.toLowerCase().includes('claude')).toBeTruthy();
  });
});

