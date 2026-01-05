---
name: html
description: Structure HTML5 sémantique, SEO et métadonnées
tags: [html, html5, sémantique, seo, meta, formulaires]
---

# HTML

## Quand Utiliser

- Structurer une page web
- Optimiser le SEO on-page
- Créer des formulaires accessibles
- Ajouter des métadonnées (Open Graph, Twitter Cards)

## Principes Clés

- Un seul `<h1>` par page
- Hiérarchie des titres respectée (h1 → h2 → h3, pas de saut)
- Balises sémantiques pour le sens, pas le style
- Attribut `lang` sur `<html>`

## Structure de Page

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Description (150-160 car.)">
  <title>Titre (50-60 car.) | Site</title>
</head>
<body>
  <header>
    <nav aria-label="Navigation principale">...</nav>
  </header>

  <main>
    <article>
      <h1>Titre principal</h1>
      <section>...</section>
    </article>
    <aside>...</aside>
  </main>

  <footer>...</footer>
</body>
</html>
```

## Balises Sémantiques

| Balise | Usage |
|--------|-------|
| `<article>` | Contenu autonome (article, post) |
| `<section>` | Groupe thématique avec titre |
| `<aside>` | Contenu tangentiel (sidebar) |
| `<nav>` | Navigation |
| `<header>` | En-tête de page ou section |
| `<footer>` | Pied de page ou section |
| `<main>` | Contenu principal (unique) |
| `<figure>` | Illustration avec `<figcaption>` |
| `<time>` | Date machine-readable |

## Métadonnées SEO

```html
<head>
  <!-- SEO de base -->
  <title>Titre | Site</title>
  <meta name="description" content="Description">
  <link rel="canonical" href="https://example.com/page">

  <!-- Open Graph -->
  <meta property="og:title" content="Titre">
  <meta property="og:description" content="Description">
  <meta property="og:image" content="https://example.com/image.jpg">
  <meta property="og:url" content="https://example.com/page">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Titre">
</head>
```

## Formulaires

```html
<form action="/submit" method="POST">
  <fieldset>
    <legend>Informations</legend>

    <label for="email">Email *</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      autocomplete="email"
    >
  </fieldset>

  <button type="submit">Envoyer</button>
</form>
```

## JSON-LD (Structured Data)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Titre",
  "author": { "@type": "Person", "name": "Auteur" },
  "datePublished": "2024-01-15"
}
</script>
```

## Anti-patterns

- ❌ Plusieurs `<h1>` par page
- ❌ Sauter des niveaux de titre (h1 → h3)
- ❌ Utiliser `<div>` pour tout
- ❌ Images sans attribut `alt`
- ❌ Liens "cliquez ici" (non descriptifs)

## Checklist

- [ ] `<html lang="fr">` présent
- [ ] Un seul `<h1>`
- [ ] Hiérarchie h1 → h2 → h3 respectée
- [ ] `<title>` unique et descriptif
- [ ] `<meta description>` présente
- [ ] Images avec `alt`
- [ ] Formulaires avec `<label>` associés
