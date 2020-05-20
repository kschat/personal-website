#!/usr/bin/env bash

font_awesome_src_dir=node_modules/@fortawesome/fontawesome-free
font_awesome_to_dir=lib/client/scss/vendor/font-awesome/

if [ ! -d "$font_awesome_src_dir" ]; then
  echo 'FontAwesome not installed, run `yarn install` and try again' >&2
  exit 1
fi

if [ ! -d "$font_awesome_to_dir" ]; then
  mkdir -p lib/client/scss/vendor/font-awesome/
  cp \
    "$font_awesome_src_dir"/scss/* \
    lib/client/scss/vendor/font-awesome/
fi

  # --output-style compressed \
node-sass \
  --source-map true \
  --source-map-embed true \
  --include-path lib/client/scss \
  lib/client/scss/main.scss \
  dist/client/css/main.css

