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