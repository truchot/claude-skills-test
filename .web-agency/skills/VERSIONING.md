# Skills Versioning Strategy

This document defines the versioning policy for Claude Skills.

## Semantic Versioning

All skills follow [Semantic Versioning 2.0.0](https://semver.org/):

```
MAJOR.MINOR.PATCH

Examples:
  1.0.0  →  Initial release
  1.1.0  →  New agents added
  1.1.1  →  Bug fixes, documentation
  2.0.0  →  Breaking changes
```

## Version Bump Rules

### PATCH (x.x.X) - Bug Fixes

Increment PATCH when:
- Fixing typos or documentation errors
- Correcting agent behavior without changing interface
- Fixing routing inconsistencies
- Updating examples or code samples

```
1.0.0 → 1.0.1
```

**No user action required.**

### MINOR (x.X.0) - New Features

Increment MINOR when:
- Adding new agents to existing domains
- Adding new domains (backwards-compatible)
- Enhancing agent capabilities
- Adding new routing rules
- Adding new templates

```
1.0.1 → 1.1.0
```

**No user action required.** Existing usage continues to work.

### MAJOR (X.0.0) - Breaking Changes

Increment MAJOR when:
- Removing or renaming agents
- Changing agent responsibilities (SRP violation fix)
- Restructuring domains
- Changing routing behavior
- Splitting/merging skills (see ADR-007)

```
1.1.0 → 2.0.0
```

**User action may be required.** See migration notes in CHANGELOG.

## Breaking Changes

### What Constitutes a Breaking Change?

| Change Type | Breaking? | Version |
|-------------|-----------|---------|
| Agent removed | Yes | MAJOR |
| Agent renamed | Yes | MAJOR |
| Agent moved to different skill | Yes | MAJOR |
| Domain restructured | Yes | MAJOR |
| Routing rules changed | Maybe | MINOR/MAJOR |
| New agent added | No | MINOR |
| Agent documentation updated | No | PATCH |
| Bug fix in agent behavior | No | PATCH |

### Handling Breaking Changes

1. **Document in CHANGELOG.md** with migration instructions
2. **Add deprecation notice** before removal (1 version ahead)
3. **Provide routing redirects** when moving agents
4. **Update dependent skills** if they reference the changed agent

## Deprecation Policy

### Timeline

```
Version N:    Feature marked deprecated (warning in docs)
Version N+1:  Feature still works, stronger warning
Version N+2:  Feature removed (MAJOR bump)
```

### Deprecation Notice Format

In agent files:

```markdown
> **DEPRECATED in v1.2.0**: This agent will be removed in v2.0.0.
> Use `new-skill/new-agent` instead.
> See migration guide: [link]
```

In CHANGELOG:

```markdown
### Deprecated
- `old-agent` - Use `new-agent` instead (removal in v2.0.0)
```

## Version Locations

Each skill maintains its version in:

1. **SKILL.md frontmatter** (source of truth)
   ```yaml
   ---
   name: skill-name
   version: 1.2.0
   ---
   ```

2. **CHANGELOG.md** (history)
   ```markdown
   ## [1.2.0] - 2025-01-15
   ### Added
   - New feature
   ```

3. **README.md badges** (in skills/ directory, auto-updated)

## Release Process

### 1. Update Version

```bash
# In SKILL.md frontmatter
version: X.Y.Z
```

### 2. Update CHANGELOG

Follow [Keep a Changelog](https://keepachangelog.com/):

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New features

### Changed
- Modifications to existing features

### Deprecated
- Features to be removed

### Removed
- Removed features

### Fixed
- Bug fixes
```

### 3. Update Dependencies

If other skills depend on this one, notify in their CHANGELOGs:

```markdown
### Dependencies
- Requires `other-skill` >= 2.0.0
```

### 4. Run Tests

```bash
cd .web-agency/skills/<skill-name>/tests
./run-tests.sh
```

### 5. Commit with Version Tag

```bash
git commit -m "release(<skill-name>): v1.2.0"
git tag <skill-name>-v1.2.0
```

## Skill Extraction Versioning

When extracting a skill (per ADR-007):

### Source Skill
- Bump MAJOR version
- Add redirect notices in removed agents
- Document extraction in CHANGELOG

### New Skill
- Start at v1.0.0
- Reference source skill in CHANGELOG migration notes

Example:
```markdown
# backend-developer CHANGELOG
## [2.0.0] - 2025-12-28
### Removed
- Extracted `devops/` domain to standalone `devops` skill v1.0.0

# devops CHANGELOG
## [1.0.0] - 2025-12-28
### Added
- Initial release extracted from `backend-developer` v1.x
```

## Version Compatibility Matrix

### All Skills (13 total)

| Skill | Current | Requires | Notes |
|-------|---------|----------|-------|
| `web-agency` | v2.9.0 | All skills >= 1.0 | Meta-orchestrator |
| `project-management` | v1.0.0 | - | Standalone |
| `direction-technique` | v3.0.0 | `web-dev-process` >= 1.0, `testing-process` >= 1.0, `devops` >= 1.0 | Strategy level |
| `lead-dev` | v1.1.0 | `direction-technique` >= 3.0, `web-dev-process` >= 1.0 | Coordination |
| `web-dev-process` | v1.2.0 | `frontend-developer` >= 1.0, `backend-developer` >= 2.0, `devops` >= 1.0 | Process level |
| `testing-process` | v1.0.0 | `frontend-developer` >= 1.0, `backend-developer` >= 1.0 | Process level |
| `devops` | v1.0.0 | - | Implementation (extracted from backend-developer) |
| `frontend-developer` | v1.0.0 | `design-system-foundations` >= 1.0, `react-expert` >= 1.0 | Implementation |
| `backend-developer` | v2.0.0 | `devops` >= 1.0 (for DevOps features) | Implementation |
| `react-expert` | v1.0.0 | `nextjs-expert` >= 1.0 (for Next.js) | Implementation |
| `nextjs-expert` | v1.0.0 | - | Implementation |
| `wordpress-gutenberg-expert` | v1.0.0 | - | Implementation |
| `design-system-foundations` | v1.1.0 | - | Implementation |

### Breaking Changes History

| Version Change | Skill | Breaking Change | Migration |
|----------------|-------|-----------------|-----------|
| 1.x → 2.0.0 | `backend-developer` | DevOps domain extracted | Use `devops` skill |
| 2.x → 3.0.0 | `direction-technique` | 3-level hierarchy (ADR-005) | Update routing |

### Dependency Graph

```
                     web-agency v2.x
                          │
         ┌────────────────┼────────────────┐
         │                │                │
         ▼                ▼                ▼
  project-management  direction-technique  lead-dev
       v1.x              v3.x              v1.x
                          │                  │
         ┌────────────────┼──────────────────┤
         │                │                  │
         ▼                ▼                  ▼
   web-dev-process  testing-process      devops
       v1.x             v1.x              v1.x
         │                │
    ┌────┴────┬───────────┴───────┐
    │         │                   │
    ▼         ▼                   ▼
frontend  backend     react    nextjs    wordpress
  v1.x    v2.x       v1.x      v1.x       v1.x
    │
    ▼
design-system
   v1.x
```

### Compatibility Rules

1. **Upward Compatible**: Lower-level skills (implementation) should work with any higher-level skill version
2. **Cross-References**: When skill A references skill B, A declares minimum B version
3. **Extraction**: When extracting a skill, source bumps MAJOR, new skill starts at 1.0.0

### Validation

Run the compatibility check:

```bash
# Validate all skill versions are compatible
node .web-agency/scripts/validate-migration.js

# Check specific skill dependencies
grep -r "→.*skill" .web-agency/skills/*/SKILL.md
```

## FAQ

### Q: Do I need to update all skills together?
No. Skills are independently versioned. Only update when there are actual changes.

### Q: What if I forget to bump the version?
The test suite validates version format but not increment logic. Follow the process.

### Q: How do I handle hotfixes?
Use PATCH version. If fixing a breaking bug, consider if it needs MAJOR.

### Q: Can I skip versions?
Avoid it. Sequential versioning helps track history.

## Related Documents

- [ADR-007: Skill Extraction Pattern](./web-agency/docs/adr/007-skill-extraction-pattern.md)
- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
