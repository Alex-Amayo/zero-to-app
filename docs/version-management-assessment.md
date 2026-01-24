# Version Management Assessment

**Model:** Package-managed — consumers install `zero-to-app` from npm/pnpm (no CLI copy flow).

---

## Current State

### 1. Where versions exist

| Location | Version | Used for |
|----------|---------|----------|
| [zero-to-app/package.json](zero-to-app/package.json) | `1.0.1` | UI library (design system) — **source of truth** |

### 2. What users get

- `package.json` + lockfile record the installed version.
- Updates are managed via the package manager.

### 3. “Latest” and updates

- **Latest** = npm dist-tag `latest`.
- **Update** = `pnpm up zero-to-app` or `npm install zero-to-app@latest`.

### 4. Gaps

- No release notes or changelog surfaced to consumers.
- No git tags/releases tied directly to published versions.

---

## Proposed Improvements

Keep npm distribution; tighten release visibility.

### 1. Release notes + changelog

- Add/maintain `CHANGELOG.md`.
- Link changelog entries to published releases.

### 2. Tag published versions

- Create git tags (e.g. `v1.0.1`) on publish.

### 3. Automate version + publish

- Publish only when `zero-to-app/package.json` version changes.

---

## Implementation Checklist

- [ ] Add `CHANGELOG.md` and update on release.
- [ ] Tag releases during publish.
- [ ] Document update flow in the root README.

---

## Out of Scope (for now)

- Breaking-change migrations beyond changelog notes.
- Multi-channel distribution (beta/next tags).
