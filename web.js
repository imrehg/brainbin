require.paths.unshift(__dirname + '/lib');

var express   = require('express');
var now = require('now');
var uuid = require('node-uuid');

// create an express webserver
var app = express.createServer(
  express.logger(),
  express.static(__dirname + '/public')
);

// listen to the PORT given to us in the environment
var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Listening on " + port);
});

// respond to GET /home
app.get('/', function(request, response) {
	    // render the home page
            response.render('canvas.ejs', {
				layout:   false,
				app:      app
			    });
	    
	});
