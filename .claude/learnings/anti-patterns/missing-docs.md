---
id: antipattern-010
severity: low
tags: [documentation, maintainability, onboarding]
first_occurrence: 2024-01-10
occurrence_count: 7
---

# Anti-Pattern: Documentation Absente

## Symptôme

**Comment détecter ce problème :**

- README.md vide ou générique
- Pas de commentaires dans le code complexe
- Nouveaux devs posent toujours les mêmes questions
- Aucune doc API ou configuration

**Exemple de manifestation :**

```markdown
<!-- ❌ README.md typique non documenté -->
# Project Name

TODO: Add description
```

```php
// ❌ Code complexe sans explication
function process_order($order_id) {
    $order = wc_get_order($order_id);
    if ($order->get_meta('_custom_flag') === 'special') {
        $rate = 0.15; // Pourquoi 0.15 ?
        // ... 50 lignes de logique business obscure
    }
}
```

## Pourquoi c'est un Problème

### Impact Technique

- Code business incompréhensible
- Décisions passées perdues
- Réinvention de la roue
- Bugs lors de modifications

### Impact Business

- **Onboarding lent** (2-3x plus long)
- **Bus factor = 1** (une personne sait)
- **Maintenance risquée** (peur de casser)

### Coût Typique

| Aspect | Coût estimé |
|--------|-------------|
| Onboarding | +2-5 jours |
| Questions répétées | 1-2h/semaine |
| Bugs par incompréhension | 2-4h/bug |

## Solution

### README.md Minimum Viable

```markdown
# Nom du Projet

> Description courte du projet

## Prérequis

- Node.js 18+
- PHP 8.1+
- Docker (optionnel)

## Installation

\`\`\`bash
# Cloner le repo
git clone git@github.com:org/project.git
cd project

# Installer les dépendances
composer install
npm install

# Copier et configurer l'environnement
cp .env.example .env
# Éditer .env avec vos valeurs

# Lancer l'environnement
npm run dev
\`\`\`

## Structure du Projet

\`\`\`
project/
├── src/              # Code source
├── tests/            # Tests
├── docs/             # Documentation additionnelle
└── scripts/          # Scripts utilitaires
\`\`\`

## Commandes Utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Build de production |
| `npm test` | Lance les tests |
| `npm run lint` | Vérifie le code |

## Déploiement

Voir [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## Contribution

1. Créer une branche feature/*
2. Commiter avec messages conventionnels
3. Ouvrir une PR vers staging
```

### Documentation du Code

```php
<?php
/**
 * Calcule la commission spéciale pour les commandes VIP.
 *
 * Les clients VIP (marqués avec _custom_flag = 'special') bénéficient
 * d'un taux de commission réduit de 15% au lieu de 25% standard.
 * Cette règle a été définie par le client le 2024-01-15 (ticket #123).
 *
 * @param int $order_id L'ID de la commande WooCommerce.
 * @return float Le montant de la commission calculée.
 *
 * @see https://ticket-system.com/123 Demande originale
 */
function calculate_vip_commission($order_id) {
    $order = wc_get_order($order_id);

    // Taux VIP défini dans le contrat client (voir ticket #123)
    $vip_rate = 0.15;
    $standard_rate = 0.25;

    $is_vip = $order->get_meta('_custom_flag') === 'special';
    $rate = $is_vip ? $vip_rate : $standard_rate;

    return $order->get_total() * $rate;
}
```

### PHPDoc pour les Classes

```php
<?php
/**
 * Gère l'intégration avec le CRM externe.
 *
 * Cette classe synchronise les données clients entre WooCommerce
 * et le CRM Salesforce du client. La synchronisation est
 * unidirectionnelle (WC → Salesforce).
 *
 * Configuration requise dans .env:
 * - SALESFORCE_API_KEY
 * - SALESFORCE_INSTANCE_URL
 *
 * @package Theme\Integrations
 * @since 1.0.0
 */
class Theme_Salesforce_Integration {
    /**
     * Synchronise un client vers Salesforce.
     *
     * @param int $customer_id L'ID du client WooCommerce.
     * @return bool True si synchronisé, false sinon.
     *
     * @throws \RuntimeException Si l'API Salesforce est inaccessible.
     */
    public function sync_customer($customer_id) {
        // ...
    }
}
```

### Documentation API (OpenAPI)

```yaml
# docs/api.yaml
openapi: 3.0.0
info:
  title: Theme API
  version: 1.0.0

paths:
  /wp-json/theme/v1/clients:
    get:
      summary: Liste les clients
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
      responses:
        200:
          description: Liste paginée des clients
```

### Architecture Decision Records (ADR)

```markdown
<!-- docs/adr/001-use-salesforce.md -->
# ADR 001: Utilisation de Salesforce comme CRM

## Contexte
Le client utilise déjà Salesforce pour son équipe commerciale.

## Décision
Intégrer WooCommerce avec Salesforce plutôt que d'utiliser
le CRM natif ou HubSpot.

## Conséquences
- Dépendance à l'API Salesforce
- Synchronisation asynchrone nécessaire
- Coût API à prévoir
```

## Prévention

### Checklist Projet

- [ ] README.md avec installation et commandes
- [ ] .env.example documenté
- [ ] PHPDoc sur fonctions publiques complexes
- [ ] ADR pour décisions architecturales
- [ ] CHANGELOG.md maintenu

### Template PR

```markdown
## Description
[Décrire le changement]

## Pourquoi
[Expliquer la raison business/technique]

## Comment tester
1. Step 1
2. Step 2

## Documentation mise à jour
- [ ] README si nécessaire
- [ ] PHPDoc ajouté
- [ ] CHANGELOG mis à jour
```

### Automatisation

```yaml
# .github/workflows/docs.yml
- name: Check README exists
  run: test -f README.md

- name: Check docs are not empty
  run: |
    if [ $(wc -l < README.md) -lt 20 ]; then
      echo "README.md too short"
      exit 1
    fi
```

## Occurrences Documentées

| Projet | Date | Impact | Résolution |
|--------|------|--------|------------|
| 7 projets | 2024 | Onboarding difficile | Templates standards |

## Voir Aussi

- [Anti-pattern: inconsistent-naming](./inconsistent-naming.md)
- [Pattern: multi-env-config](../patterns/multi-env-config.md)

## Références

- [Write the Docs](https://www.writethedocs.org/)
- [Documentation Best Practices](https://documentation.divio.com/)
- [ADR GitHub](https://adr.github.io/)
