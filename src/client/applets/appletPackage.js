//
// BiotaPhy SAGE2 Applet: Package
// by: Michael Elliott <mielliott@ufl.edu>
//

"use strict";

let AppletPackage = class {
	constructor(app) {
		this.packagesList = []
		this.app = app
	}

	init() {
		this.updatePackagesList()
	}

	updatePackagesList() {
		if (this.app.package === null) {
			this.app.remote("listPackages", (data) => {
				this.packagesList = data.packagesList;
			});
		}
	}

	draw() {
	}
}

module.exports = AppletPackage
