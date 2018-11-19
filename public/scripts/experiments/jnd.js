class JND {

  /**
   * Initializes a JND experiment object. 
   *
   * @param  range          {string}    Range type (foundational or design)
   * @param  condition_name {string}    Name of condition (i.e distractor_rainbow)
   * @param  graph_type     {string}    Name of graph_type
   */
  constructor(range, condition_name, graph_type) {

    if ((range !== "foundational") && (range !== "design") && (range !== "design_multi")) {
      throw Error(range + " is not supported.") }
    else{
      this.range = range;
    }  

    if ((graph_type !== "scatter") && (graph_type !== "strip")) {
      throw Error(graph_type + " is not supported.")} 
    else { 
      this.graph_type = graph_type;
    };  

    this.condition_name = condition_name; 
    this.condition_group = condition_name.split('_')[0];

    // ========================================
    // EXPERIMENT CONSTANTS

    this.MIN_CORRELATION = 0.0;
    this.MAX_CORRELATION = 1.0;
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

    if (balancing_type == 'latin_square'){

      // Balancing on data_set
      this.sub_condition_order = initialize_latin_square(data_set.length);
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

        // Calculate adjusted correlation
        var adjusted_correlation = jnd_exp.calculate_adjusted_correlation(constants);

        // Handling saving this trial's data: 
        jnd_exp.handle_data_saving(trial, block_type, constants, index, adjusted_correlation);

        // Generate distributions
        var base_coordinates = generateDistribution(constants.base_correlation, 
                                                    constants.error, 
                                                    constants.num_points, 
                                                    constants.num_SD, 
                                                    constants.mean, 
                                                    constants.SD);

        var adjusted_coordinates = generateDistribution(adjusted_correlation, 
                                                        constants.error, 
                                                        constants.num_points, 
                                                        constants.num_SD, 
                                                        constants.mean,
                                                        constants.SD);

        if (jnd_exp.condition_group === "distractor"){
          var left_dist_coordinates = generateDistribution(constants.dist_base,
                                                           constants.dist_error,
                                                           constants.dist_num_points,
                                                           constants.num_SD,
                                                           constants.mean,
                                                           constants.SD);

          var right_dist_coordinates = generateDistribution(constants.dist_base,
                                                           constants.dist_error,
                                                           constants.dist_num_points,
                                                           constants.num_SD,
                                                           constants.mean,
                                                           constants.SD);
          distractor_coordinates = [left_dist_coordinates, right_dist_coordinates];
        }

        // Randomize position of the base and adjusted graphs
        var result = randomize_position(trial, 
                                       base_coordinates,
                                       adjusted_coordinates, 
                                       constants.base_correlation, 
                                       adjusted_correlation);
        // // For testing purposes, can force R graph to have greater correlation
        // var result = force_greater_right_position(trial,
        //                                           base_coordinates,
        //                                           adjusted_coordinates,
        //                                           constants.base_correlation,
        //                                           adjusted_correlation);

        // Set up D3 variables for plotting
        left_coordinates = result.left;
        right_coordinates = result.right;
        distribution_size = constants.num_points;   
        trial_data = trial.data; 

        console.log("[RIGHT] Correlation: " + trial.data.right_correlation);
        console.log("[LEFT] Correlation: " + trial.data.left_correlation);
        
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
   *       left_correlation: '',
   *       right_correlation: '',
   *       };
   *
   * These are variables created WITHIN the trial logic that were not present in excel (but need to be
   * outputted to results).     
   * export_variables = 
   *       {sub_condition: '',           // Chronological ordering of sub_condition [1, 2, 3 ... ]
   *        balanced_sub_condition: '',  // Index of sub_condition according to balancing order
   *        jnd: '',
   *        base_correlation: '',
   *        adjusted_correlation: '',
   *        correct: '',
   *       };
   *
   * @param trial {object}
   *        block_type {string}           "test" or "practice"
   *        constants {assoc array}
   *        index {integer}
   *        adjusted_correlation {double}
   */
  handle_data_saving(trial, block_type, constants, index, adjusted_correlation) {

    // Add all constants from excel
    trial.data = constants;

    // Adding constants that required computation (not from excel)
    trial.data.type = "jnd";
    trial.data.adjusted_correlation = adjusted_correlation;
    trial.data.jnd = Math.abs(adjusted_correlation - constants.base_correlation);
    trial.data.sub_condition = index; 
    trial.data.balanced_sub_condition = this.sub_condition_order[index];

    // Block specific saves 
    if (block_type == "test"){
      jnd_exp.adjusted_quantity_matrix[index].push(adjusted_correlation);
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
        for (i = 0; i < current_interval_size; ++i) {
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
      for (i = 0; i < adjusted_quantity_windows.length; i++){
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
   * Calculates the adjusted correlation depending on whether this is the
   * first trial of the sub condition or not.
   *
   * @param  constants {assoc array}
   * @return adjusted_correlation {double}          
   */
  calculate_adjusted_correlation(constants) {

    // For the first trial, we need to initialize the adjusted correlation:
    if (this.first_trial_of_sub_condition){
      var adjusted_correlation = this
                                .initialize_adjusted_statistic(constants.converge_from_above,
                                                               constants.base_correlation,
                                                               constants.initial_difference);
      // Set flag to false
      this.first_trial_of_sub_condition = false;
    }
    else{
      var last_JND_trial = jsPsych.data.get().filter({type: "jnd"}).last(1).values()[0];

      var adjusted_correlation = this
                                 .get_next_adjusted_statistic(last_JND_trial.correct,
                                                              constants.converge_from_above,
                                                              last_JND_trial.adjusted_correlation,
                                                              constants.base_correlation,
                                                              constants.max_step_size);
    }
    return adjusted_correlation; 
  }

  /**
   * Initializes the adjusted correlation for the first time.
   *
   * @param  converge_from_above {boolean}    
   *         base_correlation {double}         
   *         initial_difference {double}
   * @return adjusted_correlation {double}          
   */
  initialize_adjusted_statistic(converge_from_above, base_correlation, initial_difference) {
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
   *
   * @param  correct {boolean}
   *         converge_from_above {boolean}    
   *         adjusted_quantity {double}         
   *         base_correlation {double}
   *         initial_difference {double}
   *         max_step_size {double}
   * @return adjusted_correlation {double}          
   */
  get_next_adjusted_statistic(correct, converge_from_above, adjusted_quantity, base_correlation, max_step_size) {
    var next_adjusted_statistic;

    var initial_difference = base_correlation;

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

    if ((data.right_correlation > data.left_correlation) 
          && data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('m') ||
          (data.left_correlation > data.right_correlation)
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
                                       .ignore('left_correlation')
                                       .ignore('right_correlation')
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

    var string = this.condition_name + "_jnd_trial_results.csv";

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

      row.push(constants.base_correlation);
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
    hiddenElement.download = this.condition_name + "_jnd_summary_results.csv";
    hiddenElement.click();
  }


  /**
   * Performs the necessary D3 operations to plot distributions depending on graph type.
   */
  plot_distributions() {

    var left_dataset = prepare_coordinates(left_coordinates, distribution_size);
    var right_dataset = prepare_coordinates(right_coordinates, distribution_size);

    var datasets = [left_dataset, right_dataset];
    var distractors = [];

    if (this.condition_group === "distractor"){
      left_dataset = prepare_coordinates(distractor_coordinates[0], distribution_size);
      right_dataset = prepare_coordinates(distractor_coordinates[1], distribution_size);

      distractors = [left_dataset, right_dataset];
    }

    switch(this.graph_type){
      case "scatter":
        this.plot_scatter(datasets, distractors);
        break;
      case "strip":
        this.plot_strip(datasets);
        break;
    }
  }

  /**
   * D3 code for appending data into the graph. 
   */
  plot_scatter_data(chart, xscale, yscale, data, point_size, point_color) {

    chart.selectAll("circle_data")
               .data(data)
                .enter()
                .append("circle") // Creating the circles for each entry in data set 
                .attr("cx", function (d) { // d is a subarray of the dataset i.e coordinates [5, 20]
                  return xscale(d[0]) + 60; // +60 is for buffer (points going -x, even if they are positive)
                })
                .attr("cy", function (d) {
                  return yscale(d[1]);
                })
                .attr("r", point_size).style("fill", point_color);
  }

  /**
   * Plots distributions using scatter plots. 
   *
   * @ param  datasets    {array}     Dataset of data
   *          distractors {array}     Dataset of distractors, if any
   */
  plot_scatter(datasets, distractors) {

    var height = window.innerHeight/1.5; 
    var width = height/2;

    var buffer = d3.select("#graph") // Insert into the div w/ id = "graph"
                   .append("svg") 
                      .attr("width", height) 
                      .attr("height", width)
                      .style("display", "block");

    // Create scales:
    // ** D3 creates a function that takes in input between [0, 100] and 
    //    outputs between [0, width].
    //    Basically, domain = input, range = ouput. 
    var xscale = d3.scaleLinear()
                   .domain([0, multiplier]) 
                   .range([0, width]);

    var yscale = d3.scaleLinear()
                   .domain([multiplier * -1, 0]) // !!! NOTE: this is the hack b/c we flipped the y-values 
                                                 //     to be negative --> graph is now positive correlation
                                                 //     but on 4th quadrant --> force domain to be from 
                                                 //     [-1, 0] to move it to 1st quadrant 
                   .range([height/2, 0]);

    // Create axes: 
    var x_axis = d3.axisBottom()
                   .scale(xscale)
                   .tickSize([0]);

    var y_axis = d3.axisLeft()
                   .scale(yscale)
                   .tickSize([0]);

    // Create/append the SVG for both graphs: 
    for (let i in datasets){

      var chart = d3.select("#graph") // Insert into the div w/ id = "graph"
                    .append("svg") 
                      .attr("width", width + 60) // Width and height of the SVG viewpoint
                      .attr("height", height)   // +40 is for buffer (points going -x)
                      .attr("style", "margin-right: " + width/2);

      // Creating transform SVG elements + append to SVG: 
      var yAxisElements = chart.append("g")
                               .attr("transform", "translate(50, 10)")
                               //.attr("transform", "translate(50, " + height/2 + ")")
                               .call(y_axis);

      var xAxisTranslate = height/2 + 10;
      //var xAxisTranslate = height - 1;
      var xAxisElements = chart.append("g")
                                .attr("transform", "translate(50, " + xAxisTranslate  +")")
                                .call(x_axis)
           
      // TODO: Different handling for distractor - needs to be abstracted out somehow in future     
      if (this.condition_group === "distractor"){ 
           
        let dataset = datasets[i];
        let distractor = distractors[i];

        // Alternate plotting of distractor and main dataset points - want equal chance of one
        // getting occluded over the other
        for (let j in dataset) {

          let point = dataset[j];
          let dist_point = distractor[j];

          // Distractor point
          this.plot_scatter_data(chart, xscale, yscale, [point], trial_data.point_size, trial_data.point_color);  

          // Target point    
          this.plot_scatter_data(chart, xscale, yscale, [dist_point], trial_data.dist_point_size, trial_data.dist_color);

        }
      } else {
          this.plot_scatter_data(chart, xscale, yscale, datasets[i], trial_data.point_size, trial_data.point_color);        
      }     

      // Set axis color
      chart.selectAll("path")
           .attr("stroke", trial_data.axis_color);

      // Remove tick labels
      chart.selectAll("text").remove();     

    }

    // Set background color
    document.body.style.backgroundColor = trial_data.background_color;
  }

  /**
   * Plots distributions using strip plots. 
   *
   * @ param  datasets   {array}
   */
  plot_strip(datasets) {

    var width = window.innerWidth * 0.7;
    var height = window.innerHeight * 0.5;

    var xscale = d3.scaleLinear()
                   .domain([0, multiplier]) 
                   .range([0, width]);

    var yscale = d3.scaleLinear()
                   .domain([multiplier * -1, 0])
                   .range([height/2, 0]);

    // Create axes: 
    var x_axis = d3.axisBottom()
                   .scale(xscale)
                   .tickSize([0]);

    var y_axis = d3.axisLeft()
                   .scale(yscale)
                   .tickSize([0]);

    // Create/append the SVG for both graphs: 
    for (var data of datasets){
      
      var chart = d3.select("#graph") // Insert into the div w/ id = "graph"
                    .append("svg") 
                      .attr("width", width) 
                      .attr("height", height);   

      var xAxisTranslate = height/2;
      var xAxisElements = chart.append("g")
                                .attr("transform", "translate(50, " + xAxisTranslate  +")")
                                .call(x_axis)

      // Populating data: 
      chart.selectAll("strip") // Technically no circles inside div yet, but will be creating it
            .data(data)
              .enter()
              .append("rect") // Creating the circles for each entry in data set 
              .attr("x", function (d) {
                return xscale(d[0]);
              })
              .attr("transform", "translate(50, " + height/4 + ")")
              .style("width", 2)
              .style("height", height/2);

      // Set axis color
      chart.selectAll("path")
           .attr("stroke", trial_data.axis_color);

      // Remove tick labels
      chart.selectAll("text").remove();     

    }

    // Set background color
    document.body.style.backgroundColor = trial_data.background_color;
  }

}