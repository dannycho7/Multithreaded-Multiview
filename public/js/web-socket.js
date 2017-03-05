var socket = io.connect('http://localhost:5000');
socket.on('update', function(data){
	console.log("This is the data being transferred: " + data);
	load_nodes(data);
});