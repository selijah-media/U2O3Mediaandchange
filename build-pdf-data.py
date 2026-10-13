#!/usr/bin/env python3
"""
Regenerate pdf-data.js from everything in the /pdfs folder.

Why this exists:
  Opening the site via file:// (double-clicking index.html) blocks
  JavaScript from fetching local files for security reasons in some
  browsers (Chrome in particular). To make the PDF viewer work no matter
  how the site is opened, every PDF's bytes are embedded directly into a
  JavaScript file as base64 instead of being fetched at runtime.

When to run this:
  Any time you add, remove, or replace a file in /pdfs. Then re-open (or
  refresh) index.html.

How to run it:
  From inside this folder:  python3 build-pdf-data.py
  (Requires Python 3, which is preinstalled on macOS and most school
  computers. No internet connection needed.)
"""

import base64
import json
from pathlib import Path

ROOT = Path(__file__).parent
PDFS_DIR = ROOT / "pdfs"
OUTPUT = ROOT / "pdf-data.js"


def main():
    if not PDFS_DIR.exists():
        print(f"No /pdfs folder found next to this script ({PDFS_DIR}).")
        return

    entries = {}
    for pdf_path in sorted(PDFS_DIR.glob("*.pdf")):
        data = pdf_path.read_bytes()
        b64 = base64.b64encode(data).decode("ascii")
        key = f"pdfs/{pdf_path.name}"
        entries[key] = b64
        print(f"  encoded {key}  ({len(data):,} bytes)")

    header = (
        "/**\n"
        " * AUTO-GENERATED — do not edit by hand.\n"
        " * Regenerate with: python3 build-pdf-data.py\n"
        " *\n"
        " * Maps each PDF's relative path (as used in data.js) to its\n"
        " * base64-encoded bytes, so the PDF viewer never needs to fetch\n"
        " * local files at runtime (which some browsers block over file://).\n"
        " */\n"
    )

    body = "window.PDF_DATA = " + json.dumps(entries) + ";\n"

    OUTPUT.write_text(header + body, encoding="utf-8")
    print(f"\nWrote {OUTPUT.name} with {len(entries)} PDF(s).")


if __name__ == "__main__":
    main()
