
"use strict";

const path = require("path");
const fs = require("fs")

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
            case "listSpecies":
                let speciesList = listSpecies()
                wsio.emit("broadcast", {
                    app: data.app,
                    func: data.func,
                    data: {
                        requestId: data.query.requestId,
                        speciesList: speciesList,
                        err: null
                    }
                })
            default:
                console.log(`Unrecognized command ${cmd}`);
        }
    }
}

function listPackages() {
    // SAGE2 has a very odd way of storing zip files (packages); it makes a folder in "collections" with the zip file name, flattens the directory structure inside of that folder and prefixes each file with its local path, separated by underscores. For example, wombat.zip/package/ancPam.js is extracted to wombat/package_ancPam.js
    let searchPath = path.join(mediaFolders.user.path, "collections", "/")
    return fs.readdirSync(searchPath, {withFileTypes: true})
        .filter(file => file.isDirectory())
        .filter(file => directoryIsResultsPackage(path.join(searchPath, file.name)))
        .map(file => file.name)
}

function listSpecies() {
    return ["bumblebee", "moth"]
}

function directoryIsResultsPackage(dirPath) {
    let files = fs.readdirSync(dirPath)
    return (files.indexOf("package_ancPam.js") >= 0)
}

module.exports.processRequest = processRequest