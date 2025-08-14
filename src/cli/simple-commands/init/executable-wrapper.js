// executable-wrapper.js - Create local executable wrapper

import { writeFile, chmod } from 'fs/promises';
import { platform } from 'os';

export async function createLocalExecutable(workingDir, dryRun = false) {
  try {
    if (platform() === 'win32') {
      // Create Windows batch file
      const wrapperScript = `@echo off
REM Claude-Flow local wrapper
REM This script ensures auggie-flow runs from your project directory

set PROJECT_DIR=%CD%
set PWD=%PROJECT_DIR%
set AUGGIE_WORKING_DIR=%PROJECT_DIR%

REM Try to find auggie-flow binary
REM Check common locations for npm/npx installations

REM 1. Local node_modules (npm install auggie-flow)
if exist "%PROJECT_DIR%\\node_modules\\.bin\\auggie-flow.cmd" (
  cd /d "%PROJECT_DIR%"
  "%PROJECT_DIR%\\node_modules\\.bin\\auggie-flow.cmd" %*
  exit /b %ERRORLEVEL%
)

REM 2. Parent directory node_modules (monorepo setup)
if exist "%PROJECT_DIR%\\..\\node_modules\\.bin\\auggie-flow.cmd" (
  cd /d "%PROJECT_DIR%"
  "%PROJECT_DIR%\\..\\node_modules\\.bin\\auggie-flow.cmd" %*
  exit /b %ERRORLEVEL%
)

REM 3. Global installation (npm install -g auggie-flow)
where auggie-flow >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  cd /d "%PROJECT_DIR%"
  auggie-flow %*
  exit /b %ERRORLEVEL%
)

REM 4. Fallback to npx (will download if needed)
cd /d "%PROJECT_DIR%"
npx auggie-flow@latest %*
`;

      // Write the Windows batch file
      if (!dryRun) {
        await writeFile(`${workingDir}/auggie-flow.cmd`, wrapperScript, 'utf8');
        console.log('  ✓ Created local auggie-flow.cmd executable wrapper');
        console.log('    You can now use: auggie-flow instead of npx auggie-flow');
      }
    } else {
      // Check if we're in development mode (claude-code-flow repo)
      const isDevelopment = workingDir.includes('claude-code-flow');
      const devBinPath = isDevelopment
        ? workingDir.split('claude-code-flow')[0] + 'claude-code-flow/bin/auggie-flow'
        : '';

      // Create Unix/Linux/Mac shell script
      const wrapperScript = `#!/usr/bin/env bash
# Claude-Flow local wrapper
# This script ensures auggie-flow runs from your project directory

# Save the current directory
PROJECT_DIR="\${PWD}"

# Set environment to ensure correct working directory
export PWD="\${PROJECT_DIR}"
export AUGGIE_WORKING_DIR="\${PROJECT_DIR}"

# Try to find auggie-flow binary
# Check common locations for npm/npx installations

${
  isDevelopment
    ? `# Development mode - use local bin
if [ -f "${devBinPath}" ]; then
  cd "\${PROJECT_DIR}"
  exec "${devBinPath}" "$@"
fi

`
    : ''
}# 1. Local node_modules (npm install auggie-flow)
if [ -f "\${PROJECT_DIR}/node_modules/.bin/auggie-flow" ]; then
  cd "\${PROJECT_DIR}"
  exec "\${PROJECT_DIR}/node_modules/.bin/auggie-flow" "$@"

# 2. Parent directory node_modules (monorepo setup)
elif [ -f "\${PROJECT_DIR}/../node_modules/.bin/auggie-flow" ]; then
  cd "\${PROJECT_DIR}"
  exec "\${PROJECT_DIR}/../node_modules/.bin/auggie-flow" "$@"

# 3. Global installation (npm install -g auggie-flow)
elif command -v auggie-flow &> /dev/null; then
  cd "\${PROJECT_DIR}"
  exec auggie-flow "$@"

# 4. Fallback to npx (will download if needed)
else
  cd "\${PROJECT_DIR}"
  exec npx auggie-flow@latest "$@"
fi
`;

      // Write the wrapper script
      if (!dryRun) {
        await writeFile(`${workingDir}/auggie-flow`, wrapperScript, 'utf8');

        // Make it executable
        await chmod(`${workingDir}/auggie-flow`, 0o755);

        console.log('  ✓ Created local auggie-flow executable wrapper');
        console.log('    You can now use: ./auggie-flow instead of npx auggie-flow');
      }
    }
  } catch (err) {
    console.log(`  ⚠️  Could not create local executable: ${err.message}`);
  }
}
