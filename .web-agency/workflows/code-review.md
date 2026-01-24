# Workflow : Code Review

Chaîne de production pour la revue de code.

## Déclencheurs

- Pull Request / Merge Request créée
- Demande de review explicite
- Code prêt pour validation

## Étapes

```
┌─────────────────────────────────────────────────────────────────┐
│  1. CONTEXT                                                      │
│     Comprendre le contexte et l'objectif du changement          │
│     Agent: skills/quality/code-review.md                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. ANALYSIS                                                     │
│     Analyser le code en profondeur                              │
│     Agent: skills/quality/code-review.md                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. SECURITY                                                     │
│     Vérifier les aspects sécurité                               │
│     Agent: skills/quality/security-check.md                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. FEEDBACK                                                     │
│     Fournir le feedback structuré                               │
│     Agent: skills/quality/code-review.md                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                   [SI CORRECTIONS DEMANDÉES]
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  5. CORRECTIONS                                                  │
│     Appliquer les corrections                                   │
│     Agents: skills/development/[...].md                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  6. VALIDATION                                                   │
│     Valider les corrections et approuver                        │
│     Agent: skills/quality/code-review.md                         │
└─────────────────────────────────────────────────────────────────┘
```

## Détail des étapes

### 1. Context

**Comprendre avant de juger**

```yaml
questions:
  - Quel est l'objectif de ce changement ?
  - Quelle issue/ticket résout-il ?
  - Y a-t-il des contraintes particulières ?
  - Quels sont les critères d'acceptation ?

gather:
  - Description de la PR
  - Ticket lié
  - Commits inclus
  - Fichiers modifiés (liste)
```

### 2. Analysis

**Agent** : `skills/quality/code-review.md`

**Checklist d'analyse** :

```markdown
## Fonctionnel
- [ ] Le code fait ce qu'il est censé faire
- [ ] Les edge cases sont gérés
- [ ] Les erreurs sont gérées proprement

## Qualité
- [ ] Code lisible et compréhensible
- [ ] Nommage clair (variables, fonctions)
- [ ] Pas de duplication inutile
- [ ] Complexité raisonnable

## Architecture
- [ ] Cohérent avec l'architecture existante
- [ ] Pas de couplage excessif
- [ ] Responsabilités bien séparées

## Tests
- [ ] Tests présents et pertinents
- [ ] Couverture suffisante
- [ ] Tests lisibles

## Performance
- [ ] Pas de problème de performance évident
- [ ] Pas de N+1 queries
- [ ] Pas de boucles inutiles

## Maintenabilité
- [ ] Facile à modifier ultérieurement
- [ ] Documentation si logique complexe
- [ ] Pas de dette technique ajoutée
```

### 3. Security

**Agent** : `skills/quality/security-check.md`

**Checklist sécurité** :

```markdown
## Injection
- [ ] Pas d'injection SQL possible
- [ ] Pas d'injection de commande
- [ ] Inputs validés et sanitizés

## Authentification/Autorisation
- [ ] Vérifications de permissions présentes
- [ ] Pas d'exposition de données sensibles
- [ ] Tokens/sessions gérés correctement

## Données sensibles
- [ ] Pas de secrets en dur
- [ ] Pas de logs de données sensibles
- [ ] Données personnelles protégées

## XSS/CSRF
- [ ] Outputs échappés correctement
- [ ] Protection CSRF si nécessaire
```

### 4. Feedback

**Format du feedback** :

```markdown
## Review : [Titre PR]

### Résumé
[1-2 phrases résumant l'impression générale]

### Décision
🟢 **Approved** | 🟡 **Changes Requested** | 🔴 **Request Changes (Blocking)**

### Points positifs
- [Ce qui est bien fait]

### Corrections requises (bloquant)
- [ ] **[fichier:ligne]** : [Description du problème et solution attendue]

### Suggestions (non bloquant)
- [ ] **[fichier:ligne]** : [Suggestion d'amélioration]

### Questions
- [ ] [Question qui nécessite clarification]

### Nitpicks (optionnel)
- [Détails mineurs, style, préférences personnelles]
```

**Catégorisation des commentaires** :

| Préfixe | Signification | Bloquant |
|---------|---------------|----------|
| `🔴 CRITICAL` | Bug, faille sécurité, erreur grave | Oui |
| `🟠 REQUIRED` | Doit être corrigé avant merge | Oui |
| `🟡 SUGGESTION` | Amélioration recommandée | Non |
| `🔵 QUESTION` | Demande de clarification | Dépend |
| `⚪ NITPICK` | Préférence personnelle | Non |

### 5. Corrections

**Agents** : `skills/development/[...].md`

Si des corrections sont demandées :

```
1. Analyser chaque commentaire
2. Implémenter les corrections requises
3. Répondre aux questions
4. Considérer les suggestions
5. Pusher les modifications
6. Demander re-review
```

### 6. Validation

**Agent** : `skills/quality/code-review.md`

```yaml
re_review:
  - Vérifier que chaque correction requise est faite
  - Vérifier que les réponses sont satisfaisantes
  - Tests toujours passants

decision:
  approved: true
  ready_to_merge: true
```

## Bonnes pratiques

### Pour le reviewer

```
✓ Être constructif, pas destructif
✓ Expliquer le "pourquoi", pas juste le "quoi"
✓ Proposer des solutions, pas juste des critiques
✓ Distinguer opinions et standards
✓ Répondre rapidement (< 24h)
✓ Être cohérent dans les standards
```

### Pour l'auteur

```
✓ PR de taille raisonnable (< 400 lignes idéalement)
✓ Description claire de l'objectif
✓ Self-review avant de demander review
✓ Tests inclus
✓ Répondre à tous les commentaires
✓ Ne pas prendre les critiques personnellement
```

## Métriques

```yaml
targets:
  time_to_first_review: "< 4h"
  time_to_approval: "< 24h"
  review_iterations: "< 3"

track:
  - Temps moyen de review
  - Nombre de corrections par PR
  - Taux de bugs post-merge
```
