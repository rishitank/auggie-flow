#!/usr/bin/env bash
# Spawn Auggie in a new terminal window with proper TTY support
set -euo pipefail
IFS=$'\n\t'

PROMPT_FILE="${1:-}"
if [[ -z "${PROMPT_FILE}" || ! -f "${PROMPT_FILE}" ]]; then
  echo "Usage: $0 <PROMPT_FILE> [engine args...]" >&2
  exit 1
fi
shift
ENGINE_ARGS=("$@")

PROMPT_CONTENT="$(cat "${PROMPT_FILE}")"
ESC_PROMPT=$(printf '%q' "${PROMPT_CONTENT}")
ESC_ARGS=""
for a in "${ENGINE_ARGS[@]}"; do ESC_ARGS+=" $(printf '%q' "${a}")"; done

if [[ "${OSTYPE:-}" == "darwin"* ]]; then
  osascript -e "tell application \"Terminal\" to do script \"auggie ${ESC_PROMPT}${ESC_ARGS}\""
elif [[ "${OSTYPE:-}" == "linux-gnu"* ]]; then
  if command -v gnome-terminal >/dev/null 2>&1; then
    gnome-terminal -- bash -lc "auggie ${ESC_PROMPT}${ESC_ARGS}; read -p 'Press enter to close...'"
  elif command -v xterm >/dev/null 2>&1; then
    xterm -e bash -lc "auggie ${ESC_PROMPT}${ESC_ARGS}; read -p 'Press enter to close...'"
  elif command -v konsole >/dev/null 2>&1; then
    konsole -e bash -lc "auggie ${ESC_PROMPT}${ESC_ARGS}; read -p 'Press enter to close...'"
  else
    echo "No supported terminal emulator found. Please run manually:"
    echo "auggie ${ESC_PROMPT}${ESC_ARGS}"
  fi
elif [[ "${OSTYPE:-}" == "msys" ]] || [[ "${OSTYPE:-}" == "cygwin" ]]; then
  cmd.exe /c start cmd /k "auggie ${ESC_PROMPT}${ESC_ARGS}"
else
  echo "Unsupported platform: ${OSTYPE:-unknown}"
  echo "Please run manually:"
  echo "auggie ${ESC_PROMPT}${ESC_ARGS}"
fi

