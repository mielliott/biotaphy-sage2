//
// SAGE2 application: Biotaphy Results Package Viewer
// by: Michael Elliott <mielliott@ufl.edu>
//

"use strict";

var uuid = require("uuid");

var biotaphySage2 = SAGE2_App.extend({
    init: function (data) {
        // Create a canvas node for this app. Accessible later as this.element
        this.SAGE2Init("canvas", data);
        // As the window is resized, the resize function will be called automatically
        this.resizeEvents = "continuous";
        // Get the canvas context
        this.ctx = this.element.getContext("2d");

        this.applet = null
        this.package = null

        this.pendingRequests = new Map();

        if (data.customLaunchParams) {
            this.loadApplet(data.customLaunchParams.appletName);
        }

        if (this.applet == null) {
            this.loadApplet("Package")
        }
    },

    loadApplet: function(appletName) {
        if (window[appletName] === undefined) {
            this.initAndLoadApplet(appletName)
        }
        else {
            this.loadInitializedApplet(appletName)
        }
    },

    initAndLoadApplet: function(appletName) {
        var path = require("path")
        var appletsDirectory = path.join(this.resrcPath, "applets", "/");
        var appletPath = path.join(appletsDirectory, `applet${appletName}.js`);

        var js = document.createElement("script");

        js.addEventListener('error', function(event) {
            this.log(`Error loading applet ${appletName}`);
        }, false);
        
        var _this = this
        js.addEventListener('load', function(event) {
            _this.loadInitializedApplet(appletName);
        });

        js.type = "text/javascript";
        js.async = false;
        js.src = appletPath;

        this.element.appendChild(js);
    },

    remote: function(cmd, callback, _data, _bind) {
        var requestId = uuid();
        this.pendingRequests[requestId] = callback.bind(_bind ? _bind : this.applet);
        console.log(_bind)

        var query = {
            cmd: cmd,
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

    loadInitializedApplet: function(appletName) {
        // TODO: do we need to do anything to clean up existing applets?
        var applet = new window[`applet${appletName}`]();
        this.applet = applet
        applet.init(this);
    },

    draw: function (data) {
        if (this.applet != null) {
            this.applet.draw()
        }
    },

    resize: function (date) {
        if (this.applet != null) {
            this.applet.draw()
        }
    },

    event: function (type, position, user, data, date) {},

});
