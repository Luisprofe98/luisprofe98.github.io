"""Validación opcional del contenido con Python 3; no es necesaria para usar la web.
Ejecuta: python tests/validate_content.py
Solo ejecuta los ejemplos y soluciones originales del proyecto en carpetas temporales.
"""
from __future__ import annotations
import json
from pathlib import Path
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]

def read_array(path: Path, push: bool = False) -> list:
    text = path.read_text(encoding="utf-8")
    if push:
        start = text.index("push(...") + len("push(...")
        return json.loads(text[start:text.rindex(");")])
    return json.loads(text[text.index(" = ") + 3:text.rindex(";")])

def load_content() -> dict:
    data = {}
    for kind in ("lessons", "exercises", "quizzes"):
        data[kind] = []
        for path in sorted((ROOT / "data" / kind).glob("m*.js")):
            data[kind].extend(read_array(path, push=True))
    for kind in ("challenges", "predictions", "bugs", "samples"):
        data[kind] = read_array(ROOT / "data" / f"{kind}.js")
    return data

def run_code(source: str, inputs: str, samples: dict) -> tuple[int, str, str]:
    with tempfile.TemporaryDirectory(prefix="pylab-test-") as directory:
        cwd = Path(directory)
        for name, content in samples.items():
            (cwd / name).write_text(content, encoding="utf-8")
        script = cwd / "_test_script.py"
        script.write_text(source, encoding="utf-8")
        result = subprocess.run(
            [sys.executable, "-S", "-X", "utf8", str(script)],
            cwd=cwd, input=inputs + "\n", text=True, encoding="utf-8",
            capture_output=True, timeout=4, check=False,
        )
        return result.returncode, result.stdout, result.stderr

def validate() -> dict:
    data = load_content()
    expected_counts = {"lessons": 28, "exercises": 56, "quizzes": 84,
                       "challenges": 12, "predictions": 14, "bugs": 14}
    for kind, expected in expected_counts.items():
        assert len(data[kind]) == expected, (kind, len(data[kind]))
        assert len({item["id"] for item in data[kind]}) == expected, f"ID duplicado: {kind}"
    for module in range(1, 15):
        assert len([x for x in data["lessons"] if x["module"] == module]) == 2
        assert len([x for x in data["exercises"] if x["module"] == module]) == 4
        assert len([x for x in data["quizzes"] if x["module"] == module]) == 6
    cases = []
    for item in data["exercises"]:
        cases.append((item["id"], item["solution"], item["inputs"], item["expected"]))
    for item in data["challenges"]:
        cases.append((item["id"], item["solution"], "", item["expected"]))
    for item in data["predictions"]:
        cases.append((item["id"], item["code"], "", item["output"]))
    for item in data["bugs"]:
        cases.append((item["id"], item["solution"], "20", None))
    for item in data["lessons"]:
        for key in ("code", "asir", "answer"):
            inputs = "web01\n16" if key == "code" else "443" if key == "asir" else "5"
            cases.append((item["id"] + "/" + key, item[key], inputs, None))
    failures = []
    for name, source, inputs, expected in cases:
        try:
            status, output, error = run_code(source, inputs, data["samples"])
            if status:
                failures.append({"id": name, "error": error})
            elif expected is not None and output.strip() != expected.strip():
                failures.append({"id": name, "expected": expected, "actual": output})
        except (subprocess.TimeoutExpired, OSError) as exc:
            failures.append({"id": name, "error": str(exc)})
    report = {"counts": expected_counts, "python": sys.version.split()[0],
              "executed_snippets": len(cases), "passed": len(cases) - len(failures),
              "failures": failures}
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return report

if __name__ == "__main__":
    sys.exit(1 if validate()["failures"] else 0)
