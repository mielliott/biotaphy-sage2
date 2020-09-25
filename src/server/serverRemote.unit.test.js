
"use strict";

const path = require("path")
const serverRemote = require("./serverRemote")

global.mediaFolders = {
    user : {
        path : path.resolve("test/resources/")
    }
}

test("Process an empty request", () => {
    let response = mockRequest(null, null)
    expect(response).toBe(null)
})

test("Process a list packages request", () => {
    let response = mockRequest("listPackages")

    expect(response).not.toBeNull()
    expect(response).toHaveProperty("packagesList")
    expect(response.packagesList).toContain("wombat")
})

test("Process an list species request", () => {
    let response = mockRequest("listSpecies", { packageName: "wombat" })
    expect(response.speciesList).toContain("bumblebee")
    expect(response.speciesList).toContain("moth")
})

function mockRequest(cmd, _data) {
    let data = {
        app: null,
        func: null,
        query: {
            cmd: cmd,
            data: _data,
            requestId: "testId"
        },
        broadcast: true
    }

    let response = null
    let wsio = {
        emit : (event, args) => {
            response = args.data
        }
    }

    serverRemote.processRequest(wsio, data, null)

    return response
}
