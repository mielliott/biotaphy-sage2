
"use strict";

const { TestScheduler } = require("jest");

const path = require("path")
const serverRemote = require("./serverRemote");

test("Process an empty request", () => {
    let response = mockRequest(null, null)
    expect(response).toBe(null)
})

test("Request a list of packages", () => {
    global.mediaFolders = {
        user : {
            path : path.resolve("test/resources/")
        }
    }

    let response = mockRequest("listPackages")

    expect(response).not.toBeNull()
    expect(response).toHaveProperty("packagesList")
    expect(response.packagesList).toContain("wombat")
});

function mockRequest(cmd, _data) {
    let wsio = {
        emit : jest.fn((event, args) => {})
    }

    let data = {
        app: null,
        func: null,
        query: {
            cmd: cmd,
            requestId: ((wsio.emit.mock) ? wsio.emit.mock.calls.length : 0).toString()
        },
        broadcast: true
    }

    serverRemote.processRequest(wsio, data, null)

    let emitArgs = wsio.emit.mock.calls
    if (emitArgs.length > 0) {
        let responseData = emitArgs[emitArgs.length - 1][1].data
        return responseData
    }
    else {
        return null
    }
}