# Installs the /sticky skill for Claude Code into ~/.claude/skills/sticky (Windows PowerShell).
$ErrorActionPreference = 'Stop'
$base = 'https://raw.githubusercontent.com/prompolu/promark-marketing-agency-/promark-preview/claude-skills/sticky'
$root = if ($env:CLAUDE_CONFIG_DIR) { $env:CLAUDE_CONFIG_DIR } else { Join-Path $HOME '.claude' }
$dest = Join-Path $root 'skills\sticky'
$files = 'SKILL.md','references/components.md','references/promark-style.css','references/scene3d.js','assets/paper.svg','assets/paper-dark.svg'
$tmp = Join-Path ([IO.Path]::GetTempPath()) ('sticky-' + [guid]::NewGuid())
foreach ($f in $files) {
  $out = Join-Path $tmp $f
  New-Item -ItemType Directory -Force -Path (Split-Path $out) | Out-Null
  Invoke-WebRequest -UseBasicParsing -Uri "$base/$f" -OutFile $out
}
if (Test-Path $dest) { Remove-Item -Recurse -Force $dest }
New-Item -ItemType Directory -Force -Path (Split-Path $dest) | Out-Null
Move-Item $tmp $dest
Write-Host "Installed /sticky into $dest"
