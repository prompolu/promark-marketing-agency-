"""Bundle built pages with relative URLs for a local browser preview."""
from pathlib import Path
import re
import os
import posixpath
import zipfile
from urllib.parse import urlsplit, urlunsplit

source = Path(__file__).resolve().parent.parent / 'dist'
base_path = os.environ.get('SITE_BASE_PATH', '').rstrip('/')
try:
    canonical = re.search(r'rel="canonical" href="([^"]+)"', (source / 'index.html').read_text())
    if canonical:
        base_path = urlsplit(canonical.group(1)).path.rstrip('/')
except OSError:
    pass

def relative_url(url, directory):
    if not url.startswith('/') or url.startswith('//'):
        return url
    parts = urlsplit(url)
    path = parts.path
    if base_path and (path == base_path or path.startswith(base_path + '/')):
        path = path[len(base_path):] or '/'
    target = path.lstrip('/')
    if not target or target.endswith('/'):
        target += 'index.html'
    return urlunsplit(('', '', posixpath.relpath(target, directory), parts.query, parts.fragment))

archive_name = os.environ.get('PREVIEW_ARCHIVE_NAME', 'PROMARK-preview.zip')
if Path(archive_name).name != archive_name or not archive_name.endswith('.zip'):
    raise ValueError('Preview archive name must be a ZIP filename, without directories.')
output = source.parent / 'preview' / archive_name
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
            content = re.sub(r'(href|src|poster)="([^"]*)"', lambda m: f'{m[1]}="{relative_url(m[2], directory)}"', data.decode())
            def rewrite_srcset(match):
                variants = []
                for item in match[1].split(','):
                    url, descriptor = item.strip().split()
                    variants.append(relative_url(url, directory) + ' ' + descriptor)
                return 'srcset="' + ', '.join(variants) + '"'
            content = re.sub(r'srcset="([^"]+)"', rewrite_srcset, content)
            content = re.sub(r'<meta name="robots" content="[^"]*">', '<meta name="robots" content="noindex,follow">', content)
            data = content.encode()
        elif relative.as_posix() in ('app.js', 'contact.js', 'effects.js'):
            data = data.decode().replace("new URL('contact/',assetRoot)", "new URL('contact/index.html',assetRoot)").replace('`realisations/${p.id}/`', '`realisations/${p.id}/index.html`').encode()
        archive.writestr(str(Path('PROMARK-preview') / relative), data)
    archive.writestr('PROMARK-preview/robots.txt', 'User-agent: *\nDisallow: /\n')
    archive.writestr('PROMARK-preview/OPEN-ME.txt', 'Extract the whole archive and open index.html. Keep the media folder with the pages. Videos play on request. Without a configured form endpoint, the form prepares an email draft or a downloadable request. A configured Formspree endpoint needs an internet connection. No message is sent automatically by opening this preview.\n')
print(f'Built {output} ({output.stat().st_size / 1_000_000:.1f} MB)')
