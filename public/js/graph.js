function load_nodes(){
	var container = document.getElementById("node-container");
	for (var node_entry in data.nodes ){
		var json_data = data.nodes[node_entry];
		var node = document.createElement('div');
		node.id = json_data.class_name;
		node.className = "circle";
		node.style.left = parseInt(json_data.coordinates.x)  + Math.floor(Math.random()*30) + 'px';
		node.style.top = parseInt(json_data.coordinates.y)  + Math.floor(Math.random()*30) + 'px';	
		node.style.height = 30 * parseFloat(json_data.size) + 'px';
		node.style.width = 30 * parseFloat(json_data.size) + 'px';	
		container.appendChild(node);
	}
}