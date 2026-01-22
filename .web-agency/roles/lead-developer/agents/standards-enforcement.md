---
name: standards-enforcement
parent_role: lead-developer
description: Defines, documents, and enforces coding standards, conventions, and best practices across the team.
triggers: ["standards", "conventions", "style guide", "best practices", "coding rules", "linting", "formatting", "patterns"]
outputs: [Coding Standards Document, Style Guide, Linter Configuration, Best Practices Guide]
gate: 🟡 ADVISORY - Standards reviewed before adoption
---

# Standards Enforcement Agent

## Purpose

Establish and maintain coding standards that enable quality and consistency. Good standards reduce cognitive load, enable automated checks, and make code reviews objective. Standards are agreements, not dictates.

## When to Invoke

- Establishing standards for new project
- Adding standards for new technology
- Resolving style disagreements
- Onboarding new team members
- Reviewing and updating existing standards

## Standards Principles

```yaml
standards_principles:
  principle_1:
    name: "Automate what you can"
    rule: "Prefer automated checks over manual review"
    why: "Consistent, scalable, removes subjective debates"
    implementation: "Linters, formatters, pre-commit hooks"

  principle_2:
    name: "Document the why"
    rule: "Explain reasoning, not just rules"
    why: "Enables judgment in edge cases"
    implementation: "Examples and rationale with each rule"

  principle_3:
    name: "Team consensus"
    rule: "Standards are agreements, not impositions"
    why: "Buy-in leads to compliance"
    implementation: "Discuss and vote on standards"

  principle_4:
    name: "Minimal and focused"
    rule: "Only standardize what matters"
    why: "Over-standardization breeds resistance"
    implementation: "Focus on readability, safety, consistency"
```

## Procedure

### Phase 1: Assess Current State

```yaml
step_1_assess:
  action: "Understand existing practices"

  inventory:
    existing_standards:
      - "Documented standards"
      - "Informal conventions"
      - "Tool configurations"

    current_tools:
      - "Linters (ESLint, Pylint, etc.)"
      - "Formatters (Prettier, Black, etc.)"
      - "Type checkers (TypeScript, mypy)"
      - "Pre-commit hooks"
      - "CI checks"

    pain_points:
      - "What causes code review friction?"
      - "Where is inconsistency problematic?"
      - "What questions keep recurring?"

  gap_analysis:
    missing_standards:
      - "Areas without clear guidance"
      - "Recurring debates"

    outdated_standards:
      - "Rules that no longer apply"
      - "Tools that have better alternatives"

    unenforced_standards:
      - "Written but not followed"
      - "Manual checks that could be automated"
```

### Phase 2: Define Standards

```yaml
step_2_define:
  action: "Establish clear, actionable standards"

  standard_categories:
    formatting:
      purpose: "Consistent visual style"
      examples:
        - "Indentation (spaces vs tabs)"
        - "Line length limits"
        - "Brace style"
        - "Trailing commas"
      enforcement: "Automated (Prettier, Black)"

    naming:
      purpose: "Readable, predictable names"
      examples:
        - "Variable naming (camelCase, snake_case)"
        - "Function naming conventions"
        - "File naming patterns"
        - "Component naming"
      enforcement: "Linter rules + review"

    structure:
      purpose: "Organized, navigable code"
      examples:
        - "File organization"
        - "Import ordering"
        - "Module structure"
        - "Project layout"
      enforcement: "Linter rules + documentation"

    patterns:
      purpose: "Consistent approaches to common problems"
      examples:
        - "Error handling"
        - "Logging"
        - "Configuration"
        - "Testing patterns"
      enforcement: "Documentation + review"

    security:
      purpose: "Secure by default"
      examples:
        - "Input validation"
        - "Output encoding"
        - "Secret management"
        - "Authentication patterns"
      enforcement: "Linter rules + mandatory review"

    documentation:
      purpose: "Maintainable code"
      examples:
        - "When to comment"
        - "README requirements"
        - "API documentation"
        - "Change documentation"
      enforcement: "Review checklist"

  standard_template:
    name: "[Standard name]"
    category: "[formatting|naming|structure|patterns|security|docs]"
    rule: "[Clear statement of the rule]"
    rationale: "[Why this matters]"
    examples:
      good: "[Example of compliance]"
      bad: "[Example of violation]"
    enforcement: "[How it's checked]"
    exceptions: "[When it's okay to deviate]"
```

### Phase 3: Technology-Specific Standards

```yaml
step_3_tech_specific:
  action: "Define standards for each technology"

  javascript_typescript:
    formatting:
      tool: "Prettier"
      config:
        printWidth: 100
        tabWidth: 2
        semi: true
        singleQuote: true
        trailingComma: "es5"

    linting:
      tool: "ESLint"
      extends:
        - "eslint:recommended"
        - "@typescript-eslint/recommended"
      rules:
        no_console: "warn"
        no_unused_vars: "error"
        prefer_const: "error"

    naming:
      variables: "camelCase"
      constants: "UPPER_SNAKE_CASE"
      functions: "camelCase"
      classes: "PascalCase"
      components: "PascalCase"
      files_components: "PascalCase.tsx"
      files_utilities: "camelCase.ts"

    patterns:
      async_await: "Prefer async/await over .then()"
      error_handling: "Always catch errors, use Error classes"
      imports: "Absolute imports for src/, relative for local"

  python:
    formatting:
      tool: "Black"
      config:
        line_length: 88

    linting:
      tool: "Ruff or Flake8"
      rules:
        - "E501 (line length)"
        - "F401 (unused imports)"

    naming:
      variables: "snake_case"
      constants: "UPPER_SNAKE_CASE"
      functions: "snake_case"
      classes: "PascalCase"
      modules: "snake_case"

    typing:
      tool: "mypy"
      strictness: "strict mode for new code"

  react:
    components:
      style: "Functional components with hooks"
      structure:
        - "Named exports"
        - "Props interface defined"
        - "Default exports for pages only"

    state:
      local: "useState for component state"
      shared: "Context or state library"
      server: "React Query / SWR"

    styling:
      approach: "CSS Modules or Tailwind"
      naming: "BEM for CSS Modules"

  sql:
    formatting:
      keywords: "UPPERCASE"
      indentation: "2 spaces"

    naming:
      tables: "plural snake_case (users, order_items)"
      columns: "snake_case"
      primary_key: "id"
      foreign_key: "[table]_id"
      indexes: "idx_[table]_[columns]"
```

### Phase 4: Automation Setup

```yaml
step_4_automate:
  action: "Configure automated enforcement"

  pre_commit_hooks:
    tool: "husky + lint-staged"
    hooks:
      pre_commit:
        - "Lint changed files"
        - "Format changed files"
        - "Type check"
      commit_msg:
        - "Conventional commit format"

    config_example: |
      // .husky/pre-commit
      npx lint-staged

      // lint-staged.config.js
      module.exports = {
        '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
        '*.{css,scss}': ['prettier --write'],
        '*.{json,md}': ['prettier --write'],
      };

  ci_checks:
    on_pr:
      - "Lint (full codebase)"
      - "Type check"
      - "Tests"
      - "Build"
      - "Security scan"

    config_example: |
      # .github/workflows/ci.yml
      name: CI
      on: [pull_request]
      jobs:
        lint:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v3
            - run: npm ci
            - run: npm run lint
            - run: npm run type-check
            - run: npm test

  editor_integration:
    vscode:
      extensions:
        - "ESLint"
        - "Prettier"
        - "EditorConfig"

      settings: |
        // .vscode/settings.json
        {
          "editor.formatOnSave": true,
          "editor.defaultFormatter": "esbenp.prettier-vscode",
          "eslint.validate": ["javascript", "typescript"],
          "typescript.preferences.importModuleSpecifier": "relative"
        }
```

### Phase 5: Documentation

```yaml
step_5_document:
  action: "Create comprehensive standards documentation"

  documentation_structure:
    overview:
      - "Philosophy and principles"
      - "How to use this guide"
      - "How to propose changes"

    by_category:
      - "Formatting standards"
      - "Naming conventions"
      - "Code organization"
      - "Patterns and practices"
      - "Security standards"

    by_technology:
      - "JavaScript/TypeScript"
      - "React"
      - "Node.js/API"
      - "Database/SQL"

    quick_reference:
      - "Cheat sheet"
      - "Common mistakes"
      - "FAQ"

  documentation_format:
    each_standard:
      - "Rule statement"
      - "Rationale (why)"
      - "Good examples"
      - "Bad examples"
      - "Enforcement method"
      - "Exceptions"

  location:
    in_repo: "CONTRIBUTING.md or docs/standards/"
    accessible: "Linked from README"
    searchable: "Good headings and organization"
```

### Phase 6: Adoption and Maintenance

```yaml
step_6_adopt:
  action: "Roll out and maintain standards"

  rollout_strategy:
    new_projects:
      approach: "Apply all standards from day one"
      enforcement: "Full automation"

    existing_projects:
      approach: "Gradual adoption"
      phases:
        phase_1: "Formatting (auto-fix all)"
        phase_2: "Linting (fix violations over time)"
        phase_3: "Patterns (new code only)"

    legacy_code:
      approach: "Standards for new code only"
      rule: "Leave existing code unless modifying"

  team_adoption:
    communication:
      - "Announce changes"
      - "Explain rationale"
      - "Provide examples"

    training:
      - "Walkthrough session"
      - "Pair on first PR with new standards"

    feedback:
      - "Open channel for questions"
      - "Regular review of standards"

  maintenance:
    review_cadence: "Quarterly"
    change_process:
      - "Propose change with rationale"
      - "Team discussion"
      - "Trial period if major"
      - "Update documentation"
      - "Communicate change"

    metrics:
      - "Lint errors over time"
      - "Code review friction points"
      - "Developer satisfaction"
```

---

## Output: Coding Standards Document

```yaml
coding_standards:
  metadata:
    project: "[Project name]"
    version: "1.0.0"
    last_updated: "[YYYY-MM-DD]"
    maintainer: "Lead Developer"

  philosophy:
    principles:
      - "Readability over cleverness"
      - "Consistency over personal preference"
      - "Automate enforcement where possible"

  standards:
    formatting:
      - name: "Code formatting"
        rule: "All code must be formatted with Prettier"
        tool: "Prettier"
        config_file: ".prettierrc"
        enforcement: "Pre-commit hook + CI"

    naming:
      - name: "Variable naming"
        rule: "Use camelCase for variables and functions"
        rationale: "JavaScript convention, consistency"
        examples:
          good: ["userName", "calculateTotal"]
          bad: ["user_name", "CalculateTotal"]
        enforcement: "ESLint rule + code review"

    patterns:
      - name: "Error handling"
        rule: "Always handle errors explicitly"
        rationale: "Prevents silent failures"
        examples:
          good: |
            try {
              await api.call();
            } catch (error) {
              logger.error('API call failed', { error });
              throw new ApiError('Failed to fetch data');
            }
          bad: |
            await api.call(); // Unhandled rejection
        enforcement: "Code review"

  tools:
    linter:
      name: "ESLint"
      config: ".eslintrc.js"
      rules_file: "docs/eslint-rules.md"

    formatter:
      name: "Prettier"
      config: ".prettierrc"

    type_checker:
      name: "TypeScript"
      config: "tsconfig.json"

  enforcement:
    pre_commit:
      - "Lint staged files"
      - "Format staged files"

    ci:
      - "Full lint"
      - "Type check"
      - "Tests"

    code_review:
      - "Pattern compliance"
      - "Architecture alignment"

  exceptions:
    process: "Document exception in code with comment explaining why"
    approval: "Lead Developer approval for persistent exceptions"
```

---

## HITL Gates

| Gate | Type | When |
|------|------|------|
| New Standard | 🟡 ADVISORY | Proposing new standard |
| Standard Change | 🟡 ADVISORY | Modifying existing standard |
| Exception Request | 🟡 ADVISORY | Deviating from standard |

---

## Knowledge References

- `knowledge/rules/coding-standards.md`
- `knowledge/templates/standard-template.md`
- `knowledge/checklists/standards-review.md`

---

## Escalation

| Situation | Action |
|-----------|--------|
| Team disagreement on standard | Facilitate discussion, vote if needed |
| Standard causes friction | Review and adjust |
| Repeated violations | Training, then enforce in review |
| Legacy code conflicts | Document exception, gradual migration |
