# /client - Commande Expérience Client

## Rôle
Point d'entrée unifié pour toutes les interactions avec le client. Cette commande garantit que chaque communication, livrable ou interaction client passe par le prisme de l'expérience client.

## Comportement
1. **Identifie la phase client** en cours (accueil → fidélisation)
2. **Route vers le bon domaine** de `experience-client`
3. **Applique les validators** sur tout livrable sortant
4. **Coordonne** avec les skills techniques sous-jacents si nécessaire

## Philosophie

> Le client ne voit pas le code, il voit l'expérience. Chaque interaction compte.

Cette commande est le **gardien de l'expérience client**. Elle transforme les livrables techniques internes en communications claires, chaleureuses et sans jargon.

## Hiérarchie Client

### Phase 1-2 — Confiance et Clarté
Références:
- `.web-agency/skills/client-intake/` — Qualification initiale du besoin
- `.web-agency/skills/experience-client/agents/accueil/` — Premier contact et relation
- `.web-agency/skills/experience-client/agents/cadrage/` — Proposition en langage client

### Phase 3 — Co-création
Référence: `.web-agency/skills/experience-client/agents/co-creation/`
- Présentation de maquettes commentées
- Collecte structurée de feedback
- Guidage des arbitrages

### Phase 4-5 — Sérénité et Sécurité
Référence: `.web-agency/skills/experience-client/agents/suivi/`
- Rapports d'avancement hebdomadaires
- Alertes proactives
- Guide de mise en ligne

### Phase 6 — Fierté
Référence: `.web-agency/skills/experience-client/agents/lancement/`
- Formation client
- Bilan J+30
- Célébration du projet

### Phase 7-8 — Soutien et Fidélité
Référence: `.web-agency/skills/experience-client/agents/fidelisation/`
- Rapports mensuels et trimestriels
- Bilan annuel de partenariat
- Veille d'opportunités

## Algorithme de Routage

### 1. Identifier la phase client

| Signaux | Phase | → Domaine |
|---------|-------|-----------|
| nouveau client, premier contact, demande entrante | Accueil | `accueil` |
| proposition, périmètre, planning | Cadrage | `cadrage` |
| devis, estimation, budget, chiffrage, quote, invoice | Devis | `invoice-generator` |
| maquette, feedback, validation, atelier, prototype | Co-création | `co-creation` |
| avancement, rapport, point projet, statut, démo | Suivi | `suivi` |
| mise en ligne, formation, go-live, lancement | Lancement | `lancement` |
| rapport mensuel, bilan, renouvellement, évolution | Fidélisation | `fidelisation` |

### 2. Identifier l'intention

| Intention | Action |
|-----------|--------|
| **Communiquer** au client | Rédiger en langage client, appliquer validators |
| **Collecter** du feedback | Structurer la collecte, préparer le support |
| **Informer** sur l'avancement | Produire un rapport en 5 lignes max |
| **Alerter** sur un problème | Communication proactive, solution proposée |
| **Célébrer** une réussite | Valoriser le travail accompli ensemble |
| **Fidéliser** le client | Proposer des évolutions, mesurer la satisfaction |

### 3. Résolution d'ambiguïté

```
SI la demande concerne une communication client:
  → experience-client (toujours)

SI la demande concerne un devis ou une estimation budgétaire:
  → invoice-generator/agents/devis (génère le JSON structuré)
  → Puis proposer envoi via pennylane-send.js ou qonto-send.js

SI la demande concerne la qualification technique:
  → client-intake (puis handoff vers experience-client)

SI la demande concerne le support post-livraison:
  → support-client (avec validators experience-client)

SI la demande concerne le pipeline commercial:
  → commercial-crm (avec coordination experience-client)

SI le client signale un bug bloquant en production:
  → support-client (escalade immédiate) + alerte experience-client
  → Priorité : résoudre d'abord, communiquer ensuite
```

### 4. Fallback

Si indétermination après analyse:
1. Demander à qui s'adresse le livrable (interne ou client ?)
2. Si client → `experience-client` par défaut
3. Appliquer systématiquement les validators avant envoi

## Validators Obligatoires

Tout livrable sortant vers le client passe par les 5 validators dans cet ordre :

1. **zero-jargon** — Aucun terme technique incompréhensible
2. **ton-et-empathie** — Ton chaleureux, professionnel, empathique
3. **completude-client** — Toutes les infos nécessaires sont présentes
4. **sla-reactivite** — Respect des délais de réponse
5. **coherence-emotionnelle** — Ton adapté au contexte (bonne/mauvaise nouvelle)

## Coordination avec les autres commandes

| Commande | Interaction avec /client |
|----------|------------------------|
| `/tech` | Quand un livrable technique doit être traduit pour le client |
| `/design` | Quand des maquettes doivent être présentées au client |
| `/marketing` | Quand une stratégie marketing doit être communiquée au client |
| `/project` | Quand un rapport projet doit être envoyé au client |

## Utilisation

```
/client [description de la demande]
```

## Exemples

- `/client répondre au mail du client Dupont` → `accueil/premier-contact`
- `/client préparer la proposition pour ACME` → `cadrage/proposition-projet`
- `/client devis site vitrine 5 pages pour restaurant italien` → `invoice-generator/agents/devis` → JSON
- `/client estimation budget refonte e-commerce 20k€ client allemand` → `invoice-generator/agents/devis` → JSON (de)
- `/client présenter les maquettes au client` → `co-creation/walkthrough-narratif`
- `/client point d'avancement hebdo` → `suivi/rapport-avancement`
- `/client le client demande où on en est` → `suivi/rapport-avancement`
- `/client préparer la mise en ligne` → `lancement/guide-mise-en-ligne` + `suivi/guide-mise-en-ligne`
- `/client former le client à son outil` → `lancement/formation-client`
- `/client bilan mensuel du projet Alpha` → `fidelisation/rapport-mensuel`
- `/client le client est mécontent` → Escalade humaine immédiate
