"""Bundle built pages with relative links for a local, offline browser preview."""
from pathlib import Path
import re, posixpath, zipfile
source = Path(__file__).resolve().parent.parent / 'dist'
output = source.parent / 'preview' / 'PROMARK-preview.zip'
output.parent.mkdir(exist_ok=True)
with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as archive:
    for file in source.rglob('*'):
        if not file.is_file():
            continue
        relative = file.relative_to(source)
        if relative.as_posix() in ('robots.txt', 'sitemap.xml'):
            continue
        data = file.read_bytes()
        if file.suffix == '.html':
            directory = relative.parent.as_posix()
            def rewrite(match):
                attribute, url = match.groups()
                if not url.startswith('/') or url.startswith('//'):
                    return match.group(0)
                path, separator, query = url.partition('?')
                path, hash_separator, fragment = path.partition('#')
                target = path.lstrip('/')
                if not target or target.endswith('/'):
                    target += 'index.html'
                target = posixpath.relpath(target, directory)
                return f'{attribute}="{target}{hash_separator}{fragment}{separator}{query}"'
            html = re.sub(r'(href|src)="([^"]*)"', rewrite, data.decode())
            html = re.sub(r'<meta name="robots" content="[^"]*">', '<meta name="robots" content="noindex,follow">', html)
            data = html.encode()
        elif relative.as_posix() == 'app.js':
            data = data.decode().replace("new URL('contact/',assetRoot)", "new URL('contact/index.html',assetRoot)").replace('`realisations/${p.id}/`','`realisations/${p.id}/index.html`').encode()
        archive.writestr(str(Path('PROMARK-preview') / relative), data)
    archive.writestr('PROMARK-preview/robots.txt', 'User-agent: *\nDisallow: /\n')
    archive.writestr('PROMARK-preview/OPEN-ME.txt', 'Unzip the complete archive, then open index.html in your browser. Keep the media folder with the pages. Videos play on request and include sound controls. The contact form opens your email app or downloads a local draft. Send the email yourself; no automatic delivery is configured. Nothing is deployed publicly.\n')
print(f'Built {output} ({output.stat().st_size / 1_000_000:.1f} MB)')
