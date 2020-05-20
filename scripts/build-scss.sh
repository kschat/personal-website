#!/usr/bin/env bash

# TODO compress in prod
# --output-style compressed \
node-sass \
  --source-map true \
  --source-map-embed true \
  --include-path lib/client/scss \
  lib/client/scss/main.scss \
  dist/client/css/main.css

