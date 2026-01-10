---
id: wf-audit
name: Workflow Audit
type: template
version: 1.0.0
description: Workflow pour les audits, diagnostics et analyses
duration_range: "3-10 jours"
phases: 4
applicable_to:
  - audit-technique
  - audit-ux
  - audit-seo
  - audit-securite
  - audit-accessibilite
  - diagnostic
  - benchmark
---

# Workflow Audit

> Template pour les missions d'audit, diagnostic et analyse.

## Vue d'Ensemble

```
CADRAGE → COLLECTE → ANALYSE → RESTITUTION
```

| Phase | Durée | Validation |
|-------|-------|------------|
| Cadrage | 10-15% | Périmètre validé |
| Collecte | 25-30% | Données complètes |
| Analyse | 35-40% | Findings documentés |
| Restitution | 20-25% | Rapport livré |

---

## Phase 1: Cadrage

### Objectif
Définir le périmètre et les objectifs de l'audit.

### Activités
1. Comprendre le contexte et les enjeux
2. Définir les objectifs de l'audit
3. Identifier le périmètre (inclus/exclus)
4. Planifier les accès nécessaires

### Livrables
- [ ] Note de cadrage
- [ ] Périmètre défini
- [ ] Checklist des accès requis
- [ ] Planning d'audit

### Critères de Sortie
- Objectifs clairs et validés
- Accès obtenus

---

## Phase 2: Collecte

### Objectif
Rassembler toutes les données nécessaires à l'analyse.

### Activités
1. Collecte documentaire
2. Interviews stakeholders
3. Analyse automatisée (outils)
4. Observation/tests manuels

### Livrables
- [ ] Documents collectés
- [ ] Comptes-rendus interviews
- [ ] Rapports outils automatisés
- [ ] Notes d'observation

### Critères de Sortie
- Données suffisantes pour analyse
- Pas de zone aveugle majeure

---

## Phase 3: Analyse

### Objectif
Analyser les données et identifier les findings.

### Activités
1. Analyse des données collectées
2. Identification des problèmes
3. Évaluation de la sévérité
4. Recherche des causes racines
5. Formulation des recommandations

### Livrables
- [ ] Liste des findings priorisés
- [ ] Analyse des causes
- [ ] Recommandations chiffrées
- [ ] Quick wins identifiés

### Critères de Sortie
- Findings validés et priorisés
- Recommandations actionnables

---

## Phase 4: Restitution

### Objectif
Présenter les résultats et le plan d'action.

### Activités
1. Rédaction du rapport d'audit
2. Préparation de la présentation
3. Restitution aux stakeholders
4. Session Q&A
5. Remise du plan d'action

### Livrables
- [ ] Rapport d'audit complet
- [ ] Présentation executive
- [ ] Plan d'action priorisé
- [ ] Estimation des efforts

### Critères de Sortie
- Rapport remis et présenté
- Plan d'action validé

---

## Grille de Sévérité

| Niveau | Label | Description | Action |
|--------|-------|-------------|--------|
| 1 | Critique | Risque immédiat, bloquant | Correction urgente |
| 2 | Majeur | Impact fort, non bloquant | Correction < 1 mois |
| 3 | Modéré | Impact moyen | Correction < 3 mois |
| 4 | Mineur | Impact faible | Backlog |
| 5 | Amélioration | Optimisation | Nice to have |

---

## Templates de Findings

### Finding Standard

```markdown
## [SEVERITY] Titre du Finding

**Constat:** Description factuelle du problème observé.

**Impact:** Conséquences pour l'utilisateur/business.

**Cause:** Analyse de la cause racine.

**Recommandation:** Action corrective proposée.

**Effort:** [S/M/L/XL] - Estimation de l'effort de correction.
```

---

## Types d'Audit Spécialisés

### Audit Technique
- Performance (Core Web Vitals)
- Sécurité (OWASP)
- Code quality (dette technique)
- Infrastructure

### Audit UX
- Heuristiques Nielsen
- Parcours utilisateur
- Tests utilisateurs
- Analytics comportemental

### Audit SEO
- Technique (crawlabilité)
- Contenu (mots-clés)
- Popularité (backlinks)
- Local (GMB)

### Audit Accessibilité
- WCAG 2.1 AA/AAA
- Tests assistifs
- Conformité légale
