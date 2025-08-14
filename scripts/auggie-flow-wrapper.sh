#!/usr/bin/env bash
# Auggie-Flow local wrapper
# Ensures auggie-flow runs from your project directory
set -euo pipefail
IFS=$'\n\t'

PROJECT_DIR="${PWD}"
export PWD="${PROJECT_DIR}"
export AUGGIE_WORKING_DIR="${PROJECT_DIR}"

# Prefer local bin
if [ -f "${PROJECT_DIR}/node_modules/.bin/auggie-flow" ]; then
  cd "${PROJECT_DIR}" || exit 1
  exec "${PROJECT_DIR}/node_modules/.bin/auggie-flow" "$@"

# Monorepo parent bin
elif [ -f "${PROJECT_DIR}/../node_modules/.bin/auggie-flow" ]; then
  cd "${PROJECT_DIR}" || exit 1
  exec "${PROJECT_DIR}/../node_modules/.bin/auggie-flow" "$@"

# Global installation
elif command -v auggie-flow &> /dev/null; then
  cd "${PROJECT_DIR}" || exit 1
  exec auggie-flow "$@"

# Fallback to executing JS directly
else
  cd "${PROJECT_DIR}" || exit 1
  if [ -f "./bin/auggie-flow.js" ]; then
    exec node ./bin/auggie-flow.js "$@"
  else
    exec npx --yes auggie-flow@latest "$@"
  fi
fi

