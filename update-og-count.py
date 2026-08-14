#!/usr/bin/env python3
"""Repaint the "<n> apps live on the App Store" line inside assets/og.png.

WHY THIS EXISTS
---------------
og.png is the picture that shows up when a playriot.co link is posted anywhere.
It has the app count BAKED INTO THE PIXELS, so no grep, no test and no CI job
can see it -- check-apps.py could only ever print a reminder to a human, and on
2026-08-14 it was found reading "24 apps" while the site said 25 and Apple said
26. A count with no producer drifts silently and forever.

So: never hand-edit the image again. Run this.

    python3 update-og-count.py            # count taken from script.js APPS
    python3 update-og-count.py --count 26 # or state it explicitly

It repaints ONLY that one line and asserts every other pixel is untouched.
Fonts come from Fontshare in headless Chrome -- the same source index.html
uses -- so no font files are vendored.

AFTER RUNNING: bump the ?v= on og.png in index.html AND mobile.html, or
scrapers keep serving the cached old picture.
"""
from __future__ import annotations

import argparse
import os
import re
import shutil
import subprocess
import sys
import tempfile
import time

try:
    import numpy as np
    from PIL import Image
except ImportError:
    sys.exit("needs numpy + pillow:  python3 -m pip install numpy pillow")

HERE = os.path.dirname(os.path.abspath(__file__))
OG = os.path.join(HERE, "assets", "og.png")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
CSS = "https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap"

# --- measured off the shipped card; the guard below catches design drift ---
BG = (20, 19, 26)          # flat panel behind the line
BOLD = (246, 243, 236)     # "<n> apps"
LIGHT = (154, 148, 166)    # "live on the App Store"
SIZE = 47.8                # reproduces the original 617px line width
X0, Y0 = 152, 1094         # top-left of the line's ink
CLEAR = (145, 1086, 800, 1145)
EXPECT_CANVAS = (2400, 1260)

HTML = """<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="{css}">
<style>
 html,body{{margin:0;padding:0;background:rgb{bg};}}
 #l{{position:absolute;left:40px;top:60px;white-space:nowrap;
    font-family:"General Sans",sans-serif;font-size:{size}px;letter-spacing:-0.01em;
    color:rgb{light};font-weight:500;}}
 #l b{{color:rgb{bold};font-weight:600;}}
</style></head><body>
<div id="l"><b>{n} apps</b> live on the App Store</div></body></html>"""


def count_from_script_js() -> int:
    src = open(os.path.join(HERE, "script.js"), encoding="utf-8").read()
    body = src[src.index("const APPS"): src.index("\n];", src.index("const APPS"))]
    n = len(re.findall(r"\bslug\s*:", body))
    if n < 5:
        sys.exit(f"refusing to trust an app count of {n} parsed from script.js")
    return n


def render(n: int):
    html = HTML.format(css=CSS, bg=BG, size=SIZE, light=LIGHT, bold=BOLD, n=n)
    tmp = os.path.join(HERE, ".og_line.html")
    out = os.path.join(HERE, ".og_line.png")
    open(tmp, "w").write(html)
    if os.path.exists(out):
        os.remove(out)
    if not os.path.exists(CHROME):
        sys.exit(f"Chrome not found at {CHROME}")
    # Chrome's profile dir goes to a temp path, never into the repo -- a stray
    # profile folder here is hundreds of files one `git add -A` from a commit.
    profile = tempfile.mkdtemp(prefix="og-chrome-")
    try:
        proc = subprocess.Popen(
            [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
             "--window-size=1000,200", f"--screenshot={out}",
             f"--user-data-dir={profile}", "--virtual-time-budget=6000",
             f"file://{tmp}"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        for _ in range(40):
            if os.path.exists(out) and os.path.getsize(out):
                break
            time.sleep(0.5)
        proc.kill()          # headless Chrome does NOT exit on its own here
        if not (os.path.exists(out) and os.path.getsize(out)):
            sys.exit("headless render produced nothing -- is Chrome installed and online?")
        arr = np.array(Image.open(out).convert("RGB")).astype(int)
    finally:
        shutil.rmtree(profile, ignore_errors=True)
    for f in (tmp, out):
        if os.path.exists(f):
            os.remove(f)
    return arr


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--count", type=int, default=None)
    args = ap.parse_args()
    n = args.count if args.count else count_from_script_js()

    img = np.array(Image.open(OG).convert("RGB")).astype(int)
    if (img.shape[1], img.shape[0]) != EXPECT_CANVAS:
        sys.exit(f"og.png is {img.shape[1]}x{img.shape[0]}, expected {EXPECT_CANVAS} "
                 "-- the card was redesigned; re-measure the constants in this file")
    before = img.copy()

    # GUARD: the box must hold only background + that text line, nothing else.
    box = img[CLEAR[1]:CLEAR[3], CLEAR[0]:CLEAR[2]].reshape(-1, 3)
    nonbg = box[np.abs(box - np.array(BG)).sum(axis=1) > 30]
    stray = sum(
        1 for px in nonbg
        if (px.max() - px.min()) >= 40
        and np.abs(px - np.array(BOLD)).sum() > 120
        and np.abs(px - np.array(LIGHT)).sum() > 120
    )
    if nonbg.size and 100.0 * stray / len(nonbg) > 1.0:
        sys.exit("ABORT: the repaint box holds artwork, not just the text line -- "
                 "the card changed; re-measure before running this again")

    new = render(n)
    mask = new.sum(axis=2) > 200
    ys, xs = np.where(mask)
    if not len(xs):
        sys.exit("ABORT: no glyphs rendered (font or network failure)")
    glyphs = new[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    h, w = glyphs.shape[:2]
    if X0 + w > CLEAR[2] or Y0 + h > CLEAR[3]:
        sys.exit(f"ABORT: the new line is {w}x{h}px and overflows the repaint box")

    img[CLEAR[1]:CLEAR[3], CLEAR[0]:CLEAR[2]] = np.array(BG)
    img[Y0:Y0 + h, X0:X0 + w] = glyphs

    outside = np.ones(before.shape[:2], bool)
    outside[CLEAR[1]:CLEAR[3], CLEAR[0]:CLEAR[2]] = False
    changed = int((np.abs(before - img).sum(axis=2) > 0)[outside].sum())
    if changed:
        sys.exit(f"ABORT: {changed} pixels changed outside the text box")

    Image.fromarray(img.astype(np.uint8)).save(OG)
    print(f"og.png now reads \"{n} apps live on the App Store\" ({w}x{h}px line, "
          f"0 pixels changed elsewhere)")
    print("NEXT: bump og.png's ?v= in index.html AND mobile.html so scrapers refetch it.")


main()
