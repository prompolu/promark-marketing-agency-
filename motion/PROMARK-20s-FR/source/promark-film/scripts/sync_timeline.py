"""After editing timeline.js, embed the master in HTML for HyperFrames static lint."""
from pathlib import Path
p=Path(__file__).resolve().parents[1]
f=p/'index.html';s=f.read_text();a=s.index('<script>\n/* One deterministic');f.write_text(s[:a]+'<script>\n'+(p/'timeline.js').read_text()+'\n</script></body></html>')
