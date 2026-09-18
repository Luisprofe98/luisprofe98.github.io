"""Genera una copia HTML autónoma. Herramienta opcional; no requiere paquetes externos."""
from __future__ import annotations
import argparse
import base64
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def build(output: Path) -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    html = re.sub(
        r'<link rel="stylesheet" href="([^"]+)">',
        lambda match: '<style>\n' + (ROOT / match[1]).read_text(encoding="utf-8") + '\n</style>',
        html,
    )
    scripts = []

    def inline_script(match: re.Match) -> str:
        source = (ROOT / match[1]).read_text(encoding="utf-8")
        # Los enlaces de documentación deben funcionar sin archivos auxiliares.
        for name in ("README.md", "FUENTES.md"):
            encoded = base64.b64encode((ROOT / name).read_bytes()).decode("ascii")
            source = source.replace(f'href="{name}"',
                                    f'href="data:text/markdown;charset=utf-8;base64,{encoded}"')
        source = source.replace('</script', '<\\/script')
        scripts.append(f'<script>\n{source}\n</script>')
        return ''

    html = re.sub(r'<script defer src="([^"]+)"></script>', inline_script, html)
    # Los scripts clásicos integrados se colocan tras el DOM; defer no actúa en inline.
    html = html.replace('</body>', '\n'.join(scripts) + '\n</body>')
    favicon = base64.b64encode((ROOT / "favicon.svg").read_bytes()).decode("ascii")
    html = html.replace('href="favicon.svg"', f'href="data:image/svg+xml;base64,{favicon}"')
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(html, encoding="utf-8")


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=ROOT / 'PyLab_ASIR_autonomo.html')
    args = parser.parse_args()
    build(args.output.resolve())
    print(f'HTML creado: {args.output.resolve()}')
