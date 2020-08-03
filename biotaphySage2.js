//
// SAGE2 application: Biotaphy Results Package Viewer
// by: Michael Elliott <mielliott@ufl.edu>
//

var biotaphySage2 = SAGE2_App.extend({
    init: function (data) {
        // Create a canvas node for this app. Accessible later as this.element
        this.SAGE2Init("canvas", data);
        // As the window is resized, the resize function will be called automatically
        this.resizeEvents = "continuous";
        // Get the canvas context
        this.ctx = this.element.getContext("2d");
    },

    draw: function (data) {},

    resize: function (date) {},

    event: function (type, position, user, data, date) {},

});
