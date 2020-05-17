#!/usr/bin/env bash

font_awesome_dir=node_modules/@fortawesome/fontawesome-free

if [ ! -d "$font_awesome_dir" ]; then
  echo 'FontAwesome not installed, run `yarn install` and try again' >&2
  exit 1
fi

mkdir -p lib/client/scss/vendor/font-awesome/
cp \
  "$font_awesome_dir"/scss/* \
  lib/client/scss/vendor/font-awesome/


  # --output-style compressed \
node-sass \
  --source-map true \
  --source-map-embed true \
  --include-path lib/client/scss \
  lib/client/scss/main.scss \
  dist/client/css/main.css

