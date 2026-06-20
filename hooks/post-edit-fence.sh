#!/usr/bin/env bash
# Post-edit hook: enforce the single-writer fence the instant the change log changes.
# Fires after a write. Fails loud on a cross-lane write. Deterministic, not a model call.
set -euo pipefail

# The fence is code, not a request to the model. A violation is a hard error, not a note.
python3 -m pytest evals/ -q || {
  echo "✗ A change broke the single-writer fence. The write is rejected."
  exit 1
}
echo "✓ lane-fence clean"
