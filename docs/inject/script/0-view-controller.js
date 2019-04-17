window.onload = function() {

	var libs = [
    'https://code.jquery.com/jquery-3.1.1.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js'
  	];

  	var count = 0;

  	var injectLibFromStack = function(){
      if(libs.length > 0){
        
        //grab the next item on the stack
        var nextLib = libs.shift();
        var headTag = document.getElementsByTagName('head')[0];
        
        //create a script tag with this library
        var scriptTag = document.createElement('script');
        scriptTag.src = nextLib;
        
        //when successful, inject the next script
        scriptTag.onload = function(e){
          console.log("---> loaded: " + e.target.src);
          count++;

          // Once all scripts loaded, render:
          if (count === libs.length) {
          	render();
          }

          injectLibFromStack();
        };    
        
        //append the script tag to the <head></head>
        headTag.appendChild(scriptTag);
        console.log("injecting: " + nextLib);
      }
      else return;
  	}
  
	//start script injection
	injectLibFromStack();

	// // Add jQuery
	// var script = document.createElement('script');
	// script.type = 'text/javascript';
	// script.onload = function() {
		
	// 	// Render content once jQuery loads:

	// 	// Use experiments-renderer.js
	// 	if (document.getElementById("experiments")){
	// 		render_experiments();
	// 	} 
	// 	// Use conditions-renderer.js
	// 	else if (document.getElementById("conditions")){
	// 		render_conditions_navigation();
	// 		render_conditions();

	// 	// Use supported-properties-renderer.js
	// 	} else if (document.getElementById("supported-properties")){
	// 		render_experiments_short();
	// 		render_trial_structure();
	// 		render_balancing();
	// 		render_graphing();
	// 	}
	// }
	// script.src = "https://code.jquery.com/jquery-3.1.1.min.js";  

	// document.getElementsByTagName('head')[0].appendChild(script);

}

function render(){

	// Use experiments-renderer.js
	if (document.getElementById("experiments")){
		render_experiments();
	} 
	// Use conditions-renderer.js
	else if (document.getElementById("conditions")){
		render_conditions();

	// Use supported-properties-renderer.js
	} else if (document.getElementById("supported-properties")){
		render_supported_properties();
	}
}

function stringify_array(array){
	let result = "";
	for (let obj of array) {
		result += humanize(obj) + ", ";
	}

	result = result.slice(0, -2);

	return result;
}

function humanize(str) {
  var frags = str.split('_');
  for (i=0; i<frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
}
