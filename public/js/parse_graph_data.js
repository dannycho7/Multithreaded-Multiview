data = {"nodes":[]};
//this variable will determine x and y coordinates
var numClassTotal = Object.keys(original).length;
var windowHeight = document.body.clientHeight;
var windowWidth = document.body.clientWidth;
var occupied_area_x = 0;
var occupied_area_y = 0;
//loop through all unrelated classes
for( var name in original){
	var entry_data = {};
	entry_data['class_name'] = name;
	entry_data['coordinates'] = {"x" : Math.floor( Math.random()*1100 ), "y": Math.floor( Math.random()*500 )};
	entry_data['size'] = 1;
	data.nodes.push(entry_data);
}

