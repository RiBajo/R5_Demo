/*eslint no-console: 0, no-unused-vars: 0, no-undef:0*/
//const quote = require('stock-quote');

quote = require('stock-quote');

exports.getQuote = function () {
	var result;
	result = quote.getQuote('GOOGL');
//	var result2 = JSON.stringify(result);
	
	return result;
};