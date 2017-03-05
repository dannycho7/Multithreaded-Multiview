data = {"nodes":[]};
function add_more(json_entry){
	console.log(json_entry);
	for ( var sub_entries in json_entry ){
		if ( sub_entries != undefined ){
			var entry_data = {};
			entry_data['class_name'] = name;
			occupied_area_x += Math.floor( (Math.random() * 12) );
			occupied_area_y += Math.floor( (Math.random() * 10) - 5 );
			if( occupied_area_x + offset >= windowWidth ){
				console.log(name);
				occupied_area_x = windowWidth - offset - 10;
			}
			entry_data['class_name'] = name;
			entry_data['coordinates'] = {"x" : occupied_area_x ,  "y": occupied_area_y };
			if ( sub_entries == 'parents' ) {
				//add in parent node
				entry_data['size'] = 1.5;
			}
			if ( sub_entries == 'children' ){
				//add in child node
				entry_data['size'] = 0.5;
			}
			if ( sub_entries == 'variables' ){
				//add in variable speck
				entry_data['size'] = 1;
			}
			data.nodes.push(entry_data);
		}
	}
}
//this variable will determine x and y coordinates
var numClassTotal = Object.keys(original).length;
var windowHeight = document.getElementById('node-container').clientHeight;
var windowWidth = document.getElementById('node-container').clientWidth;
var node_avg_area = Math.sqrt(windowWidth * windowHeight / numClassTotal);
var offset = 80;
var occupied_area_x = 0;
var occupied_area_y = 30;
//loop through all unrelated classes
for( var name in original){
	var entry_data = {};
	occupied_area_x += Math.floor( (Math.random() * node_avg_area / 2) + node_avg_area / 2);
	if( occupied_area_x + offset >= windowWidth ){
		occupied_area_x = Math.floor( (Math.random() * offset) );
		occupied_area_y += Math.floor(node_avg_area);
	}
	entry_data['class_name'] = name;
	entry_data['coordinates'] = {"x" : occupied_area_x ,  "y": occupied_area_y };
	entry_data['size'] = 1;
	data.nodes.push(entry_data);
	add_more(original[name]);
}
