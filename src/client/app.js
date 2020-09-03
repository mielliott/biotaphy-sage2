
"use strict";

global.biotaphySage2 = SAGE2_App.extend({
    init: function (data) {
        // Create a canvas node for this app. Accessible later as this.element
        this.SAGE2Init("div", data);
        // As the window is resized, the resize function will be called automatically
        this.resizeEvents = "continuous";

        this.applet = null
        this.package = null

        this.pendingRequests = new Map();

        this.element.style.backgroundColor = "black";

        // The following "requires" need to be explicit so that they are detected by browserify
        this.appletClasses = new Map()
        this.appletClasses["package"] = require("./applets/AppletPackage")

        if (data.customLaunchParams) {
            this.loadApplet(data.customLaunchParams.appletName);
        }

        if (!this.applet) {
            this.loadApplet("package")
        }
    },

    loadApplet: function(appletName) {
        let Applet = this.appletClasses[appletName]
        this.applet = new Applet(this)
        this.applet.init()
    },

    loadInitializedApplet: function(appletName) {
        // TODO: do we need to do anything to clean up existing applets?
        var applet = new window[`applet${appletName}`]();
        this.applet = applet
        applet.init(this);
    },

    remote: function(cmd, callback, _data, _bind) {
        var uuid = require("uuid");
        var requestId = uuid();
        this.pendingRequests[requestId] = callback.bind(_bind ? _bind : this.applet);

        var query = {
            cmd: cmd,
            data: _data,
            requestId: requestId
        }
		wsio.emit('applicationRPC', {
            app: this.div.id,
            func: "_remoteCallback",
            query: query,
            broadcast: true
        });
    },

    _remoteCallback: function(response) {
        var callback = this.pendingRequests[response.requestId];
        delete response.requestId
        if (callback) {
            callback(response);
        }
    },

    draw: function (data) {
        if (this.applet) {
            this.applet.draw()
        }
    },

    resize: function (date) {
        if (this.applet) {
            this.applet.draw()
        }
    },

    event: function (type, position, user, data, date) {},

});

module.exports = biotaphySage2