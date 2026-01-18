---
id: faq
name: Foire Aux Questions
version: 1.0.0
category: support
status: active
phase: "5-deploiement"
order: 1
agents:
  - support-client/knowledge/faq-manager
  - support-client/knowledge/article-writer
  - content-management/editorial/content-strategist
consumes:
  - project-brief
  - requirements-list
  - technical-documentation
produces_for:
  - frontend-developer/*/all
  - wordpress-gutenberg-expert/*/all
  - marketing/content/*
tags: [support, faq, aide, questions, self-service, knowledge-base]
---

# Foire Aux Questions (FAQ)

## Description

Document structuré regroupant les questions fréquemment posées par les utilisateurs/clients avec leurs réponses. La FAQ permet de réduire le volume de tickets support, d'améliorer l'expérience utilisateur et de fournir une ressource d'aide accessible 24/7. Elle doit être organisée par thématiques et optimisée pour le SEO.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Document Markdown / JSON-LD / HTML |
| **Emplacement** | `/content/faq/` ou page dédiée `/aide/faq` |
| **Nommage** | `faq.md`, `faq-[categorie].md`, `faq.json` |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Sections Obligatoires

- [ ] **Index des catégories** - Navigation par thématique
- [ ] **Questions par catégorie** - Groupement logique des Q&R
- [ ] **Format Q&R structuré** - Question claire + réponse complète
- [ ] **Liens vers ressources** - Renvoi vers documentation détaillée
- [ ] **Contact support** - Lien si la FAQ ne répond pas

### Sections Optionnelles

- [ ] **Recherche** - Barre de recherche dans la FAQ
- [ ] **Questions populaires** - Top 5-10 questions les plus consultées
- [ ] **Feedback** - "Cette réponse vous a-t-elle aidé ?"
- [ ] **Questions récentes** - Dernières questions ajoutées
- [ ] **Version vidéo/tutoriel** - Liens vers contenus visuels

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Minimum de questions | ≥ 20 questions | Auto | Oui |
| 2 | Catégorisation | ≥ 3 catégories distinctes | Manuel | Oui |
| 3 | Réponses complètes | 50-300 mots par réponse | Auto | Oui |
| 4 | Schema.org FAQPage | JSON-LD valide | Auto | Oui |
| 5 | Liens fonctionnels | 0 lien cassé | Auto | Oui |
| 6 | Langage accessible | Niveau B1-B2 | Manuel | Oui |
| 7 | Mise à jour régulière | < 3 mois depuis dernière MAJ | Auto | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `support-client` | Historique tickets | Questions fréquentes des tickets |
| `client-intake` | requirements-list | Fonctionnalités à documenter |
| `direction-technique` | technical-documentation | Détails techniques à vulgariser |
| `marketing` | persona | Profil et niveau de connaissance des utilisateurs |
| Analytics | Recherches internes | Termes recherchés sur le site |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Après rédaction initiale | Support + Produit | Ajustement des réponses |
| 2 | Revue SEO | Marketing | Optimisation des questions |
| 3 | Test utilisateur | UX / Support | Reformulation si incompris |
| 4 | Mensuellement | Support | Ajout nouvelles questions |

## Exemple

### Exemple Minimal

```markdown
# FAQ - Aide

## Compte et connexion

### Comment créer un compte ?
Cliquez sur "S'inscrire" en haut à droite, remplissez le formulaire avec votre email et un mot de passe, puis validez via le lien reçu par email.

### J'ai oublié mon mot de passe, que faire ?
Cliquez sur "Mot de passe oublié" sur la page de connexion. Entrez votre email et suivez les instructions reçues.

## Commandes

### Comment suivre ma commande ?
Connectez-vous à votre compte, rubrique "Mes commandes". Cliquez sur la commande pour voir le suivi en temps réel.

---

**Vous n'avez pas trouvé de réponse ?**
[Contactez notre support](/contact)
```

### Exemple Complet avec Schema.org

```markdown
# Foire Aux Questions

> Trouvez rapidement des réponses à vos questions les plus fréquentes.

## Navigation rapide

- [🔐 Compte et sécurité](#compte-et-securite)
- [🛒 Commandes et paiements](#commandes-et-paiements)
- [📦 Livraison et retours](#livraison-et-retours)
- [🔧 Problèmes techniques](#problemes-techniques)
- [💬 Contact et support](#contact-et-support)

---

## 🔐 Compte et sécurité {#compte-et-securite}

### Comment créer un compte ?

Pour créer un compte sur notre plateforme :

1. Cliquez sur **"S'inscrire"** en haut à droite de la page
2. Remplissez le formulaire avec :
   - Votre adresse email valide
   - Un mot de passe sécurisé (8 caractères minimum, avec majuscule et chiffre)
3. Acceptez les conditions d'utilisation
4. Cliquez sur **"Créer mon compte"**
5. Validez votre email en cliquant sur le lien reçu

⏱️ **Temps estimé :** 2 minutes

💡 **Astuce :** Vous pouvez aussi vous inscrire avec Google ou Facebook pour un processus plus rapide.

---

### Comment modifier mon mot de passe ?

Pour changer votre mot de passe :

1. Connectez-vous à votre compte
2. Accédez à **Paramètres > Sécurité**
3. Cliquez sur **"Modifier le mot de passe"**
4. Entrez votre mot de passe actuel
5. Saisissez et confirmez votre nouveau mot de passe
6. Cliquez sur **"Enregistrer"**

🔒 **Recommandations de sécurité :**
- Utilisez un mot de passe unique
- Minimum 12 caractères recommandé
- Activez l'authentification à deux facteurs (2FA)

📖 **Voir aussi :** [Guide de sécurité du compte](/docs/securite)

---

### J'ai oublié mon mot de passe

Pas de panique ! Voici comment le réinitialiser :

1. Sur la page de connexion, cliquez sur **"Mot de passe oublié ?"**
2. Entrez l'adresse email associée à votre compte
3. Cliquez sur **"Envoyer le lien"**
4. Consultez votre boîte mail (vérifiez les spams)
5. Cliquez sur le lien reçu (valable 24h)
6. Créez un nouveau mot de passe

⚠️ **Le lien ne fonctionne pas ?** Vérifiez que vous utilisez le lien le plus récent reçu.

---

## 🛒 Commandes et paiements {#commandes-et-paiements}

### Quels moyens de paiement acceptez-vous ?

Nous acceptons les moyens de paiement suivants :

| Moyen de paiement | Disponibilité |
|-------------------|---------------|
| Carte bancaire (Visa, Mastercard, CB) | ✅ France et international |
| PayPal | ✅ France et international |
| Apple Pay | ✅ Sur appareils compatibles |
| Google Pay | ✅ Sur appareils compatibles |
| Virement bancaire | ✅ Commandes > 500€ |
| Paiement en 3x/4x (Alma) | ✅ Commandes 50€ - 2000€ |

🔒 Tous les paiements sont sécurisés par chiffrement SSL et 3D Secure.

---

### Comment appliquer un code promo ?

Pour utiliser un code promotionnel :

1. Ajoutez vos articles au panier
2. Accédez au panier
3. Localisez le champ **"Code promo"** sous le récapitulatif
4. Saisissez votre code (respect de la casse)
5. Cliquez sur **"Appliquer"**
6. La réduction s'affiche automatiquement

❌ **Le code ne fonctionne pas ?** Vérifiez :
- La date de validité du code
- Le montant minimum de commande requis
- Les produits éligibles (certains codes excluent les promotions)
- Qu'un seul code peut être utilisé par commande

---

### Comment annuler ma commande ?

L'annulation dépend du statut de votre commande :

| Statut | Annulation possible ? | Comment faire |
|--------|----------------------|---------------|
| En attente de paiement | ✅ Oui | La commande expire sous 24h |
| Paiement validé | ✅ Oui | Contactez-nous sous 2h |
| En préparation | ⚠️ Possible | Contactez le support rapidement |
| Expédiée | ❌ Non | Refusez le colis ou faites un retour |

📞 **Contact rapide :** support@entreprise.com ou chat en ligne

---

## 📦 Livraison et retours {#livraison-et-retours}

### Quels sont les délais de livraison ?

| Mode de livraison | Délai | Tarif |
|-------------------|-------|-------|
| Standard (Colissimo) | 3-5 jours ouvrés | 4,90€ (gratuit dès 50€) |
| Express (Chronopost) | 24-48h | 9,90€ |
| Point relais | 4-6 jours ouvrés | 3,90€ |
| Click & Collect | 2h après validation | Gratuit |

📍 **Zones livrées :** France métropolitaine, DOM-TOM, Belgique, Suisse, Luxembourg

⚠️ **Délais indicatifs :** Peuvent varier en période de forte affluence (soldes, fêtes)

---

### Comment retourner un article ?

Vous disposez de **14 jours** après réception pour retourner un article :

**Étape 1 : Demande de retour**
1. Connectez-vous à votre compte
2. Allez dans **"Mes commandes"**
3. Sélectionnez la commande concernée
4. Cliquez sur **"Retourner un article"**
5. Sélectionnez le(s) article(s) et le motif
6. Imprimez l'étiquette de retour

**Étape 2 : Préparation du colis**
- Emballez soigneusement l'article dans son emballage d'origine
- Collez l'étiquette de retour prépayée
- Déposez le colis en point relais ou bureau de poste

**Étape 3 : Remboursement**
- Traitement sous 5-7 jours après réception
- Remboursement sur le moyen de paiement original

📖 **Voir aussi :** [Conditions de retour détaillées](/retours)

---

## 🔧 Problèmes techniques {#problemes-techniques}

### Le site ne fonctionne pas correctement

Essayez ces solutions dans l'ordre :

1. **Rafraîchissez la page** (Ctrl+F5 ou Cmd+Shift+R)
2. **Videz le cache** de votre navigateur
3. **Désactivez les extensions** (bloqueurs de pub notamment)
4. **Essayez un autre navigateur** (Chrome, Firefox, Safari)
5. **Vérifiez votre connexion** internet

✅ **Navigateurs supportés :**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

🐛 **Le problème persiste ?** [Signalez-le à notre équipe technique](/contact?type=bug)

---

### Je ne reçois pas les emails

Si vous ne recevez pas nos emails (confirmation, réinitialisation, etc.) :

1. **Vérifiez votre dossier spam/courrier indésirable**
2. **Ajoutez notre adresse** (noreply@entreprise.com) à vos contacts
3. **Vérifiez l'adresse email** enregistrée dans votre compte
4. **Attendez quelques minutes** (délai possible jusqu'à 15 min)

📧 **Toujours rien ?** Contactez support@entreprise.com avec un email différent.

---

## 💬 Contact et support {#contact-et-support}

### Comment contacter le service client ?

Plusieurs canaux sont à votre disposition :

| Canal | Disponibilité | Temps de réponse |
|-------|---------------|------------------|
| 💬 Chat en ligne | Lun-Ven 9h-19h, Sam 10h-17h | Immédiat |
| 📧 Email | 24/7 | < 24h ouvrées |
| 📞 Téléphone | Lun-Ven 9h-18h | Immédiat |
| 🐦 Twitter @entreprise_sav | Lun-Ven 9h-18h | < 2h |

**Coordonnées :**
- Email : support@entreprise.com
- Téléphone : 01 23 45 67 89 (appel non surtaxé)
- Adresse : [Adresse postale]

---

## Vous n'avez pas trouvé de réponse ?

- 🔍 Utilisez la **barre de recherche** en haut de page
- 📖 Consultez notre **[documentation complète](/docs)**
- 💬 Contactez notre **[support client](/contact)**

---

*Dernière mise à jour : 18 janvier 2026*
```

### Schema.org JSON-LD (pour SEO)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Comment créer un compte ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cliquez sur 'S'inscrire' en haut à droite, remplissez le formulaire avec votre email et un mot de passe sécurisé, puis validez via le lien reçu par email. Vous pouvez aussi vous inscrire avec Google ou Facebook."
      }
    },
    {
      "@type": "Question",
      "name": "Quels sont les délais de livraison ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Livraison standard : 3-5 jours ouvrés (4,90€, gratuit dès 50€). Livraison express : 24-48h (9,90€). Point relais : 4-6 jours (3,90€). Click & Collect : 2h après validation (gratuit)."
      }
    },
    {
      "@type": "Question",
      "name": "Comment retourner un article ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vous disposez de 14 jours après réception. Connectez-vous, accédez à 'Mes commandes', sélectionnez 'Retourner un article', imprimez l'étiquette prépayée et déposez le colis en point relais. Remboursement sous 5-7 jours."
      }
    }
  ]
}
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| FAQ non mise à jour | Informations obsolètes, frustration utilisateur | Revue mensuelle des questions |
| Réponses trop courtes | N'apportent pas de vraie valeur | 50-300 mots avec étapes claires |
| Jargon technique | Incompréhensible pour les utilisateurs | Langage simple, niveau B1-B2 |
| Pas de Schema.org | Pas d'affichage enrichi Google | Implémenter FAQPage JSON-LD |
| Organisation chaotique | Difficile de trouver l'information | Catégoriser logiquement |
| Pas de feedback loop | Pas d'amélioration continue | Boutons "utile/pas utile" + analytics |

## Références

- [Schema.org - FAQPage](https://schema.org/FAQPage)
- [Google - FAQ structured data](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [Nielsen Norman Group - FAQ Best Practices](https://www.nngroup.com/articles/faq-format/)
- Livrables liés : `knowledge-base-article`, `technical-documentation`, `user-guide`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | support-client | Création initiale |
