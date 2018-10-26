/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";
module.exports = {
	initExpress: function () {
		var xsenv = require("@sap/xsenv");
		var passport = require("passport");
		var xssec = require("@sap/xssec");
		var xsHDBConn = require("@sap/hdbext");
		var express = require("express");
		var bodyParser = require("body-parser");
		var multer = require("multer");

		//logging
		var logging = require("@sap/logging");
		var appContext = logging.createAppContext();

		//Initialize Express App for XS UAA and HDBEXT Middleware
		var app = express();
		/*passport.use("JWT", new xssec.JWTStrategy(xsenv.getServices({
		uaa: {
		tag: "xsuaa"
		}
		}).uaa));*/

		/*app.use(logging.expressMiddleware(appContext));
		app.use(passport.initialize());

		var hanaOptions = xsenv.getServices({
		hana: {
		tag: "hana"
		}
		});*/

		/*app.use(
		passport.authenticate("JWT", {
		session: false
		}),
		xsHDBConn.middleware(hanaOptions.hana)
		);*/

		app.use(bodyParser.json()); // for parsing application/json
		return app;
	}

};