"""Behavior tests for schedules/run-agent.sh (issues #8, #9, #10).

Each test builds a throwaway bare "state" repo, a work dir with a schedule
entry, and a fake launcher, then runs the real wrapper. No network, no Claude.
Run: python3 -m unittest evals/test_run_agent.py -v
"""
import json
import os
import shutil
import subprocess
import tempfile
import time
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WRAPPER = os.path.join(ROOT, 'schedules', 'run-agent.sh')
AGENT = 'demo-agent'

FAKE_LAUNCHER = """#!/usr/bin/env bash
# fake launcher: append one changelog line, then run an optional hook
set -eu
changelog=""
while [ $# -gt 0 ]; do
  case "$1" in --changelog) changelog="$2"; shift 2 ;; *) shift ;; esac
done
echo "{\\"agent\\":\\"$GANESH_AGENT\\"}" >> "$changelog"
echo ran >> "$FAKE_RAN"
if [ -n "${FAKE_HOOK:-}" ]; then bash -c "$FAKE_HOOK"; fi
"""

GIT_ENV = {
    'GIT_AUTHOR_NAME': 'test', 'GIT_AUTHOR_EMAIL': 'test@example.com',
    'GIT_COMMITTER_NAME': 'test', 'GIT_COMMITTER_EMAIL': 'test@example.com',
    'GIT_CONFIG_NOSYSTEM': '1',
}


def sh(cmd, cwd=None, env=None, check=True):
    return subprocess.run(cmd, cwd=cwd, env=env, shell=isinstance(cmd, str),
                          capture_output=True, text=True, check=check)


class RunAgentTest(unittest.TestCase):

    def setUp(self):
        self.tmp = tempfile.mkdtemp(prefix='run-agent-')
        self.env = dict(os.environ, **GIT_ENV)
        self.env['HOME'] = self.tmp  # isolate from the user's git config
        self.remote = os.path.join(self.tmp, 'state.git')
        sh(['git', 'init', '-q', '--bare', '-b', 'main', self.remote], env=self.env)
        seed = os.path.join(self.tmp, 'seed')
        sh(['git', 'clone', '-q', self.remote, seed], env=self.env)
        with open(os.path.join(seed, 'README.md'), 'w') as f:
            f.write('state\n')
        sh('git add -A && git commit -q -m seed && git push -q origin HEAD:main', cwd=seed, env=self.env)
        self.work = os.path.join(self.tmp, 'work')
        os.makedirs(os.path.join(self.work, 'schedules'))
        with open(os.path.join(self.work, 'schedules', AGENT + '.schedule.json'), 'w') as f:
            json.dump({'skill': AGENT}, f)
        self.launcher = os.path.join(self.tmp, 'fake-launcher.sh')
        with open(self.launcher, 'w') as f:
            f.write(FAKE_LAUNCHER)
        os.chmod(self.launcher, 0o755)
        self.locks = os.path.join(self.tmp, 'locks')
        self.ran = os.path.join(self.tmp, 'ran.txt')
        self.state = os.path.join(self.work, 'state')
        self.lock = os.path.join(self.locks, 'ganesh-%s.lock' % AGENT)

    def tearDown(self):
        shutil.rmtree(self.tmp, ignore_errors=True)

    def run_wrapper(self, **extra):
        env = dict(self.env, GANESH_STATE_DIR=self.state, GANESH_STATE_REPO=self.remote,
                   GANESH_LOCK_DIR=self.locks, GANESH_LAUNCHER=self.launcher, FAKE_RAN=self.ran)
        env.update(extra)
        return sh(['bash', WRAPPER, AGENT], cwd=self.work, env=env, check=False)

    def remote_files(self):
        return sh(['git', '--git-dir', self.remote, 'ls-tree', '-r', '--name-only', 'main'],
                  env=self.env).stdout.split()

    def remote_log(self):
        return sh(['git', '--git-dir', self.remote, 'log', '--format=%s', 'main'], env=self.env).stdout.split('\n')

    def times_ran(self):
        if not os.path.exists(self.ran):
            return 0
        with open(self.ran) as f:
            return len(f.read().split())

    def other_clone_push(self, path, text):
        """Return a hook that pushes a commit from a second clone while the run works."""
        other = os.path.join(self.tmp, 'other')
        return ('git clone -q %s %s && cd %s && mkdir -p "$(dirname %s)" && echo %s >> %s '
                '&& git add -A && git commit -q -m other && git push -q origin HEAD:main'
                % (self.remote, other, other, path, text, path))

    # issue #8 ---------------------------------------------------------------
    def test_first_run_clones_and_never_commits_the_lock(self):
        r = self.run_wrapper()
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertTrue(os.path.isdir(os.path.join(self.state, '.git')))
        files = self.remote_files()
        self.assertIn('markers/%s.last' % AGENT, files)
        self.assertFalse(any('.lock' in f or '.locks' in f for f in files), files)
        self.assertFalse(os.path.exists(self.lock), 'lock must be released at exit')

    # issue #10 --------------------------------------------------------------
    def write_lock(self, pid, started):
        os.makedirs(self.locks, exist_ok=True)
        with open(self.lock, 'w') as f:
            f.write('%d %d\n' % (pid, started))

    def test_live_lock_is_a_noop(self):
        self.write_lock(os.getpid(), int(time.time()))
        r = self.run_wrapper()
        self.assertEqual(r.returncode, 0)
        self.assertIn('already running', r.stdout)
        self.assertEqual(self.times_ran(), 0)

    def test_lock_of_a_dead_process_is_taken_over(self):
        dead = subprocess.Popen(['true']); dead.wait()
        self.write_lock(dead.pid, int(time.time()))
        r = self.run_wrapper()
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertIn('stale lock', r.stderr)
        self.assertEqual(self.times_ran(), 1)

    def test_lock_older_than_ttl_is_taken_over(self):
        self.write_lock(os.getpid(), int(time.time()) - 7200)
        r = self.run_wrapper(GANESH_LOCK_TTL='3600')
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertIn('stale lock', r.stderr)
        self.assertEqual(self.times_ran(), 1)

    # issue #9 ---------------------------------------------------------------
    def test_diverged_push_recovers_with_rebase(self):
        r = self.run_wrapper(FAKE_HOOK=self.other_clone_push('other-agent/field.md', 'x'))
        self.assertEqual(r.returncode, 0, r.stderr)
        log = self.remote_log()
        self.assertTrue(log[0].startswith('run: %s' % AGENT), log)
        self.assertIn('other', log)
        self.assertIn('other-agent/field.md', self.remote_files())

    def test_unpushable_run_is_recorded_as_failed_not_silent(self):
        # a second writer touches this agent's own marker: a real conflict
        r = self.run_wrapper(FAKE_HOOK=self.other_clone_push('markers/%s.last' % AGENT, 'clash'))
        self.assertEqual(r.returncode, 1)
        self.assertIn('FAILED', r.stderr)
        with open(os.path.join(self.state, 'run-ledger.jsonl')) as f:
            ledger = f.read()
        self.assertIn('"status":"failed"', ledger)
        self.assertFalse(os.path.isdir(os.path.join(self.state, '.git', 'rebase-merge')))

    def test_next_fire_recovers_a_clone_left_with_an_unpushed_commit(self):
        hook = os.path.join(self.remote, 'hooks', 'pre-receive')
        flag = os.path.join(self.tmp, 'reject')
        with open(hook, 'w') as f:
            f.write('#!/bin/sh\n[ -f %s ] && { echo rejected >&2; exit 1; }\nexit 0\n' % flag)
        os.chmod(hook, 0o755)
        open(flag, 'w').close()
        first = self.run_wrapper()
        self.assertEqual(first.returncode, 1, 'the first push is rejected and must fail loudly')
        os.remove(flag)
        second = self.run_wrapper()
        self.assertEqual(second.returncode, 0, second.stderr)
        runs = [s for s in self.remote_log() if s.startswith('run: %s' % AGENT)]
        self.assertEqual(len(runs), 2, 'both runs reach the remote')
        self.assertIn('run-ledger.jsonl', self.remote_files())


if __name__ == '__main__':
    unittest.main()
