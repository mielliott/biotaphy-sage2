#!/bin/bash

# Install browserify globally if needed
grep browserify@ <(npm list -g --depth=0) || npm install -g browserify

$(npm list -g | head -1 | rev | cut -c5- | rev)/bin/browserify src/client/app.js > biotaphySage2.js
