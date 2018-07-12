/**
 * Initializes a JND experiment object. 
 * @param	 condition_name {string}		Name of condition (i.e foundational)
 */
function JND(condition_name){

	// ========================================
	// EXPERIMENT CONSTANTS

	this.MIN_CORRELATION = 0.0;
	this.MAX_CORRELATION = 1.0;
	this.MIN_TRIALS = 24;
	this.MAX_TRIALS = 52;
	this.WINDOW_SIZE = 24;
	// this.MIN_TRIALS = 5;
	// this.MAX_TRIALS = 10;
	// this.WINDOW_SIZE = 5;
	this.WINDOW_INTERVAL = 3;
	this.CONVERGENCE_THRESHOLD = 0.75; 
	this.INCORRECT_MULTIPLIER = 3;

	// ========================================
	// SUB-CONDITION VARIABLES

	this.condition_name = condition_name; 
	this.sub_conditions_constants;
	this.current_sub_condition_index;

	this.adjusted_quantity_matrix = {}; 	// The matrix is in this format:
																				// { sub_condition_index : [adjusted_quantity1, adjusted_quantity2 ... ] }

	// ========================================
	// JSPSYCH TRIAL VARIABLES

	this.trial_variables =         
				{type: 'jnd',
				adjusted_correlation: '',
        left_correlation: '',
        right_correlation: '',
        correct: '',
        jnd_value: ''};
}

JND.prototype.constructor = JND;

/**
 * Orders the input data according to balancing type and
 * initializes the JND object's variables.  
 * @param	 balancing_type {string}													 Type of balancing. Currently only latin_square
 *																													 is supported.
 *				 data_set {[{assoc array}, {assoc array}, ... ]}   The data to be ordered. 
 */
JND.prototype.prepare_experiment = function(balancing_type, data_set){

	if (balancing_type == 'latin_square'){
	  var order = initialize_latin_square(data_set.length);

	  var ordered_data_set = [];

	  for (i=0; i < order.length; i++){
	    ordered_data_set[i] = data_set[order[i]];
	    this.adjusted_quantity_matrix[i] = [];
	  }

	  this.sub_conditions_constants = ordered_data_set;
	  this.current_sub_condition_index = 0; 
	  return ordered_data_set;
	}
	else {throw Error(balancing_type + " balancing type is not supported.")};
}

/**
 * Determines whether the current sub condition can end or not.
 * @return {boolean} 						True if sub condition should end.
 */
JND.prototype.end_sub_condition = function(){

	if (this.adjusted_quantity_matrix[this.current_sub_condition_index].length == this.MAX_TRIALS ||
				this.is_converged_in_window()){
		return true;
	}
	else {
		return false;
	}
}

/**
 * Determines whether current subcondition has converged or not.
 * @return {boolean} 						True if converged.
 */
JND.prototype.is_converged_in_window = function(){
	
	var converged = false;
	var num_completed_trials = this.adjusted_quantity_matrix[this.current_sub_condition_index].length;

	// Check if we have completed the minimum number of trials
	// and if the number of completed trials is greater than the window size
	if (num_completed_trials >= this.MIN_TRIALS && num_completed_trials >= this.WINDOW_SIZE) {

		// 2D Matrix of windows of adjusted quantities
		var adjusted_quantity_windows = [];

		// The index of the last trial
		var last_trial = num_completed_trials - 1;

		// Compute the interval size and remainder
		// The remainder is computed in case the window size isn't divisible by the # intervals
		var interval_size = this.WINDOW_SIZE / this.WINDOW_INTERVAL;
		var interval_remainder = this.WINDOW_SIZE % this.WINDOW_INTERVAL;

		// This is the first trial in the window
		// For example:
		// numCompletedTrials = 5
		// windowSize = 3
		// [ 0 1 2 3 4 5 6 7 8 9 ]
		// windowStart would be at index: 5 - 3 = 2
		var window_start = num_completed_trials - this.WINDOW_SIZE;
		console.log("num completed: " + num_completed_trials);
		console.log("window start: " + window_start);

		// Iterate over all of the trials from the start of the window to the last trial
		// and organize them into the 2D adjustedQuantityWindows matrix
		while (window_start < last_trial) {

			// While we have extra elements that don't fit into an interval
			// add one extra to each window interval
			var current_interval_size = interval_remainder > 0 ? interval_size + 1 : interval_size;
			if (interval_remainder > 0) {
				interval_remainder--;
			}

			// Collect the adjusted quantity values from the trials into the double[]
			var adjusted_quantities = [];
			for (i = 0; i < current_interval_size; ++i) {
				var adjusted_quantity = this.adjusted_quantity_matrix[this.current_sub_condition_index][i + window_start];
				adjusted_quantities.push(adjusted_quantity);
				// adjustedQuantities[i] = ((StaircaseTrial) this.trials.get(subConditionIndex).get(i + windowStart))
				// 		.getAdjustedQuantity();
			}

			// Set the window start to the next interval
			window_start += current_interval_size;
			adjusted_quantity_windows.push(adjusted_quantities);
		}

		console.log(adjusted_quantity_windows);

		var variance = [];
		var mean = [];
    for (i = 0; i < adjusted_quantity_windows.length; i++){
    	variance.push(math.var(adjusted_quantity_windows[i]));
    	mean.push(math.mean(adjusted_quantity_windows[i]));
    }

    // Calculate the F value
		// Iterator<double[]> iterator = adjustedQuantityWindows.iterator();
		// double[] variance = new double[adjustedQuantityWindows.size()];
		// double[] mean = new double[adjustedQuantityWindows.size()];

		// int i = 0;
		// while (iterator.hasNext()) {
		// 	double[] d = iterator.next();
		// 	variance[i] = StatUtils.variance(d);
		// 	mean[i] = StatUtils.mean(d);
		// 	i++;
		// }

		var mean_of_variances = math.mean(variance);
		var variance_of_means = math.var(mean);
		var F = variance_of_means/mean_of_variances;
		console.log("F: " + F);
		// Convergence if the F value is < 1 - convergenceThreshold
		// if the F is greater than 0.25, then converge 
		converged = F < (1 - this.CONVERGENCE_THRESHOLD);
	}

	if (converged) {console.log("CONVERGED!!!!")};

	return converged;

}

/**
 * Initializes the adjusted correlation for the first time.
 * @param	 converge_from_above {boolean}		
 *				 base_correlation {double}         
 *				 initial_difference {double}
 * @return adjusted_correlation {double} 					
 */
JND.prototype.initialize_adjusted_statistic = function(converge_from_above, base_correlation, initial_difference){
	var adjusted_correlation;

  if (converge_from_above){
    adjusted_correlation = Math.min(this.MAX_CORRELATION, base_correlation + initial_difference); }
  else{
    adjusted_correlation = Math.max(this.MIN_CORRELATION, base_correlation - initial_difference);
  };

  return adjusted_correlation; 
}

/**
 * Calculates the next adjusted correlation/statistic.
 * @param	 correct {boolean}
 *				 converge_from_above {boolean}		
 *				 adjusted_quantity {double}         
 *				 base_correlation {double}
 *				 initial_difference {double}
 *         max_step_size {double}
 * @return adjusted_correlation {double} 					
 */
JND.prototype.get_next_adjusted_statistic = function(correct, converge_from_above, adjusted_quantity, base_correlation, initial_difference, max_step_size){
	var next_adjusted_statistic;

	if (converge_from_above) {
		if (correct) {
			next_adjusted_statistic = Math.max(initial_difference, adjusted_quantity - max_step_size);
		} else {
			next_adjusted_statistic = Math.min(this.MAX_CORRELATION, adjusted_quantity + max_step_size
											 					* this.INCORRECT_MULTIPLIER);
		}
	} else {
		if (correct) {
			next_adjusted_statistic = Math.min(initial_difference, adjusted_quantity + max_step_size);
		} else {
			next_adjusted_statistic = Math.max(this.MIN_CORRELATION, adjusted_quantity - max_step_size
											 					* this.INCORRECT_MULTIPLIER);
		}
	}

	return next_adjusted_statistic;
}

/**
 * Given a JND trial data, determines whether response is 
 * correct or not.
 * @param	 data {JsPsych.data}
 * @return {boolean} 					
 */
function check_response(data){

	// For debugging purposes:
	if (data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('q')){
		data.correct = -1;
		return -1; 
	}

	if ((data.right_correlation > data.left_correlation) 
        && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('m') ||
        (data.left_correlation > data.right_correlation)
        && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('z')){

    data.correct = true;
		return true;
  }
  else {

    data.correct = false;
    return false;
  }
}