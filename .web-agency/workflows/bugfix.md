# Workflow : Correction de Bug

Chaîne de production pour la correction d'un bug.

## Déclencheurs

- Bug reporté par un utilisateur
- Erreur détectée en monitoring
- Échec de test
- Régression identifiée

## Étapes

```
┌─────────────────────────────────────────────────────────────────┐
│  1. DIAGNOSTIC                                                   │
│     Reproduire, comprendre et localiser le bug                  │
│     Agent: skills/quality/diagnostic.md                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. FIX                                                          │
│     Corriger le bug                                             │
│     Agents: skills/development/[...].md                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. TEST                                                         │
│     Vérifier la correction + test de non-régression             │
│     Agent: skills/quality/testing.md                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. REVIEW                                                       │
│     Revue rapide du fix                                         │
│     Agent: skills/quality/code-review.md                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  5. DEPLOY                                                       │
│     Déployer le correctif                                       │
│     Agent: skills/operations/deployment.md                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  6. VERIFY                                                       │
│     Confirmer la résolution en production                       │
│     Agent: skills/operations/monitoring.md                       │
└─────────────────────────────────────────────────────────────────┘
```

## Priorités

| Priorité | Critères | SLA |
|----------|----------|-----|
| **P1 - Critique** | Production down, perte de données, faille sécurité | < 1h |
| **P2 - Haute** | Fonctionnalité majeure bloquée, impact business | < 4h |
| **P3 - Moyenne** | Bug gênant mais contournable | < 24h |
| **P4 - Basse** | Bug mineur, cosmétique | < 1 semaine |

## Détail des étapes

### 1. Diagnostic

**Agent** : `skills/quality/diagnostic.md`

**Input** :
- Description du bug
- Logs/screenshots si disponibles
- Environnement concerné

**Actions** :
```
1. Reproduire le bug
   - Identifier les étapes exactes
   - Confirmer l'environnement (browser, OS, etc.)

2. Analyser
   - Consulter les logs
   - Identifier le code concerné
   - Comprendre la cause racine

3. Documenter
   - Créer le rapport de bug structuré
```

**Output** :
```yaml
bug:
  id: "BUG-001"
  title: "Titre descriptif"
  severity: P1|P2|P3|P4

reproduction:
  steps:
    - "Étape 1"
    - "Étape 2"
  expected: "Comportement attendu"
  actual: "Comportement observé"

analysis:
  root_cause: "Explication de la cause"
  affected_code:
    - file: "src/path/file.ts"
      line: 42
  impact: "Description de l'impact"

fix_approach:
  description: "Approche proposée pour le fix"
  estimated_effort: "30min|2h|1j"
```

### 2. Fix

**Agents** : `skills/development/[frontend|backend|...].md`

**Input** :
- Diagnostic complet
- Code concerné identifié

**Actions** :
```
1. Créer la branche hotfix
   git checkout -b hotfix/BUG-001-description

2. Implémenter le correctif
   - Fix minimal et ciblé
   - Pas de refactoring opportuniste

3. Ajouter un test de régression
   - Test qui échoue AVANT le fix
   - Test qui passe APRÈS le fix
```

**Règles** :
```
✓ Fix minimal (pas de changements non liés)
✓ Un commit = un fix
✓ Message de commit référence le bug
✓ Test de régression obligatoire
```

### 3. Test

**Agent** : `skills/quality/testing.md`

**Input** :
- Code avec le fix
- Test de régression

**Actions** :
```
1. Exécuter le test de régression
   - Confirme que le bug est corrigé

2. Exécuter la suite de tests complète
   - Confirme pas de régression ailleurs

3. Test manuel si nécessaire
   - Reproduction du scénario original
```

**Output** :
```yaml
test_results:
  regression_test: passed
  full_suite: passed
  manual_verification: passed

no_side_effects: confirmed
```

### 4. Review

**Agent** : `skills/quality/code-review.md`

**Input** :
- PR avec le fix

**Actions** :
```
Pour un bugfix, review accélérée :
- Le fix résout-il le problème ?
- Le fix est-il minimal ?
- Y a-t-il un test de régression ?
- Pas d'effet de bord évident ?
```

**Output** :
```yaml
review:
  status: approved
  fast_track: true  # Review accélérée pour hotfix
```

### 5. Deploy

**Agent** : `skills/operations/deployment.md`

**Input** :
- Fix approuvé
- Tests passants

**Actions** :
```
1. Merge dans main
2. Déploiement staging (smoke test)
3. Déploiement production
4. Surveillance post-déploiement
```

**Pour P1/P2** :
```
Déploiement direct en production possible
(après validation minimale)
```

### 6. Verify

**Agent** : `skills/operations/monitoring.md`

**Input** :
- Déploiement effectué

**Actions** :
```
1. Vérifier que le bug ne se reproduit plus
2. Surveiller les logs pour erreurs liées
3. Confirmer résolution au reporter
```

**Output** :
```yaml
verification:
  bug_resolved: confirmed
  monitoring: clean
  reporter_notified: true

close_ticket: true
```

## Hotfix P1 (Fast Track)

Pour les bugs critiques, processus accéléré :

```
Diagnostic (15min) → Fix (30min) → Test minimal → Deploy direct
```

Avec :
- Review post-déploiement
- Communication immédiate aux stakeholders
- Post-mortem dans les 24h

## Template de clôture

```markdown
## Bug résolu : [ID]

**Cause** : [Explication simple]
**Solution** : [Ce qui a été fait]
**Déployé** : [Date/heure]
**Vérifié** : [Confirmation]

Test de régression ajouté : Oui
Documentation mise à jour : Oui/Non/NA
```
