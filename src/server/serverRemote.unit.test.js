
"use strict";

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
    let data = {
        app: null,
        func: null,
        query: {
            cmd: cmd,
            requestId: ((wsio.emit.mock) ? wsio.emit.mock.calls.length : 0).toString()
        },
        broadcast: true
    }

    let response = null
    let wsio = {
        emit : jest.fn((event, args) => {
            response = args.data
        })
    }

    serverRemote.processRequest(wsio, data, null)

    return response
}