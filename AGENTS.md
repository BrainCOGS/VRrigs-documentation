# VRrigs-documentation

The VitePress site documenting the BrainCOGS VR rigs. On merge to `master`, the
deploy workflow pushes the build to the `gh-pages` branch of
BrainCOGS/braincogs.github.io. Node with pnpm.

## Setup and tests

```bash
pnpm install --frozen-lockfile
pnpm run build
pnpm exec playwright install --with-deps chromium   # once
pnpm run test:dist          # checks the built site
pnpm run audit
```

Lint: `uvx prek run --all-files` (the same as CI's Lint workflow).

## Pins and gotchas

- VitePress 2 (alpha) and pnpm 10. Figures are Markdown, not HTML.
- Auto-merge is off; a human merges.

## Agent workflow

- Bugs: when you fix an error the user reported, first file an agent bug report issue from the user's account (`gh issue create -R BrainCOGS/VRrigs-documentation`, template `.github/ISSUE_TEMPLATE/agent_bug_report.md`). Put the error exactly as the user pasted it under **Reported error**; don't ask for or invent a Slack link. Then fix it with the `bugfix-from-slack` skill (agent-tooling); the PR says `Fixes #<issue>`. Commits, pushes, issues and PRs all go through the user's account.
- Commits end with one `Assisted-by: <Harness>:<model>` trailer per agent, e.g. `Assisted-by: ClaudeCode:claude-opus-5-5`. No AI co-authors, and no `Generated with` lines. `prek install` sets up the `ai-attribution` commit-msg hook (`.github/scripts/check_ai_attribution.py`, vendored from agent-tooling), and CI checks every commit of a PR.
- PRs target `master` on `BrainCOGS/VRrigs-documentation`, opened from the user's own account.
