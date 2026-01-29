---
id: block-pattern
name: Block Pattern WordPress
version: 1.0.0
category: wordpress
status: active
phase: "4-realisation"
order: 3
agents:
  - wordpress-gutenberg-expert/gutenberg-blocks/block-patterns
  - wordpress-gutenberg-expert/theme-development/block-themes
  - ux-ui-design/design/component-design
consumes:
  - theme-json-config
  - wireframes
  - gutenberg-block
produces_for:
  - content-management/redaction/page-builder
  - wordpress-gutenberg-expert/theme-development/templates
workflows:
  - id: wf-pattern-creation
    template: wf-creation
    phase: Réalisation
    name: Création de patterns Gutenberg
    duration: 0.5-1 jour
tags: [wordpress, gutenberg, pattern, reusable, template, fse]
---

# Block Pattern WordPress

## Description

Assemblage prédéfini de blocs Gutenberg réutilisable. Permet aux utilisateurs d'insérer rapidement des layouts complexes (hero sections, grilles de produits, témoignages, FAQ) sans avoir à les construire manuellement.

## Format de Sortie

| Attribut | Valeur |
|----------|--------|
| **Type** | Fichier PHP |
| **Emplacement** | `wp-content/themes/[theme]/patterns/` |
| **Nommage** | `[pattern-name].php` (kebab-case) |
| **Encoding** | UTF-8 |

## Structure du Contenu

### Éléments Obligatoires

- [ ] **Header PHP** - Métadonnées du pattern
- [ ] **Markup HTML** - Blocs Gutenberg en HTML
- [ ] **Placeholders** - Contenus remplaçables

### Métadonnées Header

- [ ] `Title` - Nom affiché dans l'éditeur
- [ ] `Slug` - Identifiant unique
- [ ] `Categories` - Catégories (featured, hero, text, etc.)
- [ ] `Keywords` - Mots-clés pour la recherche
- [ ] `Block Types` - Blocs concernés (optionnel)
- [ ] `Post Types` - Types de contenu (optionnel)
- [ ] `Viewport Width` - Largeur de prévisualisation

## Critères d'Acceptation

| # | Critère | Seuil/Condition | Vérification | Obligatoire |
|---|---------|-----------------|--------------|-------------|
| 1 | Header valide | Syntaxe PHP correcte | Auto | Oui |
| 2 | HTML valide | Markup Gutenberg correct | Manuel | Oui |
| 3 | Responsive | Adapté mobile/desktop | Manuel | Oui |
| 4 | Utilise design tokens | Variables --wp--preset-- | Manuel | Oui |
| 5 | i18n | Textes traduisibles | Manuel | Oui |

## Prérequis (Inputs)

| Source | Livrable/Donnée | Description |
|--------|-----------------|-------------|
| `wordpress-gutenberg-expert/*` | `theme-json-config` | Design tokens |
| `ux-ui-design/*` | `wireframes` | Layout à reproduire |
| `design-system-foundations/*` | `component-specs` | Comportements |

## Points de Validation Humaine

| Étape | Moment | Validateur | Action si KO |
|-------|--------|------------|--------------|
| 1 | Design | Designer | Ajuster layout |
| 2 | Intégration | Intégrateur | Corriger markup |
| 3 | Contenu | Rédacteur | Améliorer placeholders |

## Exemple

### Pattern Complet - Hero E-commerce

```php
<?php
/**
 * Title: Hero Artisanat
 * Slug: artisanat/hero
 * Categories: featured, hero
 * Keywords: hero, banner, header, accueil, homepage
 * Viewport Width: 1400
 * Block Types: core/template-part/header
 * Post Types: page
 * Inserter: true
 */

$image_url = esc_url( get_template_directory_uri() . '/assets/images/hero-placeholder.jpg' );
?>

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"0","bottom":"0","left":"0","right":"0"}}},"backgroundColor":"background","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-background-background-color has-background" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">

    <!-- wp:cover {"url":"<?php echo $image_url; ?>","dimRatio":40,"overlayColor":"secondary","minHeight":600,"minHeightUnit":"px","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|12","bottom":"var:preset|spacing|12","left":"var:preset|spacing|6","right":"var:preset|spacing|6"}}}} -->
    <div class="wp-block-cover alignfull" style="padding-top:var(--wp--preset--spacing--12);padding-right:var(--wp--preset--spacing--6);padding-bottom:var(--wp--preset--spacing--12);padding-left:var(--wp--preset--spacing--6);min-height:600px">
        <span aria-hidden="true" class="wp-block-cover__background has-secondary-background-color has-background-dim-40 has-background-dim"></span>
        <img class="wp-block-cover__image-background" alt="" src="<?php echo $image_url; ?>" data-object-fit="cover"/>

        <div class="wp-block-cover__inner-container">
            <!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
            <div class="wp-block-group">

                <!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontStyle":"normal","fontWeight":"700"}},"textColor":"surface","fontSize":"5xl"} -->
                <h1 class="wp-block-heading has-text-align-center has-surface-color has-text-color has-5-xl-font-size" style="font-style:normal;font-weight:700">
                    <?php esc_html_e( 'Artisanat d\'Exception', 'artisanat-theme' ); ?>
                </h1>
                <!-- /wp:heading -->

                <!-- wp:paragraph {"align":"center","textColor":"surface","fontSize":"xl"} -->
                <p class="has-text-align-center has-surface-color has-text-color has-xl-font-size">
                    <?php esc_html_e( 'Découvrez nos créations artisanales uniques, fabriquées avec passion dans notre atelier depuis 1985.', 'artisanat-theme' ); ?>
                </p>
                <!-- /wp:paragraph -->

                <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"var:preset|spacing|6"}}}} -->
                <div class="wp-block-buttons" style="margin-top:var(--wp--preset--spacing--6)">

                    <!-- wp:button {"backgroundColor":"primary","textColor":"surface","style":{"typography":{"fontWeight":"600"},"border":{"radius":"0.5rem"}},"fontSize":"lg"} -->
                    <div class="wp-block-button has-custom-font-size has-lg-font-size">
                        <a class="wp-block-button__link has-surface-color has-primary-background-color has-text-color has-background wp-element-button" style="border-radius:0.5rem;font-weight:600">
                            <?php esc_html_e( 'Découvrir la boutique', 'artisanat-theme' ); ?>
                        </a>
                    </div>
                    <!-- /wp:button -->

                    <!-- wp:button {"backgroundColor":"surface","textColor":"secondary","style":{"typography":{"fontWeight":"600"},"border":{"radius":"0.5rem"}},"fontSize":"lg","className":"is-style-outline"} -->
                    <div class="wp-block-button has-custom-font-size has-lg-font-size is-style-outline">
                        <a class="wp-block-button__link has-secondary-color has-surface-background-color has-text-color has-background wp-element-button" style="border-radius:0.5rem;font-weight:600">
                            <?php esc_html_e( 'Notre histoire', 'artisanat-theme' ); ?>
                        </a>
                    </div>
                    <!-- /wp:button -->

                </div>
                <!-- /wp:buttons -->

            </div>
            <!-- /wp:group -->
        </div>
    </div>
    <!-- /wp:cover -->

</div>
<!-- /wp:group -->
```

---

### Pattern - Grille Produits Featured

```php
<?php
/**
 * Title: Produits Vedettes
 * Slug: artisanat/featured-products
 * Categories: featured, woocommerce
 * Keywords: products, shop, grid, featured, produits, boutique
 * Viewport Width: 1200
 * Block Types: woocommerce/product-collection
 */
?>

<!-- wp:group {"align":"wide","style":{"spacing":{"padding":{"top":"var:preset|spacing|12","bottom":"var:preset|spacing|12"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide" style="padding-top:var(--wp--preset--spacing--12);padding-bottom:var(--wp--preset--spacing--12)">

    <!-- wp:group {"style":{"spacing":{"margin":{"bottom":"var:preset|spacing|8"}}},"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between","verticalAlignment":"bottom"}} -->
    <div class="wp-block-group" style="margin-bottom:var(--wp--preset--spacing--8)">

        <!-- wp:group {"layout":{"type":"constrained"}} -->
        <div class="wp-block-group">
            <!-- wp:heading {"textColor":"secondary"} -->
            <h2 class="wp-block-heading has-secondary-color has-text-color">
                <?php esc_html_e( 'Nos Créations Vedettes', 'artisanat-theme' ); ?>
            </h2>
            <!-- /wp:heading -->

            <!-- wp:paragraph {"textColor":"text-secondary"} -->
            <p class="has-text-secondary-color has-text-color">
                <?php esc_html_e( 'Découvrez notre sélection de pièces uniques les plus appréciées.', 'artisanat-theme' ); ?>
            </p>
            <!-- /wp:paragraph -->
        </div>
        <!-- /wp:group -->

        <!-- wp:buttons -->
        <div class="wp-block-buttons">
            <!-- wp:button {"backgroundColor":"transparent","textColor":"primary","className":"is-style-outline"} -->
            <div class="wp-block-button is-style-outline">
                <a class="wp-block-button__link has-primary-color has-transparent-background-color has-text-color has-background wp-element-button">
                    <?php esc_html_e( 'Voir tout →', 'artisanat-theme' ); ?>
                </a>
            </div>
            <!-- /wp:button -->
        </div>
        <!-- /wp:buttons -->

    </div>
    <!-- /wp:group -->

    <!-- wp:woocommerce/product-collection {"queryId":1,"query":{"perPage":4,"pages":1,"offset":0,"postType":"product","order":"desc","orderBy":"date","featured":true,"inherit":false},"displayLayout":{"type":"flex","columns":4},"collection":"woocommerce/product-collection/featured"} -->
    <div class="wp-block-woocommerce-product-collection">
        <!-- wp:woocommerce/product-template -->
        <!-- wp:group {"style":{"spacing":{"padding":{"top":"0","bottom":"0","left":"0","right":"0"}}},"layout":{"type":"constrained"}} -->
        <div class="wp-block-group" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0">

            <!-- wp:woocommerce/product-image {"isDescendentOfQueryLoop":true,"aspectRatio":"1/1","style":{"border":{"radius":"0.5rem"}}} /-->

            <!-- wp:post-title {"level":3,"isLink":true,"style":{"typography":{"fontSize":"var:preset|font-size|lg","fontWeight":"600"}},"textColor":"secondary"} /-->

            <!-- wp:woocommerce/product-price {"isDescendentOfQueryLoop":true,"textColor":"secondary","fontSize":"xl","style":{"typography":{"fontWeight":"700"}}} /-->

            <!-- wp:woocommerce/product-button {"isDescendentOfQueryLoop":true,"width":100,"style":{"spacing":{"margin":{"top":"var:preset|spacing|3"}}}} /-->

        </div>
        <!-- /wp:group -->
        <!-- /wp:woocommerce/product-template -->
    </div>
    <!-- /wp:woocommerce/product-collection -->

</div>
<!-- /wp:group -->
```

---

### Pattern - Témoignages

```php
<?php
/**
 * Title: Témoignages Clients
 * Slug: artisanat/testimonials
 * Categories: featured, testimonials
 * Keywords: testimonials, reviews, avis, clients, témoignages
 * Viewport Width: 1200
 */
?>

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|12","bottom":"var:preset|spacing|12","left":"var:preset|spacing|6","right":"var:preset|spacing|6"}}},"backgroundColor":"surface","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-surface-background-color has-background" style="padding-top:var(--wp--preset--spacing--12);padding-right:var(--wp--preset--spacing--6);padding-bottom:var(--wp--preset--spacing--12);padding-left:var(--wp--preset--spacing--6)">

    <!-- wp:heading {"textAlign":"center","textColor":"secondary"} -->
    <h2 class="wp-block-heading has-text-align-center has-secondary-color has-text-color">
        <?php esc_html_e( 'Ce que disent nos clients', 'artisanat-theme' ); ?>
    </h2>
    <!-- /wp:heading -->

    <!-- wp:columns {"align":"wide","style":{"spacing":{"margin":{"top":"var:preset|spacing|8"}}}} -->
    <div class="wp-block-columns alignwide" style="margin-top:var(--wp--preset--spacing--8)">

        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|6","bottom":"var:preset|spacing|6","left":"var:preset|spacing|6","right":"var:preset|spacing|6"}},"border":{"radius":"0.5rem"}},"backgroundColor":"background"} -->
            <div class="wp-block-group has-background-background-color has-background" style="border-radius:0.5rem;padding-top:var(--wp--preset--spacing--6);padding-right:var(--wp--preset--spacing--6);padding-bottom:var(--wp--preset--spacing--6);padding-left:var(--wp--preset--spacing--6)">

                <!-- wp:paragraph {"style":{"typography":{"fontStyle":"italic"}},"textColor":"text-secondary","fontSize":"lg"} -->
                <p class="has-text-secondary-color has-text-color has-lg-font-size" style="font-style:italic">
                    "<?php esc_html_e( 'Une qualité exceptionnelle ! J\'ai offert un vase à ma mère et elle l\'adore. Le service client est aussi très réactif.', 'artisanat-theme' ); ?>"
                </p>
                <!-- /wp:paragraph -->

                <!-- wp:group {"style":{"spacing":{"margin":{"top":"var:preset|spacing|4"}}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
                <div class="wp-block-group" style="margin-top:var(--wp--preset--spacing--4)">
                    <!-- wp:image {"width":"48px","height":"48px","scale":"cover","sizeSlug":"thumbnail","className":"is-style-rounded"} -->
                    <figure class="wp-block-image size-thumbnail is-resized is-style-rounded">
                        <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/avatar-1.jpg" alt="" style="object-fit:cover;width:48px;height:48px"/>
                    </figure>
                    <!-- /wp:image -->

                    <!-- wp:group {"layout":{"type":"constrained"}} -->
                    <div class="wp-block-group">
                        <!-- wp:paragraph {"style":{"typography":{"fontWeight":"600"}},"textColor":"secondary","fontSize":"sm"} -->
                        <p class="has-secondary-color has-text-color has-sm-font-size" style="font-weight:600">Marie D.</p>
                        <!-- /wp:paragraph -->
                        <!-- wp:paragraph {"textColor":"text-muted","fontSize":"xs"} -->
                        <p class="has-text-muted-color has-text-color has-xs-font-size">Cliente depuis 2022</p>
                        <!-- /wp:paragraph -->
                    </div>
                    <!-- /wp:group -->
                </div>
                <!-- /wp:group -->

            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|6","bottom":"var:preset|spacing|6","left":"var:preset|spacing|6","right":"var:preset|spacing|6"}},"border":{"radius":"0.5rem"}},"backgroundColor":"background"} -->
            <div class="wp-block-group has-background-background-color has-background" style="border-radius:0.5rem;padding-top:var(--wp--preset--spacing--6);padding-right:var(--wp--preset--spacing--6);padding-bottom:var(--wp--preset--spacing--6);padding-left:var(--wp--preset--spacing--6)">

                <!-- wp:paragraph {"style":{"typography":{"fontStyle":"italic"}},"textColor":"text-secondary","fontSize":"lg"} -->
                <p class="has-text-secondary-color has-text-color has-lg-font-size" style="font-style:italic">
                    "<?php esc_html_e( 'Des pièces uniques avec une vraie âme. On sent le travail artisanal et l\'amour du métier. Je recommande !', 'artisanat-theme' ); ?>"
                </p>
                <!-- /wp:paragraph -->

                <!-- wp:group {"style":{"spacing":{"margin":{"top":"var:preset|spacing|4"}}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
                <div class="wp-block-group" style="margin-top:var(--wp--preset--spacing--4)">
                    <!-- wp:image {"width":"48px","height":"48px","scale":"cover","sizeSlug":"thumbnail","className":"is-style-rounded"} -->
                    <figure class="wp-block-image size-thumbnail is-resized is-style-rounded">
                        <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/avatar-2.jpg" alt="" style="object-fit:cover;width:48px;height:48px"/>
                    </figure>
                    <!-- /wp:image -->

                    <!-- wp:group {"layout":{"type":"constrained"}} -->
                    <div class="wp-block-group">
                        <!-- wp:paragraph {"style":{"typography":{"fontWeight":"600"}},"textColor":"secondary","fontSize":"sm"} -->
                        <p class="has-secondary-color has-text-color has-sm-font-size" style="font-weight:600">Pierre L.</p>
                        <!-- /wp:paragraph -->
                        <!-- wp:paragraph {"textColor":"text-muted","fontSize":"xs"} -->
                        <p class="has-text-muted-color has-text-color has-xs-font-size">Client depuis 2023</p>
                        <!-- /wp:paragraph -->
                    </div>
                    <!-- /wp:group -->
                </div>
                <!-- /wp:group -->

            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|6","bottom":"var:preset|spacing|6","left":"var:preset|spacing|6","right":"var:preset|spacing|6"}},"border":{"radius":"0.5rem"}},"backgroundColor":"background"} -->
            <div class="wp-block-group has-background-background-color has-background" style="border-radius:0.5rem;padding-top:var(--wp--preset--spacing--6);padding-right:var(--wp--preset--spacing--6);padding-bottom:var(--wp--preset--spacing--6);padding-left:var(--wp--preset--spacing--6)">

                <!-- wp:paragraph {"style":{"typography":{"fontStyle":"italic"}},"textColor":"text-secondary","fontSize":"lg"} -->
                <p class="has-text-secondary-color has-text-color has-lg-font-size" style="font-style:italic">
                    "<?php esc_html_e( 'Livraison soignée, emballage impeccable. Le produit est encore plus beau en vrai qu\'en photo.', 'artisanat-theme' ); ?>"
                </p>
                <!-- /wp:paragraph -->

                <!-- wp:group {"style":{"spacing":{"margin":{"top":"var:preset|spacing|4"}}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
                <div class="wp-block-group" style="margin-top:var(--wp--preset--spacing--4)">
                    <!-- wp:image {"width":"48px","height":"48px","scale":"cover","sizeSlug":"thumbnail","className":"is-style-rounded"} -->
                    <figure class="wp-block-image size-thumbnail is-resized is-style-rounded">
                        <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/avatar-3.jpg" alt="" style="object-fit:cover;width:48px;height:48px"/>
                    </figure>
                    <!-- /wp:image -->

                    <!-- wp:group {"layout":{"type":"constrained"}} -->
                    <div class="wp-block-group">
                        <!-- wp:paragraph {"style":{"typography":{"fontWeight":"600"}},"textColor":"secondary","fontSize":"sm"} -->
                        <p class="has-secondary-color has-text-color has-sm-font-size" style="font-weight:600">Sophie M.</p>
                        <!-- /wp:paragraph -->
                        <!-- wp:paragraph {"textColor":"text-muted","fontSize":"xs"} -->
                        <p class="has-text-muted-color has-text-color has-xs-font-size">Cliente depuis 2024</p>
                        <!-- /wp:paragraph -->
                    </div>
                    <!-- /wp:group -->
                </div>
                <!-- /wp:group -->

            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:column -->

    </div>
    <!-- /wp:columns -->

</div>
<!-- /wp:group -->
```

---

### Registration (functions.php)

```php
<?php
/**
 * Register block pattern categories
 */
function artisanat_register_pattern_categories() {
    register_block_pattern_category(
        'artisanat',
        array(
            'label'       => __( 'Artisanat', 'artisanat-theme' ),
            'description' => __( 'Patterns spécifiques au thème Artisanat', 'artisanat-theme' ),
        )
    );

    register_block_pattern_category(
        'hero',
        array(
            'label' => __( 'Hero Sections', 'artisanat-theme' ),
        )
    );

    register_block_pattern_category(
        'testimonials',
        array(
            'label' => __( 'Témoignages', 'artisanat-theme' ),
        )
    );
}
add_action( 'init', 'artisanat_register_pattern_categories' );
```

## Anti-patterns

| Anti-pattern | Pourquoi c'est problématique | Correction |
|--------------|------------------------------|------------|
| Couleurs hardcodées | Ignorer theme.json | Utiliser `var(--wp--preset--)` |
| Pas de i18n | Non traduisible | `esc_html_e()` partout |
| Images fixes | Broken sur autre env | Utiliser `get_template_directory_uri()` |
| Markup invalide | Erreur éditeur | Valider HTML Gutenberg |
| Pas de catégories | Difficile à trouver | Toujours catégoriser |

## Références

- [Block Patterns Documentation](https://developer.wordpress.org/themes/features/block-patterns/)
- [Pattern Directory](https://wordpress.org/patterns/)
- Livrables liés : `theme-json-config`, `gutenberg-block`, `wireframes`

## Historique des Versions

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0.0 | 2026-01-18 | wordpress-gutenberg-expert | Création initiale |
