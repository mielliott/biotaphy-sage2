
"use strict";

// built-in path module
var path    = require("path");
var fs      = require("fs")

// load modules from the server's folder
var request = require(path.join(module.parent.exports.dirname, "request"));  // HTTP client request
var $       = require("cheerio") // require(path.join(module.parent.exports.dirname, "cheerio"));  // HTML parsing, jquery style
// var fs		= require(path.join(module.parent.exports.dirname, "fs"));

function processRequest(wsio, data, config) {
    let cmd = data.query.cmd;
    if (cmd) {
        switch (cmd) {
            case "listPackages":
                let packagesList = listPackages()
                wsio.emit("broadcast", {
                    app: data.app,
                    func: data.func,
                    data: {
                        requestId: data.query.requestId,
                        packagesList: packagesList,
                        err: null
                    }
                })
                break;
            default:
                console.log(`Unrecognized command ${cmd}`);
        }
    }
}

function listPackages() {
    let searchPath = path.join(mediaFolders.user.path, "collections", "/")
    return fs.readdirSync(searchPath, {withFileTypes: true})
        .filter(file => file.isDirectory())
        .filter(file => directoryIsResultsPackage(path.join(searchPath, file.name)))
        .map(file => file.name)
}

function directoryIsResultsPackage(dirPath) {
    let files = fs.readdirSync(dirPath)
    return (files.indexOf("package_ancPam.js") >= 0)
}

module.exports = processRequest;
