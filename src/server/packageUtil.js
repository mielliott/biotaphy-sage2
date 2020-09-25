
"use strict";

const fs = require("fs")
const path = require("path")
const packageUtil = require("./packageUtil")

function getLocalPath(...entries) {
    let mediaPath = "package";
    entries.forEach((entry) => {
        mediaPath += "_" + entry
    })
    return mediaPath;
}

function getFullPath(packageName, ...pathEntries) {
    return path.join(mediaFolders.user.path, "collections", packageName, getLocalPath(...pathEntries));
}

function readDataFile(filePath) {
    if (!fs.existsSync(filePath)) {
        return null
    }

    let fileAsString = fs.readFileSync(filePath).toString()

    // BiotaPhy data files begin with "var someVar = ...". Because we use "use strict", it's illegal to define new variables in "eval". To get around this, replace "var someVar =" with "data =".
    let assignmentPattern = /var .+ =/g
    if (!assignmentPattern.test(fileAsString)) {
        return null;
    }

    var data;
    fileAsString = fileAsString.replace(assignmentPattern, "data =")
    eval(fileAsString)
    return data;
}

module.exports = {
    getLocalPath: getLocalPath,
    getFullPath: getFullPath,
    readDataFile: readDataFile
}