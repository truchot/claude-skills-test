# Expérience Client : Le Fil Rouge du Framework

> **Principe fondateur** : Le client n'est pas un "input" du système.
> C'est le destinataire de chaque décision, de chaque livrable, de chaque interaction.
> Tout ce que l'agence produit n'a de valeur que par l'expérience qu'il en retire.

---

## Le Problème Actuel

Le framework `.web-agency/` est structuré autour des **métiers internes** :

```
                    ┌─────────────────────────────────┐
  CLIENT ──input──► │  direction-technique             │
                    │  web-dev-process                 │
                    │  frontend / backend / devops     │
                    │  testing / deployment            │
  CLIENT ◄─output── │  project-management/livraison    │
                    └─────────────────────────────────┘

  Le client entre. Le client sort. Entre les deux : silence.
```

Le client vit une **boîte noire**. Il donne son brief, puis il attend. Il reçoit des questions techniques qu'il ne comprend pas. Il valide des maquettes sans savoir pourquoi on lui demande tel choix. Il reçoit un site, sans comprendre la valeur de ce qui a été construit.

---

## La Vision : Le Client au Centre

Chaque phase du projet doit répondre à une question que le client se pose, pas à un process interne de l'agence.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                    PARCOURS ÉMOTIONNEL DU CLIENT                         │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  "Est-ce que       "Est-ce que     "Est-ce que    "C'est quand          │
│   je suis au        je vais         ça avance ?"    la suite ?"          │
│   bon endroit ?"    avoir ce                                             │
│                     que je veux ?"                                        │
│                                                                          │
│   CONFIANCE         CLARTÉ          SÉRÉNITÉ       FIDÉLITÉ              │
│   ─────────         ──────          ────────       ────────              │
│   Phase 1-2         Phase 3         Phase 4-6      Phase 7-8            │
│                                                                          │
│   ● Écoute active   ● Co-création   ● Visibilité   ● Valeur continue   │
│   ● Reformulation   ● Validation    ● Transparence ● Proactivité       │
│   ● Réactivité      ● Pas de jargon ● Pas de       ● Accompagnement    │
│                                       surprise                           │
│                                                                          │
│  Émotion :          Émotion :       Émotion :      Émotion :             │
│  "Ils me            "Ils ont        "Je sais       "Ils pensent          │
│   comprennent"       compris"        où on en est"  à mon avenir"        │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Les 8 Phases Vues par le Client

### Phase 1 : ACCUEIL — "Est-ce que je suis au bon endroit ?"

**Ce que le client vit** : Il a un besoin, souvent flou, et cherche quelqu'un de confiance.

**Ce qu'il attend** :
- Être écouté, pas interrogé comme dans un formulaire
- Avoir une réponse rapide (< 24h)
- Comprendre ce que l'agence peut faire pour lui
- Sentir qu'on s'intéresse à son problème, pas à son budget

**Points de contact client** :

| Moment | Ce que le client reçoit | Ton/registre |
|--------|------------------------|--------------|
| Premier contact | Accusé réception personnalisé (pas automatique) | Chaleureux, humain |
| Appel découverte | Écoute active, reformulation de son besoin | Empathique, curieux |
| Après l'appel | Synthèse écrite de ce qu'on a compris | Clair, structuré |

**Livrable client** : `synthese-besoin` — Un document court (1 page max) en langage client qui reformule son besoin et montre qu'on l'a compris.

**Anti-patterns** :
- Envoyer un questionnaire de 40 questions dès le premier email
- Parler de stack technique avant de comprendre le besoin business
- Répondre en plus de 48h sans donner de nouvelles

---

### Phase 2 : CADRAGE — "Combien, quand, et qu'est-ce que j'aurai ?"

**Ce que le client vit** : Il a besoin de se projeter et de rassurer ses décisionnaires.

**Ce qu'il attend** :
- Un prix clair, pas une fourchette de 10K à 50K
- Un planning réaliste avec des jalons concrets
- Comprendre ce qui est inclus ET ce qui ne l'est pas
- Sentir que le budget est respecté, pas qu'on va le dépasser

**Points de contact client** :

| Moment | Ce que le client reçoit | Ton/registre |
|--------|------------------------|--------------|
| Proposition | Document de cadrage en langage business | Professionnel, rassurant |
| Questions techniques | Traduction en impact business | Pédagogique |
| Validation budget | Options claires avec arbitrages | Transparent |

**Livrable client** : `proposition-projet` — Document structuré :
- Le problème qu'on résout (en ses mots)
- La solution proposée (sans jargon)
- Le budget détaillé par lot fonctionnel (pas par skill interne)
- Le planning avec jalons de validation
- Ce qui est inclus / exclu

**Règle d'or** : Le client ne doit JAMAIS voir les termes `skill`, `agent`, `orchestrateur`, `routing`. C'est le vocabulaire interne de l'agence, pas le sien.

**Anti-patterns** :
- Présenter un devis découpé par compétence technique (10j React, 5j Node, 3j DevOps)
- Utiliser des sigles non expliqués (CI/CD, ADR, SSR, ISR)
- Envoyer un PDF de 30 pages quand 5 suffisent

---

### Phase 3 : CO-CRÉATION — "Est-ce que c'est bien ce que je voulais ?"

**Ce que le client vit** : Il voit le projet prendre forme et doit valider des choix.

**Ce qu'il attend** :
- Voir avant que ce soit construit (maquettes, prototypes)
- Pouvoir donner son avis sans avoir l'impression de gêner
- Comprendre les implications de ses choix
- Avoir un interlocuteur unique (pas être renvoyé entre 5 personnes)

**Points de contact client** :

| Moment | Ce que le client reçoit | Ton/registre |
|--------|------------------------|--------------|
| Présentation maquettes | Walkthrough guidé de l'expérience utilisateur | Narratif, enthousiaste |
| Feedback | Processus structuré de retours | Collaboratif |
| Arbitrages | Impact de chaque choix expliqué simplement | Conseil, pas directive |
| Validation | PV clair de ce qui est validé | Engageant mais protecteur |

**Livrable client** : `experience-preview` — Prototype ou maquette commentée qui raconte l'histoire de l'utilisateur final, pas une liste de composants.

**Règle d'or** : Chaque validation client doit présenter le "pourquoi" avant le "quoi". Pas "Voici la maquette de la page produit" mais "Vos clients arriveront sur cette page après avoir cherché un produit. Voici ce qu'ils verront et pourquoi."

**Anti-patterns** :
- Envoyer un lien Figma sans contexte
- Demander au client de valider un `data-model` ou un `wireframe filaire`
- Changer d'interlocuteur entre la phase 2 et la phase 3
- Présenter 3 options sans recommandation

---

### Phase 4 : RÉALISATION — "Ça avance ?"

**Ce que le client vit** : La phase la plus anxiogène. Il a payé, il ne voit rien.

**Ce qu'il attend** :
- Savoir que ça avance, régulièrement
- Ne pas être surpris par des problèmes cachés
- Pouvoir voir les progrès concrets (pas un % d'avancement abstrait)
- Être prévenu AVANT qu'un problème devienne critique

**Points de contact client** :

| Moment | Fréquence | Ce que le client reçoit |
|--------|-----------|------------------------|
| Point d'avancement | Hebdomadaire | Résumé visuel : fait / en cours / à venir |
| Démo intermédiaire | Toutes les 2 semaines | Démonstration live des fonctionnalités |
| Alerte | Au besoin | Notification proactive si blocage ou retard |
| Accès environnement | Continu | Lien vers l'environnement de recette |

**Livrable client** : `rapport-avancement` — Format court (5 lignes max) :
```
PROJET [Nom] — Semaine X

Ce qui est terminé    : [fonctionnalités visibles par le client]
Ce qui est en cours   : [ce sur quoi on travaille cette semaine]
Ce qui vient ensuite  : [ce que le client verra la semaine prochaine]
Points d'attention    : [risques ou questions en attente]
Besoin du client      : [actions attendues de sa part, avec deadline]
```

**Règle d'or** : Le client ne doit JAMAIS apprendre un retard le jour de la deadline. Chaque risque est communiqué dès qu'il est identifié, avec une solution proposée.

**Anti-patterns** :
- Silence de 3 semaines puis "il y a eu un souci"
- Envoyer un `changelog` technique comme rapport d'avancement
- Demander des validations urgentes à la dernière minute
- Montrer un pourcentage d'avancement déconnecté de la réalité visible

---

### Phase 5 : DÉPLOIEMENT — "C'est bientôt en ligne ?"

**Ce que le client vit** : Excitation mêlée d'inquiétude. Et si ça ne marchait pas ?

**Ce qu'il attend** :
- Être rassuré sur la fiabilité
- Comprendre ce qui se passe le jour J
- Savoir quoi faire si quelque chose ne va pas
- Avoir un filet de sécurité

**Points de contact client** :

| Moment | Ce que le client reçoit |
|--------|------------------------|
| Pré-lancement | Checklist simplifiée des vérifications faites |
| Jour J | Accompagnement en temps réel |
| J+1 | Confirmation que tout fonctionne |

**Livrable client** : `guide-mise-en-ligne` — Document simple :
- Ce qui va se passer (étapes du déploiement, en français)
- Ce que le client doit faire / ne pas faire
- Qui contacter en cas de problème
- Quand le site sera accessible

**Anti-patterns** :
- Mettre en ligne un vendredi soir sans prévenir
- Parler de "blue-green deployment" ou de "rollback" au client
- Ne pas avoir de plan B visible par le client

---

### Phase 6 : LANCEMENT — "Et maintenant ?"

**Ce que le client vit** : Le site est en ligne mais il se sent seul.

**Ce qu'il attend** :
- Savoir si le site "marche bien" (pas juste techniquement)
- Comprendre comment l'utiliser au quotidien
- Avoir des premières métriques rassurantes
- Sentir que l'agence ne disparaît pas après le paiement final

**Points de contact client** :

| Moment | Fréquence | Ce que le client reçoit |
|--------|-----------|------------------------|
| Formation | J+1 à J+5 | Sessions pratiques sur son outil |
| Premier bilan | J+15 | Rapport des premières métriques |
| Suivi lancement | J+30 | Analyse des performances réelles |

**Livrable client** : `bilan-lancement` — Rapport J+30 :
- Combien de visiteurs / utilisateurs
- Fonctionnalités les plus utilisées
- Problèmes remontés et résolus
- Recommandations d'optimisation
- Comparaison avec les objectifs fixés en phase 2

**Anti-patterns** :
- Envoyer la facture finale sans bilan
- Disparaître après la mise en production
- Donner des métriques techniques sans les traduire en impact business

---

### Phase 7 : ACCOMPAGNEMENT — "Je ne suis pas seul"

**Ce que le client vit** : Le quotidien avec son outil. Des questions, des bugs, des idées.

**Ce qu'il attend** :
- Un support réactif et humain
- Des mises à jour sans stress
- Un interlocuteur qui connaît son projet (pas un support générique)
- De la proactivité : "on a détecté ça, voici ce qu'on recommande"

**Points de contact client** :

| Moment | Fréquence | Ce que le client reçoit |
|--------|-----------|------------------------|
| Support | Continu | Réponse < 4h (P1-P2), < 24h (P3-P4) |
| Rapport mensuel | Mensuel | Performance, incidents, recommandations |
| Point trimestriel | Trimestriel | Bilan + roadmap d'évolutions |

**Livrable client** : `rapport-mensuel` — Format récurrent :
- Disponibilité du site (uptime)
- Incidents et résolutions (en langage client)
- Métriques business (trafic, conversion, vitesse perçue)
- Recommandations proactives
- Prochaines actions suggérées

**Anti-patterns** :
- Support par ticket sans suivi humain
- Faire des mises à jour sans prévenir
- Attendre que le client signale un problème qu'on a déjà détecté

---

### Phase 8 : CROISSANCE — "On continue ensemble"

**Ce que le client vit** : Son business évolue, son outil aussi doit évoluer.

**Ce qu'il attend** :
- Un partenaire qui comprend son business, pas juste un prestataire technique
- Des propositions d'évolution alignées avec ses objectifs
- Un bilan honnête de ce qui a marché et ce qui peut s'améliorer
- Sentir que la relation a de la valeur pour les deux parties

**Points de contact client** :

| Moment | Fréquence | Ce que le client reçoit |
|--------|-----------|------------------------|
| Bilan annuel | Annuel | REX complet + ROI |
| Proposition d'évolution | Semestriel | Roadmap d'améliorations |
| Veille | Continu | Alertes sur les opportunités |

**Livrable client** : `bilan-partenariat` — Document annuel :
- ROI mesuré (objectifs initiaux vs résultats)
- Satisfaction mesurée (enquête formelle)
- Évolutions réalisées dans l'année
- Propositions pour l'année suivante
- Benchmark vs marché / concurrents

**Anti-patterns** :
- Attendre que le client parte pour lui proposer des améliorations
- Ne jamais mesurer le ROI de ce qu'on a livré
- Traiter le renouvellement comme une formalité administrative

---

## Correspondance : Expérience Client ↔ Process Interne

| Phase client | Émotion cible | Process interne existant | Process à ajouter |
|-------------|---------------|--------------------------|-------------------|
| 1. Accueil | Confiance | `client-intake` | Synthèse besoin client, SLA de réponse |
| 2. Cadrage | Clarté | `direction-technique`, `project-management` | Proposition en langage business |
| 3. Co-création | Participation | `ux-ui-design`, `design-system` | Walkthrough narratif, processus de feedback |
| 4. Réalisation | Sérénité | `lead-dev`, `web-dev-process` | Rapport d'avancement client, démos régulières |
| 5. Déploiement | Sécurité | `devops` | Guide de mise en ligne client |
| 6. Lancement | Fierté | `marketing`, `analytics` | Bilan J+30 |
| 7. Accompagnement | Soutien | `support-client` | Rapport mensuel, proactivité |
| 8. Croissance | Fidélité | (inexistant) | `customer-success`, bilan annuel, roadmap |

---

## Les 10 Engagements Envers le Client

Ces engagements doivent guider chaque décision, chaque livrable, chaque interaction.

### Communication

1. **Réponse en 24h** : Toute demande client reçoit un accusé réception humain en moins de 24h.
2. **Zéro jargon** : Chaque communication client est relue pour éliminer le vocabulaire technique interne.
3. **Proactivité** : Les problèmes sont communiqués AVANT que le client ne les découvre.

### Transparence

4. **Visibilité permanente** : Le client peut voir l'avancement de son projet à tout moment.
5. **Pas de surprise** : Les dépassements de budget ou de délai sont signalés dès qu'ils sont anticipés, pas quand ils sont constatés.
6. **Honnêteté** : Si quelque chose ne fonctionne pas, on le dit. Si on ne sait pas, on le dit aussi.

### Valeur

7. **Résultats mesurables** : Chaque projet fait l'objet d'un bilan mesurant le ROI.
8. **Continuité relationnelle** : L'interlocuteur principal reste le même tout au long du projet.
9. **Un pas d'avance** : L'agence propose des améliorations avant que le client ne les demande.

### Respect

10. **Le temps du client est précieux** : Chaque réunion a un objectif clair. Chaque document est concis. Chaque validation est simple.

---

## Nouveaux Livrables à Créer

| ID | Nom | Phase | Destinataire | Priorité |
|----|-----|-------|-------------|----------|
| `synthese-besoin` | Synthèse du besoin client | 1-Accueil | Client | P1 |
| `proposition-projet` | Proposition commerciale complète | 2-Cadrage | Client | P1 |
| `experience-preview` | Prévisualisation commentée de l'expérience | 3-Co-création | Client | P1 |
| `rapport-avancement` | Point d'avancement hebdomadaire | 4-Réalisation | Client | P1 |
| `guide-mise-en-ligne` | Guide du jour J pour le client | 5-Déploiement | Client | P2 |
| `bilan-lancement` | Rapport J+30 post-lancement | 6-Lancement | Client | P1 |
| `rapport-mensuel` | Rapport mensuel de suivi | 7-Accompagnement | Client | P2 |
| `bilan-partenariat` | Bilan annuel de la relation | 8-Croissance | Client | P2 |
| `enquete-satisfaction` | Questionnaire de satisfaction | 7-8 | Client | P2 |
| `roadmap-evolution` | Proposition d'évolutions | 8-Croissance | Client | P2 |

---

## Intégration au Framework Existant

Ce document ne remplace pas le framework actuel. Il le **complète** en ajoutant une couche d'expérience client qui se superpose aux process internes.

```
┌──────────────────────────────────────────────────────────────────────┐
│  COUCHE EXPÉRIENCE CLIENT (ce document)                              │
│  Émotions, points de contact, livrables clients, engagements         │
├──────────────────────────────────────────────────────────────────────┤
│  COUCHE ORCHESTRATION (orchestration-framework/)                     │
│  Routing, composition, escalade, dépendances                         │
├──────────────────────────────────────────────────────────────────────┤
│  COUCHE MÉTIER (skills/)                                             │
│  Agents, livrables techniques, process internes                      │
├──────────────────────────────────────────────────────────────────────┤
│  COUCHE APPRENTISSAGE (learnings/)                                   │
│  Patterns, anti-patterns, décisions, métriques                       │
└──────────────────────────────────────────────────────────────────────┘
```

Chaque couche inférieure **sert** la couche supérieure. La question directrice n'est plus "Quel skill exécuter ?" mais **"Quelle expérience le client vivra-t-il ?"**.
