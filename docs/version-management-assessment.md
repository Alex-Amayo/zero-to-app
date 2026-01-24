# Version Management Assessment

**Model:** User ownership — CLI copies design system source into `./zero-to-app`; users own and can edit the code.

---

## Current State

### 1. Where versions exist

| Location | Version | Used for |
|----------|---------|----------|
| [package/package.json](package/package.json) | `1.0.0` | UI library (design system) — **source of truth** |
| [cli/package.json](cli/package.json) | `1.1.3` | CLI — shown via `zero-to-app -V` |
| [cli/package-files/package.json](cli/package-files/package.json) | `1.0.0` | Bundled copy used by CLI build (mirrors package) |

### 2. What users get

- CLI downloads `package/` from GitHub (`master`), copies into `./zero-to-app`.
- **Excluded from copy:** `package.json`, lockfiles, `node_modules`, `.git` ([cli/src/index.js](cli/src/index.js) line 176).
- **Result:** Users have no version metadata in `./zero-to-app`. They cannot tell which design-system version they have.

### 3. “Latest” and updates

- **Latest** = whatever is on `master`. No tags, no releases, no semver for the design system.
- **Update** = re-run CLI with `--force` (overwrites `./zero-to-app`). No `check` or `update` commands.
- Users have no way to:
  - See their installed design-system version
  - Know if a newer version exists
  - Run a dedicated “update” flow

### 4. Gaps

- **No installed-version tracking** — nothing stored in the project after install.
- **No `check`** — can’t compare installed vs latest.
- **No `update`** — only “install again with `--force`”.
- **No `version`** — can’t print installed design-system version (only CLI version via `-V`).
- **Single “channel”** — always `master`; no pinning to a tag or release.

---

## Proposed Improvements

Keep the **copy-to-project** model. Improve version UX with minimal changes.

### 1. Track installed version

- **Source of truth:** `package/package.json` → `version` (e.g. `1.0.0`).
- **On install:** After copying, read `version` from the downloaded `package/package.json` and write it to `./zero-to-app/.zero-to-app-version` (single line, e.g. `1.0.0`).
- **Do not** add `package.json` to the copied files; keep using a separate version file.

### 2. `version` command

- **Action:** Look for `./zero-to-app/.zero-to-app-version`. If it exists, print that version (e.g. `Design system: 1.0.0`). If not, print `No zero-to-app installation found in ./zero-to-app`.
- Optionally also print CLI version (e.g. `CLI: 1.1.3`).

### 3. `check` command

- **Action:**
  1. Read installed version from `./zero-to-app/.zero-to-app-version`.
  2. Fetch “latest” by cloning/pulling the repo (reuse existing `downloadFromGitHub` flow), then read `package/package.json` → `version`.
  3. Compare and report:
     - `You have the latest (1.0.0).`
     - Or `Update available: 1.0.0 → 1.1.0. Run: npx zero-to-app --force` (or `npx zero-to-app update` if we add it).

### 4. `update` command

- **Action:** Same as `install --force` (re-download, overwrite `./zero-to-app`, reinstall deps if not `--skip-install`). Optional: run `check` first and only overwrite if a newer version exists; otherwise exit with “Already up to date.”

### 5. CLI structure

- **Default:** `npx zero-to-app` → install (current behavior).
- **Commands:** `version`, `check`, `update` (and keep `-f` / `--force` for install/update).
- **Help:** Update description to mention version and update flows.

### 6. Optional: GitHub tags later

- Keep using `master` for now.
- Later, add support for installing from a specific tag (e.g. `--tag v1.0.0`) and/or use tags as “latest” for `check`. Not required for the first iteration.

---

## Implementation Checklist

- [ ] **Install:** After copy, write `./zero-to-app/.zero-to-app-version` with version from downloaded `package/package.json`.
- [ ] **Version:** Add `version` command; implement read from `.zero-to-app-version` and print.
- [ ] **Check:** Add `check` command; implement fetch latest + compare + message.
- [ ] **Update:** Add `update` command; implement as `install --force` (optionally guarded by `check`).
- [ ] **CLI:** Wire subcommands (e.g. `program.command('version')`, etc.) and update `--help`.
- [ ] **Docs:** Update [cli/README.md](cli/README.md) with `version`, `check`, `update` and version-management behavior.
- [ ] **Tests:** Extend [cli/__tests__/index.test.js](cli/__tests__/index.test.js) for version file creation, `version` / `check` behavior (mock or local fixture as needed).

---

## Out of Scope (for now)

- **Diff tracking** — no detection of user-modified files; update overwrites. Document that users who customize should backup or merge manually.
- **Pinning** — no `--tag` or config-based pinning; always `master`.
- **Deprecation / npm** — no change to package-managed approach; this stays copy-to-project only.
