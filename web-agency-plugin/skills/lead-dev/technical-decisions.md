# Technical Decisions Guide

## Scope Lead Dev vs Direction Technique

| Lead Dev (opérationnel) | Direction Technique (stratégique) |
|------------------------|----------------------------------|
| Choix librairies projet | Choix stack global |
| Patterns locaux | Architecture globale |
| Priorisation dette sprint | Standards équipe |

## Framework de Décision

### 1. Évaluer les options
| Critère | Option A | Option B |
|---------|----------|----------|
| Effort (jours) | | |
| Risque (H/M/L) | | |
| Maintenabilité | | |
| Performance | | |

### 2. Documenter (ADR)
```markdown
# ADR-XXX: [Titre]
## Contexte : [Pourquoi]
## Décision : [Quoi]
## Conséquences : [Impact +/-]
## Alternatives rejetées : [Et pourquoi]
```

## Choix de Pattern

### Frontend
| Besoin | Pattern |
|--------|---------|
| State local | useState/useReducer |
| State partagé (2-3 composants) | Context + useReducer |
| State global | Zustand/Jotai |
| Server state | TanStack Query |
| Forms | React Hook Form + Zod |

### Backend
| Besoin | Pattern |
|--------|---------|
| CRUD standard | Controller > Service > Repo |
| Logique métier complexe | Domain Services |
| Découplage | Event Emitter/Queue |
| Tâches longues | Queue (Bull/BullMQ) |

## Refactoring

### Priorisation (Matrice Impact/Effort)
```
             Effort faible     Effort élevé
Impact haut  QUICK WIN (now)   PLANIFIER (sprint)
Impact bas   FILL-IN (dispo)   NE PAS FAIRE
```

### Approche Incrémentale
1. Couvrir par tests avant de toucher
2. Refactorer par petites PR (< 200 lignes)
3. Valider que tests passent toujours
4. Documenter (ADR si significatif)

## Code Smells

| Smell | Seuil | Action |
|-------|-------|--------|
| Fichier > 300 lignes | Extraire modules |  |
| Fonction > 40 lignes | Extraire fonctions |  |
| Complexité > 10 | Guard clauses, polymorphisme |  |
| Duplication > 3x | Extraire utilitaire |  |
| Paramètres > 4 | Objet config |  |

## Escalades

| Situation | Vers |
|-----------|------|
| Impact multi-projets | Direction technique |
| Changement de stack | Direction technique (business case) |
| Conflit technique > 30 min | Lead dev tranche |
| Sécurité | Direction technique (immédiat) |

## Checklist Décision

- [ ] Problème clairement identifié
- [ ] Options évaluées (min 2)
- [ ] Impact mesuré (effort, risque, dette)
- [ ] Décision documentée (ADR si significatif)
- [ ] Équipe informée
- [ ] Critères de succès définis
