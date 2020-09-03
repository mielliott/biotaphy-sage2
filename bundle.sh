#!/bin/bash
$(npm list -g | head -1 | rev | cut -c5- | rev)/bin/browserify src/client/app.js > biotaphySage2.js
