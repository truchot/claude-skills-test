---
id: technical-audit
name: Audit Technique
version: 1.0.0
category: report
status: active
phase: "2-strategy"
order: 1
agents:
  - direction-technique/avant-projet/audit-existant
  - direction-technique/qualite/dette-technique
consumes:
  - client-request
  - requirements-list
produces_for:
  - direction-technique/avant-projet/etude-faisabilite
  - direction-technique/avant-projet/selection-stack
  - direction-technique/estimation/estimation-macro
tags: [audit, technique, existant, dette, analyse]
---

# Audit Technique

## Description

Analyse approfondie de l'existant technique (code, infrastructure, architecture) permettant d'évaluer l'état actuel, identifier les risques et orienter les décisions. Réalisé en amont de tout projet de refonte ou d'évolution majeure.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown |
| **Emplacement** | `projects/[client-slug]/02-strategy/technical-audit.md` |
| **Nommage** | `technical-audit.md` ou `audit-[domaine].md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Résumé exécutif** - Synthèse en 10 lignes max
- [ ] **Périmètre de l'audit** - Ce qui a été analysé
- [ ] **Méthodologie** - Comment l'audit a été conduit
- [ ] **État des lieux** - Constats factuels
- [ ] **Points forts** - Ce qui fonctionne bien
- [ ] **Points faibles** - Problèmes identifiés
- [ ] **Risques** - Risques techniques identifiés
- [ ] **Recommandations** - Actions préconisées
- [ ] **Conclusion** - Verdict global

### Sections Optionnelles

- [ ] **Métriques** - Données quantitatives (couverture tests, dette, etc.)
- [ ] **Captures d'écran** - Preuves visuelles
- [ ] **Logs / Traces** - Exemples de problèmes
- [ ] **Benchmark** - Comparaison avec standards
- [ ] **Planning de remédiation** - Roadmap corrective

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Complétude | Toutes sections obligatoires | Manuel | Oui |
| 2 | Factuel | Chaque constat a une preuve | Manuel | Oui |
| 3 | Actionnable | Chaque point faible a une recommandation | Manuel | Oui |
| 4 | Priorisé | Risques classés par criticité | Manuel | Oui |
| 5 | Objectif | Pas de jugement de valeur, faits uniquement | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| Client | Accès au code source | Repository Git |
| Client | Accès infrastructure | Serveurs, BDD, logs |
| Client | Documentation existante | Specs, schémas |
| `client-intake/*` | `requirements-list` | Contexte du projet |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Définition périmètre | Direction technique | Ajuster scope |
| 2 | Revue des constats | Lead Dev | Vérifier exactitude |
| 3 | Présentation client | Client | Clarifier si contesté |

## Exemple

### Exemple Minimal

```markdown
# Audit Technique - Site Client X

## Résumé Exécutif

Site WordPress 5.2 présentant des vulnérabilités de sécurité critiques et une dette technique importante. Refonte recommandée plutôt qu'évolution.

## Périmètre

- Code source WordPress (thème + plugins)
- Base de données MySQL
- Configuration serveur Apache

## État des Lieux

| Élément | Version | Statut |
|---------|---------|--------|
| WordPress | 5.2.4 | ⚠️ Obsolète |
| PHP | 7.2 | ⚠️ EOL |
| Thème | Custom | ❌ Non maintenu |
| Plugins | 12 | ⚠️ 4 obsolètes |

## Points Forts

- ✅ Contenu bien structuré
- ✅ SEO correct (balises en place)

## Points Faibles

| # | Problème | Criticité | Preuve |
|---|----------|-----------|--------|
| 1 | Failles XSS | 🔴 Critique | Scan OWASP |
| 2 | Pas de HTTPS | 🔴 Critique | Navigation |
| 3 | Pas de backup | 🟠 Haute | Config serveur |
| 4 | Code spaghetti | 🟡 Moyenne | Review code |

## Recommandations

1. **Urgent** : Migrer vers HTTPS
2. **Court terme** : Mettre à jour WordPress + PHP
3. **Moyen terme** : Refonte complète du thème

## Conclusion

**Verdict : Refonte recommandée** (vs évolution) en raison de la dette technique accumulée.
```

### Exemple Complet

```markdown
---
projet: audit-site-clientx
client: Client X
date_audit: 2024-01-20
auditeur: Thomas Bernard
version: 1.0
---

# Audit Technique - Site E-commerce Client X

## 1. Résumé Exécutif

L'audit du site e-commerce Client X révèle une **situation critique** nécessitant une intervention urgente :

- **Sécurité** : 3 vulnérabilités critiques (CVE récentes non patchées)
- **Performance** : Time to First Byte > 4s (objectif < 0.5s)
- **Maintenabilité** : Code non versionné, pas de tests
- **Infrastructure** : Serveur mutualisé sous-dimensionné

**Recommandation principale** : Refonte technique complète avec migration vers infrastructure moderne.

---

## 2. Périmètre de l'Audit

### Inclus

| Composant | Accès | Analysé |
|-----------|-------|---------|
| Code WordPress | ✅ FTP | ✅ Oui |
| Base de données | ✅ phpMyAdmin | ✅ Oui |
| Serveur | ❌ SSH limité | 🔶 Partiel |
| Analytics | ✅ GA4 | ✅ Oui |
| Logs | ❌ Non fournis | ❌ Non |

### Exclus

- Tests de charge (non autorisés sur mutualisé)
- Audit juridique / RGPD
- Audit SEO détaillé

---

## 3. Méthodologie

### Outils Utilisés

| Catégorie | Outil | Version |
|-----------|-------|---------|
| Sécurité | WPScan | 3.8.22 |
| Sécurité | OWASP ZAP | 2.14 |
| Performance | Lighthouse | 11.0 |
| Performance | GTmetrix | - |
| Code | PHP_CodeSniffer | 3.7 |
| Code | PHPStan | 1.10 |

### Durée

- Analyse automatisée : 2h
- Analyse manuelle : 6h
- Rédaction : 4h
- **Total** : 12h / 1.5 jours

---

## 4. État des Lieux

### Stack Technique

| Composant | Version actuelle | Version LTS | Écart |
|-----------|-----------------|-------------|-------|
| WordPress | 5.8.4 | 6.4.2 | ⚠️ -8 versions |
| PHP | 7.4.33 | 8.2+ | ⚠️ EOL Nov 2022 |
| MySQL | 5.7.40 | 8.0+ | 🔶 Support étendu |
| WooCommerce | 5.9.0 | 8.4.0 | ⚠️ -15 versions |

### Architecture

```
┌─────────────────────────────────────────┐
│           Serveur Mutualisé             │
│  ┌─────────────────────────────────┐   │
│  │         Apache 2.4              │   │
│  │  ┌───────────┐  ┌────────────┐  │   │
│  │  │    PHP    │  │   MySQL    │  │   │
│  │  │   7.4     │  │    5.7     │  │   │
│  │  └───────────┘  └────────────┘  │   │
│  │  ┌───────────────────────────┐  │   │
│  │  │      WordPress 5.8        │  │   │
│  │  │  ┌─────────┐ ┌─────────┐  │  │   │
│  │  │  │ Thème   │ │Plugins  │  │  │   │
│  │  │  │ Custom  │ │  (18)   │  │  │   │
│  │  │  └─────────┘ └─────────┘  │  │   │
│  │  └───────────────────────────┘  │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Plugins Analysés

| Plugin | Version | Dernière MAJ | Statut |
|--------|---------|--------------|--------|
| WooCommerce | 5.9.0 | 2021-11 | ⚠️ Obsolète |
| Yoast SEO | 19.2 | 2023-01 | 🔶 À jour |
| Contact Form 7 | 5.4 | 2021-06 | ⚠️ Obsolète |
| WP Super Cache | 1.7.4 | 2021-08 | ⚠️ Obsolète |
| ... | ... | ... | ... |

---

## 5. Points Forts

| # | Point Fort | Impact | Détail |
|---|------------|--------|--------|
| 1 | Structure de contenu | 🟢 Positif | Catégories bien organisées, taxonomie claire |
| 2 | SEO technique | 🟢 Positif | Balises meta, sitemap, robots.txt en place |
| 3 | Responsive | 🟢 Positif | Thème adapté mobile (score 85/100) |
| 4 | Uptime | 🟢 Positif | 99.5% sur 30 jours |

---

## 6. Points Faibles

### 6.1 Sécurité (Critique)

| # | Vulnérabilité | CVE | CVSS | Preuve |
|---|---------------|-----|------|--------|
| S1 | XSS Stored (CF7) | CVE-2023-1234 | 8.1 | WPScan report |
| S2 | SQL Injection (plugin) | CVE-2022-5678 | 9.8 | OWASP ZAP |
| S3 | Pas de HTTPS | - | - | Navigation |
| S4 | Fichiers sensibles exposés | - | 7.5 | /wp-config.php.bak accessible |

### 6.2 Performance (Haute)

| # | Problème | Valeur | Cible | Écart |
|---|----------|--------|-------|-------|
| P1 | TTFB | 4.2s | <0.5s | x8 |
| P2 | LCP | 8.1s | <2.5s | x3 |
| P3 | Poids page | 4.8MB | <1MB | x5 |
| P4 | Requêtes | 127 | <50 | x2.5 |

**Lighthouse Score** : 32/100 (Mobile)

### 6.3 Maintenabilité (Haute)

| # | Problème | Impact | Preuve |
|---|----------|--------|--------|
| M1 | Pas de Git | Risque perte code | FTP only |
| M2 | Pas de tests | Régression non détectée | Aucun test |
| M3 | Code non documenté | Reprise impossible | Review |
| M4 | Pas d'environnement dev | Modifs en prod | Config |

### 6.4 Infrastructure (Moyenne)

| # | Problème | Impact |
|---|----------|--------|
| I1 | Mutualisé sous-dimensionné | Lenteurs |
| I2 | Pas de backup automatique | Perte données |
| I3 | Pas de staging | Tests en prod |
| I4 | PHP-FPM non optimisé | Performance |

---

## 7. Analyse des Risques

| # | Risque | Probabilité | Impact | Criticité | Mitigation |
|---|--------|-------------|--------|-----------|------------|
| R1 | Piratage (SQLi/XSS) | 🔴 Haute | 🔴 Critique | 🔴 **P1** | Patch urgent |
| R2 | Indisponibilité | 🟠 Moyenne | 🔴 Critique | 🟠 **P2** | Migration infra |
| R3 | Perte de données | 🟠 Moyenne | 🔴 Critique | 🟠 **P2** | Backup auto |
| R4 | Impossibilité maintenance | 🔴 Haute | 🟠 Haute | 🟠 **P2** | Refonte |

---

## 8. Recommandations

### Urgentes (< 1 semaine)

| # | Action | Effort | Responsable |
|---|--------|--------|-------------|
| 1 | Activer HTTPS | 2h | DevOps |
| 2 | Supprimer fichiers exposés | 1h | DevOps |
| 3 | MAJ plugins critiques | 4h | Dev WordPress |
| 4 | Configurer backup | 2h | DevOps |

### Court terme (< 1 mois)

| # | Action | Effort | Responsable |
|---|--------|--------|-------------|
| 5 | Migrer vers PHP 8.1+ | 2j | Dev |
| 6 | MAJ WordPress + WooCommerce | 1j | Dev |
| 7 | Audit plugins, supprimer inutiles | 1j | Dev |
| 8 | Configurer WAF | 0.5j | DevOps |

### Moyen terme (< 3 mois)

| # | Action | Effort | Responsable |
|---|--------|--------|-------------|
| 9 | Migrer vers VPS/Cloud | 3j | DevOps |
| 10 | Refonte thème (moderne, performant) | 15j | Dev |
| 11 | Mettre en place CI/CD | 2j | DevOps |
| 12 | Ajouter monitoring | 1j | DevOps |

---

## 9. Estimation Corrective

| Scénario | Effort | Coût estimé | Risque résiduel |
|----------|--------|-------------|-----------------|
| **A - Patch minimal** | 3j | 2 400 € | 🔴 Élevé |
| **B - Mise à niveau** | 15j | 12 000 € | 🟠 Moyen |
| **C - Refonte complète** | 30j | 24 000 € | 🟢 Faible |

**Recommandation** : Scénario C (refonte) pour un ROI long terme et risque minimal.

---

## 10. Conclusion

### Verdict Global

| Dimension | Score | Statut |
|-----------|-------|--------|
| Sécurité | 2/10 | 🔴 Critique |
| Performance | 3/10 | 🔴 Critique |
| Maintenabilité | 2/10 | 🔴 Critique |
| Infrastructure | 4/10 | 🟠 Insuffisant |
| **Global** | **2.75/10** | 🔴 **Critique** |

### Décision Recommandée

> **Refonte technique complète** avec migration infrastructure.
>
> L'accumulation de dette technique et les vulnérabilités critiques rendent l'évolution incrémentale plus coûteuse et risquée qu'une refonte.

---

## Annexes

- [Rapport WPScan complet](./annexes/wpscan-report.txt)
- [Rapport Lighthouse](./annexes/lighthouse-report.html)
- [Captures d'écran](./annexes/screenshots/)
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Audit sans preuve | Contestable, non actionnable | Toujours joindre les preuves |
| Critique sans solution | Frustrant, bloquant | Chaque problème = 1 recommandation |
| Trop technique | Client ne comprend pas | Résumé exécutif en langage business |
| Scope non défini | Attentes mal gérées | Périmètre explicite en intro |
| Pas de priorisation | Tout semble urgent | Classifier par criticité |

## Références

- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/)
- Livrables liés : `feasibility-study`, `stack-recommendation`, `risk-matrix`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2024-01-15 | direction-technique | Création initiale |
