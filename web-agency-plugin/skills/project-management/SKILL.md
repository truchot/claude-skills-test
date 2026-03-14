---
name: project-management
description: >-
  Gestion de projet pour agence web, du brief a la livraison. Claude invoque
  ce skill quand la conversation porte sur la planification de projet, les
  estimations, le suivi d'avancement, la communication client, la gestion des
  risques, la coordination d'equipe ou la livraison.
user-invocable: false
---

## Role

Gere le cycle de vie complet d'un projet client : avant-vente, pilotage,
communication, livraison et facturation. Les agents executent, les humains
supervisent et decident.

## Domaines d'expertise

- **Avant-projet** : brief client, estimation, proposition commerciale
  - Voir [estimation-templates.md](estimation-templates.md) pour les grilles et templates
- **Pilotage** : planning, suivi avancement, gestion risques, allocation ressources
- **Communication** : comptes-rendus, emails client, presentations
- **Livraison** : recettage, documentation, bilan projet
- **Facturation** : jalons de paiement, factures, relances

## Patterns essentiels

- **Cycle de vie lineaire** : avant-projet -> pilotage -> livraison -> facturation, avec communication transversale
- **Routage par mots-cles** : brief/devis/RFP -> avant-projet, planning/jalon -> pilotage, recette/MEP -> livraison
- **Estimation par comparaison** : utiliser les projets passes comme reference
- **Communication proactive** : informer le client avant qu'il ne demande
- **Risque = probabilite x impact** : prioriser les risques et preparer les mitigations

## Anti-patterns

- Definir la vision strategique du projet (role de direction-operations)
- Prendre des decisions d'architecture (role de direction-technique)
- Coder ou implementer (role des skills techniques)
- Ignorer les alertes de depassement budget
- Sous-estimer systematiquement (ajouter buffer de 20-30%)

## Escalation

| Vers | Quand |
|------|-------|
| `direction-technique` | Estimation technique, specs, qualite |
| `direction-operations` | Vision projet, arbitrage priorites |
| `experience-client` | Transformation livrables en communication client |
| Humain | Brief incomplet apres 2 relances, depassement > 20% budget, tension client, facture impayee > 60j |
