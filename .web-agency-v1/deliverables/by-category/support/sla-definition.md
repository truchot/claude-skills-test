---
id: sla-definition
name: Définition des SLAs
version: 1.0.0
category: support
status: active
phase: "3-conception"
order: 2
agents:
  - support-client/escalation/sla-monitor
  - support-client/escalation/escalation-handler
  - direction-operations/operations/service-level-manager
consumes:
  - project-brief
  - requirements-list
  - commercial-proposal
produces_for:
  - support-client/*/all
  - devops/monitoring/*
  - project-management/*/all
tags: [sla, support, niveaux-service, engagement, monitoring, kpi]
---

# Définition des SLAs (Service Level Agreements)

## Description

Document définissant les engagements de niveaux de service entre le fournisseur et le client. Les SLAs établissent des objectifs mesurables de disponibilité, performance, temps de réponse et résolution des incidents. Ce livrable sert de référence contractuelle et opérationnelle pour le support, le monitoring et la relation client.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown / PDF contractuel |
| **Emplacement** | `/docs/operations/sla.md` ou annexe contrat |
| **Nommage** | `sla-[client]-[version].md`, `sla-definition.md` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Définitions et terminologie** - Glossaire des termes utilisés
- [ ] **Périmètre des services** - Services couverts et exclus
- [ ] **Niveaux de criticité** - Classification des incidents (P1-P4)
- [ ] **Objectifs de disponibilité** - Uptime garanti et mesure
- [ ] **Temps de réponse** - Délai de prise en charge par priorité
- [ ] **Temps de résolution** - Délai de résolution cible par priorité
- [ ] **Fenêtres de maintenance** - Plages de maintenance planifiée
- [ ] **Mesure et reporting** - KPIs et fréquence de rapports
- [ ] **Pénalités et compensations** - Conséquences du non-respect
- [ ] **Procédure d'escalade** - Matrice d'escalade

### Sections Optionnelles

- [ ] **SLAs par service/module** - Niveaux différenciés
- [ ] **Heures d'ouverture** - Plages de support par niveau
- [ ] **Exclusions** - Événements hors périmètre SLA
- [ ] **Révision des SLAs** - Processus de mise à jour

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Objectifs mesurables | Tous les SLAs quantifiés | Manuel | Oui |
| 2 | Niveaux de priorité définis | 3-5 niveaux distincts | Manuel | Oui |
| 3 | Temps de réponse par priorité | Défini pour chaque niveau | Manuel | Oui |
| 4 | Temps de résolution par priorité | Défini pour chaque niveau | Manuel | Oui |
| 5 | Méthode de mesure documentée | Outils et calculs précisés | Manuel | Oui |
| 6 | Matrice d'escalade complète | Contacts et délais | Manuel | Oui |
| 7 | Validé par les parties | Signatures ou approbations | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `commercial-crm` | commercial-proposal | Engagements commerciaux négociés |
| `client-intake` | requirements-list | Attentes client en termes de support |
| `devops` | monitoring-setup | Capacités de monitoring actuelles |
| `direction-technique` | technical-specification | Architecture et points de défaillance |
| Historique | Incidents passés | Statistiques de résolution |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Définition des niveaux | Direction technique + Support | Ajustement des cibles |
| 2 | Validation commerciale | Direction commerciale + Client | Négociation |
| 3 | Validation juridique | Juriste | Reformulation clauses |
| 4 | Signature | Direction + Client | Finalisation contrat |

## Exemple

### Exemple Minimal

```markdown
# SLA - Service Support

## Niveaux de priorité

| Priorité | Description | Temps réponse | Temps résolution |
|----------|-------------|---------------|------------------|
| P1 - Critique | Service indisponible | 15 min | 4h |
| P2 - Majeur | Dégradation importante | 1h | 8h |
| P3 - Mineur | Fonctionnalité impactée | 4h | 24h |
| P4 - Faible | Question, demande | 24h | 72h |

## Disponibilité
- Uptime garanti : 99,5%
- Mesure : Mensuelle, hors maintenance planifiée

## Contact
- Support : support@entreprise.com
- Urgences P1 : +33 1 XX XX XX XX
```

### Exemple Complet

```markdown
# Service Level Agreement (SLA)

**Version :** 2.0.0
**Date d'effet :** 1er janvier 2026
**Client :** [Nom du client]
**Fournisseur :** [Nom de l'entreprise]

---

## 1. Définitions et Terminologie

| Terme | Définition |
|-------|------------|
| **Disponibilité** | Pourcentage du temps pendant lequel le service est opérationnel et accessible |
| **Temps de réponse** | Délai entre la soumission d'un incident et la première prise en charge par le support |
| **Temps de résolution** | Délai entre la soumission et la résolution effective de l'incident |
| **Incident** | Événement non planifié causant une interruption ou dégradation du service |
| **Demande de service** | Requête planifiée (modification, information, amélioration) |
| **Maintenance planifiée** | Intervention programmée et communiquée à l'avance |
| **Heures ouvrées** | Lundi-Vendredi, 9h00-18h00 (hors jours fériés France) |

---

## 2. Périmètre des Services

### 2.1 Services couverts

| Service | Composants inclus |
|---------|-------------------|
| **Application Web** | Frontend, Backend API, Base de données |
| **Infrastructure** | Hébergement cloud, CDN, DNS |
| **Intégrations** | API tierces sous notre contrôle |
| **Support** | Assistance technique N1, N2, N3 |

### 2.2 Services exclus

- Services tiers non hébergés (Google, Stripe, etc.)
- Personnalisations hors contrat
- Formation des utilisateurs
- Développements sur mesure (soumis à devis)

---

## 3. Niveaux de Criticité des Incidents

### 3.1 Matrice de classification

| Priorité | Nom | Impact | Exemples |
|----------|-----|--------|----------|
| **P1** | Critique | Service totalement indisponible pour tous les utilisateurs | Panne serveur, erreur 500 globale, faille de sécurité active |
| **P2** | Majeur | Fonctionnalité majeure indisponible ou dégradation significative | Paiements KO, lenteur généralisée (>5s), perte de données |
| **P3** | Mineur | Fonctionnalité secondaire impactée, contournement possible | Bug d'affichage, export KO, erreur sur navigateur spécifique |
| **P4** | Faible | Gêne mineure, question, demande d'amélioration | Typo, suggestion UX, demande d'information |

### 3.2 Critères de priorisation

```
         ┌─────────────────────────────────────┐
         │           IMPACT MÉTIER             │
         │   Critique    Élevé    Moyen   Bas  │
┌────────┼─────────────────────────────────────┤
│Critique│    P1         P1        P2     P2   │
│        ├─────────────────────────────────────┤
U│ Élevé │    P1         P2        P2     P3   │
R├───────┼─────────────────────────────────────┤
G│ Moyen │    P2         P2        P3     P3   │
E├───────┼─────────────────────────────────────┤
N│  Bas  │    P2         P3        P3     P4   │
C└───────┴─────────────────────────────────────┘
E
```

---

## 4. Objectifs de Disponibilité

### 4.1 Niveaux de disponibilité

| Service | SLA Disponibilité | Temps d'arrêt max/mois |
|---------|-------------------|------------------------|
| Application Web | **99,9%** | 43 min |
| API | **99,9%** | 43 min |
| Base de données | **99,95%** | 22 min |
| Infrastructure globale | **99,5%** | 3h 36min |

### 4.2 Calcul de la disponibilité

```
Disponibilité (%) = ((Temps total - Temps d'indisponibilité) / Temps total) × 100

Exclusions du calcul :
- Maintenance planifiée (communiquée 72h à l'avance)
- Indisponibilité causée par le client
- Force majeure (catastrophe naturelle, cyberattaque d'envergure)
- Défaillance de fournisseurs tiers (AWS, Cloudflare, etc.)
```

### 4.3 Outil de mesure

- **Monitoring :** Datadog / UptimeRobot
- **Points de contrôle :** 5 régions (Paris, Londres, New York, Singapour, Sydney)
- **Fréquence :** Check toutes les 60 secondes
- **Dashboard :** status.entreprise.com (public)

---

## 5. Temps de Réponse et Résolution

### 5.1 Support Heures Ouvrées (9h-18h, Lun-Ven)

| Priorité | Temps de réponse | Temps de résolution | Mise à jour client |
|----------|------------------|---------------------|---------------------|
| **P1** | ≤ 15 minutes | ≤ 4 heures | Toutes les 30 min |
| **P2** | ≤ 1 heure | ≤ 8 heures | Toutes les 2h |
| **P3** | ≤ 4 heures | ≤ 24 heures | Toutes les 8h |
| **P4** | ≤ 24 heures | ≤ 5 jours ouvrés | À résolution |

### 5.2 Support 24/7 (Option Premium)

| Priorité | Temps de réponse | Temps de résolution | Mise à jour client |
|----------|------------------|---------------------|---------------------|
| **P1** | ≤ 15 minutes | ≤ 2 heures | Toutes les 15 min |
| **P2** | ≤ 30 minutes | ≤ 4 heures | Toutes les heures |
| **P3** | ≤ 2 heures | ≤ 12 heures | Toutes les 4h |
| **P4** | ≤ 8 heures | ≤ 3 jours | À résolution |

### 5.3 Définition de "résolution"

Un incident est considéré résolu lorsque :
- Le service est rétabli à son état normal
- OU une solution de contournement acceptable est en place
- ET le client a confirmé la résolution

---

## 6. Fenêtres de Maintenance

### 6.1 Maintenance planifiée

| Type | Fréquence | Fenêtre | Préavis |
|------|-----------|---------|---------|
| Mises à jour mineures | Hebdomadaire | Mardi 2h-4h | 24h |
| Mises à jour majeures | Mensuelle | Dimanche 2h-6h | 72h |
| Maintenance infrastructure | Trimestrielle | Samedi 22h - Dimanche 6h | 7 jours |
| Urgences sécurité | Si nécessaire | ASAP | Notification immédiate |

### 6.2 Communication maintenance

- **Email :** maintenance@entreprise.com
- **Page status :** status.entreprise.com
- **Notification in-app :** Bannière 48h avant

---

## 7. Mesure et Reporting

### 7.1 KPIs suivis

| KPI | Définition | Cible | Fréquence |
|-----|------------|-------|-----------|
| **Uptime** | Disponibilité mensuelle | ≥ 99,9% | Mensuel |
| **MTTR** | Mean Time To Repair (P1) | ≤ 2h | Mensuel |
| **MTTD** | Mean Time To Detect | ≤ 5 min | Mensuel |
| **First Response SLA** | % tickets répondus dans les délais | ≥ 95% | Mensuel |
| **Resolution SLA** | % tickets résolus dans les délais | ≥ 90% | Mensuel |
| **NPS Support** | Score de satisfaction | ≥ 50 | Trimestriel |
| **Tickets/utilisateur** | Volume relatif de tickets | ≤ 0,5/mois | Mensuel |

### 7.2 Rapports

| Rapport | Contenu | Fréquence | Destinataires |
|---------|---------|-----------|---------------|
| **Dashboard temps réel** | Status services, incidents en cours | Continu | Tous |
| **Rapport mensuel** | KPIs, incidents, tendances | Mensuel | Client + Direction |
| **Bilan trimestriel** | Analyse approfondie, recommandations | Trimestriel | Comité de pilotage |
| **Post-mortem P1** | Analyse cause racine | Après chaque P1 | Client + Direction |

---

## 8. Pénalités et Compensations

### 8.1 Crédits de service

| Disponibilité mensuelle | Crédit |
|------------------------|--------|
| 99,9% - 99,5% | 0% (conforme) |
| 99,5% - 99,0% | 10% de l'abonnement mensuel |
| 99,0% - 95,0% | 25% de l'abonnement mensuel |
| < 95,0% | 50% de l'abonnement mensuel |

### 8.2 Conditions

- Crédit maximum : 50% de la facture mensuelle
- Le client doit réclamer le crédit sous 30 jours
- Les crédits sont appliqués sur la prochaine facture
- Les crédits ne sont pas cumulables au-delà de 100%

### 8.3 Exclusions

Les pénalités ne s'appliquent pas en cas de :
- Maintenance planifiée et communiquée
- Force majeure
- Actions ou inactions du client
- Dépassement des limites de capacité contractuelles

---

## 9. Procédure d'Escalade

### 9.1 Matrice d'escalade

| Niveau | Déclencheur | Contact | Délai |
|--------|-------------|---------|-------|
| **N1 - Support** | Tout incident | support@entreprise.com | Immédiat |
| **N2 - Lead Support** | P1 non résolu > 2h, P2 > 4h | lead-support@entreprise.com | Auto |
| **N3 - CTO** | P1 non résolu > 4h | cto@entreprise.com, +33 6 XX XX XX XX | Auto |
| **N4 - Direction** | P1 non résolu > 8h, récurrence | direction@entreprise.com | Auto |

### 9.2 Contacts d'urgence (P1 uniquement)

| Rôle | Nom | Téléphone | Disponibilité |
|------|-----|-----------|---------------|
| Astreinte N1 | Support | +33 1 XX XX XX XX | 24/7 |
| Astreinte N2 | Lead technique | +33 6 XX XX XX XX | 24/7 |
| Escalade N3 | CTO | +33 6 XX XX XX XX | 8h-22h |
| Escalade N4 | CEO | +33 6 XX XX XX XX | Sur demande N3 |

### 9.3 Processus d'escalade client

Le client peut demander une escalade à tout moment via :
1. Email à escalation@entreprise.com
2. Mention dans le ticket support
3. Appel au numéro d'urgence (P1 uniquement)

---

## 10. Révision et Gouvernance

### 10.1 Comité de suivi

- **Fréquence :** Trimestrielle
- **Participants :** Account Manager, Support Lead, Représentant client
- **Objectif :** Revue des KPIs, incidents majeurs, axes d'amélioration

### 10.2 Révision des SLAs

- Revue annuelle minimum
- Modification sur accord mutuel écrit
- Préavis de 30 jours pour tout changement

---

## 11. Signatures

| Partie | Nom | Fonction | Date | Signature |
|--------|-----|----------|------|-----------|
| Fournisseur | [Nom] | [Fonction] | ___/___/______ | ___________ |
| Client | [Nom] | [Fonction] | ___/___/______ | ___________ |

---

## Annexes

### A. Coordonnées complètes du support

| Canal | Coordonnées | Horaires |
|-------|-------------|----------|
| Email | support@entreprise.com | 24/7 (réponse HO) |
| Téléphone | +33 1 XX XX XX XX | Lun-Ven 9h-18h |
| Urgences P1 | +33 6 XX XX XX XX | 24/7 |
| Portail | support.entreprise.com | 24/7 |
| Chat | Widget site web | Lun-Ven 9h-18h |

### B. Historique des versions

| Version | Date | Modifications |
|---------|------|---------------|
| 1.0.0 | 01/01/2025 | Création initiale |
| 2.0.0 | 01/01/2026 | Ajout support 24/7, révision pénalités |
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| SLAs irréalistes | Pénalités constantes, perte de confiance | Baser sur l'historique réel |
| Pas de mesure automatisée | SLAs impossibles à prouver | Implémenter monitoring |
| Temps de résolution = temps de réponse | Confusion, frustration client | Bien distinguer les deux |
| Exclusions trop larges | SLA vidé de sa substance | Exclusions raisonnables et listées |
| Pas de procédure d'escalade | Incidents P1 qui s'éternisent | Matrice claire avec délais |
| Pénalités non plafonnées | Risque financier illimité | Plafonner à 50-100% mensuel |

## Références

- [ITIL - Service Level Management](https://www.axelos.com/best-practice-solutions/itil)
- [AWS - Service Level Agreements](https://aws.amazon.com/legal/service-level-agreements/)
- [Google Cloud - SLA](https://cloud.google.com/terms/sla)
- [The Practice of Cloud System Administration](https://the-cloud-book.com/)
- Livrables liés : `monitoring-setup`, `incident-runbook`, `commercial-proposal`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | support-client | Création initiale |
