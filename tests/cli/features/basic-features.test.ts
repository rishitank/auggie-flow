import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '../../..');

function run(args: string[], env: NodeJS.ProcessEnv = {}) {
  const res = spawnSync('node', [path.join(root, 'bin/auggie-flow.js'), ...args], {
    encoding: 'utf-8',
    env: { ...process.env, CLAUDE_FLOW_ENV: 'test', AUGGIE_FLOW_ENGINE: 'auggie', ...env },
  });
  return { code: res.status ?? 0, out: (res.stdout || '') + (res.stderr || '') };
}

describe('Auggie Flow basic CLI features', () => {
  it('swarm with objective exits 0', () => {
    const p = run(['swarm', 'build a demo']);
    expect(p.code).toBe(0);
  });

  it('terminal pool status exits 0 and prints status', () => {
    const p = run(['terminal', 'pool', 'status']);
    expect(p.code).toBe(0);
    expect(p.out).toMatch(/Terminal Pool Status|Terminal Pool/);
  });

  it('project create exits 0 and prints confirmation', () => {
    const p = run(['project', 'create', 'sample-app']);
    expect(p.code).toBe(0);
    expect(p.out).toMatch(/Creating project: sample-app|Project/);
  });
});

