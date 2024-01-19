# Curated Query Loop

The WordPress Query Loop Block is a powerful block, enabling authors to curate blog content with fine-grained control over the layout. However, it's often a requirement that site editors want to pick the specific posts that appear in these content grids and lists. This WordPress plugin adds a block variation of the Query Loop which provides a content picker, allowing editors to choose the exact posts they want to display, while still leveraging the power of the layout control which comes with the Query Loop Block. 

## Demo

https://www.loom.com/share/fcdc9c2985b14bab82f05e55d83eecb7?sid=83412e99-f86f-4b92-b3e6-569d6942e390

## Screenshots

![image](https://github.com/psorensen/curated-query-loop/assets/6152801/5d12e0d4-41bf-4eb2-b7c3-3e5852aea57e)
![image](https://github.com/psorensen/curated-query-loop/assets/6152801/944fcdda-9cc2-48b6-b585-f94f81c45093)

## Caveats

1. Like the standard Query Loop block, this is limited to one post type - the post type in the curation search results will be determined by the post type selected in the Query Loop settings.
2. Posts are not backfilled - this uses the `post__in` WP_Query parameter, meaning any posts_per_page argument exceeding the number of selected posts will be ignored. Posts will be limited to the specific posts selected.

## Installation
Currently, compiled assets are not included and must be manually built.
1. Clone this repository into `wp-content/plugins`
2. Install composer dependencies with `composer install`
3. Install NPM dependencies with `npm i` and build plugin using `npm run build`. Node 18+ recommended.
4. Optional - This ships with @wordpress/env installed. If you have Docker installed and running, you can simply run `npm run env:start` to spin up a local environment with the plugin activated.
