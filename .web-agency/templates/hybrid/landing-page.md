# Landing Page Specification

> Template hybride Marketing + Tech pour la création de landing pages.

---

## Métadonnées

| Champ | Valeur |
|-------|--------|
| **ID** | LP-[XXX] |
| **Nom** | [Nom descriptif] |
| **Campagne liée** | CAMP-[XXX] (si applicable) |
| **Feature liée** | F-[XXX] (si applicable) |
| **Owner Marketing** | [Nom] |
| **Owner Tech** | [Nom] |
| **URL cible** | [/chemin/page] |
| **Date publication** | [Date] |
| **Statut** | Draft / En revue / Validé / En prod |

---

## Partie 1 : Brief Marketing

### 1.1 Objectif de la Page

| Élément | Description |
|---------|-------------|
| **Objectif principal** | [Générer des leads / Vendre / Informer / Inscrire] |
| **Action souhaitée (CTA)** | [Ex: "Demander une démo", "Acheter maintenant"] |
| **Proposition de valeur** | [En 1 phrase : pourquoi le visiteur devrait agir] |

### 1.2 Audience Cible

| Critère | Description |
|---------|-------------|
| **Persona principal** | [Nom du persona] |
| **Niveau de conscience** | ☐ Unaware ☐ Problem-aware ☐ Solution-aware ☐ Product-aware ☐ Most aware |
| **Source de trafic** | ☐ SEO ☐ SEA ☐ Social Ads ☐ Email ☐ Direct |
| **Intent** | [Ce que le visiteur cherche en arrivant] |

### 1.3 Messaging

**Headline principal (H1):**
```
[Headline - max 70 caractères]
```

**Sous-titre:**
```
[Sous-titre - max 120 caractères]
```

**Points clés (bullet points):**
- [Bénéfice 1]
- [Bénéfice 2]
- [Bénéfice 3]

**Preuves sociales:**
- [ ] Témoignages clients
- [ ] Logos clients
- [ ] Chiffres clés (utilisateurs, CA, etc.)
- [ ] Notes/avis
- [ ] Certifications

**CTA principal:**
```
[Texte du bouton - max 25 caractères]
```

**CTA secondaire (optionnel):**
```
[Texte alternatif pour les hésitants]
```

### 1.4 Contenu de la Page

| Section | Contenu | Objectif |
|---------|---------|----------|
| Hero | [Description] | Capter l'attention, CTA visible |
| Problème | [Description] | Identifier avec le visiteur |
| Solution | [Description] | Présenter l'offre |
| Bénéfices | [Description] | Montrer la valeur |
| Preuve sociale | [Description] | Rassurer |
| FAQ | [Description] | Lever les objections |
| CTA final | [Description] | Convertir |

### 1.5 SEO (si trafic organique)

| Élément | Valeur |
|---------|--------|
| **Mot-clé principal** | [Mot-clé] |
| **Volume mensuel** | [X recherches/mois] |
| **Intention** | [Informationnelle / Transactionnelle / Navigationnelle] |
| **Title tag** | [Max 60 caractères] |
| **Meta description** | [Max 155 caractères] |
| **URL** | /[chemin-optimisé] |

### 1.6 Tracking & Mesure

**Événements à tracker:**

| Événement | Trigger | Paramètres |
|-----------|---------|------------|
| `page_view` | Chargement page | page_title, page_location |
| `scroll_depth` | 25%, 50%, 75%, 90% | percent_scrolled |
| `cta_click` | Clic bouton CTA | cta_text, cta_location |
| `form_start` | Focus sur formulaire | form_name |
| `form_submit` | Soumission formulaire | form_name, success |
| `[custom_event]` | [Trigger] | [Params] |

**Objectif de conversion:**

| Métrique | Cible | Benchmark |
|----------|-------|-----------|
| Taux de conversion | [X%] | [Industrie: Y%] |
| Taux de rebond | < [X%] | - |
| Temps sur page | > [X sec] | - |

---

## Partie 2 : Spécifications Techniques

### 2.1 Informations Générales

| Élément | Valeur |
|---------|--------|
| **Type de page** | ☐ Page statique ☐ Page dynamique ☐ A/B test |
| **Framework** | [Next.js / WordPress / Webflow / Custom] |
| **Responsive** | ☐ Desktop ☐ Tablet ☐ Mobile |
| **Internationalisation** | ☐ FR ☐ EN ☐ Autre: ___ |

### 2.2 Performance (Non-Négociable)

| Métrique | Cible | Priorité |
|----------|-------|----------|
| **LCP** (Largest Contentful Paint) | < 2.5s | 🔴 Critique |
| **FID** (First Input Delay) | < 100ms | 🔴 Critique |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 🔴 Critique |
| **TTFB** (Time To First Byte) | < 600ms | 🟡 Important |
| **Poids page total** | < 1.5 MB | 🟡 Important |
| **Score PageSpeed Mobile** | > 90 | 🟡 Important |

### 2.3 Structure HTML

```
<body>
  <header>
    <!-- Navigation minimale ou absente (réduire distractions) -->
  </header>

  <main>
    <section id="hero">
      <h1>[Headline]</h1>
      <p>[Sous-titre]</p>
      <a class="cta-primary">[CTA]</a>
    </section>

    <section id="problem">
      <h2>[Titre section]</h2>
      <!-- Contenu -->
    </section>

    <section id="solution">
      <h2>[Titre section]</h2>
      <!-- Contenu -->
    </section>

    <section id="benefits">
      <h2>[Titre section]</h2>
      <!-- Liste bénéfices -->
    </section>

    <section id="social-proof">
      <h2>[Titre section]</h2>
      <!-- Témoignages, logos, chiffres -->
    </section>

    <section id="faq">
      <h2>Questions fréquentes</h2>
      <!-- FAQ avec schema.org -->
    </section>

    <section id="cta-final">
      <h2>[Titre accrocheur]</h2>
      <a class="cta-primary">[CTA]</a>
    </section>
  </main>

  <footer>
    <!-- Footer minimal -->
  </footer>
</body>
```

### 2.4 Composants Requis

| Composant | Specs | État |
|-----------|-------|------|
| **Hero** | Image/vidéo optimisée, CTA above the fold | ☐ À faire |
| **Formulaire** | [X] champs, validation, soumission async | ☐ À faire |
| **Témoignages** | Carousel ou grid, lazy loading images | ☐ À faire |
| **FAQ** | Accordéon accessible, schema.org FAQPage | ☐ À faire |
| **CTA sticky** | Mobile: bouton fixe en bas | ☐ À faire |

### 2.5 Formulaire (si applicable)

**Champs:**

| Champ | Type | Obligatoire | Validation |
|-------|------|-------------|------------|
| Email | email | ✅ | Format email valide |
| Prénom | text | ✅ | Min 2 caractères |
| Entreprise | text | ☐ | - |
| Téléphone | tel | ☐ | Format FR/international |
| [Autre] | [type] | ☐ | [Règles] |

**Comportement:**
- Soumission: ☐ API interne ☐ Webhook ☐ CRM direct (HubSpot, etc.)
- Endpoint: `[URL]`
- Réponse succès: [Redirect / Message / Modal]
- Réponse erreur: [Comportement]
- Anti-spam: ☐ Honeypot ☐ reCAPTCHA ☐ Autre

### 2.6 Intégrations Techniques

| Outil | Script/Pixel | Chargement |
|-------|--------------|------------|
| Google Analytics 4 | `G-XXXXXXXXXX` | Après consentement |
| Google Tag Manager | `GTM-XXXXXXX` | Head, async |
| Meta Pixel | `[ID]` | Après consentement |
| Google Ads | `AW-XXXXXXX` | Après consentement |
| Hotjar/Clarity | `[ID]` | Après consentement |
| CRM (HubSpot, etc.) | `[Script]` | Après consentement |

**Consent Mode v2:**
```javascript
// Défaut avant consentement
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied'
});
```

### 2.7 Images & Médias

| Image | Dimensions | Format | Poids max | Alt text |
|-------|------------|--------|-----------|----------|
| Hero desktop | 1920×1080 | WebP | 200 KB | [Alt] |
| Hero mobile | 768×1024 | WebP | 100 KB | [Alt] |
| Témoignage avatar | 100×100 | WebP | 10 KB | [Alt] |
| Logo client | 200×80 | SVG/WebP | 20 KB | [Alt] |

**Règles:**
- Format principal: WebP avec fallback JPEG
- Lazy loading pour images below the fold
- `srcset` pour responsive images
- Dimensions explicites (éviter CLS)

### 2.8 Schema.org (Données Structurées)

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "[Title]",
  "description": "[Meta description]",
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "[Question 1]",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "[Réponse 1]"
        }
      }
    ]
  }
}
```

### 2.9 Accessibilité (RGAA/WCAG)

| Critère | Exigence | Check |
|---------|----------|-------|
| Contraste texte | Ratio ≥ 4.5:1 (AA) | ☐ |
| Focus visible | Outline sur tous les éléments interactifs | ☐ |
| Alt text | Toutes les images ont un alt pertinent | ☐ |
| Labels formulaire | Chaque input a un label associé | ☐ |
| Navigation clavier | Tout est accessible au clavier | ☐ |
| Hiérarchie titres | H1 → H2 → H3 logique | ☐ |
| ARIA | Landmarks et live regions si nécessaire | ☐ |

---

## Partie 3 : Processus de Validation

### 3.1 Checklist Marketing

```
AVANT DÉVELOPPEMENT
☐ Brief validé par Marketing Lead
☐ Messaging approuvé
☐ Contenu rédigé et relu
☐ Visuels/maquettes validés
☐ Tracking plan défini

AVANT MISE EN LIGNE
☐ Relecture orthographique finale
☐ Liens vérifiés (internes + externes)
☐ Formulaire testé (réception des données)
☐ Tracking testé (events dans GA4/GTM)
☐ Mobile vérifié
```

### 3.2 Checklist Technique

```
AVANT DÉVELOPPEMENT
☐ Specs techniques validées par Tech Lead
☐ Composants identifiés
☐ Intégrations listées
☐ Performance targets définis

AVANT MISE EN LIGNE
☐ Tests cross-browser (Chrome, Firefox, Safari, Edge)
☐ Tests responsive (Mobile, Tablet, Desktop)
☐ PageSpeed > 90 mobile
☐ Core Web Vitals OK
☐ Formulaire fonctionnel (succès + erreurs)
☐ Schema.org validé (Rich Results Test)
☐ Accessibilité vérifiée
☐ SSL/HTTPS actif
☐ Redirections configurées (si migration)
☐ Backup/rollback possible
```

### 3.3 Gates de Validation

| Gate | Type | Validateurs | Critères |
|------|------|-------------|----------|
| Brief Marketing | 🟡 ADVISORY | Marketing Lead | Objectifs clairs, messaging validé |
| Specs Techniques | 🟡 ADVISORY | Tech Lead | Faisabilité, performance |
| Contenu Final | 🔴 BLOCKING | Marketing Lead + Legal (si nécessaire) | Contenu approuvé |
| Recette Technique | 🔴 BLOCKING | Tech Lead + QA | Tests passés, performance OK |
| Go Live | 🔴 BLOCKING | Marketing Lead + Tech Lead | Les deux valident |

---

## Partie 4 : A/B Testing (si applicable)

### 4.1 Hypothèse de Test

| Élément | Description |
|---------|-------------|
| **Hypothèse** | Si nous [changement], alors [métrique] augmentera de [X%] |
| **Variable testée** | [Headline / CTA / Image / Layout / ...] |
| **Métrique principale** | [Conversion rate / CTR / ...] |

### 4.2 Variants

| Variant | Description | URL/ID |
|---------|-------------|--------|
| Control (A) | [Version originale] | [URL] |
| Variant B | [Ce qui change] | [URL] |

### 4.3 Configuration

| Paramètre | Valeur |
|-----------|--------|
| Split | 50/50 |
| Durée minimale | [X] jours |
| Sample size requis | [X] visiteurs par variant |
| Outil | [Google Optimize / VWO / Optimizely / Custom] |

---

## Signatures

### Validation Marketing

| | |
|---|---|
| Nom | |
| Rôle | Marketing Lead |
| Date | |
| Signature | ☐ Approuvé |

### Validation Technique

| | |
|---|---|
| Nom | |
| Rôle | Tech Lead |
| Date | |
| Signature | ☐ Approuvé |

---

## Historique des Versions

| Version | Date | Auteur | Modifications |
|---------|------|--------|---------------|
| 1.0 | [Date] | [Nom] | Création initiale |
| | | | |

---

## Annexes

- [ ] Maquettes (Figma/lien)
- [ ] Contenu détaillé (Google Doc/lien)
- [ ] Assets visuels (Drive/lien)
- [ ] Brief campagne associée (CAMP-XXX)
- [ ] Specs feature associée (F-XXX)
