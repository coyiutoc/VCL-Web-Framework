export {randomize_position,
        randomize_radius_position,
        force_greater_right_position}

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

function randomize_radius_position(trial, base_radius, adjusted_radius) {

  var result = {left: 0, right: 0, base_is_right: true};

  if (Math.random() < 0.5){
    result.left = base_radius;
    result.base_is_right = false; 
    trial.data.left_radius = base_radius;

    result.right = adjusted_radius;
    trial.data.right_radius = adjusted_radius;
    }
  else{
    result.left = adjusted_radius;
    trial.data.left_radius = adjusted_radius;

    result.right = base_radius;
    trial.data.right_radius = base_radius;
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
