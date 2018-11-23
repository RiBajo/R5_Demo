/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, newcap:0*/
/*eslint-env node, es6 */
"use strict";

var express = require("express");
var async = require("async");

module.exports = function () {
	var app = express.Router();
	//Hello Router
	app.get("/", (req, res) => {
		res.send("Hello World Node.js");
	});

	app.get("/whoAmI", (req, res) => {
		var userContext = req.authInfo;
		var result = JSON.stringify({
			userContext: userContext
		});
		res.type("application/json").status(200).send(result);
	});

	//Simple Database Select - In-line Callbacks
	app.get("/question/:question", (req, res) => {
		var client = req.db;
		var question = req.params.question + "?";
		
		try {
			client.prepare("select * from \"sample.QnA\" WHERE QUESTION = ? ", (err, statement) => {
	
				if (err) {
					res.type("text/plain").status(500).send(`ERROR: ${err.toString()}`);
					return;
				}
	
				statement.exec([question], (err, results) => {
					if (err) {
						res.type("text/plain").status(500).send(`ERROR: ${err.toString()}`);
						return;
					} else {
						var
							result = JSON.stringify({
								result: results
							});
						res.type("application/json").status(200).send(result);
					}
				});
			});	
		} catch (e) {
			return res.type("text/plain").status(500).send(`ERROR: ${e.toString()}`);
		}
	});

	//Simple Database Select - In-line Callbacks
	app.get("/example2", (req, res) => {
		var client = req.db;
		async.waterfall([
			function prepare(callback) {
				client.prepare("select SESSION_USER from \"DUMMY\"",
					(err, statement) => {
						// wenn erster Parameter des Callbacks einen Wert != null hat
						// wird sofort der evtl. vorhandene Callback der Hauptmethode ausgeführt
						// https://coderwall.com/p/zpjrra/async-waterfall-in-nodejs
						callback(null, err, statement);
					});
			},
			function execute(err, statement, callback) {
				statement.exec([],
					function (execErr, results) {
						callback(null, execErr, results);
					});
			},
			function response(err, results, callback) {
				if (err) {
					res.type("text/plain").status(500).send(`ERROR: ${err.toString()}`);
					return;
				} else {
					var result =
						JSON.stringify({
							Objects: results
						});
					res.type("application/json").status(200).send(result);
				}
				callback();
			}
		]);
	});

	return app;
};