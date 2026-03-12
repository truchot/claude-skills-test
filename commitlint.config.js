module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature or skill
        'fix',      // Bug fix
        'docs',     // Documentation changes
        'style',    // Formatting, missing semicolons, etc.
        'refactor', // Code restructuring without feature change
        'perf',     // Performance improvement
        'test',     // Adding or updating tests
        'ci',       // CI/CD changes
        'chore',    // Maintenance tasks
        'agent',    // New or updated agent
        'skill',    // New or updated skill
        'workflow', // Workflow changes
      ],
    ],
    'scope-enum': [
      1,
      'always',
      [
        'orchestration',
        'lead-dev',
        'frontend',
        'backend',
        'devops',
        'design',
        'marketing',
        'state-manager',
        'hooks',
        'ci',
        'docs',
      ],
    ],
    'subject-max-length': [2, 'always', 100],
    'body-max-line-length': [1, 'always', 200],
  },
};
