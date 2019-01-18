/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, newcap:0*/
/*eslint-env node, es6 */
"use strict";

var express = require("express");
var async = require("async");

//const superagent = require('superagent');
const stock = require("/home/vcap/app/apis/stock_quote_api.js");
module.exports = function () {
	var app = express.Router();
	//Hello Router
	app.get("/", (req, res) => {
		res.send("Hello world Node.js");
	});

	app.get("/whoAmI", (req, res) => {
		var userContext = req.authInfo;
		var result = JSON.stringify({
			userContext: userContext
		});
		res.type("application/json").status(200).send(result);
	});

	app.get("/google", (req, res) => {
		var userContext = req.authInfo;
		let quote = stock.getQuote(); // val is "Hello"

		if (quote != null) {
			var result = JSON.stringify({
			    userContext: userContext,
				status: "Erfolg",
				quote: quote 
				});

		} else {
			var result = JSON.stringify({
				userContext: userContext,
				status: "Kein Erfolg"
			});
		}
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
	
	//Test Maissa: Chuck Norris joke
	app.get("/chuck", (req, res) => {
		var userContext = req.authInfo;
		let quote = stock.getQuote(); // val is "Hello"

		if (quote != null) {
			var result = JSON.stringify({
				userContext: userContext,
				status: "Someone once videotaped Chuck Norris getting pissed off. It was called Walker: Texas Chain Saw Masacre.",
				quote: quote  
			});

		} else {
			var result = JSON.stringify({
				userContext: userContext,
				status: "Kein Erfolg"
			});
		}
		res.type("application/json").status(200).send(result);
	});
	
	
	//Implement External Data in SCP
/*	app.get("/chuckvar", (req, res) => {
	
		var http = require('https'),
    		url = require('https://api.chucknorris.io/jokes/categories');
			http.createServer(function (req, res) {
    	var query = url.parse(req.url,true).query;
    		res.end(JSON.stringify(query));
		})
		res.type("application/json").status(200).send(result);
	});*/
	
	//Chuck with Variable
	const request = require('request');
	app.get("/chuckvar", (req, res) => {
    	request('https://api.chucknorris.io/jokes/random', function (error, response, body) {
        	console.log('error:', error);
        	console.log('statusCode:', response && response.statusCode); 
        	console.log('body:', body);
        	res.end(body);
		 });
	});
//<button type="submit"  onClick="refreshPage()">Refresh Button</button>
	
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