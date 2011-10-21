require.paths.unshift(__dirname + '/lib');

var express   = require('express');
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

// Disable websockets, https://github.com/Flotype/now/issues/139
var everyone = require("now").initialize(app, {socketio: {transports: ['xhr-polling', 'jsonp-polling', 'htmlfile']}});

everyone.now.noteList = new Array();
everyone.now.noteList['xyz'] = {text: 'Hello', pos: {x: 100, y:200}, color: "green"};
everyone.now.noteList['yysd'] = {text: 'Mofo', pos: {x: 200, y:250}, color: "red"};
everyone.now.noteList['asdf'] = {text: ':P', pos: {x: 250, y:300}, color: "red"};
everyone.now.lastPos = { x: 250, y: 300 };

everyone.now.addToList = function(id, data, newPos) {
    everyone.now.noteList[id] = data;
    everyone.now.newNoteNotify(id, data);
    everyone.now.lastPos = newPos;
    console.log("added!" + id);
};

everyone.now.triggerUpdate = function(id, newPos) {
    everyone.now.lastPos = newPos;
    everyone.now.noteList[id].pos = newPos;
    everyone.now.updateNote(id);
};

everyone.now.clearNotes = function() {
    everyone.now.clearList();
    everyone.now.lastPos = {x:0, y:0};
    everyone.now.clearAll();
};

everyone.now.clearList = function() {
    everyone.now.noteList = [];
};


// respond to GET /home
app.get('/', function(request, response) {
	    // render the home page
            response.render('canvas.ejs', {
				layout:   false,
				app:      app
			    });
	    
	});
