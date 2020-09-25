
"use strict";

const packageUtil = require("./packageUtil")

test("Get a package-scope path to a file", () => {
    let localPath = packageUtil.getLocalPath("species", "wombat.txt")
    expect(localPath).toBe("species_wombat.txt")
})

test("Get an absolute path to a file within a package", () => {
    global.mediaFolders = {
        user : {
            path : "pathToCollectionsFolder/"
        }
    }

    let fullPath = packageUtil.getFullPath("wombat", "species", "wombat.txt")
    expect(fullPath).toBe("pathToCollectionsFolder/collections/wombat/species_wombat.txt")
})

test("Fail to read missing data file", () => {
    let readData = packageUtil.readDataFile("haha you're not real")
    expect(readData).toBeNull()
})

test("Fail to read non-data file", () => {
    const path = require("path")
    global.mediaFolders = {
        user : {
            path : path.resolve("test/resources/")
        }
    }

    let readData = packageUtil.readDataFile(packageUtil.getFullPath("wombat", "images", "lm_logo.png"))
    expect(readData).toBeNull()
})

test("Read data from a BiotaPhy data file", () => {
    const path = require("path")
    global.mediaFolders = {
        user : {
            path : path.resolve("test/resources/")
        }
    }

    let readData = packageUtil.readDataFile(packageUtil.getFullPath("wombat", "fake", "data.js"))
    expect(readData).toHaveProperty("is")
    expect(readData.is).toBe("a bird")
})
