
"use strict";

const path = require("path");
const fs = require("fs")
const packageUtil = require("./packageUtil")

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
                let queryData = data.query.data;
                let speciesList = listSpecies(queryData.packageName)
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


function listSpecies(packageName) {
    let fileData = packageUtil.readDataFile(packageUtil.getFullPath(packageName, "package", "sdm", "info.js"))
    let speciesList = fileData.occurrences.map((entry) => entry.species_name)
    return speciesList
}

function directoryIsResultsPackage(dirPath) {
    let files = fs.readdirSync(dirPath)
    return (files.indexOf(packageUtil.getLocalPath("package", "ancPam.js")) >= 0)
}

module.exports.processRequest = processRequest