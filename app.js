var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

app.set('port',( process.env.PORT || 5000 ));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/public/html/graph.html'));
});

app.get('/update', function(req,res){
	res.sendFile(path.join(__dirname + '/public/html/update.html'));
	io.sockets.emit('update', req.query.data );
});

io.on('connection', function(socket){ console.log("received connection"); });

http.listen(app.get('port'), function () {
  console.log('HackTech visualization running on port ' + app.get('port'));
});