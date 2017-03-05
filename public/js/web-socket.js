var socket = io.connect('http://localhost:5000');
socket.on('update', function(data){
	load_nodes(data);
});