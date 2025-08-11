#!/bin/bash
# Spawn Auggie in a new terminal window with proper TTY support

PROMPT_FILE="$1"
shift
ENGINE_ARGS="$@"

if [[ "$OSTYPE" == "darwin"* ]]; then
  osascript -e "tell application \"Terminal\" to do script \"auggie \"$(cat $PROMPT_FILE)\" $ENGINE_ARGS\""
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  if command -v gnome-terminal >/dev/null 2>&1; then
    gnome-terminal -- bash -c "auggie \"$(cat $PROMPT_FILE)\" $ENGINE_ARGS; read -p 'Press enter to close...'"
  elif command -v xterm >/dev/null 2>&1; then
    xterm -e bash -c "auggie \"$(cat $PROMPT_FILE)\" $ENGINE_ARGS; read -p 'Press enter to close...'"
  elif command -v konsole >/dev/null 2>&1; then
    konsole -e bash -c "auggie \"$(cat $PROMPT_FILE)\" $ENGINE_ARGS; read -p 'Press enter to close...'"
  else
    echo "No supported terminal emulator found. Please run manually:"
    echo "auggie \"$(cat $PROMPT_FILE)\" $ENGINE_ARGS"
  fi
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
  cmd.exe /c start cmd /k "auggie \"$(cat $PROMPT_FILE)\" $ENGINE_ARGS"
else
  echo "Unsupported platform: $OSTYPE"
  echo "Please run manually:"
  echo "auggie \"$(cat $PROMPT_FILE)\" $ENGINE_ARGS"
fi

