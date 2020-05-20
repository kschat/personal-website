#!/usr/bin/env bash

set -eo pipefail

font_awesome_src_dir=node_modules/@fortawesome/fontawesome-free
font_awesome_scss_to_dir=lib/client/scss/vendor/font-awesome
font_awesome_font_to_dir=dist/client/fonts/font-awesome

if [ ! -d "$font_awesome_src_dir" ]; then
  echo 'FontAwesome not installed, run `yarn install` and try again' >&2
  exit 1
fi

if [ ! -d "$font_awesome_scss_to_dir" ]; then
  mkdir -p "$font_awesome_scss_to_dir"
  cp \
    "$font_awesome_src_dir"/scss/* \
    "$font_awesome_scss_to_dir"
fi

if [ ! -d "$font_awesome_font_to_dir" ]; then
  mkdir -p "$font_awesome_font_to_dir"
  cp \
    "$font_awesome_src_dir"/webfonts/* \
    "$font_awesome_font_to_dir"
fi

copyfiles \
  --up 1 \
  'lib/client/scss/**/*.scss' \
  'lib/server/views/**/*.hbs' \
  dist

