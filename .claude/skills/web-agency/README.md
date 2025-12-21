# Web Agency Skill

Agents IA pour industrialiser les métiers d'une agence Web.

## Philosophie

> Les agents exécutent, les humains supervisent et décident.

```
CLIENT ←→ HUMAIN (supervision) ←→ AGENTS (exécution)
```

## Domaines

| # | Domaine | Statut | Agents |
|---|---------|--------|--------|
| 1 | **Gestion de projet** | 🟢 Actif | 24 agents |
| 2 | Stratégie & Conseil | 🔴 À venir | - |
| 3 | Design & Création | 🔴 À venir | - |
| 4 | Contenu & Rédaction | 🔴 À venir | - |
| 5 | Marketing Digital | 🔴 À venir | - |

> Le domaine **Technique** est couvert par `web-dev-process`.

## Structure

```
web-agency/
├── SKILL.md                    # Orchestrateur principal
├── README.md
├── agents/
│   └── project-management/     # Domaine 1
│       ├── orchestrator.md
│       ├── avant-projet/       # 7 agents
│       ├── pilotage/           # 5 agents
│       ├── communication/      # 6 agents
│       ├── livraison/          # 4 agents
│       └── facturation/        # 2 agents
└── templates/
    └── project-management/     # 8 templates
```

## Utilisation

Invoque le skill `web-agency` pour :

- Gérer un projet client (brief → facturation)
- Rédiger des emails professionnels
- Produire des documents de gestion de projet
- Suivre l'avancement et les budgets

## Agents Project Management

### Avant-projet (7)
`collecte-besoin` · `formalisation-brief` · `questions-clarification` · `analyse-perimetre` · `chiffrage` · `hypotheses-risques` · `redaction-proposition`

### Pilotage (5)
`creation-planning` · `analyse-dependances` · `reporting-hebdo` · `analyse-ecarts` · `alertes-projet`

### Communication (6)
`compte-rendu` · `email-demande-validation` · `email-relance` · `email-annonce-livraison` · `email-annonce-retard` · `email-demande-information`

### Livraison (4)
`plan-recette` · `grille-recette` · `suivi-anomalies` · `pv-recette`

### Facturation (2)
`preparation-facture` · `suivi-paiements`

## Templates

- `brief-client.md` - Brief client structuré
- `estimation.md` - Estimation de charges
- `proposition.md` - Proposition commerciale
- `planning.md` - Planning Gantt (Mermaid)
- `reporting.md` - Reporting hebdomadaire
- `compte-rendu.md` - Compte-rendu de réunion
- `pv-recette.md` - Procès-verbal de recette
- `bilan-projet.md` - Bilan de projet (REX)

## Principes

1. **Single Responsibility** - Chaque agent a une seule responsabilité
2. **Supervision humaine** - Livrables à valider avant envoi
3. **Traçabilité** - Décisions documentées
4. **Escalade claire** - Quand solliciter un humain
