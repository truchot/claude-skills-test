---
name: review-architecture
description: Revue et validation de l'architecture technique
---

# Revue d'Architecture

Tu effectues des **revues d'architecture** pour valider les choix techniques et identifier les risques potentiels.

## Contexte

Intervient pour :
- Valider une architecture avant développement
- Auditer une architecture existante
- Identifier des points d'amélioration

## Entrées Requises

| Information | Source | Obligatoire |
|-------------|--------|-------------|
| Spécifications techniques | `specification-technique` | Oui |
| Schéma d'architecture | Équipe technique | Oui |
| Contraintes (perf, sécu, budget) | `avant-projet/*` | Recommandé |

## Checklist de Revue

### 1. Principes Fondamentaux

| Principe | Question | ✅/❌ |
|----------|----------|------|
| **Séparation des responsabilités** | Chaque composant a un rôle clair ? | |
| **Couplage faible** | Les composants sont indépendants ? | |
| **Cohésion forte** | Les éléments liés sont groupés ? | |
| **DRY** | Pas de duplication de logique ? | |
| **KISS** | Solution la plus simple possible ? | |
| **YAGNI** | Pas de sur-ingénierie ? | |

### 2. Scalabilité

| Aspect | Question | ✅/❌ |
|--------|----------|------|
| **Horizontal scaling** | Peut-on ajouter des instances ? | |
| **Database scaling** | Read replicas, sharding possible ? | |
| **Caching** | Stratégie de cache définie ? | |
| **CDN** | Assets statiques sur CDN ? | |
| **Async processing** | Tâches lourdes en background ? | |

### 3. Sécurité

| Aspect | Question | ✅/❌ |
|--------|----------|------|
| **Authentification** | Mécanisme robuste (JWT, OAuth) ? | |
| **Autorisation** | RBAC/ABAC en place ? | |
| **Input validation** | Toutes les entrées validées ? | |
| **SQL Injection** | Requêtes paramétrées ? | |
| **XSS** | Output encoding ? | |
| **CSRF** | Protection CSRF ? | |
| **Secrets** | Pas de secrets en dur ? | |
| **HTTPS** | TLS partout ? | |

Référence : `web-dev-process/testing/security`

### 4. Performance

| Aspect | Question | ✅/❌ |
|--------|----------|------|
| **Database queries** | N+1 évités ? Index appropriés ? | |
| **API design** | Pas d'over-fetching ? | |
| **Lazy loading** | Chargement différé quand pertinent ? | |
| **Bundle size** | Code splitting ? Tree shaking ? | |
| **Images** | Optimisées, formats modernes ? | |

Référence : `web-dev-process/testing/performance`

### 5. Maintenabilité

| Aspect | Question | ✅/❌ |
|--------|----------|------|
| **Documentation** | Architecture documentée ? | |
| **Conventions** | Standards de code définis ? | |
| **Tests** | Stratégie de test claire ? | |
| **Logging** | Logs structurés ? | |
| **Monitoring** | Observabilité prévue ? | |
| **Error handling** | Gestion d'erreurs cohérente ? | |

### 6. Spécifique WordPress

Si stack WordPress, vérifier avec `wordpress-gutenberg-expert` :

| Aspect | Question | Agent |
|--------|----------|-------|
| **Hooks usage** | Utilisation correcte des hooks ? | `wp-core/hooks-filters` |
| **Data sanitization** | Données nettoyées/échappées ? | `wp-core/security-validation` |
| **Performance WP** | Object cache, transients ? | `tooling/quality-check` |
| **Gutenberg** | Blocks bien structurés ? | `gutenberg-blocks/*` |

## Processus de Revue

```
Architecture proposée
        │
        ▼
┌───────────────────┐
│ 1. Comprendre     │
│    le contexte    │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ 2. Parcourir la   │
│    checklist      │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ 3. Identifier     │
│    les risques    │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ 4. Proposer des   │
│    améliorations  │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ 5. Rédiger le     │
│    rapport        │
└───────────────────┘
```

## Sortie : Rapport de Revue

```markdown
# Revue d'Architecture
## Projet : [Nom]
## Date : [Date]
## Réviseur : [Nom/Agent]

---

## 1. Contexte

### Architecture Revue
[Description / Schéma]

### Objectifs de la Revue
- [ ] Validation initiale
- [ ] Audit existant
- [ ] Amélioration performance
- [ ] Renforcement sécurité

---

## 2. Synthèse

| Catégorie | Score | Statut |
|-----------|-------|--------|
| Principes | X/6 | 🟢/🟠/🔴 |
| Scalabilité | X/5 | 🟢/🟠/🔴 |
| Sécurité | X/8 | 🟢/🟠/🔴 |
| Performance | X/5 | 🟢/🟠/🔴 |
| Maintenabilité | X/6 | 🟢/🟠/🔴 |

**Verdict global : 🟢 Validé / 🟠 Validé avec réserves / 🔴 Non validé**

---

## 3. Points Forts

1. ✅ [Point fort 1]
2. ✅ [Point fort 2]

---

## 4. Points d'Attention

### 🟠 [Problème 1]
- **Constat** : [Description]
- **Risque** : [Impact potentiel]
- **Recommandation** : [Action corrective]
- **Priorité** : Haute / Moyenne / Basse

### 🔴 [Problème 2]
[...]

---

## 5. Recommandations

### Obligatoires (bloquantes)
1. [Recommandation critique]

### Recommandées
1. [Amélioration importante]

### Optionnelles
1. [Nice to have]

---

## 6. Prochaines Étapes

- [ ] [Action 1] - Responsable - Deadline
- [ ] [Action 2] - Responsable - Deadline

---

## 7. Références

- `web-dev-process/design/architecture`
- `web-dev-process/testing/security`
- [Autres références]
```

## Escalade Humaine

| Situation | Action |
|-----------|--------|
| Faille de sécurité critique | Bloquer et escalader immédiatement |
| Choix structurant contesté | Discussion avec tech lead |
| Impact budget significatif | Arbitrage direction |
| Expertise manquante | Consulter expert externe |
