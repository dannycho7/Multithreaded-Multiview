function lightUp(){
	var text = document.getElementById('input').value;
	if(document.getElementById(text)){
		document.getElementById(text).style.backgroundColor="#00d168";
	}
}

//creates a circle utilizing JSON format data passed in as a parameter
//JSON data should include data entries: 
// id, parent_data, unique_name, size, coordinates : { x , y }
function create_circle(json_data){
	var container = document.getElementById("node-container");
	var node = document.createElement('div');
	node.id = json_data.unique_name; //The name of the class or method name
	node.title = "Name: " + node.id;
	node.className = "circle";
	node.className += " " + json_data.parent_data;
	node.className += " " + json_data.unique_name; //This is added again into classes so we can parse correctly
	node.style.left = parseInt(json_data.coordinates.x)  + Math.floor(Math.random()*50) + 'px';
	node.style.top = parseInt(json_data.coordinates.y)  + Math.floor(Math.random()*80) + 'px';	
	node.style.height = 10 * parseFloat(json_data.size) + 'px';
	node.style.width = 10 * parseFloat(json_data.size) + 'px';	
	container.appendChild(node);
	return node;
}

function render_circles(data_json){
	for (var node_entry in data_json.nodes ){
		create_circle(data.nodes[node_entry]);
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

//draws a line to connect the two circles
function connect(div1, div2, color, thickness) { 
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
    document.body.innerHTML += htmlLine;
    console.log(htmlLine);
}

function findMethod(methodOwner, methodName){
	var method_arr = document.getElementsByClassName(methodName);
	var method;
	if (method_arr.length > 0 ){
		//loop through and find the correct method based on the owner of the method
		for ( var x in method_arr) {
			if ( method_arr[x].classList.contains(methodOwner) ){
				method = method_arr[x];
				break;
			}
		}
	}
	
	if (method == undefined || method == null) {
		//create a new node for the method with the correct ownership
		//compute the x and y coordinates based off of the parent
		var method_x = document.getElementById(methodOwner).style.left + (Math.random() * 4);
		var method_y = document.getElementById(methodOwner).style.top + (Math.random() * 4);
		var json_data = {
			"unique_name" : methodName,
			"parent_data": methodOwner,
			"size": 0.2,
			"coordinates":{
				"x": method_x,
				"y": method_y
			}
		}
		method = create_circle(json_data);
	}
	return method;
}

function draw_connections(timesplice){
	for (var i in timesplice){
		var method1 = findMethod(timesplice[i][0][0],timesplice[i][0][1]);
		var method2 = findMethod(timesplice[i][1][0],timesplice[i][1][1]);
		var color = "rgba(255,255,255,0.4)";
		if(timesplice[i].length == 3 ){
			color = "#cb3232"; //red
		}
		connect(method1,method2,color,1);
	}
}

var asyncLoop = function(o){
    var i=-1;
 
    var loop = function(){
        i++;
        if(i==o.length){o.callback(); return;}
        o.functionToLoop(loop, i);
    }
    loop();//init
}
 
 
function UpdateTwitchStream(dataStream){
  asyncLoop({
      length : dataStream.length,
      functionToLoop : function(loop, i){
          setTimeout(function(){
                var node = document.createElement("li");
                var textnode = document.createTextNode(dataStream[i]);
                node.appendChild(textnode);
                document.getElementById("chatList").appendChild(node);
                if (document.getElementById('chatList').childElementCount > 10){            
                  document.getElementById('chatList').removeChild(document.getElementById('chatList').getElementsByTagName('li')[0]);
                }
              loop();
          },1000);
      },
      callback : function(){
      }    
  });
 }
 

function initial_load(){
	render_circles(data);
}

function load_nodes(data){
	data = JSON.parse(data);
	if (data['graph']){
		draw_connections(data['graph']);
	}
 	if (data['chat']){
		UpdateTwitchStream(data['chat']);
	}
}