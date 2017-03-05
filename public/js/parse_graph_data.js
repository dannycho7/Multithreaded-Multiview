data = {"nodes":[]};
function add_more(json_entry,parent_name){
	for ( var sub_entries in json_entry ){
		if ( sub_entries != undefined ){
			if ( sub_entries == 'parents' ) {
				//add in parent nodes
				for ( var parent_entries in json_entry[sub_entries] ){
					var entry_data = {};
					entry_data['unique_name'] = json_entry[sub_entries][parent_entries];
					entry_data['parent_data'] = parent_name;
					entry_data['size'] = 0.8;
					occupied_area_x += Math.floor( (Math.random() * 9) - 4 );
					var occupied_y_entry = occupied_area_y + Math.floor( (Math.random() * 9) - 4 );
					if( occupied_area_x + offset >= windowWidth ){
						occupied_area_x = windowWidth - offset - 10;
					}
					entry_data['coordinates'] = {"x" : occupied_area_x ,  "y": occupied_y_entry };
					data.nodes.push(entry_data);
				}
			}
			if ( sub_entries == 'children' ){
				//add in child node
				for ( var children_entries in json_entry[sub_entries] ){
					var entry_data = {};
					entry_data['unique_name'] = json_entry[sub_entries][children_entries];
					entry_data['parent_data'] = parent_name;
					entry_data['size'] = 0.5;
					occupied_area_x += Math.floor( (Math.random() * 6) - 3 );
					var occupied_y_entry = occupied_area_y + Math.floor( (Math.random() * 6) - 3 );
					if( occupied_area_x + offset >= windowWidth ){
						occupied_area_x = windowWidth - offset - 10;
					}
					entry_data['coordinates'] = {"x" : occupied_area_x ,  "y": occupied_y_entry };
					data.nodes.push(entry_data);
				}
			}
			if ( sub_entries == 'methods' ){
				//add in variable speck
				for ( var method_entries in json_entry[sub_entries] ){
					var entry_data = {};
					entry_data['unique_name'] = json_entry[sub_entries][method_entries];
					entry_data['parent_data'] = parent_name;
					entry_data['size'] = 0.2;
					occupied_area_x += Math.floor( (Math.random() * 2) - 1 );
					var occupied_y_entry = occupied_area_y + Math.floor( (Math.random() * 2) - 1 );
					if( occupied_area_x + offset >= windowWidth ){
						occupied_area_x = windowWidth - offset - 10;
					}
					entry_data['coordinates'] = {"x" : occupied_area_x ,  "y": occupied_y_entry };
					data.nodes.push(entry_data);
				}
			}
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
	entry_data['unique_name'] = name;
	entry_data['parent_data'] = name;
	entry_data['coordinates'] = {"x" : occupied_area_x ,  "y": occupied_area_y };
	entry_data['size'] = 1;
	data.nodes.push(entry_data);
	add_more(original[name],name);
}
