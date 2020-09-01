//
// BiotaPhy SAGE2 Applet: Package
// by: Michael Elliott <mielliott@ufl.edu>
//

"use strict";

var appletPackage = Class.extend({
	init: function(app) {
		this.packagesList = []

		if (app.package === null) {
			app.remote("listPackages", this.updatePackagesList);
		}
	},

	updatePackagesList: function(data) {
		this.packagesList = data.packagesList;
	},

	draw: function() {
	}
});
