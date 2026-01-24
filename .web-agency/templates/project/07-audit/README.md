# Audit Trail

> **Projet** : {{PROJECT_NAME}}

## Structure

```
07-audit/
├── README.md           # Ce fichier
├── CHANGELOG.md        # Historique des changements
└── sessions/           # Logs des sessions IA
    └── SESSION-TEMPLATE.md
```

## Objectif

Traçabilité complète de :
- **Qui** a fait **quoi**
- **Quand** et **pourquoi**
- **Quel agent** a produit **quel livrable**

---

## Changelog

Voir [CHANGELOG.md](./CHANGELOG.md) pour l'historique complet des modifications.

### Dernières modifications

| Date | Type | Description | Par |
|------|------|-------------|-----|
| {{DATE}} | Feature | {{DESC}} | {{WHO}} |

---

## Sessions IA

Chaque interaction significative avec l'agence IA est loggée.

### Sessions récentes

| ID | Date | Workflow | Agent(s) | Livrables |
|----|------|----------|----------|-----------|
| {{SESSION_ID}} | {{DATE}} | {{WORKFLOW}} | {{AGENTS}} | {{DELIVERABLES}} |

### Consulter une session

```
sessions/
├── 2024-01-15-feature-auth/
│   ├── session.md        # Log complet
│   ├── deliverables/     # Fichiers produits
│   └── decisions.md      # Décisions prises
```

---

## Métriques audit

| Métrique | Ce mois | Total |
|----------|---------|-------|
| Sessions IA | {{COUNT}} | {{TOTAL}} |
| Livrables produits | {{COUNT}} | {{TOTAL}} |
| Décisions documentées | {{COUNT}} | {{TOTAL}} |

---

## Recherche

### Par date

```bash
ls sessions/ | grep "2024-01"
```

### Par workflow

```bash
grep -r "workflow: feature" sessions/
```

### Par agent

```bash
grep -r "agent: specification" sessions/
```

---

## Conformité

| Exigence | Statut |
|----------|--------|
| Toute décision documentée | ✅ |
| Livrables versionnés | ✅ |
| Sessions traçables | ✅ |
