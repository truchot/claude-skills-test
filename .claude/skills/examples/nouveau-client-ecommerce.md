# Scénario : Nouveau Client E-commerce

## Contexte

Une PME souhaite créer sa boutique en ligne. Premier contact par email.

## Déclencheur

```
De: contact@pme-exemple.fr
À: contact@agence.fr
Objet: Création boutique en ligne

Bonjour,

Nous sommes fabricants de cosmétiques bio et souhaitons vendre en ligne.
Budget estimé: 15-20K€
Délai souhaité: 3 mois
Produits: ~150 références

Pouvez-vous nous faire une proposition ?

Cordialement,
Marie Dupont
PDG - PME Exemple
```

## Flux d'Exécution

### Phase 1 : Intake (< 2h)

```
📥 client-intake
├── reception/email-parser → Extraction données structurées
├── qualification/intent-classifier → Type: "Nouveau projet e-commerce"
├── qualification/complexity-estimator → Complexité: Moyenne
├── qualification/urgency-detector → Urgence: Standard (3 mois)
├── qualification/budget-extractor → Budget: 15-20K€
├── extraction/requirements-extractor → Requirements initiales
└── routing/skill-router → Vers: project-management
```

**Output Phase 1 :**
```json
{
  "client": "PME Exemple",
  "type": "ecommerce",
  "budget": {"min": 15000, "max": 20000},
  "deadline": "2025-04-09",
  "complexity": "medium",
  "priority": "standard"
}
```

### Phase 2 : Qualification Détaillée (< 24h)

```
📋 project-management
├── avant-projet/collecte-besoin → Questions de qualification
├── avant-projet/questions-clarification → Email de clarification envoyé
│
│   [ATTENTE RÉPONSE CLIENT - 48h max]
│
├── avant-projet/formalisation-brief → Brief structuré
├── avant-projet/analyse-perimetre → Découpage en lots
└── avant-projet/chiffrage → Estimation 18K€ / 45 jours
```

**Brief Structuré :**
```markdown
## Brief Client - PME Exemple

### Besoin
- E-commerce B2C cosmétiques bio
- 150 références produits
- Paiement CB + PayPal
- Livraison France + UE

### Contraintes
- Charte graphique existante
- Import catalogue Excel
- Intégration comptabilité

### Lots
1. Design & Maquettes (8j)
2. Développement Frontend (15j)
3. Backend & Intégrations (12j)
4. Recette & Déploiement (5j)
5. Formation (2j)
```

### Phase 3 : Choix Techniques (< 4h)

```
🏛️ direction-technique
├── decisions/technology-selector → Stack: Next.js + Shopify Headless
├── decisions/architecture-designer → Architecture hybride
└── decisions/integration-planner → Intégrations définies
```

**Décision Architecture :**
```
Frontend: Next.js 14 (App Router)
Backend: Shopify Headless API
Paiement: Stripe + PayPal
Hébergement: Vercel + Shopify
```

### Phase 4 : Design UX/UI (8 jours)

```
🎨 ux-ui-design
├── research/persona-builder → 3 personas créés
├── research/journey-mapper → Customer journey e-commerce
├── wireframe/sitemap-designer → Arborescence validée
├── wireframe/wireframe-generator → Wireframes desktop/mobile
├── visual/style-guide-creator → Extension charte graphique
├── visual/ui-designer → Maquettes Figma
└── prototype/prototype-builder → Prototype cliquable
```

### Phase 5 : Développement (27 jours)

```
💻 frontend-developer + nextjs-expert + react-expert
├── Composants UI e-commerce
├── Pages produits, catégories, panier
├── Checkout multi-étapes
└── Responsive design

⚙️ backend-developer
├── Intégration Shopify Headless
├── Connecteur comptabilité
└── Import catalogue

🔧 devops
├── CI/CD Vercel
├── Monitoring
└── Backups
```

### Phase 6 : Conformité (Parallèle)

```
⚖️ legal-compliance
├── rgpd/consent-manager → Bandeau cookies
├── documents/privacy-policy-generator → Politique confidentialité
├── documents/terms-generator → CGV e-commerce
└── cookies/cookie-auditor → Audit cookies
```

### Phase 7 : Tests (5 jours)

```
🧪 testing-process
├── strategy/test-strategist → Plan de tests
├── types/e2e-tester → Tests parcours achat
├── quality/accessibility-auditor → WCAG 2.1 AA
├── performance/load-tester → Tests charge
└── security/security-auditor → Audit sécurité
```

### Phase 8 : Livraison (3 jours)

```
📦 project-management
├── livraison/plan-recette → Plan de recette
├── livraison/grille-recette → Tests client
├── livraison/pv-recette → PV signé
└── communication/email-annonce-livraison → Notification client

📚 support-client
└── knowledge/article-writer → Documentation utilisateur
```

## Résultat

### Livrables Produits

| Livrable | Description |
|----------|-------------|
| Site e-commerce | Next.js + Shopify Headless |
| 150 fiches produits | Importées et optimisées |
| Documentation | Guide admin + utilisateur |
| Formation | 2h visio enregistrée |
| CGV + Mentions | Documents légaux |
| Plan de maintenance | Support continu |

### Métriques

| Métrique | Valeur |
|----------|--------|
| Durée totale | 45 jours |
| Budget final | 18,500€ |
| Satisfaction client | 9.2/10 |
| Skills impliqués | 12 |
| Agents utilisés | 47 |
| Points escalade humain | 3 |

### Points d'Escalade Humain

1. **Validation budget** → Direction (décision commerciale)
2. **Choix architecture** → CTO (décision technique majeure)
3. **Validation maquettes** → Client (approbation design)
