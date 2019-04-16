window.onload = function() {

	// Add jQuery
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.onload = function() {
		
		// Render content once jQuery loads:
		if (document.getElementById("experiments")){
			render_experiments();
		} 
		else if (document.getElementById("conditions")){
			render_conditions_navigation();
			render_conditions();
		}
	}
	script.src = "https://code.jquery.com/jquery-3.1.1.min.js";  

	document.getElementsByTagName('head')[0].appendChild(script);

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
