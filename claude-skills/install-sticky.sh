#!/usr/bin/env bash
# Installs the /sticky skill for Claude Code into ~/.claude/skills/sticky (macOS, Linux, WSL, Git Bash).
set -euo pipefail
BASE="https://raw.githubusercontent.com/prompolu/promark-marketing-agency-/promark-preview/claude-skills/sticky"
DEST="${CLAUDE_CONFIG_DIR:-$HOME/.claude}/skills/sticky"
FILES="SKILL.md references/components.md references/promark-style.css references/scene3d.js assets/paper.svg assets/paper-dark.svg"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
for f in $FILES; do
  mkdir -p "$TMP/$(dirname "$f")"
  curl -fsSL "$BASE/$f" -o "$TMP/$f"
done
mkdir -p "$(dirname "$DEST")"
rm -rf "$DEST"
mv "$TMP" "$DEST"
trap - EXIT
echo "Installed /sticky into $DEST"
