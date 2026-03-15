# Technical Decisions Guide

## Scope Lead Dev vs Direction Technique

| Lead Dev (opérationnel) | Direction Technique (stratégique) |
|------------------------|----------------------------------|
| Choix librairies projet | Choix stack global |
| Patterns locaux | Architecture globale |
| Priorisation dette sprint | Standards équipe |
| Refactoring ciblé | Recrutement, formation |

## Framework de Décision Technique

### 1. Identifier le problème
```
- Quel est le problème concret ?
- Qui est impacté ? (devs, users, ops)
- Quelle est l'urgence ? (bloquant, gênant, nice-to-have)
```

### 2. Évaluer les options
| Critère | Option A | Option B | Option C |
|---------|----------|----------|----------|
| Effort | Jours | Jours | Jours |
| Risque | H/M/L | H/M/L | H/M/L |
| Maintenabilité | H/M/L | H/M/L | H/M/L |
| Performance | H/M/L | H/M/L | H/M/L |

### 3. Décider et documenter (ADR)
```markdown
# ADR-XXX: [Titre]
## Contexte
[Pourquoi cette décision est nécessaire]
## Décision
[Ce qui a été décidé]
## Conséquences
[Positives et négatives]
## Alternatives rejetées
[Et pourquoi]
```

## Choix de Pattern

### Frontend
| Besoin | Pattern | Quand |
|--------|---------|-------|
| State local | useState/useReducer | Composant isolé |
| State partagé | Context + useReducer | 2-3 composants |
| State global | Zustand/Jotai | App-wide |
| Server state | TanStack Query | Données API |
| Forms | React Hook Form + Zod | Formulaires complexes |

### Backend
| Besoin | Pattern | Quand |
|--------|---------|-------|
| CRUD simple | Controller > Service > Repo | Standard |
| Logique métier | Domain Services | Règles complexes |
| Événements | Event Emitter/Queue | Découplage |
| Cache | Redis/In-memory | Données fréquentes |
| Background | Queue (Bull/BullMQ) | Tâches longues |

## Refactoring Plan

### Priorisation
```
Matrice Impact/Effort :
┌─────────┬──────────────────┬──────────────────┐
│         │ Effort faible    │ Effort élevé     │
├─────────┼──────────────────┼──────────────────┤
│ Impact  │ QUICK WIN        │ PROJET MAJEUR    │
│ élevé   │ → Faire maintenant│ → Planifier      │
├─────────┼──────────────────┼──────────────────┤
│ Impact  │ FILL-IN          │ À ÉVITER         │
│ faible  │ → Si temps dispo │ → Ne pas faire   │
└─────────┴──────────────────┴──────────────────┘
```

### Approche Incrémentale
1. **Identifier** le code à refactorer (métriques, code smells)
2. **Couvrir** par des tests avant de toucher
3. **Refactorer** par petites PR (< 200 lignes)
4. **Valider** que les tests passent toujours
5. **Documenter** le pattern appliqué (ADR si significatif)

## Code Smells à Surveiller

| Smell | Seuil d'alerte | Action |
|-------|---------------|--------|
| Fichier > 300 lignes | Refactorer | Extraire modules |
| Fonction > 40 lignes | Refactorer | Extraire fonctions |
| Complexité cyclomatique > 10 | Simplifier | Guard clauses, polymorphisme |
| Duplication > 3 occurrences | DRY | Extraire utilitaire |
| Couplage fort | Découpler | Interfaces, injection |
| Paramètres > 4 | Restructurer | Objet config |

## Escalades

| Situation | Vers | Comment |
|-----------|------|---------|
| Impact multi-projets | Direction technique | ADR + réunion |
| Changement de stack | Direction technique | Business case |
| Conflit technique entre devs | Lead dev tranche | Si bloqué > 30 min |
| Performance critique | Direction technique | Audit + plan |
| Sécurité | Direction technique | Immédiat |

## Checklist Décision Technique

- [ ] Problème clairement identifié
- [ ] Options évaluées (min 2)
- [ ] Impact mesuré (effort, risque, dette)
- [ ] Décision documentée (ADR si significatif)
- [ ] Équipe informée
- [ ] Plan d'exécution défini
- [ ] Critères de succès définis
