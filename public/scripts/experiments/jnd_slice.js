class JND_Slice {

  /**
   * Initializes a JND experiment object. 
   *
   * @param  range              {string}    Range type (foundational or design)
   * @param  condition_name     {string}    Name of condition (i.e distractor_rainbow)
   * @param  graph_type         {string}    Name of graph_type
   * @param  pixels_conversion  {string}    No. of pixels per cm
   */
  constructor(range, condition_name, graph_type, pixels_conversion) {

    if (range !== "foundational") {
      throw Error(range + " is not supported.") }
    else{
      this.range = range;
    }  

    if (graph_type !== "pie") {
      throw Error(graph_type + " is not supported.")} 
    else { 
      this.graph_type = graph_type;
    };  

    this.condition_name = condition_name; 
    this.condition_group = condition_name.split('_')[0];

    // ========================================
    // EXPERIMENT CONSTANTS

    this.PIXELS_PER_CM = pixels_conversion;
    this.MIN_RADIUS = 2;
    this.MAX_RADIUS = 6;
    this.MIN_TRIALS = 24;
    this.MAX_TRIALS = 52;
    this.WINDOW_SIZE = 24;
    this.WINDOW_INTERVAL = 3;
    this.CONVERGENCE_THRESHOLD = 0.75; 
    this.INCORRECT_MULTIPLIER = 3;

    // ========================================
    // PRACTICE EXPERIMENT VARIABLES

    this.practice_conditions_constants;
    this.current_practice_condition_index; 

    // ========================================
    // TEST EXPERIMENT VARIABLES

    this.first_trial_of_sub_condition = true;
    this.sub_condition_order;
    this.sub_conditions_constants;
    this.current_sub_condition_index;
    this.adjusted_quantity_matrix = {};   // The matrix is in this format:
                                          // { sub_condition_index : [adjusted_quantity1, adjusted_quantity2 ... ] }
  }

  /**
   * Orders the input data according to balancing type and
   * initializes the JND object's variables.  
   *
   * @param  balancing_type {string}                             Type of balancing. Currently only latin_square
   *                                                             is supported.
   *         data_set {[{assoc array}, {assoc array}, ... ]}     The data to be ordered. 
   *         practice_set {[{assoc array}, {assoc array}, ... ]} The practice data. 
   */ 
  prepare_experiment(balancing_type, data_set) {

    if (balancing_type === 'random'){

      // Balancing on data_set
      this.sub_condition_order = initialize_random_order(data_set.length);
      var ordered_data_set = [];

      // Order the data set according to the latin square
      // Initialize adjusted_quantity_matrix size 
      for (let i=0; i < this.sub_condition_order.length; i++){
        ordered_data_set[i] = data_set[this.sub_condition_order[i]];
        this.adjusted_quantity_matrix[i] = [];
      }

      // Set experiment trials 
      this.sub_conditions_constants = ordered_data_set;
      this.current_sub_condition_index = 0; 
      console.log(ordered_data_set);
      // Set practice trials (note does not need balancing)
      this.practice_conditions_constants = data_set;
      this.current_practice_condition_index = 0;

    }
    else {throw Error(balancing_type + " balancing type is not supported.")};
  }

  /**
   * Generates a JND trial object for use in the JsPsych timeline.
   *
   * @param  type {string}             "test" or "practice"
   * @return trial {object}
   */ 
  generate_trial(block_type) {

    if ((block_type !== "test") && (block_type !== "practice")) {throw Error(block_type + " is not supported.")};

    // Initialize a variable for this so it is usable inside on_start
    var jnd_exp = this; 

    var trial = {
      type:'external-html-keyboard-response',
      url: localhost + "/jnd_trial",
      choices:['z', 'm', 'q'], //q is exit button (for debugging)
      execute_script: true,
      response_ends_trial: true,
      on_start: function(trial){ // NOTE: on_start takes in trial var 

        // Set the constants to be used:
        if (block_type == "test"){ 
          var index = jnd_exp.current_sub_condition_index; 
          var constants = jnd_exp.sub_conditions_constants[index];
        }
        else { 
          var index = jnd_exp.current_practice_condition_index; 
          var constants = jnd_exp.practice_conditions_constants[index];
        }

        // Calculate adjusted radius
        var adjusted_radius = jnd_exp.calculate_adjusted_radius(constants);

        // Handling saving this trial's data: 
        jnd_exp.handle_data_saving(trial, block_type, constants, index, adjusted_radius);

        // Randomize position of the base and adjusted graphs
        var result = randomize_radius_position(trial, constants.base_radius, adjusted_radius);

        // // For testing purposes, can force R graph to have greater correlation
        // var result = force_greater_right_position(trial,
        //                                           base_coordinates,
        //                                           adjusted_coordinates,
        //                                           constants.base_correlation,
        //                                           adjusted_correlation);

        // Set up D3 variables for plotting
        left_radius = result.left;
        right_radius = result.right;
        trial_data = trial.data; 

        console.log("[RIGHT] Radius: " + trial.data.right_radius);
        console.log("[LEFT] Radius: " + trial.data.left_radius);
        
      },
      on_finish: function(data){ // NOTE: on_finish takes in data var 
        jnd_exp.check_response(data);
        console.log("RESPONSE: " + data.correct);
      } 
    };

    return trial; 
  }

  /**
   * Handles saving the relevant data on a given trial.
   *
   * For reference, these are the helper variables created to assist in trial logic (i.e not present in excel)
   * trial_variables =         
   *       {type: 'jnd',
   *       run_type: '',
   *       left_radius: '',
   *       right_radius: '',
   *       };
   *
   * These are variables created WITHIN the trial logic that were not present in excel (but need to be
   * outputted to results).     
   * export_variables = 
   *       {sub_condition: '',           // Chronological ordering of sub_condition [1, 2, 3 ... ]
   *        balanced_sub_condition: '',  // Index of sub_condition according to balancing order
   *        jnd: '',
   *        base_radius: '',
   *        adjusted_radius: '',
   *        correct: '',
   *       };
   *
   * @param trial {object}
   *        block_type {string}           "test" or "practice"
   *        constants {assoc array}
   *        index {integer}
   *        adjusted_correlation {double}
   */
  handle_data_saving(trial, block_type, constants, index, adjusted_radius) {

    // Add all constants from excel
    trial.data = constants;

    // Adding constants that required computation (not from excel)
    trial.data.type = "jnd";
    trial.data.adjusted_radius = adjusted_radius;
    trial.data.jnd = Math.abs(adjusted_radius - constants.base_radius);
    trial.data.sub_condition = index; 
    trial.data.balanced_sub_condition = this.sub_condition_order[index];

    // Block specific saves 
    if (block_type == "test"){
      jnd_exp.adjusted_quantity_matrix[index].push(adjusted_radius);
      trial.data.run_type = "test";
    }
    else{
      trial.data.run_type = "practice";
    }
  }

  /**
   * Determines whether the current sub condition can end or not.
   * 
   * @return {boolean}            True if sub condition should end.
   */
  end_sub_condition() {

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
   *
   * @return {boolean}            True if converged.
   */
  is_converged_in_window() {
    
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
        for (let i = 0; i < current_interval_size; ++i) {
          var adjusted_quantity = this.adjusted_quantity_matrix[this.current_sub_condition_index][i + window_start];
          adjusted_quantities.push(adjusted_quantity);
        }

        // Set the window start to the next interval
        window_start += current_interval_size;
        adjusted_quantity_windows.push(adjusted_quantities);
      }

      console.log(adjusted_quantity_windows);

      var variance = [];
      var mean = [];
      for (let i = 0; i < adjusted_quantity_windows.length; i++){
        variance.push(math.var(adjusted_quantity_windows[i]));
        mean.push(math.mean(adjusted_quantity_windows[i]));
      }

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
   * Calculates the adjusted radius depending on whether this is the
   * first trial of the sub condition or not.
   *
   * @param  constants {assoc array}
   * @return adjusted_radius {double}          
   */
  calculate_adjusted_radius(constants) {

    // For the first trial, we need to initialize the adjusted correlation:
    if (this.first_trial_of_sub_condition){
      var adjusted_radius = this
                                .initialize_adjusted_statistic(constants.converge_from_above,
                                                               constants.base_radius,
                                                               constants.initial_difference);
      // Set flag to false
      this.first_trial_of_sub_condition = false;
    }
    else{
      var last_JND_trial = jsPsych.data.get().filter({type: "jnd"}).last(1).values()[0];

      var adjusted_radius = this
                                 .get_next_adjusted_statistic(last_JND_trial.correct,
                                                              constants.converge_from_above,
                                                              last_JND_trial.adjusted_radius,
                                                              constants.base_radius);
    }
    return adjusted_radius; 
  }

  /**
   * Initializes the adjusted radius for the first time.
   *
   * @param  converge_from_above {boolean}    
   *         base_radius {double}         
   *         initial_difference {double}
   * @return adjusted_radius {double}          
   */
  initialize_adjusted_statistic(converge_from_above, base_radius, initial_difference) {
    var adjusted_radius;

    if (converge_from_above) {
      adjusted_radius = base_radius + initial_difference;
    } else {
      adjusted_radius = base_radius - initial_difference;
    }

    return adjusted_radius; 
  }

  /**
   * Calculates the next adjusted correlation/statistic.
   *
   * @param  correct {boolean}
   *         converge_from_above {boolean}    
   *         adjusted_quantity {double}         
   *         base_correlation {double}
   *         initial_difference {double}
   *
   * @return adjusted_correlation {double}          
   */
  get_next_adjusted_statistic(correct, converge_from_above, adjusted_quantity, base_radius) {
    const CORRECT_STEP_SIZE = 0.002;
    const INCORRECT_STEP_SIZE = 0.006;

    var next_adjusted_statistic;

    var initial_difference = base_radius;

    if (converge_from_above) {
      if (correct) {
        next_adjusted_statistic = adjusted_quantity - CORRECT_STEP_SIZE;
      } else {
        next_adjusted_statistic = adjusted_quantity + INCORRECT_STEP_SIZE;
      }
    } else {
      if (correct) {
        next_adjusted_statistic = adjusted_quantity + CORRECT_STEP_SIZE;
      } else {
        next_adjusted_statistic = adjusted_quantity - INCORRECT_STEP_SIZE;
      }
    }

    return next_adjusted_statistic;
  }

  /**
   * Given a JND trial data, determines whether response is 
   * correct or not.
   *
   * @param  data {JsPsych.data}
   * @return {boolean}          
   */ 
  check_response(data) {

    // For debugging purposes:
    if (data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('q')){
      data.correct = -1;
      return -1; 
    }

    let right_area = 0.25*Math.PI*(data.right_radius * data.right_radius);
    let left_area = 0.25*Math.PI*(data.left_radius * data.left_radius);

    if ((right_area > left_area) 
          && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('m') ||
          (left_area > right_area)
          && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('z')){

      data.correct = true;
      return true;
    }
    // Assuming that if base_correlation = adjusted_correlation, at this point 
    // any user choice is wrong.
    else {
      data.correct = false;
      return false;
    }
  }

  /**
   * When called, will save individual trial data into a CSV.     
   */
  export_trial_data() {

    var trial_data = jsPsych.data.get().filter({type: 'jnd', run_type: 'test'})
                                       .filterCustom(function(x){ //Don't include the exit trials
                                         return x.correct != -1; 
                                       })
                                       // JND's trial variables
                                       .ignore('type')
                                       .ignore('run_type')
                                       .ignore('left_radius')
                                       .ignore('right_radius')
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

    var string = this.condition_name + "_jnd_slice_trial_results.csv";

    trial_data.localSave('csv', string);
  }

  /**
   * When called, will save aggregated trial data into a CSV.     
   */
  export_summary_data() {
    var csv = 'PLOT,BASE,ABOVE,JND,TRIALS\n';

    var data = [];
    
    // Organize each row of the csv
    for (let i = 0; i<this.sub_conditions_constants.length; i++){
      var row = [this.condition_name];
      var constants = this.sub_conditions_constants[i];
      var condition_data = jsPsych.data.get().filter({type: 'jnd', run_type: 'test', balanced_sub_condition: this.sub_condition_order[i]})
                                             .filterCustom(function(x){ //Don't include the exit trials
                                                return x.correct != -1; 
                                             })

      row.push(constants.base_radius);
      row.push(constants.converge_from_above);
      row.push(condition_data.select('jnd').mean());
      row.push(condition_data.count());

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
    hiddenElement.download = this.condition_name + "_jnd_slice_summary_results.csv";
    hiddenElement.click();
  }


  /**
   * Performs the necessary D3 operations to plot the slice distributions.
   */
  plot_distributions() {

    var radii = [left_radius * this.PIXELS_PER_CM, right_radius * this.PIXELS_PER_CM];

    console.log(this.PIXELS_PER_CM);

    // To make it appear as ONE HORIZONTAL LINE, replace this with
    // var data = [0, 0, 50, 50];
    var data = [25, 25, 25, 25];

    var height = window.innerHeight/1.5; 
    var width = window.innerWidth/3;

    let count = 0;

    for (let radius of radii) {

      var chart = d3.select("#graph") // Insert into the div w/ id = "graph"
                    .append("svg") 
                      .attr("width", width) // Width and height of the SVG viewpoint
                      .attr("height", height);   // +40 is for buffer (points going -x)
            
      if (count === 0){

        // Move 1 CM UP
        var g = chart.append("g")
                     .attr("transform", "translate(" + width/3 + "," + (height/1.5 - this.PIXELS_PER_CM) + ")");

      } else {

        // Move 2 CM UP
         var g = chart.append("g")
                     .attr("transform", "translate(" + width/3 + "," + (height/1.5 - 2*this.PIXELS_PER_CM) + ")");
      }

      // Generate the pie
      var pie = d3.pie();

      // Generate the arcs
      var arc = d3.arc()
                  .innerRadius(0)
                  .outerRadius(radius);

      //Generate groups
      var arcs = g.selectAll("arc")
                  .data(pie(data))
                  .enter()
                  .append("g")
                  .attr("class", "arc")

      //Draw arc paths
      arcs.append("path")
          .attr("fill", function(d, i) {
              if (i === 0) {
                  return trial_data.fill_color;
              } else {
                  return "#ffffff";
              }    
          })
          .attr("stroke", function(d, i) {
            if (i === 0) {
              return trial_data.outline_color;
            }
          })
          .attr("stroke-width", function(d, i) {
            if (i === 0) {
              return 2;
            }
          })
          .attr("d", arc);

        count++;
            
      }

      document.body.style.backgroundColor = trial_data.background_color;
  }

}