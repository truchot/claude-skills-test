---
id: rgpd-compliance-report
name: Rapport de Conformité RGPD
version: 1.0.0
category: legal
status: active
phase: "2-strategy"
order: 3
agents:
  - legal-compliance/audit/compliance-checker
  - legal-compliance/rgpd/data-mapper
  - legal-compliance/rgpd/treatment-analyzer
  - legal-compliance/rgpd/risk-assessor
consumes:
  - project-brief
  - technical-specification
  - data-model
produces_for:
  - direction-technique/*/all
  - backend-developer/*/all
  - legal-compliance/documents/privacy-policy-generator
tags: [rgpd, gdpr, compliance, audit, données-personnelles, pia, aipd]
---

# Rapport de Conformité RGPD

## Description

Audit complet de la conformité d'un projet ou système au Règlement Général sur la Protection des Données (RGPD). Ce rapport cartographie les traitements de données personnelles, évalue les risques, identifie les écarts de conformité et propose un plan d'actions correctives. Il sert de base pour la rédaction des documents légaux et la mise en conformité technique.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown + Tableur annexe |
| **Emplacement** | `/docs/compliance/rgpd-audit-[date].md` |
| **Nommage** | `rgpd-audit-YYYY-MM-DD.md`, `registre-traitements.xlsx` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Synthèse exécutive** - Score global, risques critiques, recommandations prioritaires
- [ ] **Périmètre de l'audit** - Systèmes, applications, processus audités
- [ ] **Registre des traitements** - Cartographie complète des traitements de données
- [ ] **Analyse des bases légales** - Vérification de la légitimité de chaque traitement
- [ ] **Droits des personnes** - Évaluation des mécanismes d'exercice des droits
- [ ] **Sécurité des données** - Mesures techniques et organisationnelles
- [ ] **Transferts internationaux** - Analyse des flux hors UE
- [ ] **Sous-traitants** - Inventaire et conformité des sous-traitants
- [ ] **Écarts de conformité** - Liste des non-conformités identifiées
- [ ] **Plan d'actions** - Recommandations priorisées avec échéances

### Sections Optionnelles

- [ ] **AIPD/PIA** - Analyse d'Impact relative à la Protection des Données (si traitement à risque)
- [ ] **Analyse des cookies** - Audit spécifique des traceurs
- [ ] **Formation et sensibilisation** - État des lieux des compétences RGPD
- [ ] **Incidents passés** - Historique des violations de données

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Tous traitements cartographiés | 100% des traitements identifiés | Manuel | Oui |
| 2 | Score de conformité calculé | Score global + par domaine | Auto | Oui |
| 3 | Base légale vérifiée | Chaque traitement a une base légale | Manuel | Oui |
| 4 | Risques évalués | Matrice impact/probabilité | Manuel | Oui |
| 5 | Plan d'actions priorisé | Actions classées P1/P2/P3 | Manuel | Oui |
| 6 | Sous-traitants inventoriés | Liste complète avec DPA status | Manuel | Oui |
| 7 | AIPD si nécessaire | Réalisée pour traitements à risque | Manuel | Conditionnel |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `client-intake` | project-brief | Contexte et objectifs du projet |
| `direction-technique` | technical-specification | Architecture technique |
| `direction-technique` | data-model | Modèle de données |
| `backend-developer` | database-schema | Schéma de base de données |
| Client | Registre existant | Registre des traitements si existant |
| Client | Contrats sous-traitants | DPA et contrats existants |
| Client | Politique sécurité | PSSI si existante |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Validation périmètre | DPO / Direction | Ajustement du scope |
| 2 | Revue des traitements | DPO + Métiers | Complétion du registre |
| 3 | Validation plan d'actions | Direction + DPO | Priorisation des actions |
| 4 | Approbation finale | Direction | Engagement sur le plan |

## Exemple

### Exemple Minimal

```markdown
# Rapport de Conformité RGPD
**Projet :** Site vitrine Entreprise X
**Date :** 18/01/2026
**Score global :** 72/100

## Synthèse
- 3 traitements identifiés
- 1 non-conformité critique (absence de consentement cookies)
- 2 actions prioritaires

## Registre des traitements
| # | Traitement | Finalité | Base légale | Données | Durée |
|---|------------|----------|-------------|---------|-------|
| 1 | Formulaire contact | Répondre aux demandes | Consentement | Nom, email, message | 3 ans |
| 2 | Analytics | Statistiques | Intérêt légitime | IP anonymisée | 13 mois |
| 3 | Newsletter | Marketing | Consentement | Email | Désabonnement |

## Actions prioritaires
1. [P1] Implémenter bandeau cookies conforme
2. [P2] Rédiger politique de confidentialité
```

### Exemple Complet

```markdown
# Rapport de Conformité RGPD

## Informations générales

| Élément | Valeur |
|---------|--------|
| **Organisation** | Entreprise X |
| **Projet/Système** | Plateforme e-commerce B2C |
| **Date de l'audit** | 18 janvier 2026 |
| **Auditeur** | [Nom] - DPO externe |
| **Version** | 1.0 |

---

## 1. Synthèse Exécutive

### Score de Conformité Global

```
██████████████████░░░░░░░░ 72%
```

| Domaine | Score | Tendance |
|---------|-------|----------|
| Licéité des traitements | 85% | ✅ |
| Droits des personnes | 70% | ⚠️ |
| Sécurité | 75% | ✅ |
| Sous-traitance | 60% | ⚠️ |
| Documentation | 65% | ⚠️ |
| Gouvernance | 80% | ✅ |

### Risques Critiques Identifiés

| # | Risque | Impact | Probabilité | Score |
|---|--------|--------|-------------|-------|
| R1 | Absence DPA avec hébergeur | Élevé | Moyen | 🔴 |
| R2 | Consentement cookies non conforme | Moyen | Élevé | 🔴 |
| R3 | Durées de conservation non définies | Moyen | Moyen | 🟠 |

### Top 3 Recommandations

1. **[URGENT]** Signer DPA avec AWS et Stripe
2. **[URGENT]** Implémenter CMP conforme (Axeptio/Tarteaucitron)
3. **[PRIORITAIRE]** Définir et implémenter politique de rétention

---

## 2. Périmètre de l'Audit

### Systèmes inclus
- Site e-commerce (Next.js + PostgreSQL)
- Back-office administration
- Application mobile (React Native)
- CRM HubSpot
- Outil emailing Mailchimp

### Processus audités
- Création de compte client
- Processus de commande
- Newsletter et marketing
- Support client
- Analytics et tracking

### Exclusions
- Systèmes RH internes
- Outils de comptabilité

---

## 3. Registre des Traitements

### T001 - Gestion des comptes clients

| Attribut | Valeur |
|----------|--------|
| **Responsable** | Direction e-commerce |
| **Finalité** | Gestion de la relation client, authentification, historique commandes |
| **Base légale** | Exécution du contrat (Art. 6.1.b) |
| **Catégories de données** | Identification (nom, prénom, email, téléphone), Adresse de livraison/facturation, Historique d'achats |
| **Catégories de personnes** | Clients B2C |
| **Destinataires** | Service client, Service logistique, Transporteurs |
| **Transferts hors UE** | Non |
| **Durée de conservation** | Durée de la relation + 3 ans (prescription) |
| **Mesures de sécurité** | Chiffrement, MFA admin, logs d'accès |

**Conformité : ✅ Conforme**

---

### T002 - Prospection commerciale

| Attribut | Valeur |
|----------|--------|
| **Responsable** | Direction marketing |
| **Finalité** | Envoi de newsletters, offres promotionnelles |
| **Base légale** | Consentement (Art. 6.1.a) |
| **Catégories de données** | Email, préférences, historique d'ouverture |
| **Catégories de personnes** | Abonnés newsletter |
| **Destinataires** | Mailchimp (sous-traitant) |
| **Transferts hors UE** | Oui - USA (Mailchimp) |
| **Durée de conservation** | Jusqu'au désabonnement + 3 ans |
| **Mesures de sécurité** | Accès restreint, lien désabonnement |

**Conformité : ⚠️ Partielle**
- ❌ DPA Mailchimp non signé
- ❌ Garanties transfert USA à vérifier post-invalidation Privacy Shield

---

### T003 - Analytics et mesure d'audience

| Attribut | Valeur |
|----------|--------|
| **Responsable** | Direction digitale |
| **Finalité** | Mesure d'audience, amélioration UX |
| **Base légale** | Consentement (cookies) / Intérêt légitime (stats agrégées) |
| **Catégories de données** | Adresse IP, données de navigation, device |
| **Destinataires** | Google Analytics (sous-traitant) |
| **Transferts hors UE** | Oui - USA (Google) |
| **Durée de conservation** | 13 mois |

**Conformité : ❌ Non conforme**
- ❌ Consentement cookies non recueilli correctement
- ❌ IP non anonymisée
- ❌ Pas d'alternative européenne étudiée

---

## 4. Analyse des Droits des Personnes

| Droit | Implémenté | Délai | Conformité |
|-------|------------|-------|------------|
| Information | Oui (politique confidentialité) | - | ⚠️ Incomplète |
| Accès | Oui (espace client) | < 1 mois | ✅ |
| Rectification | Oui (espace client) | Immédiat | ✅ |
| Effacement | Partiel (demande manuelle) | < 1 mois | ⚠️ |
| Portabilité | Non | - | ❌ |
| Opposition | Oui (désabonnement) | Immédiat | ✅ |
| Limitation | Non | - | ❌ |

### Recommandations
- Implémenter export des données (portabilité)
- Automatiser le processus d'effacement
- Documenter la procédure de limitation

---

## 5. Sous-traitants

| Sous-traitant | Service | Localisation | DPA signé | Conformité |
|---------------|---------|--------------|-----------|------------|
| AWS | Hébergement | Irlande (UE) | ❌ Non | ⚠️ |
| Stripe | Paiement | USA | ✅ Oui | ✅ |
| Mailchimp | Emailing | USA | ❌ Non | ❌ |
| Google | Analytics | USA | ❌ Non | ❌ |
| HubSpot | CRM | USA | ✅ Oui | ✅ |

### Actions requises
1. Signer DPA AWS (template disponible)
2. Signer DPA Mailchimp et vérifier SCCs
3. Migrer vers Matomo ou configurer GA4 avec consentement

---

## 6. Plan d'Actions

### Priorité 1 - Critique (< 1 mois)

| # | Action | Responsable | Échéance | Effort |
|---|--------|-------------|----------|--------|
| A1 | Signer DPA AWS | DPO | 01/02/2026 | 2h |
| A2 | Implémenter CMP conforme | Dev Frontend | 15/02/2026 | 2j |
| A3 | Signer DPA Mailchimp + SCCs | DPO | 01/02/2026 | 4h |

### Priorité 2 - Important (< 3 mois)

| # | Action | Responsable | Échéance | Effort |
|---|--------|-------------|----------|--------|
| A4 | Compléter politique confidentialité | DPO | 01/03/2026 | 1j |
| A5 | Implémenter portabilité données | Dev Backend | 15/03/2026 | 3j |
| A6 | Définir durées de rétention | DPO + Métiers | 01/03/2026 | 2j |
| A7 | Migrer vers Matomo ou configurer GA4 | Dev | 01/04/2026 | 2j |

### Priorité 3 - Amélioration (< 6 mois)

| # | Action | Responsable | Échéance | Effort |
|---|--------|-------------|----------|--------|
| A8 | Former équipes au RGPD | DPO | 01/06/2026 | 1j |
| A9 | Automatiser purge données | Dev Backend | 01/06/2026 | 3j |
| A10 | Documenter procédures violation | DPO | 01/05/2026 | 1j |

---

## 7. Annexes

### A. Matrice des risques

```
Impact
  Élevé   |  R3  |  R1  |      |
  Moyen   |      |  R2  |      |
  Faible  |      |      |      |
          ───────────────────────
           Faible Moyen  Élevé
                Probabilité
```

### B. Checklist AIPD
Une AIPD est requise si le traitement :
- [ ] Évaluation/scoring automatisé
- [ ] Traitement à grande échelle de données sensibles
- [ ] Surveillance systématique à grande échelle
- [x] Croisement de données à grande échelle → **AIPD recommandée pour T001+T002**

### C. Contacts

| Rôle | Nom | Email |
|------|-----|-------|
| DPO | [Nom] | dpo@entreprise.com |
| RSSI | [Nom] | rssi@entreprise.com |
| Sponsor | [Nom] | direction@entreprise.com |
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Audit "one-shot" sans suivi | Conformité se dégrade avec le temps | Prévoir revues trimestrielles |
| Registre incomplet | Risque de sanctions CNIL | Cartographier TOUS les traitements |
| Ignorer les sous-traitants | Responsabilité conjointe | Auditer et contractualiser chaque sous-traitant |
| Base légale "fourre-tout" | Intérêt légitime abusif | Analyser finement chaque traitement |
| Plan d'actions sans échéances | Actions jamais réalisées | Fixer deadlines et responsables |

## Références

- [RGPD - Texte officiel](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [CNIL - Guide du DPO](https://www.cnil.fr/fr/le-guide-du-delegue-la-protection-des-donnees)
- [CNIL - Modèle de registre](https://www.cnil.fr/fr/RGDP-le-registre-des-activites-de-traitement)
- [CNIL - Guide AIPD/PIA](https://www.cnil.fr/fr/RGPD-analyse-impact-protection-des-donnees-aipd)
- Livrables liés : `privacy-policy`, `cookie-policy`, `security-audit`, `data-model`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | legal-compliance | Création initiale |
