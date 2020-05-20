#!/usr/bin/env bash

set -eo pipefail

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

  mkdir -p dist/client/fonts/font-awesome/
  cp \
    "$font_awesome_src_dir"/webfonts/* \
    dist/client/fonts/font-awesome/
fi

copyfiles \
  --up 1 \
  'lib/client/scss/**/*.scss' \
  'lib/server/views/**/*.hbs' \
  dist

