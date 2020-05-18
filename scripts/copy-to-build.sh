#!/usr/bin/env bash

set -eo pipefail

font_awesome_dir=node_modules/@fortawesome/fontawesome-free

if [ ! -d "$font_awesome_dir" ]; then
  echo 'FontAwesome not installed, run `yarn install` and try again' >&2
  exit 1
fi

mkdir -p lib/client/scss/vendor/font-awesome/
cp \
  "$font_awesome_dir"/scss/* \
  lib/client/scss/vendor/font-awesome/

mkdir -p dist/client/fonts/font-awesome/
cp \
  "$font_awesome_dir"/webfonts/* \
  dist/client/fonts/font-awesome/

copyfiles \
  --up 1 \
  'lib/client/scss/**/*.scss' \
  'lib/server/views/**/*.hbs' \
  'lib/server/content/**/*.md' \
  dist

