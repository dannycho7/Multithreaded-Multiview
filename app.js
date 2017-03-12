var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

//Accepting post request parameter in the body
app.use(bodyParser.urlencoded({ extended: true })); 

//setting port variable for being uploaded to Google App Engine and local testing
app.set('port',( process.env.PORT || 5000 ));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/public/html/graph.html'));
});

app.post('/update', function(req,res){
	console.log("Received post");
	console.log(req.body);
	console.log(req.headers);
	io.sockets.emit('update', req.body.data );
	res.end();
});

io.on('connection', function(socket){ console.log("received connection"); });

http.listen(app.get('port'), function () {
  console.log('Visualization running on port ' + app.get('port'));
});