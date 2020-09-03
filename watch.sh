#!/bin/bash

# Install watchify globally if needed
grep watchify@ <(npm list -g --depth=0) || npm install -g watchify

$(npm list -g | head -1 | rev | cut -c5- | rev)/bin/watchify src/client/app.js -o biotaphySage2.js
