---
name: conformite-rgpd
description: Conformité RGPD et protection des données personnelles
---

# Conformité RGPD

Tu guides la mise en conformité **RGPD** (Règlement Général sur la Protection des Données).

## Principes Fondamentaux du RGPD

| Principe | Description |
|----------|-------------|
| **Licéité** | Base légale pour le traitement |
| **Limitation des finalités** | Données pour un objectif précis |
| **Minimisation** | Collecter le strict nécessaire |
| **Exactitude** | Données à jour et correctes |
| **Limitation de conservation** | Durée définie de stockage |
| **Intégrité et confidentialité** | Sécurité des données |
| **Responsabilité** | Prouver la conformité |

## Bases Légales

| Base | Usage | Exemple |
|------|-------|---------|
| **Consentement** | Marketing, cookies non essentiels | Newsletter |
| **Contrat** | Nécessaire pour le service | Livraison |
| **Obligation légale** | Loi l'impose | Factures (10 ans) |
| **Intérêt vital** | Urgence médicale | Rare |
| **Mission publique** | Organismes publics | - |
| **Intérêt légitime** | Équilibre intérêts | Analytics basique |

## Données Personnelles

### Types de Données

| Catégorie | Exemples | Sensibilité |
|-----------|----------|-------------|
| **Identifiantes** | Nom, email, téléphone, IP | Standard |
| **Sensibles** | Santé, origine, religion, orientation | Très haute |
| **Financières** | CB, IBAN, revenus | Haute |
| **Comportementales** | Navigation, préférences | Moyenne |
| **Techniques** | Device, navigateur | Basse |

### Inventaire des Données

```markdown
## Registre des Traitements

### Traitement : [Nom]

| Champ | Valeur |
|-------|--------|
| **Finalité** | [Pourquoi on collecte] |
| **Base légale** | [Consentement/Contrat/...] |
| **Catégories de données** | [Types collectés] |
| **Destinataires** | [Qui a accès] |
| **Transferts hors UE** | [Oui/Non - Garanties] |
| **Durée de conservation** | [Durée] |
| **Mesures de sécurité** | [Chiffrement, accès...] |
```

## Implémentation Technique

### Consentement

```typescript
// Modèle de consentement
interface Consent {
  userId: string;
  purpose: 'marketing' | 'analytics' | 'personalization';
  granted: boolean;
  timestamp: Date;
  source: 'banner' | 'settings' | 'form';
  version: string; // Version de la politique
}

// Vérification avant traitement
async function canSendMarketing(userId: string): Promise<boolean> {
  const consent = await getConsent(userId, 'marketing');
  return consent?.granted === true;
}

// Cookies - wp_has_consent (WordPress)
if (wp_has_consent('marketing')) {
  // Charger scripts marketing
}
```

### Droit d'Accès (Portabilité)

```typescript
// Export des données utilisateur
async function exportUserData(userId: string): Promise<UserDataExport> {
  const user = await User.findById(userId);
  const orders = await Order.findByUserId(userId);
  const preferences = await Preferences.findByUserId(userId);

  return {
    profile: {
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    },
    orders: orders.map(o => ({
      id: o.id,
      date: o.date,
      total: o.total,
    })),
    preferences: preferences,
    exportedAt: new Date(),
    format: 'JSON',
  };
}
```

### Droit à l'Effacement

```typescript
import crypto from 'crypto';

// Générer un ID anonyme non-réversible (sans lien avec userId)
function generateAnonymousId(): string {
  return crypto.randomBytes(16).toString('hex');
}

// Suppression des données (conforme RGPD)
async function deleteUserData(userId: string): Promise<void> {
  // Générer un identifiant anonyme SANS lien avec l'userId original
  const anonymousId = generateAnonymousId();

  // 1. Anonymiser complètement (aucun lien avec l'identité originale)
  await User.updateOne(
    { _id: userId },
    {
      email: `anon-${anonymousId}@deleted.invalid`,
      name: 'Anonyme',
      phone: null,
      address: null,
      // Supprimer TOUTES les données identifiantes
      deletedAt: new Date(),
    }
  );

  // 2. Supprimer les données non nécessaires
  await Preferences.deleteByUserId(userId);
  await Consent.deleteByUserId(userId);

  // 3. Pour les commandes (obligations comptables) :
  // - Garder uniquement les données fiscales obligatoires
  // - Supprimer TOUTES les données personnelles
  await Order.updateMany(
    { userId },
    {
      $set: {
        customerName: 'Client anonyme',
        userId: null, // Casser le lien !
      },
      $unset: {
        shippingAddress: 1,
        billingAddress: 1,
        email: 1,
        phone: 1,
      }
    }
  );

  // 4. Notifier les sous-traitants
  await notifyDataProcessors(userId, 'deletion');

  // 5. Log d'audit (sans données personnelles)
  await AuditLog.create({
    action: 'user_deletion',
    timestamp: new Date(),
    // PAS de userId ni données identifiantes dans le log !
  });
}
```

**Important** : L'anonymisation doit être irréversible. Ne jamais conserver de lien (même hashé) avec l'identité originale.

### Pseudonymisation / Anonymisation

```typescript
// Pseudonymisation (réversible avec clé)
function pseudonymize(data: string, key: string): string {
  return crypto.createHmac('sha256', key).update(data).digest('hex');
}

// Anonymisation (irréversible)
function anonymizeIP(ip: string): string {
  // Masquer le dernier octet
  return ip.replace(/\.\d+$/, '.0');
}

// Anonymisation pour analytics
function anonymizeForAnalytics(user: User): AnonymousUser {
  return {
    id: pseudonymize(user.id, ANALYTICS_KEY),
    ageRange: getAgeRange(user.birthDate), // "25-34" au lieu de la date
    region: user.city ? getRegion(user.city) : null, // Région au lieu de ville
    // Pas d'email, nom, adresse...
  };
}
```

## Cookies & Trackers

### Catégories de Cookies

| Catégorie | Consentement | Exemples |
|-----------|--------------|----------|
| **Essentiels** | Non requis | Session, panier, auth |
| **Fonctionnels** | Recommandé | Langue, préférences |
| **Analytics** | Requis | Google Analytics, Matomo |
| **Marketing** | Requis | Facebook Pixel, Google Ads |

### Implémentation Cookie Banner

```typescript
// Configuration cookies
const cookieConfig = {
  essential: {
    name: 'Cookies essentiels',
    required: true,
    cookies: ['session_id', 'csrf_token', 'cart'],
  },
  analytics: {
    name: 'Cookies analytiques',
    required: false,
    cookies: ['_ga', '_gid'],
    scripts: ['https://www.googletagmanager.com/gtag/js'],
  },
  marketing: {
    name: 'Cookies marketing',
    required: false,
    cookies: ['_fbp', '_gcl_au'],
    scripts: ['https://connect.facebook.net/en_US/fbevents.js'],
  },
};

// Charger les scripts selon consentement
function loadConsentedScripts(consent: ConsentPreferences): void {
  Object.entries(cookieConfig).forEach(([category, config]) => {
    if (config.required || consent[category]) {
      config.scripts?.forEach(loadScript);
    }
  });
}
```

## Sécurité des Données

### Mesures Techniques

| Mesure | Implémentation |
|--------|----------------|
| **Chiffrement transit** | TLS 1.3 |
| **Chiffrement repos** | AES-256 |
| **Hashage passwords** | bcrypt (cost 12+) |
| **Accès authentifié** | JWT, sessions sécurisées |
| **Logs d'accès** | Audit trail |
| **Backup chiffré** | Backups réguliers chiffrés |

### Mesures Organisationnelles

- Formation des équipes
- Politique d'accès (besoin d'en connaître)
- Procédure de violation de données
- Nomination DPO si nécessaire

## Notification de Violation

### Procédure

```
Détection de violation
         │
         ▼
┌─────────────────────┐
│ Évaluer le risque   │ < 72h pour notifier CNIL
└──────────┬──────────┘
           │
    ┌──────┴──────┐
    ▼             ▼
 Risque       Risque
 faible       élevé
    │             │
    ▼             ▼
Documenter    Notifier CNIL
 interne      + personnes
                concernées
```

### Template Notification

```markdown
## Notification de Violation de Données

**Date de détection** : [Date]
**Date de l'incident** : [Date estimée]
**Nature de la violation** : [Description]

### Données concernées
- Types : [Email, nom, ...]
- Volume : [Nombre de personnes]

### Risques potentiels
[Description des risques pour les personnes]

### Mesures prises
1. [Mesure immédiate 1]
2. [Mesure corrective 2]

### Contact
[DPO ou responsable]
```

## Checklist RGPD

### Conformité de Base

- [ ] Registre des traitements à jour
- [ ] Politique de confidentialité publiée
- [ ] Mentions légales complètes
- [ ] Consentement cookies implémenté
- [ ] Formulaire de contact DPO

### Droits des Personnes

- [ ] Droit d'accès implémenté
- [ ] Droit de rectification implémenté
- [ ] Droit à l'effacement implémenté
- [ ] Droit à la portabilité (export)
- [ ] Procédure de demande documentée

### Sécurité

- [ ] Données chiffrées en transit
- [ ] Données sensibles chiffrées au repos
- [ ] Accès logués et audités
- [ ] Procédure de violation documentée

## Points d'Escalade

| Situation | Action |
|-----------|--------|
| Violation de données | Procédure incident, notification CNIL < 72h |
| Demande d'exercice de droit | Répondre < 1 mois |
| Doute sur conformité | Consultation DPO |
| Nouveau traitement | Privacy by design |
