#!/usr/bin/env node
/*
  Run a lane's auggie plan non-interactively using the globally installed 'auggie' CLI.
  Usage: node scripts/run-lane-auggie.cjs <laneWorktreeDir>
  - Reads <laneWorktreeDir>/logs/instruction.txt
  - Spawns 'auggie' with --workspace-root <laneWorktreeDir> and sub-agent rules
  - Writes stdout to <laneWorktreeDir>/logs/plan.out and stderr to <laneWorktreeDir>/logs/plan.err
*/
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn, execSync } = require('child_process');

function now() { return new Date().toISOString(); }

function main() {
  const laneDir = process.argv[2];
  if (!laneDir) {
    console.error('Lane worktree directory is required');
    process.exit(2);
  }
  const absLane = path.resolve(laneDir);
  const logsDir = path.join(absLane, 'logs');
  const instrFile = path.join(logsDir, 'instruction.txt');
  const planOut = path.join(logsDir, 'plan.out');
  const planErr = path.join(logsDir, 'plan.err');
  if (!fs.existsSync(instrFile)) {
    fs.mkdirSync(logsDir, { recursive: true });
    fs.writeFileSync(planErr, `[${now()}] instruction.txt not found at ${instrFile}\n`);
    console.error('instruction.txt not found');
    process.exit(3);
  }
  const instruction = fs.readFileSync(instrFile, 'utf8');

  // Resolve global auggie
  let auggieBin = process.env.AUGGIE_BIN || 'auggie';
  // Prepend npm global bin to PATH
  try {
    const globalBin = execSync('npm bin -g', { stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();
    process.env.PATH = `${globalBin}:${process.env.PATH || ''}`;
  } catch {}

  // Ensure rules path
  const rulesPath = path.join(os.homedir(), '.augment', 'rules', 'sub-agent-orchestration.md');

  // Open output streams
  const out = fs.createWriteStream(planOut, { flags: 'w' });
  const err = fs.createWriteStream(planErr, { flags: 'w' });
  out.write(`[${now()}] Running auggie in ${absLane}\n`);

  const args = [
    '--print', instruction,
    '--workspace-root', absLane,
    '--rules', rulesPath,
    '--compact',
    '--model', 'gpt5',
  ];

  const child = spawn(auggieBin, args, {
    cwd: absLane,
    env: {
      ...process.env,
      AUGMENT_SESSION_AUTH: process.env.AUGMENT_SESSION_AUTH || (fs.existsSync(path.join(os.homedir(), '.augment', 'session.json')) ? fs.readFileSync(path.join(os.homedir(), '.augment', 'session.json'), 'utf8') : ''),
    },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  child.stdout.pipe(out);
  child.stderr.pipe(err);

  child.on('error', (e) => {
    err.write(`[${now()}] auggie spawn error: ${e.message}\n`);
  });

  child.on('exit', (code) => {
    out.write(`\n[${now()}] auggie exited with code ${code}\n`);
    out.end();
    err.end();
    process.exit(code || 0);
  });
}

main();

