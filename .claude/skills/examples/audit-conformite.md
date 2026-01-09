# Scénario : Audit de Conformité RGPD

## Contexte

Un client e-commerce demande un audit RGPD suite à un contrôle CNIL annoncé.

## Déclencheur

```
De: direction@ecommerce-client.fr
À: contact@agence.fr
Objet: URGENT - Contrôle CNIL dans 3 semaines

Bonjour,

La CNIL nous a notifié un contrôle dans 3 semaines.
Nous avons besoin d'un audit complet de notre conformité RGPD.

Notre site: https://ecommerce-client.fr
- 50K clients
- 200K commandes/an
- Newsletter active

Pouvez-vous nous aider rapidement ?

Merci,
Pierre Dubois - DG
```

## Classification

```yaml
intake:
  urgency: P2 (haute)
  type: Audit/Compliance
  deadline: 3 semaines
  scope: RGPD complet
  risk: Contrôle CNIL
```

## Flux d'Exécution

### Phase 1 : Cadrage Audit (1 jour)

```
📥 client-intake
├── qualification/intent-classifier → Type: "Audit RGPD"
├── qualification/urgency-detector → Urgence: Haute (CNIL)
└── routing/skill-router → Vers: legal-compliance

⚖️ legal-compliance
├── audit/orchestrator → Cadrage mission
└── audit/compliance-checker → Checklist CNIL
```

**Périmètre Audit :**
```markdown
## Périmètre Audit RGPD

### Traitements à Auditer
1. Gestion clients (CRM)
2. Commandes e-commerce
3. Newsletter marketing
4. Analytics/Tracking
5. Support client

### Livrables Attendus
- Registre des traitements
- Analyse des écarts
- Plan de remédiation
- Documents conformes
- Preuves pour CNIL
```

### Phase 2 : Cartographie des Données (2 jours)

```
⚖️ legal-compliance
├── rgpd/data-mapper → Cartographie complète
│   ├── Sources de données
│   ├── Flux de données
│   ├── Durées de conservation
│   └── Sous-traitants
│
└── rgpd/treatment-analyzer → Analyse traitements
    ├── Base légale
    ├── Finalités
    ├── Proportionnalité
    └── Sécurité
```

**Cartographie Données :**
```yaml
traitements:
  crm_clients:
    données:
      - Nom, prénom
      - Email
      - Téléphone
      - Adresse
      - Historique achats
    base_légale: Contrat
    durée: 5 ans après dernier achat
    sous_traitants:
      - Salesforce (CRM)
      - SendGrid (Email)
    conformité: ⚠️ Durée excessive

  newsletter:
    données:
      - Email
      - Préférences
    base_légale: Consentement
    durée: Jusqu'à désinscription
    conformité: ⚠️ Preuve consentement manquante

  analytics:
    données:
      - IP (anonymisée?)
      - Comportement navigation
    base_légale: Intérêt légitime
    conformité: 🔴 Cookies non conformes
```

### Phase 3 : Analyse des Écarts (2 jours)

```
⚖️ legal-compliance
├── audit/gap-analyzer → Identification écarts
└── audit/remediation-planner → Plan d'action
```

**Rapport d'Écarts :**
```markdown
## Analyse des Écarts RGPD

### 🔴 Non-Conformités Critiques (3)

#### 1. Bandeau Cookies Non Conforme
- **Constat**: Cookies déposés avant consentement
- **Risque**: Amende CNIL
- **Action**: Refonte bandeau + CMP
- **Délai**: 5 jours

#### 2. Absence Registre des Traitements
- **Constat**: Aucun registre formalisé
- **Risque**: Obligation légale
- **Action**: Création registre complet
- **Délai**: 3 jours

#### 3. Durées de Conservation Excessives
- **Constat**: Données clients > 10 ans
- **Risque**: Principe minimisation
- **Action**: Politique + Purge
- **Délai**: 7 jours

### ⚠️ Non-Conformités Modérées (5)

1. Preuves consentement newsletter insuffisantes
2. Politique de confidentialité incomplète
3. CGV non à jour (données)
4. Contrats sous-traitants absents
5. Procédure droits personnes informelle

### ✅ Points Conformes (8)

- Chiffrement données transit (HTTPS)
- Mots de passe hashés
- Sauvegardes chiffrées
- DPO désigné
- Formation équipes
- ...
```

### Phase 4 : Remédiation (8 jours)

```
⚖️ legal-compliance
├── cookies/cookie-auditor → Audit cookies complet
├── cookies/banner-specifier → Nouveau bandeau CMP
├── documents/privacy-policy-generator → Politique refaite
├── documents/terms-generator → CGV mises à jour
├── rgpd/consent-manager → Système consentement
└── rgpd/rights-handler → Procédure droits

📋 project-management
└── pilotage/suivi-actions → Suivi remédiation
```

**Actions Remédiation :**

#### Cookies (5 jours)
```
1. Audit cookies existants
   - 23 cookies détectés
   - 15 non essentiels

2. Catégorisation
   - Essentiels: 8
   - Analytics: 6
   - Marketing: 9

3. Nouveau bandeau Tarteaucitron
   - Refus par défaut
   - Choix granulaire
   - Preuve consentement

4. Tests conformité
   - Vérification blocage
   - Logs consentement
```

#### Documents Légaux (3 jours)
```markdown
## Documents Générés

1. **Politique de Confidentialité** (8 pages)
   - Identité responsable
   - Traitements détaillés
   - Droits expliqués
   - Contact DPO

2. **CGV - Section Données** (2 pages)
   - Données collectées
   - Finalités
   - Durées

3. **Registre des Traitements** (15 pages)
   - 12 traitements documentés
   - Format CNIL

4. **Procédure Droits Personnes**
   - Formulaire demande
   - Process interne
   - Délais de réponse
```

### Phase 5 : Validation & Documentation (2 jours)

```
⚖️ legal-compliance
├── audit/compliance-checker → Vérification finale
└── audit/orchestrator → Dossier CNIL

📋 project-management
└── livraison/pv-recette → Validation client
```

**Dossier CNIL :**
```markdown
## Dossier de Conformité RGPD

### 1. Gouvernance
- Désignation DPO: ✅
- Registre traitements: ✅
- Politique interne: ✅

### 2. Information & Transparence
- Politique confidentialité: ✅
- CGV à jour: ✅
- Mentions formulaires: ✅

### 3. Consentement & Cookies
- Bandeau conforme: ✅
- Preuve consentement: ✅
- Gestion préférences: ✅

### 4. Droits des Personnes
- Procédure documentée: ✅
- Formulaire en ligne: ✅
- Délais respectés: ✅

### 5. Sécurité
- Mesures techniques: ✅
- Contrats sous-traitants: ✅
- Gestion incidents: ✅

### Preuves Jointes
- Registre des traitements (PDF)
- Capture bandeau cookies
- Logs consentement (export)
- Contrats DPA signés
- Formation équipe (attestations)
```

## Résultat

### Score Conformité

| Domaine | Avant | Après |
|---------|-------|-------|
| Gouvernance | 40% | 95% |
| Transparence | 55% | 100% |
| Consentement | 20% | 100% |
| Droits | 30% | 90% |
| Sécurité | 75% | 90% |
| **Global** | **44%** | **95%** |

### Métriques Projet

| Métrique | Valeur |
|----------|--------|
| Durée totale | 15 jours |
| Budget | 6,500€ |
| Écarts corrigés | 8/8 |
| Documents produits | 12 |
| Skills impliqués | 4 |

### Skills Impliqués

| Skill | Contribution |
|-------|--------------|
| `client-intake` | Qualification urgence |
| `legal-compliance` | Audit + Remédiation |
| `project-management` | Pilotage + Suivi |
| `support-client` | Documentation procédures |

### ROI

- **Risque évité**: Amende CNIL jusqu'à 4% CA
- **Coût audit**: 6,500€
- **CA client**: ~2M€
- **Amende potentielle**: 80K€
- **ROI**: 12x
