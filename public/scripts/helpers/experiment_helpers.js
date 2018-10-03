/**
* Converts the coordinates into this format for d3:
* [ [x1, y1], [x2, y2] ... [xn, yn] ]
* And samples the distribution for the specified num_points.
*
* @param coordinates { {x_values: [], y_values: []} }
*        num_points {integer}
* @return output_coordinates { [x1, y1], [x2, y2] ... }
*/
function prepare_coordinates(coordinates, num_points){

  var array = [];
  var reorganized_coordinates = [];

  for (i = 0; i < coordinates.x_values.length; i++){
    array.push(coordinates.x_values[i]);
    array.push(coordinates.y_values[i]);

    reorganized_coordinates.push(array);
    array = [];
  }
  
  var output_coordinates = sample_coordinates(reorganized_coordinates, num_points);

  return output_coordinates;
}

/**
* Randomly picks x number of points from the distribution
* where x = num_points.
*
* @param coordinates { [x1, y1], [x2, y2] ... }
*        num_points {integer}
* @return output_coordinates with size num_points { [x1, y1], [x2, y2] ... }
*/
function sample_coordinates(coordinates, num_points){
  var output_coordinates = [];

  for (coordinates, i = num_points; i--; ) {
    var random_coordinate = coordinates.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    output_coordinates.push(random_coordinate);
  }

  return output_coordinates;
}

/** 
 * Randomizes the position of the base and adjusted coordinates
 * being displayed on the left or right graphs, and returns
 * the coordinates for the graphs.
 * @param  trial {object}
 *         base_coordinates { {x_values: [], y_values: []} }  
 *         adjusted_coordinates { {x_values: [], y_values: []} }        
 *         base_correlation {double}
 *         adjusted_correlation {double}
 * @return result { {left: [coordinates], right: [coordinates]} }          
 */
function randomize_position(trial, base_coordinates, adjusted_coordinates, base_correlation, adjusted_correlation){

  var result = {left: [], right: [], base_is_right: true};

  if (Math.random() < 0.5){
    result.left = base_coordinates;
    result.base_is_right = false; 
    trial.data.left_correlation = base_correlation;

    result.right = adjusted_coordinates;
    trial.data.right_correlation = adjusted_correlation;
    }
  else{
    result.left = adjusted_coordinates;
    trial.data.left_correlation = adjusted_correlation;

    result.right = base_coordinates;
    trial.data.right_correlation = base_correlation;
  }

  return result;
}

/** 
 * Forces the right graph to always have the greater correlation.
 * Used for testing purposes.
 *
 * @param  trial {object}
 *         base_coordinates { {x_values: [], y_values: []} }  
 *         adjusted_coordinates { {x_values: [], y_values: []} }        
 *         base_correlation {double}
 *         adjusted_correlation {double}
 * @return result { {left: [coordinates], right: [coordinates]} }          
 */
function force_greater_right_position(trial, base_coordinates, adjusted_coordinates, base_correlation, adjusted_correlation){
  var result = {left: [], right: []};

  if (base_correlation > adjusted_correlation){
    result.right = base_coordinates;
    trial.data.right_correlation = base_correlation;

    result.left = adjusted_coordinates;
    trial.data.left_correlation = adjusted_correlation;
  }
  else{
    result.right = adjusted_coordinates;
    trial.data.right_correlation = adjusted_correlation;

    result.left = base_coordinates;
    trial.data.left_correlation = base_correlation;
  }

  return result;
}

export {
  prepare_coordinates,
  sample_coordinates,
  force_greater_right_position,
  randomize_position
}