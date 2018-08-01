/**
 * Initializes a Stevens experiment object. 
 *
 * @param  condition_name {string}    Name of condition (i.e foundational)
 */
function stevens(condition_name){

  this.MAX_STEP_INTERVAL = 10;

  this.input_count_array;
  this.sub_conditions_constants;
  this.current_sub_condition_index;

  // ========================================
  // PRACTICE EXPERIMENT VARIABLES

  this.practice_conditions_constants;

  // ========================================
  // TEST EXPERIMENT VARIABLES

  this.condition_name = condition_name; 
  this.experiment_conditions_constants;
  this.sub_condition_order;

  // ========================================
  // JSPSYCH TRIAL VARIABLES

  // Variables that are meant to help run experiment (can be deleted before exporting)
  this.trial_variables =         
        {type: 'stevens',
        run_type: '',
        left_correlation: '',
        right_correlation: '',
        input_count: 0,
        trial_num: 0
        };

  // Variables that will be exported into final CSV       
  this.export_variables = 
        {condition: this.condition_name,
         sub_condition: '',           // Chronological ordering of sub_condition [1, 2, 3 ... ]
         balanced_sub_condition: '',  // Index of sub_condition according to balancing order
         high_ref: '',
         estimated_mid: '',
         low_ref: '',
         trials_per_round: '',
         error: '',
         num_points: '',
         mean: '',
         SD: '',
         num_SD: '',
         round_type: ''
        };
}

stevens.prototype.constructor = stevens;

/**
 * Orders the input data according to balancing type and
 * initializes the Stevens object's variables.  
 *
 * @param  balancing_type {string}                           Type of balancing. Currently only latin_square
 *                                                           is supported.
 *         data_set {[{assoc array}, {assoc array}, ... ]}   The data to be ordered. 
 *         practice_set {[{assoc array}, {assoc array}, ... ]} The practice data. 
 */
stevens.prototype.prepare_experiment = function(balancing_type, data_set, practice_set){

  if (balancing_type == 'latin_square'){

    this.sub_condition_order = initialize_latin_square(data_set.length);
    var ordered_data_set = [];

    // Order the data set according to the latin square
    // Initialize adjusted_quantity_matrix size 
    for (i=0; i < this.sub_condition_order.length; i++){
      ordered_data_set[i] = data_set[this.sub_condition_order[i]];
    }

    // Set experiment trials
    this.experiment_conditions_constants = ordered_data_set;

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
      data: function(){
        return Object.assign({},stevens_exp.trial_variables, stevens_exp.export_variables);
      },
      on_start: function(trial){ // NOTE: on_start takes in trial var 

        // Reset the variables to use the experiment if we have just ended
        // the practice trials
        // !!!! TODO: There should be a more elegant way to do this...
        //            JsPsych is likely operating async so difficult
        //            to set boolean outside this object. 
        if (practice_end == true){
          stevens_exp.set_variables_to_experiment();
          practice_end = false;
        }

        // Set the constants to be used:
        var index = stevens_exp.current_sub_condition_index; 
        var constants = stevens_exp.sub_conditions_constants[index];

        // Force reset that input_count and trial_num = 0
        // !!! For some reason, JsPsych is carrying the previous trial's over,
        //     and this sometimes interferes with resets when we change to a
        //     different sub condition 
        trial.data.input_count = 0;
        trial.data.trial_num = 0; 

        // Retrieve data from last trial:
        var last_stevens_trial = stevens_exp.get_last_trial(trial, block_type, index);

        // Set the estimated correlation
        var estimated_correlation = stevens_exp.update_estimated_correlation(trial, constants, last_stevens_trial);

        // Handling saving the data: 
        stevens_exp.handle_data_saving(trial, block_type, constants, estimated_correlation, last_stevens_trial, index);

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
        console.log("[MIDPOINT] Correlation: " + trial.data.estimated_mid);
        console.log("[LEFT] Correlation: " + trial.data.left_correlation);
      }
    };

  return trial; 
}

/**
 * Retrieves the last stevens trial depending on block_type for a
 * given sub condition index. 
 * If this is the first trial of a given block_type, returns null. 
 *
 * @param  trial {object}   
 *         block_type {string}          "test" or "practice"         
 *         index {integer}
 * @return last_stevens_trial {object}           
 */
stevens.prototype.get_last_trial = function(trial, block_type, index){

  // Set trial run_type depending on block type
  // (we need to set trial's run_type so we can do the filter in the
  // next if block)
  if (block_type == "test"){
    trial.data.run_type = "test";
  }
  else{
    trial.data.run_type = "practice";
  }

  // Retrieve previous stevens trial if it exists
  if (block_type == "practice" && jsPsych.data.get().filter({type: "stevens", run_type: "practice", sub_condition: index}).last(1).values()[0]){
    last_stevens_trial = jsPsych.data.get().filter({type: "stevens", run_type: "practice", sub_condition: index}).last(1).values()[0];
  }
  else if (block_type == "test" && jsPsych.data.get().filter({type: "stevens", run_type: "test", sub_condition: index}).last(1).values()[0]){
    last_stevens_trial = jsPsych.data.get().filter({type: "stevens", run_type: "test", sub_condition: index}).last(1).values()[0];
  }
  else{
    last_stevens_trial = null;
  }

  return last_stevens_trial; 
}

/**
 * Handles saving the relevant data on a given trial.
 *
 * @param trial {object}
 *        block_type {string}               "test" or "practice"
 *        constants {assoc array}
 *        estimated_correlation {double}
 *        last_stevens_trial {object}
 *        index {integer}
 */
stevens.prototype.handle_data_saving = function(trial, block_type, constants, estimated_correlation, last_stevens_trial, index){

  // Extract relevant data from constants and save into trial data
  for (var key in trial.data){
    if (constants[key] || key == 'high_ref' || key == 'low_ref' || key == 'estimated_mid'){ //Force for high_ref etc. or else
      trial.data[key] = constants[key];                                                     // js detects 0.0 values as null
    }
  }

  trial.data.estimated_mid = estimated_correlation;
  trial.data.sub_condition = index;
  trial.data.balanced_sub_condition = this.sub_condition_order[index];

  // If trial is still part of same sub-condition, add onto trial num
  // and carry over step size (it is constant throughout sub conditions)
  if (last_stevens_trial){
    trial.data.trial_num = last_stevens_trial.trial_num + 1;
    trial.data.step_size = last_stevens_trial.step_size;
  }
  else{
    trial.data.trial_num = 1;
  }
}

/**
 * Updates the estimated correlation.
 * If  : 
 *    Is the first trial, will initialize the correlation and step size.
 * Else:
 *    If there was a key press in previous trial, will calculate the
 *    the estimated correlation (depending on whether it was an inc or dec).
 *    Else if no key press in previous trial, will set estimated correlation
 *    to the previous trial's. 
 *
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
    trial.data.estimated_mid = estimated_correlation;
    trial.data.step_size = (constants.high_ref - constants.low_ref) / this.MAX_STEP_INTERVAL;
  }

  // If there is input on PREVIOUS trial, change the midpoint + increment trial number
  // (Since we are plotting the new middle graph based on PREVIOUS input, we look
  // at the last_trials's estimated_correlation and step size.)
  else if (last_trial.key_press && (last_trial.key_press == trial.choices[0] || last_trial.key_press == trial.choices[1])){

    switch (last_trial.key_press){

      case trial.choices[0]: // up
        estimated_correlation = Math.min(constants.high_ref, last_trial.estimated_mid + (Math.random() * last_trial.step_size));
        break;

      case trial.choices[1]: // down
        estimated_correlation = Math.max(constants.low_ref, last_trial.estimated_mid - (Math.random() * last_trial.step_size));
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

    estimated_correlation = last_trial.estimated_mid;
  }

  return estimated_correlation;
}

/**
 * Determines whether the current sub condition can end or not.
 *
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
 * When called, will save individual trial data into a CSV.     
 */
stevens.prototype.export_trial_data = function(){

  var trial_data = jsPsych.data.get().filter({type: 'stevens', run_type: 'test'})
                                     .filterCustom(function(x){ //Don't include the exit trials
                                       return x.correct != -1; 
                                     })
                                     .filterCustom(function(x){ //Don't include trials with no user input
                                       return x.rt != null;
                                     })
                                     // Stevens's trial variables
                                     .ignore('type')
                                     .ignore('run_type')
                                     .ignore('left_correlation')
                                     .ignore('right_correlation')
                                     .ignore('estimated_correlation')
                                     .ignore('input_count')
                                     .ignore('trial_num')
                                     // These are variables forced on by jsPsych
                                     .ignore('stimulus')
                                     .ignore('key_press')
                                     .ignore('choices')
                                     .ignore('trial_type')
                                     .ignore('trial_index')
                                     .ignore('time_elapsed')
                                     .ignore('internal_node_id');

  // TODO: js converting key_string to use double quotes, needs to be single to pass into ignore() fxn
  //
  // for (var key in jnd_exp.trial_variables){
  //  var key_string = '${key}';
  //  trial_data.ignore(key);
  // }

  var string = this.condition_name + "_stevens_trial_results.csv";

  trial_data.localSave('csv', string);
}

/**
 * When called, will save aggregated trial data into a CSV.     
 */
stevens.prototype.export_summary_data = function(){
  var csv = 'ROUND_TYPE,NUM_TRIALS,HIGH_REF,ESTIMATED_MIDPOINT,LOW_REF\n';

  var data = [];
  
  // Organize each row of the csv
  for (var i = 0; i<this.sub_conditions_constants.length; i++){
    var row = [];
    var constants = this.sub_conditions_constants[i];
    var condition_data = jsPsych.data.get().filter({type: 'stevens', run_type: 'test', balanced_sub_condition: this.sub_condition_order[i]})
                                           .filterCustom(function(x){ //Don't include the exit trials
                                              return x.correct != -1; 
                                           })
                                           .filterCustom(function(x){ //Don't include trials with no user input
                                              return x.rt != null;
                                           });

    row.push(constants.round_type);
    row.push(constants.trials_per_round);
    row.push(constants.high_ref);
    row.push(condition_data.select('estimated_mid').mean());
    row.push(constants.low_ref);  

    data.push(row);
  }

  // Append each row
  data.forEach(function(row){
    csv += row.join(',');
    csv += "\n";
  });

  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = this.condition_name + "_stevens_summary_results.csv";
  hiddenElement.click();
}
