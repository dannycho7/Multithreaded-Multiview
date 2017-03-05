function render_circles(){
	var container = document.getElementById("node-container");
	for (var node_entry in data.nodes ){
		var json_data = data.nodes[node_entry];
		var node = document.createElement('div');
		node.id = json_data.class_name;
		node.title = "Class name: " + node.id;
		node.className = "circle";
		node.style.left = parseInt(json_data.coordinates.x)  + Math.floor(Math.random()*20) + 'px';
		node.style.top = parseInt(json_data.coordinates.y)  + Math.floor(Math.random()*20) + 'px';	
		node.style.height = 15 * parseFloat(json_data.size) + 'px';
		node.style.width = 15 * parseFloat(json_data.size) + 'px';	
		container.appendChild(node);
	}
}
function getOffset( el ) {
    var rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
    };
}

function connect(div1, div2, color, thickness) { // draw a line connecting elements
    var off1 = getOffset(div1);
    var off2 = getOffset(div2);
    // bottom right
    var x1 = off1.left + off1.width/2;
    var y1 = off1.top + off1.height/2;
    // top right
    var x2 = off2.left + off2.width/2;
    var y2 = off2.top + off2.height/2;
    // distance
    var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
    // center
    var cx = ((x1 + x2) / 2) - (length / 2);
    var cy = ((y1 + y2) / 2) - (thickness / 2);
    // angle
    var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
    // make hr
    var htmlLine = "<div style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
    //
    // alert(htmlLine);
    document.body.innerHTML += htmlLine;
}

function load_nodes(){
	render_circles();
	var circles = document.getElementsByClassName('circle');
	for ( var i = 0 ; i < circles.length/3 ; i ++){
		var random1 = circles[Math.floor(Math.random()*circles.length)];
		var random2 = circles[Math.floor(Math.random()*circles.length)];
		connect(random1,random2,"rgba(255,255,255,0.4)",2);
	}
}