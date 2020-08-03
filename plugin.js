// SAGE2 is available for use under the SAGE2 Software License
//
// University of Illinois at Chicago's Electronic Visualization Laboratory (EVL)
// and University of Hawai'i at Manoa's Laboratory for Advanced Visualization and
// Applications (LAVA)
//
// See full text, terms and conditions in the LICENSE.txt included file
//
// Copyright (c) 2015

"use strict";

// built-in path module
var path    = require('path');
// load modules from the server's folder
var request = require(path.join(module.parent.exports.dirname, 'request'));  // HTTP client request
var $       = require(path.join(module.parent.exports.dirname, 'cheerio'));  // HTML parsing, jquery style


function processRequest(wsio, data, config) {
}

module.exports = processRequest;

