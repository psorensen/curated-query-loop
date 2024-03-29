# Curated Query Loop

[![E2E test](https://github.com/psorensen/curated-query-loop/actions/workflows/cypress.yml/badge.svg)](https://github.com/psorensen/curated-query-loop/actions/workflows/cypress.yml)

The WordPress Query Loop Block is a powerful block, enabling authors to curate blog content with fine-grained control over the layout. However, it's often a requirement that site editors want to pick the specific posts that appear in these content grids and lists. This WordPress plugin adds a block variation of the Query Loop which provides a content picker, allowing editors to choose the exact posts they want to display, while still leveraging the power of the layout control which comes with the Query Loop Block. 

## Demo
![Curated Query Loop Demo Gif](assets/images/curated-query-loop.gif)

## Caveats
This plugin extends the core Query Loop block, and as such 

1. Like the standard Query Loop block, this is limited to one post type - the post type in the curation search results will be determined by the post type selected in the Query Loop settings.
2. Posts are not backfilled - this uses the `post__in` WP_Query parameter, meaning any posts_per_page argument exceeding the number of selected posts will be ignored. Posts will be limited to the specific posts selected.

## Installation
Visit https://wordpress.org/plugins/curated-query-loop/ to download the plugin.

## Development
1. Clone this repository into `wp-content/plugins`
2. Install composer dependencies with `composer install`
3. Install NPM dependencies with `npm i` and build plugin using `npm run build`. Node 18+ recommended.
4. This ships with [`@wordpress/env`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) installed. If you have Docker installed and running, you can simply run `npm run env:start` to spin up a local environment with the plugin activated.
