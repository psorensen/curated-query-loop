#!/bin/bash
npm run env run tests-wordpress chmod -- -c ugo+w /var/www/html
npm run env run tests-cli wp rewrite structure '/%postname%/' -- --hard
npm run env run tests-cli wp db import wp-content/data/db.sql