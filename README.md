# Claude Skills Collection

A collection of specialized Claude Code skills for software development workflows.

## Available Skills

| Skill | Description | Status |
|-------|-------------|--------|
| **design-system-foundations** | Expert en Design Systems avec approche Atomic Design industrielle. Structuration des fondations (couleurs, typographie, espacement, ombres), atomes, molécules et templates. | ✅ Active |
| **web-dev-process** | Processus de développement web standardisé - Framework agnostique pour toutes les phases d'un projet web. | ✅ Active |
| **wordpress-gutenberg-expert** | Expert WordPress et Gutenberg pour le développement de thèmes, plugins, et blocks. | ✅ Active |

## Skill Structure

Each skill follows the hierarchical orchestration pattern:

```
.claude/skills/<skill-name>/
├── SKILL.md                    # Main orchestrator
├── CHANGELOG.md                # Version history
├── agents/                     # Specialized sub-agents
│   ├── <category>/
│   │   ├── orchestrator.md     # Category router
│   │   └── <topic>.md          # Topic expert
├── docs/                       # Documentation
│   ├── getting-started.md
│   └── ...
└── references/                 # External resources
    └── resources.md
```

## Using Skills

Skills are automatically loaded by Claude Code when invoked. To use a skill:

```bash
# In Claude Code conversation
"Invoke the design-system-foundations skill to help me create a color palette"
```

Or use the skill command:

```
/skill design-system-foundations
```

## Design System Foundations Skill

The most comprehensive skill in this collection, featuring:

### Features

- **20+ specialized agents** organized by Atomic Design levels
- **Foundations**: Colors, Typography, Spacing, Shadows
- **Atoms**: Buttons, Inputs, Labels, Icons, Badges
- **Molecules**: Forms, Cards, Navigation, Modals, Alerts
- **Templates**: Hero sections, Layouts, Pages

### Documentation

- Getting Started Guide
- Naming Conventions (BEM, CSS tokens)
- Animation Performance Guide
- Testing Guide (Jest, Testing Library)
- Dark Mode Implementation
- Bundle Optimization

### Key Principles

- WCAG AA accessibility compliance
- 8pt spacing system
- Modular typography scale (1.25)
- CSS Custom Properties (Design Tokens)
- React/TypeScript component patterns

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-skill`)
3. Follow the existing skill structure
4. Include comprehensive documentation
5. Submit a Pull Request

## License

MIT

## Related

- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
