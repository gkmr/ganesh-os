#!/usr/bin/env python3
"""Runtime-agnostic lane/audit fence over the live change log.

Reads the change log and exits non-zero on any invariant violation. This is the
portable fallback for runtimes that do not execute lifecycle hooks: call it as
the last step of a write-bearing agent, or as its own scheduled check. It is the
post-edit fence generalized from the repo's sample data to the live log.

Exit codes: 0 clean, 1 violation(s) found.
"""
import os
import re
import sys

LOG = os.path.expanduser(os.environ.get("GANESH_CHANGELOG", "state/changelog.md"))
REQUIRED = ["OP=", "SOURCE=", "ITEM=", "REASON=", "RISK=", "STATUS="]
CONFIRMED_DELETE = re.compile(r"RISK=(MEDIUM-confirmed|HIGH-overridden|HIGH-confirmed)")
EMPTY_REASON = re.compile(r'REASON="\s*"')


def scan(path):
    out = []
    if not os.path.exists(path):
        print(f"fence-verify: no change log at {path} (nothing to check)")
        return out
    for i, line in enumerate(open(path), 1):
        if not line.startswith("- ["):
            continue
        for tok in REQUIRED:
            if tok not in line:
                out.append((i, f"missing {tok.rstrip('=')}", line.strip()))
        if "OP=DELETE" in line and not CONFIRMED_DELETE.search(line):
            out.append((i, "DELETE without confirmed/overridden RISK", line.strip()))
        if EMPTY_REASON.search(line):
            out.append((i, "empty REASON", line.strip()))
        if "—" in line:
            out.append((i, "em dash in a logged title", line.strip()))
    return out


def main():
    v = scan(LOG)
    if v:
        print(f"FAIL fence-verify: {len(v)} violation(s) in {LOG}")
        for ln, why, txt in v[:50]:
            print(f"  line {ln}: {why}\n    {txt}")
        return 1
    print(f"OK fence-verify: change log clean ({LOG})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
