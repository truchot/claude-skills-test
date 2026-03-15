---
name: legal-compliance
description: >-
  Expert Legal & Compliance pour RGPD, cookies, documents juridiques et audits de conformite.
  TRIGGER when: RGPD, CGV, CGU, mentions legales, politique confidentialite, cookies, conformite, audit legal.
---

## Domaines d'expertise

- **RGPD** - Protection donnees personnelles, consentement, droits, registre traitements (voir `rgpd-cookies.md`)
- **Cookies** - Audit cookies, bandeau CMP, categorisation, opt-in/opt-out (voir `rgpd-cookies.md`)
- **Documents** - CGV, CGU, mentions legales, politique confidentialite (voir `audit-documents.md`)
- **Audit** - Verification conformite, checklist legale, plan remediation (voir `audit-documents.md`)

## Workflow principal

```
Audit initial → Identification gaps → Generation documents → Implementation → Suivi continu
```

## Checklist conformite rapide

| Element | Obligatoire | Statut |
|---------|------------|--------|
| Mentions legales | Oui | [ ] |
| Politique de confidentialite | Oui | [ ] |
| CGV (si e-commerce) | Oui | [ ] |
| Bandeau cookies | Oui | [ ] |
| Registre des traitements | Oui (RGPD) | [ ] |
| DPO designe | Si applicable | [ ] |
| Formulaires conformes | Oui | [ ] |
| Droit a l'oubli implemente | Oui (RGPD) | [ ] |

## Bases legales du traitement (RGPD)

| Base legale | Usage type | Consentement requis |
|-------------|-----------|-------------------|
| Consentement | Newsletter, marketing, profilage | Oui (opt-in) |
| Contrat | Livraison service, facturation | Non |
| Obligation legale | Conservation factures | Non |
| Interet legitime | Analytics internes, securite | Non (mais info) |

## Categories de cookies

| Categorie | Consentement | Exemples |
|-----------|-------------|---------|
| Essentiels | Non requis | Session, panier, CSRF |
| Analytics | Requis | Google Analytics, Matomo |
| Marketing | Requis | Facebook Pixel, Google Ads |
| Fonctionnels | Requis* | Preferences, chat widget |
| Reseaux sociaux | Requis | Boutons partage |

*Sauf si strictement necessaire au service

## Documents legaux requis

| Document | Obligatoire pour | Frequence MAJ |
|----------|-----------------|---------------|
| Mentions legales | Tout site | A chaque changement |
| Politique confidentialite | Sites collectant donnees | Annuelle min |
| CGV | E-commerce | Annuelle min |
| CGU | Apps/SaaS | Annuelle min |
| Politique cookies | Sites avec cookies | Annuelle min |

## Livrables types

- Politique de confidentialite conforme RGPD
- CGV/CGU adaptees au secteur
- Mentions legales completes
- Registre des traitements
- Specification bandeau cookies
- Rapport d'audit conformite + plan remediation

## Coordination

| Skill | Interaction |
|-------|-------------|
| `frontend-developer` | Implementation bandeau cookies |
| `backend-developer` | Anonymisation, droit a l'oubli, logs |
| `project-management` | Validation documents avec client |
| `devops` | Securite donnees, logs acces |

## Escalation

- **Avocat** : validation juridique finale (obligatoire)
- **direction-technique** : architecture donnees, securite
- **project-management** : planning conformite, budget
