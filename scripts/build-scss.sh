#!/usr/bin/env bash

node-sass \
  --source-map true \
  --source-map-embed true \
  --include-path lib/client/scss \
  lib/client/scss/main.scss \
  dist/client/css/main.css

csso \
  --input dist/client/css/main.css \
  --output dist/client/css/main.min.css \
  --source-map file
