#!/usr/bin/env node
/*
  Lane Poller (CJS): summarizes Auggie sub-agent lane status and appends to logs/lane-progress.log
  - Scans .worktrees/<lane>
  - Reports: branch exists, plan.out mtime, last commit, dirty status
  - Usage: node scripts/lane-poller.cjs [--watch] [--interval 300]
*/
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = process.cwd();
const WORKTREES_DIR = path.join(ROOT, '.worktrees');
const LOG_DIR = path.join(ROOT, 'logs');
const LOG_FILE = path.join(LOG_DIR, 'lane-progress.log');

function sh(cmd, cwd = ROOT) {
  try {
    return execSync(cmd, { cwd, stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();
  } catch (e) {
    return '';
  }
}

function listLanes() {
  if (!fs.existsSync(WORKTREES_DIR)) return [];
  return fs.readdirSync(WORKTREES_DIR).filter((d) => fs.statSync(path.join(WORKTREES_DIR, d)).isDirectory());
}

function fileMTime(p) {
  try { return fs.statSync(p).mtime; } catch { return null; }
}

function tailFile(p, n = 5) {
  try {
    const content = fs.readFileSync(p, 'utf8');
    const lines = content.split(/\r?\n/);
    return lines.slice(Math.max(0, lines.length - n)).join('\n');
  } catch { return ''; }
}

function summarizeLane(lane) {
  const lanePath = path.join(WORKTREES_DIR, lane);
  const branch = `feature/auggie-orchestration-${lane}`;
  const branchExists = sh(`git show-ref --verify --quiet refs/heads/${branch} && echo yes || echo no`) === 'yes';
  const planOut = path.join(lanePath, 'logs', 'plan.out');
  const planErr = path.join(lanePath, 'logs', 'plan.err');
  const planOutMTime = fileMTime(planOut);
  const planErrMTime = fileMTime(planErr);
  const planOutTail = tailFile(planOut, 5);
  const dirty = sh('git status --porcelain', lanePath);
  const head = sh('git log -1 --pretty=format:"%h %ad %s" --date=iso-strict', lanePath);
  const ahead = sh(`git rev-parse --abbrev-ref HEAD`, lanePath);
  return {
    lane,
    branch,
    branchExists,
    head,
    ahead,
    dirty: !!dirty,
    planOutMTime: planOutMTime ? planOutMTime.toISOString() : null,
    planErrMTime: planErrMTime ? planErrMTime.toISOString() : null,
    planOutTail,
  };
}

function formatSummary(entries) {
  const ts = new Date().toISOString();
  const lines = [];
  lines.push(`\n=== Lane status @ ${ts} ===`);
  for (const e of entries) {
    lines.push(`- ${e.lane}`);
    lines.push(`  branch: ${e.branch} (${e.branchExists ? 'present' : 'missing'})`);
    lines.push(`  head: ${e.head || 'n/a'} [${e.ahead || 'n/a'}]`);
    lines.push(`  dirty: ${e.dirty ? 'yes' : 'no'}`);
    lines.push(`  plan.out mtime: ${e.planOutMTime || 'n/a'}`);
    if (e.planOutTail) lines.push(`  plan.out tail:\n${e.planOutTail.split('\n').map(l=>`    ${l}`).join('\n')}`);
  }
  return lines.join('\n');
}

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
}

function runOnce() {
  const lanes = listLanes();
  const entries = lanes.map(summarizeLane);
  const summary = formatSummary(entries);
  ensureLogDir();
  fs.appendFileSync(LOG_FILE, summary + '\n');
  console.log(summary);
}

function main() {
  const args = process.argv.slice(2);
  const watch = args.includes('--watch');
  const idx = args.indexOf('--interval');
  const interval = idx !== -1 ? parseInt(args[idx + 1], 10) * 1000 : 300 * 1000;
  runOnce();
  if (!watch) return;
  setInterval(runOnce, interval);
}

main();

