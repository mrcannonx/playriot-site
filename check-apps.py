#!/usr/bin/env python3
"""Drift guard for playriot.co.

The site lists live apps in two independent places (script.js APPS array and
mobile.html work-index) and states the app COUNT in meta tags that nothing
derives at build time. All three rot silently every time an app ships.

This asks Apple (the publisher) what is actually live and fails on any drift.

    python3 check-apps.py            # check the working tree
    python3 check-apps.py --live     # check what playriot.co is serving

Exit 0 = in sync. Exit 1 = drift (message says exactly what). Exit 2 = the
check could not run (network/parse) -- never silently green.
"""
import json
import re
import sys
import urllib.request
from pathlib import Path

ARTIST_ID = "1875195414"          # PLAYRIOT LLC on the App Store
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/126.0 Safari/537.36"
ROOT = Path(__file__).resolve().parent
LIVE_BASE = "https://playriot.co"

# Files that must list every live app, and how to read them.
SOURCES = {"script.js": "script.js", "mobile.html": "mobile.html"}
LIVE_PATHS = {"script.js": "/script.js", "mobile.html": "/mobile"}

# Count claims that are hand-typed and cannot self-correct.
# (index.html's <b data-app-count> IS derived from APPS.length at runtime,
#  so it is not listed here -- only the strings crawlers read before JS runs.)
WORDS = {20: "Twenty", 21: "Twenty-one", 22: "Twenty-two", 23: "Twenty-three",
         24: "Twenty-four", 25: "Twenty-five", 26: "Twenty-six",
         27: "Twenty-seven", 28: "Twenty-eight", 29: "Twenty-nine",
         30: "Thirty"}


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def live_apps():
    """Ask Apple which apps are actually live. Never returns an empty set."""
    url = (f"https://itunes.apple.com/lookup?id={ARTIST_ID}"
           "&entity=software&limit=200&country=us")
    data = json.loads(fetch(url))
    apps = {str(a["trackId"]): a["trackName"]
            for a in data.get("results", []) if a.get("wrapperType") == "software"}
    if not apps:
        raise RuntimeError(
            "Apple returned ZERO apps -- treating as a broken check, not an "
            "empty catalog. Verify the artist id and the lookup response.")
    return apps


def ids_in(text):
    """App Store ids referenced in a page, minus the developer-page id."""
    return set(re.findall(r"id(\d{9,10})", text)) - {ARTIST_ID}


def main():
    use_live = "--live" in sys.argv
    where = "playriot.co (live)" if use_live else f"{ROOT} (working tree)"

    try:
        apple = live_apps()
    except Exception as e:                                   # noqa: BLE001
        print(f"CANNOT CHECK: could not read Apple's catalog -- {e}")
        return 2

    n = len(apple)
    print(f"Apple says {n} apps are live.  Checking {where}\n")

    texts = {}
    try:
        for name in SOURCES:
            texts[name] = (fetch(LIVE_BASE + LIVE_PATHS[name]) if use_live
                           else (ROOT / SOURCES[name]).read_text(encoding="utf-8"))
        index_html = (fetch(LIVE_BASE + "/") if use_live
                      else (ROOT / "index.html").read_text(encoding="utf-8"))
    except Exception as e:                                   # noqa: BLE001
        print(f"CANNOT CHECK: could not read the site -- {e}")
        return 2

    problems = []

    # 1. every live app must appear in every app list
    for name, text in texts.items():
        got = ids_in(text)
        if not got:
            problems.append(f"{name}: found NO app ids at all -- the check "
                            f"could not see the list (parser or file is wrong)")
            continue
        missing = {i: apple[i] for i in set(apple) - got}
        dead = got - set(apple)
        print(f"  {name:<12} lists {len(got)} apps")
        for i, nm in sorted(missing.items(), key=lambda kv: kv[1]):
            problems.append(f"{name}: MISSING live app {nm} (id{i})")
        for i in sorted(dead):
            problems.append(f"{name}: lists id{i}, which is NOT live at Apple")

    # 2. hand-typed counts in crawler-visible copy
    word = WORDS.get(n)
    stale_digits = {str(k) for k in WORDS if k != n}
    stale_words = {v for k, v in WORDS.items() if k != n}
    for name, text in list(texts.items()) + [("index.html", index_html)]:
        for m in re.finditer(r'content="([^"]*)"', text):
            s = m.group(1)
            for bad in stale_digits:
                if re.search(rf"\b{bad} (?:sharp )?(?:iOS )?apps\b", s):
                    problems.append(
                        f"{name}: meta says \"{bad} apps\" but {n} are live "
                        f"-- {s[:60]}...")
            for bad in stale_words:
                # (?!-) so "Twenty" does not match inside "Twenty-four"
                if re.search(rf"\b{re.escape(bad)}\b(?!-)", s):
                    problems.append(
                        f"{name}: meta says \"{bad}\" but {n} are live "
                        f"(should be \"{word}\") -- {s[:60]}...")

    # 2b. the SAME claims sitting in visible body copy, which check 2 cannot see.
    #     Check 2 only reads content="..." attributes. On 2026-08-09 index.html
    #     had "Twenty-four live on the App Store today" in a plain paragraph --
    #     read by every human visitor, invisible to this guard -- while all four
    #     meta tags were being policed correctly. Strip <script>/<style> first,
    #     or CSS and SVG values (24px, viewBox="0 0 24 24") fire as false hits.
    def visible_text(html):
        s = re.sub(r"(?is)<(script|style)\b.*?</\1>", " ", html)
        s = re.sub(r"(?s)<[^>]+>", " ", s)
        return re.sub(r"\s+", " ", s)

    for name, html in [("index.html", index_html),
                       ("mobile.html", texts["mobile.html"])]:
        vis = visible_text(html)
        for bad in stale_digits:
            if re.search(rf"\b{bad} (?:sharp )?(?:iOS )?apps\b", vis):
                problems.append(
                    f"{name}: BODY COPY says \"{bad} apps\" but {n} are live")
        for bad in stale_words:
            if re.search(rf"\b{re.escape(bad)}\b(?!-) live on the App Store", vis):
                problems.append(
                    f"{name}: BODY COPY says \"{bad} live on the App Store\" "
                    f"but {n} are live (should be \"{word}\")")

    # 3. no-JS fallback text inside the runtime-derived counters.
    #    JS overwrites these, so they are right for humans and STALE for any
    #    crawler that does not run scripts -- and nothing else notices.
    for name, text in [("mobile.html", texts["mobile.html"]),
                       ("index.html", index_html)]:
        for attr in ("data-count", "data-app-count"):
            for m in re.finditer(rf"<(\w+)[^>]*\b{attr}\b[^>]*>(\d+)<", text):
                if int(m.group(2)) != n:
                    problems.append(
                        f"{name}: <{m.group(1)} {attr}> no-JS fallback says "
                        f"\"{m.group(2)}\" but {n} are live")

    print()
    if problems:
        print(f"DRIFT -- {len(problems)} problem(s):")
        for p in problems:
            print(f"  x {p}")
        print("\nFix: add the app to script.js APPS + mobile.html work-index "
              "(and assets/icons/<slug>.png), update the meta counts, bump "
              "assets/og.png's ?v= and its baked '<n> apps live' line.")
        return 1

    print(f"IN SYNC -- both lists carry all {n} live apps; "
          f"no stale counts in crawler-visible copy.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
