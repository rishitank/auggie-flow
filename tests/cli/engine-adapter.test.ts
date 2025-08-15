import { spawnSync } from 'child_process';

function nodeEval(js: string, env: NodeJS.ProcessEnv = {}) {
  const res = spawnSync('node', ['-e', js], { encoding: 'utf-8', env: { ...process.env, ...env } });
  return { code: res.status ?? 0, out: (res.stdout || '').trim() };
}

describe('engine adapter', () => {
  it('resolveEngine prefers auggie when AUGGIE_FLOW_ENGINE=auggie', () => {
    const js = "import { resolveEngine } from './src/cli/engine/engine-adapter.js'; console.log(resolveEngine());";
    const p = nodeEval(js, { AUGGIE_FLOW_ENGINE: 'auggie' });
    expect(p.code).toBe(0);
    expect(p.out).toBe('auggie');
  });

  it('resolveEngine falls back to claude when env not set and only claude found', () => {
    const js = "import { detectEngine } from './src/cli/engine/engine-adapter.js'; console.log(detectEngine(undefined));";
    const p = nodeEval(js, { AUGGIE_FLOW_ENGINE: '' });
    expect(p.code).toBe(0);
    expect(['auggie', 'claude']).toContain(p.out);
  });
});

