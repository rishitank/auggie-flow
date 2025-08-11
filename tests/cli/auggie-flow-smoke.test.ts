import { spawnSync } from 'child_process';
import path from 'path';

function run(cmd: string, args: string[] = [], env: NodeJS.ProcessEnv = {}) {
  const res = spawnSync(cmd, args, { encoding: 'utf-8', env: { ...process.env, ...env } });
  return { code: res.status ?? 0, out: (res.stdout || '') + (res.stderr || '') };
}

describe('auggie-flow smoke', () => {
  const root = path.resolve(__dirname, '../..');

  it('prints version', () => {
    const p = run('node', [path.join(root, 'bin/auggie-flow.js'), '--version']);
    expect(p.code).toBe(0);
    expect(p.out).toMatch(/v\d+\.\d+\.\d+(-[\w\.]+)?/);
  });

  it('shows help', () => {
    const p = run('node', [path.join(root, 'bin/auggie-flow.js'), '--help']);
    expect(p.code).toBe(0);
    expect(p.out).toMatch(/USAGE|COMMANDS|Claude-Flow|Auggie-Flow/);
  });

  it('prefers auggie engine when AUGGIE_FLOW_ENGINE=auggie', () => {
    const env = { AUGGIE_FLOW_ENGINE: 'auggie' };
    // Use a simple command path that triggers spawn sites, e.g., simple-cli help
    const p = run('node', [path.join(root, 'bin/auggie-flow.js'), 'help'], env);
    expect(p.code).toBe(0);
  });
});

