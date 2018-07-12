/**
 * Initializes a Stevens experiment object. 
 * @param	 condition_name {string}		Name of condition (i.e foundational)
 */
function stevens(condition_name){

	this.MAX_STEP_INTERVAL = 10;

	// ========================================
	// SUB-CONDITION VARIABLES

	this.condition_name = condition_name; 
	this.sub_conditions_constants;
	this.current_sub_condition_index;
	this.input_count_array; 

	// ========================================
	// JSPSYCH TRIAL VARIABLES

	// Define the jsPsych data variables to be used
	// per Stevens trial. 
	this.trial_variables =         
				{type: 'stevens',
        left_correlation: '',
        right_correlation: '',
        estimated_correlation: '',
        sub_condition_index: '',
        step_size: '',
        input_count: 0,
        trial_num: 0
        };
}

stevens.prototype.constructor = stevens;

/**
 * Orders the input data according to balancing type and
 * initializes the Stevens object's variables.  
 * @param	 balancing_type {string}													 Type of balancing. Currently only latin_square
 *																													 is supported.
 *				 data_set {[{assoc array}, {assoc array}, ... ]}   The data to be ordered. 
 */
stevens.prototype.prepare_experiment = function(balancing_type, data_set){

	if (balancing_type == 'latin_square'){
    var order = initialize_latin_square(data_set.length);

    var ordered_data_set = [];

    for (i=0; i < order.length; i++){
      ordered_data_set[i] = data_set[order[i]];
    }

	  this.sub_conditions_constants = ordered_data_set;
    console.log(this.sub_conditions_constants);
	  this.current_sub_condition_index = 0; 
	  this.input_count_array = new Array(this.sub_conditions_constants.length).fill(0);
	 
	 	console.log(this.input_count_array);
	}
	else {throw Error(balancing_type + " balancing type is not supported.")};
}

/**
 * Determines whether the current sub condition can end or not.
 * @return {boolean} 						True if sub condition should end.
 */
stevens.prototype.end_sub_condition = function(){

	var index = this.current_sub_condition_index;
	console.log(this.input_count_array);
	if (this.input_count_array[index] == this.sub_conditions_constants[index].trials_per_round){
		return true;
	}
	else {
		return false;
	}
}

/**
 * Updates the estimated correlation.
 * If is the first trial, will initialize the correlation and step size.
 * Else:
 *		If there was a key press in previous trial, will calculate the
 *    the estimated correlation (depending on whether it was an inc or dec).
 *    Else if no key press in previous trial, will set estimated correlation
 *    to the previous trial's. 
 * @param	 trial {object}		
 *				 constants {object}         
 *				 last_trial {object}
 * @return estimated_correlation {double} 					
 */
stevens.prototype.update_estimated_correlation = function(trial, constants, last_trial){

	var estimated_correlation;
	var index = this.current_sub_condition_index;
	
	// If first trial (estimated_correlation is null), so initialize
  // estimated midpoint and set step size:
  if (trial.data.trial_num == 0 && !last_trial){
    //Initialize the estimated midpoint correlation:
    estimated_correlation = Math.random() < 0.5 ? constants.low_ref : constants.high_ref;
    trial.data.estimated_midpoint = estimated_correlation;
    trial.data.step_size = (constants.high_ref - constants.low_ref) / this.MAX_STEP_INTERVAL;
  }

  // If there is input on PREVIOUS trial, change the midpoint + increment trial number
  // (Since we are plotting the new middle graph based on PREVIOUS input, we look
  // at the last_trials's estimated_correlation and step size.)
  else if (last_trial.key_press && (last_trial.key_press == trial.choices[0] || last_trial.key_press == trial.choices[1])){

    switch (last_trial.key_press){

      case trial.choices[0]: // up
        estimated_correlation = Math.min(constants.high_ref, last_trial.estimated_correlation + (Math.random() * last_trial.step_size));
        break;

      case trial.choices[1]: // down
        estimated_correlation = Math.max(constants.low_ref, last_trial.estimated_correlation - (Math.random() * last_trial.step_size));
        break;
    }

    trial.data.input_count = last_trial.input_count + 1;
    this.input_count_array[index]++;
    console.log("input count array: " + this.input_count_array);
  }

  // Else use the previous trial's midpoint
  else{

  	// QUESTION: If there is user input, on the next viz, the graph will display 
  	// that estimated correlation. However, AFTER that, we are changing the 
  	// estimated correlation??

  	// Based on StevensTrial.java (line 75), the estimated midpoint gets updated this way:
    // var prev_constants = this.sub_conditions_constants[current_sub_condition_index-1];
    // if (last_trial.estimated_correlation == prev_constants.high_ref){
    //   estimated_midpoint = constants.low_ref;
    // }
    // else{
    //   estimated_midpoint = constants.high_ref;
    // }

    estimated_correlation = last_trial.estimated_correlation;
  }

  return estimated_correlation;
}
