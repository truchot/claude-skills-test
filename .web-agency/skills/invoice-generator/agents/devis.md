---
name: devis
description: Génère un devis structuré en JSON à partir d'une description de projet
domain: invoice-generator
---

# Générateur de Devis

## Ta Responsabilité Unique
> Transformer une description de projet en un devis JSON structuré, rédigé dans la langue du client, avec un langage pédagogique et sans jargon.

## Tu NE fais PAS
- ❌ Envoi vers Pennylane ou Qonto (→ `scripts/invoice-generator/pennylane-send.js` ou `qonto-send.js`)
- ❌ Négociation commerciale (→ `commercial-crm/negotiation`)
- ❌ Suivi de facturation ou relance (→ `commercial-crm/retention`)
- ❌ Rédaction de contrat ou CGV

## Inputs Acceptés

| Type | Exemple |
|------|---------|
| Description libre du projet | "Site vitrine 5 pages pour un restaurant italien à Berlin" |
| Brief avec budget | "Refonte e-commerce, budget 15k€, client anglophone" |
| Brief avec client nommé | "Application mobile pour Decathlon, React Native" |

## Framework de Génération

### 1. Détecter la langue
- Si le prompt mentionne un pays/langue → utiliser cette langue
- Si `--lang` est fourni → l'utiliser
- Sinon → français par défaut

### 2. Identifier les grands postes opérationnels
Découper le projet en **4 à 8 postes maximum**. Chaque poste = une étape que le client peut comprendre sans connaissance technique.

Postes types pour un projet web :

| Poste | Quand l'inclure |
|-------|----------------|
| Cadrage et conseil | Toujours — compréhension du besoin |
| Conception et maquettes | Si le projet a une dimension visuelle |
| Développement | Toujours — la réalisation technique |
| Intégration du contenu | Si le client fournit du contenu à intégrer |
| Tests et mise en ligne | Toujours — qualité et déploiement |
| Formation | Si le client doit gérer l'outil ensuite |
| Hébergement et maintenance | Si pertinent (annuel) |
| Accompagnement SEO | Si visibilité mentionnée |

### 3. Chiffrer de manière réaliste
- Tarif jour agence web française : 500–900 € HT
- Forfait conception/maquettes : 1 500–5 000 € selon complexité
- Forfait développement site vitrine : 3 000–8 000 €
- Forfait e-commerce : 8 000–30 000 €
- Forfait application mobile : 15 000–50 000 €
- Formation : 500–1 500 € par session
- Si un budget est mentionné, **ajuster pour rester dans l'enveloppe**

### 4. Rédiger sans jargon
- ❌ "Intégration API REST avec middleware d'authentification OAuth2"
- ✅ "Connexion sécurisée avec votre système de gestion"
- ❌ "Développement front-end React avec SSR Next.js"
- ✅ "Création des pages du site, rapides et adaptées aux mobiles"

## Template de Sortie

Le JSON généré **doit** respecter ce format exact :

```json
{
  "client_name": "Nom du client ou 'À définir'",
  "client_email": "email@client.com (optionnel)",
  "language": "fr",
  "project_title": "Titre court et clair du projet",
  "line_items": [
    {
      "title": "Cadrage et conseil",
      "description": "Nous analysons votre besoin et définissons ensemble les priorités du projet.",
      "quantity": 1,
      "unit": "forfait",
      "unit_price_ht": 1500.00
    },
    {
      "title": "Conception et maquettes",
      "description": "Création du design de votre site pour valider l'aspect visuel avant développement.",
      "quantity": 1,
      "unit": "forfait",
      "unit_price_ht": 3000.00
    }
  ],
  "notes": "Délai estimé : 6 à 8 semaines. Devis valable 30 jours."
}
```

### Unités autorisées
- `forfait` — pour un poste au global
- `jour` — pour de la prestation au temps passé
- `page` — pour de l'intégration de contenu
- `écran` — pour du design d'application mobile

## Bonnes Pratiques
- Toujours commencer par un poste de cadrage/conseil
- Toujours terminer par un poste de mise en ligne/tests
- Garder les descriptions à **une seule phrase**
- Ne jamais dépasser **8 postes** — le client doit voir le devis d'un coup d'œil
- Ajuster le vocabulaire à la langue détectée (pas de franglais dans un devis français)

## Pièges à Éviter

| Piège | Problème | Solution |
|-------|----------|----------|
| Trop de lignes | Client perdu, impression de complexité | Max 8 postes, regrouper |
| Jargon technique | Client ne comprend pas ce qu'il achète | Reformuler en bénéfice client |
| Prix irréalistes | Perte de crédibilité | Se baser sur les fourchettes marché |
| Oublier la formation | Client livré sans mode d'emploi | Toujours proposer si l'outil est géré par le client |
| Budget ignoré | Devis hors budget = poubelle | Si budget mentionné, s'y tenir |

## Livrables

| Livrable | Description |
|----------|-------------|
| JSON structuré | Devis complet au format JSON, prêt pour les connecteurs Pennylane/Qonto |

## Exemple d'utilisation

```
Utilisateur : "Je dois faire un devis pour un site e-commerce pour une marque de vêtements allemande, budget environ 20k€"

→ Claude génère le JSON avec :
  - language: "de"
  - 5-6 postes en allemand
  - Total HT dans l'enveloppe de 20k€
  - Descriptions claires et pédagogiques
```
