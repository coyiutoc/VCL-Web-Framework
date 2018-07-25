/**
 * Initializes a Stevens experiment object. 
 * @param  condition_name {string}    Name of condition (i.e foundational)
 */
function stevens(condition_name){

  this.MAX_STEP_INTERVAL = 10;

  // ========================================
  // EXPERIMENT VARIABLES

  this.input_count_array;
  this.sub_conditions_constants;
  this.current_sub_condition_index;

  // ========================================
  // PRACTICE TRIAL VARIABLES

  this.practice_conditions_constants;

  // ========================================
  // TEST TRIAL VARIABLES

  this.condition_name = condition_name; 
  this.experiment_conditions_constants;

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
 * @param  balancing_type {string}                           Type of balancing. Currently only latin_square
 *                                                           is supported.
 *         data_set {[{assoc array}, {assoc array}, ... ]}   The data to be ordered. 
 *         practice_set {[{assoc array}, {assoc array}, ... ]} The practice data. 
 */
stevens.prototype.prepare_experiment = function(balancing_type, data_set, practice_set){

  if (balancing_type == 'latin_square'){
    var order = initialize_latin_square(data_set.length);

    var ordered_data_set = [];

    for (i=0; i < order.length; i++){
      ordered_data_set[i] = data_set[order[i]];
    }

    // Set experiment trials
    this.experiment_conditions_constants = ordered_data_set;
    //this.current_sub_condition_index = 0; 
    //this.input_count_array = new Array(this.sub_conditions_constants.length).fill(0);

    // Set experiment variables to the practice first
    this.sub_conditions_constants = practice_set;
    this.current_sub_condition_index = 0; 
    this.input_count_array = new Array(practice_set.length).fill(0);

    console.log(this.sub_conditions_constants);   
    console.log(this.input_count_array);
  }
  else {throw Error(balancing_type + " balancing type is not supported.")};
}

/**
 * Resets all relevant variables to use that of the experiment.
 * (input_count_array, sub_conditions_constants, and current_sub_condition_index
 * are shared variables between the practice and test trials).
 *
 * This function is called once all the practice trials have run. 
 */
stevens.prototype.set_variables_to_experiment = function(){
    this.sub_conditions_constants = this.experiment_conditions_constants;
    this.input_count_array = new Array(this.experiment_conditions_constants.length).fill(0);
    this.current_sub_condition_index = 0;
}

/**
 * Generates a Stevens object for use in the JsPsych timeline.
 *
 * @param  type {string}                             "test" or "practice"
 * @return trial {object}
 */   
stevens.prototype.generate_trial = function(block_type){

  if ((block_type !== "test") && (block_type !== "practice")) {throw Error(block_type + " is not supported.")};

  // Initialize a variable for this so it is usable inside on_start
  var stevens_exp = this; 

  var trial = {
      type:'external-html-keyboard-response',
      url: localhost + "/stevens_trial",
      choices:[38, 40, 'q'], //38 = up, 40 = down, q is exit button (for debugging)
      execute_script: true,
      response_ends_trial: false,
      trial_duration: 1000, 
      data: stevens_exp.trial_variables,
      on_start: function(trial){ // NOTE: on_start takes in trial var 

        // Reset the variables to use the experiment if we have just ended
        // the practice trials
        // !!!! TODO: There should be a more elegant way to do this...
        //            JsPsych is likely operating async so difficult
        //            to set boolean outside this object. 
        if (practice_end == true){
          stevens_exp.set_variables_to_experiment();
          console.log(stevens_exp);
          practice_end = false;
        }

        // Force reset that input_count and trial_num = 0
        // !!! For some reason, the previous trial's is carrying over...
        trial.data.input_count = 0;
        trial.data.trial_num = 0; 

        // Set the constants to be used:
        var index;
        var constants;

        index = stevens_exp.current_sub_condition_index; 
        constants = stevens_exp.sub_conditions_constants[index];

        console.log(stevens_exp.sub_conditions_constants);

        // Retrieve data from last trial:
        var last_stevens_trial;

        if (jsPsych.data.get().filter({type: "stevens", sub_condition_index: index}).last(1).values()[0]){
          last_stevens_trial = jsPsych.data.get().filter({type: "stevens", sub_condition_index: index}).last(1).values()[0];
        }
        else{
          last_stevens_trial = null;
        }

        // Set the estimated correlation
        var estimated_correlation = stevens_exp.update_estimated_correlation(trial, constants, last_stevens_trial);

        // Handling saving the data: 
        trial.data.estimated_correlation = estimated_correlation;
        trial.data.sub_condition_index = index;

        // If trial is still part of same sub-condition, add onto trial num
        // and carry over step size (it is constant throughout sub conditions)
        if (last_stevens_trial){
          trial.data.trial_num = last_stevens_trial.trial_num + 1;
          trial.data.step_size = last_stevens_trial.step_size;
        }
        else{
          trial.data.trial_num = 1;
        }

        console.log("trial num: " + trial.data.trial_num);

        // Generate distributions
        var high_coordinates = generateDistribution(constants.high_ref, 
                                                    constants.error, 
                                                    constants.num_points, 
                                                    constants.num_SD, 
                                                    constants.mean, 
                                                    constants.SD);

        var low_coordinates = generateDistribution(constants.low_ref, 
                                                   constants.error, 
                                                   constants.num_points, 
                                                   constants.num_SD, 
                                                   constants.mean,
                                                   constants.SD);

        var estimated_coordinates = generateDistribution(estimated_correlation, 
                                                      constants.error, 
                                                      constants.num_points, 
                                                      constants.num_SD, 
                                                      constants.mean, 
                                                      constants.SD);

        // Randomize position of the base and adjusted graphs
        var result = randomize_position(trial, 
                                       high_coordinates,
                                       low_coordinates, 
                                       constants.high_ref, 
                                       constants.low_ref);

        left_coordinates = result.left;
        right_coordinates = result.right; 
        middle_coordinates = estimated_coordinates;  
        distribution_size = constants.num_points; 

        console.log("[RIGHT] Correlation: " + trial.data.right_correlation);
        console.log("[MIDPOINT] Correlation: " + trial.data.estimated_correlation);
        console.log("[LEFT] Correlation: " + trial.data.left_correlation);
      }
    };

  return trial; 
}

/**
 * Determines whether the current sub condition can end or not.
 * @return {boolean}            True if sub condition should end.
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
 *    If there was a key press in previous trial, will calculate the
 *    the estimated correlation (depending on whether it was an inc or dec).
 *    Else if no key press in previous trial, will set estimated correlation
 *    to the previous trial's. 
 * @param  trial {object}   
 *         constants {object}         
 *         last_trial {object}
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
