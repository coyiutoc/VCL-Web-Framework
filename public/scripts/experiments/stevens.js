class Stevens {

  /**
   * Initializes a Stevens experiment object. 
   *
   * @param  range          {string}    Range type (foundational or design)
   * @param  condition_name {string}    Name of condition (i.e distractor_rainbow)
   * @param  graph_type     {string}    Name of graph_type
   */
  constructor(range, condition_name, graph_type) {

    if ((range !== "foundational") && (range !== "design")) {
      throw Error(range + " is not supported.") }
    else{
      this.range = range;
    }  
    
    this.condition_name = condition_name; 

    if ((graph_type !== "scatter") && (graph_type !== "strip")) {
      throw Error(graph_type + " is not supported.")} 
    else { 
      this.graph_type = graph_type;
    };  

    // ========================================
    // EXPERIMENT CONSTANTS

    this.MAX_STEP_INTERVAL = 10;

    // ========================================
    // EXPERIMENT VARIABLES

    this.input_count_array; // Array of length trials_per_round, each index representing num inputs per round 
                            // for a given sub condition
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

  }

  /**
   * Orders the input data according to balancing type and
   * initializes the Stevens object's variables.  
   *
   * @param  balancing_type {string}                           Type of balancing. Currently only latin_square
   *                                                           is supported.
   *         data_set {[{assoc array}, {assoc array}, ... ]}   The data to be ordered. 
   */
  prepare_experiment(balancing_type, data_set) {

    if (balancing_type == 'latin_square'){

      this.sub_condition_order = initialize_latin_square(data_set.length);
      var ordered_data_set = [];

      // Order the data set according to the latin square
      // Initialize adjusted_quantity_matrix size 
      for (let i=0; i < this.sub_condition_order.length; i++){
        ordered_data_set[i] = data_set[this.sub_condition_order[i]];
      }

      // Set experiment trials
      this.experiment_conditions_constants = ordered_data_set;
      
      // Set experiment variables to the practice first
      this.sub_conditions_constants = data_set;
      this.current_sub_condition_index = 0; 
      this.input_count_array = new Array(this.sub_conditions_constants[0].trials_per_round).fill(0);

      console.log(this.sub_conditions_constants);   
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
  set_variables_to_experiment() {
      this.sub_conditions_constants = this.experiment_conditions_constants;
      this.input_count_array = new Array(this.sub_conditions_constants[0].trials_per_round).fill(0);
      this.current_sub_condition_index = 0;
  }

  /**
   * Generates a Stevens object for use in the JsPsych timeline.
   *
   * @param  type {string}                             "test" or "practice"
   * @return trial {object}
   */   
  generate_trial(block_type) {

    if ((block_type !== "test") && (block_type !== "practice")) {throw Error(block_type + " is not supported.")};

    // Initialize a variable for this so it is usable inside on_start
    var stevens_exp = this; 

    var trial = {
        type:'external-html-keyboard-response',
        url: localhost + "/stevens_trial",
        choices:[77, 90, 32, 81], //m = 77 (up), z = 90 (down), 32 = spacebar, 81 = q (exit button for debugging)
        execute_script: true,
        response_ends_trial: true, 
        data: {},
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

          // Retrieve data from last trial:
          var last_stevens_trial = stevens_exp.get_last_trial(trial, block_type, index);

          // Handling saving the data: 
          stevens_exp.handle_data_saving(trial, block_type, constants, estimated_correlation, last_stevens_trial, index);

          // Set the estimated correlation
          var estimated_correlation = stevens_exp.update_estimated_correlation(trial, constants, last_stevens_trial);

          console.log("round refreshes: " + trial.data.round_refreshes);
          console.log("trial/round num: " + trial.data.trial_num);
          console.log("num adjustments: " + trial.data.num_adjustments);
          console.log("input count array: " + stevens_exp.input_count_array);

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

          // Randomize position of the high and low correlated graphs for a given round
          if (trial.data.round_refreshes == 1){
            var result = randomize_position(trial, 
                                           high_coordinates,
                                           low_coordinates, 
                                           constants.high_ref, 
                                           constants.low_ref);
            trial.data.high_ref_is_right = result.base_is_right;
          }

          if (trial.data.high_ref_is_right){
            right_coordinates = high_coordinates;
            left_coordinates = low_coordinates;
          }
          else{
            right_coordinates = low_coordinates;
            left_coordinates = high_coordinates;
          }

          middle_coordinates = estimated_coordinates;  
          distribution_size = constants.num_points; 
          trial_data = trial.data; 

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
  get_last_trial(trial, block_type, index) {

    var last_stevens_trial; 
    trial.data.type = "stevens";
    
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
   * For reference, these are the helper variables created to assist in trial logic (i.e not present in excel)
   * this.trial_variables =         
   *       {type: 'stevens',
   *       run_type: '',
   *       left_correlation: '',
   *       right_correlation: '',
   *       round_refreshes: 0,      // Number of times there is a refresh for a given round 
   *       high_ref_is_right: false     
   *       };
   *
   * These are variables created WITHIN the trial logic that were not present in excel (but need to be
   * outputted to results).         
   * this.export_variables = 
   *       {trial_num: 0,                // Round index trial is currently on (aka trial_num from excel)
   *        sub_condition: '',           // Chronological ordering of sub_condition [1, 2, 3 ... ]
   *        balanced_sub_condition: '',  // Index of sub_condition according to balancing order
   *        estimated_mid: '',
   *        num_adjustments: 0,          // Number of inputs for a given round (aka num_adjustments from excel)
   *        trials_per_round: '',
   *       };
   *
   * @param trial {object}
   *        block_type {string}               "test" or "practice"
   *        constants {assoc array}
   *        estimated_correlation {double}
   *        last_stevens_trial {object}
   *        index {integer}
   */
  handle_data_saving(trial, block_type, constants, estimated_correlation, last_stevens_trial, index) {

    trial.data = Object.assign({}, trial.data, constants);

    trial.data.sub_condition = index;
    trial.data.balanced_sub_condition = this.sub_condition_order[index];

    trial.trial_duration = trial.data.regen_rate;

    // If trial is still part of same sub-condition, carry over constants from
    // the previous trial
    if (last_stevens_trial){

      trial.data.step_size = last_stevens_trial.step_size;
      trial.data.right_correlation = last_stevens_trial.right_correlation;
      trial.data.left_correlation = last_stevens_trial.left_correlation;
      trial.data.high_ref_is_right = last_stevens_trial.high_ref_is_right;

      // If a round has just ended, increment the trial_num and
      // reset the refresh number (only applies for test trials)
      if (round_end == true && trial.data.run_type == "test"){
        trial.data.trial_num = last_stevens_trial.trial_num + 1;
        trial.data.num_adjustments = 0;
        trial.data.round_refreshes = 1;
        round_end = false; //Reset flag
      }
      // Else trial_num and num_adjustments is the same, but round_refresh ++ 
      else{
        trial.data.trial_num = last_stevens_trial.trial_num;
        trial.data.round_refreshes = last_stevens_trial.round_refreshes + 1;
        trial.data.num_adjustments = last_stevens_trial.num_adjustments;
      }
    }
    // Else this is the first refresh of a given trial 
    else{
      trial.data.trial_num = 0;
      trial.data.num_adjustments = 0;
      trial.data.round_refreshes = 1; 
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
  update_estimated_correlation(trial, constants, last_trial) {

    var estimated_correlation;
    var index = this.current_sub_condition_index;
    // If first trial (estimated_correlation is null), so initialize
    // estimated midpoint and set step size:
    if (trial.data.round_refreshes == 1){
      //Initialize the estimated midpoint correlation:
      estimated_correlation = Math.random() < 0.5 ? constants.low_ref : constants.high_ref;
      trial.data.estimated_mid = estimated_correlation;
      trial.data.step_size = (constants.high_ref - constants.low_ref) / this.MAX_STEP_INTERVAL;

      if (trial.data.run_type == "practice"){
        last_trial = jsPsych.data.get().filter({type: "stevens", run_type: "practice"}).last(1).values()[0];
        trial.data.trial_num = last_trial ? (last_trial.trial_num+1) : 0; 
      }
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

      trial.data.num_adjustments = last_trial.num_adjustments + 1;
      this.input_count_array[trial.data.trial_num]++;
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

    // Update the trial's estimated_mid
    trial.data.estimated_mid = estimated_correlation;

    return estimated_correlation;
  }

  /**
   * Determines whether the round can end or not. A round can end ONLY if 
   * there has been at least 1 input from the user on the given round. 
   *
   * @return {boolean}            True if sub condition should end.
   */
  end_round() {

    var last_trial = jsPsych.data.get().last(1).values()[0];

    // If there is no num_adjustment count, we shouldn't end round 
    return !(last_trial.num_adjustments == 0);
  }

  /**
   * Determines whether the current sub condition can end or not.
   * 
   *
   * @return {boolean}            True if sub condition should end.
   */
  end_sub_condition() {
    
    var trials_per_round = this.sub_conditions_constants[0].trials_per_round;
    
    if (this.input_count_array[trials_per_round - 1] == 0){ 
      return false;
    }
    else{
      // Reset array
      this.input_count_array = new Array(this.sub_conditions_constants[0].trials_per_round).fill(0);
      return true;
    }
  }

  /**
   * When called, will save individual trial data into a CSV.     
   */
  export_trial_data() {

    var csv = 'condition,trial_num,sub_condition,balanced_sub_condition,high_ref,estimated_mid,low_ref,num_adjustments,trials_per_round,error,average_rt,num_points,mean,SD,num_SD,round_type,step_size,point_color,background_color,text_color,axis_color,point_size,regen_rate\n';
    // Get most recent subcondition - will have the max subcondition value
    var max_sub_condition = jsPsych.data.get().filter({type: 'stevens', run_type: 'test'}).last(1).values()[0].sub_condition;
    var data = [];

    // Iterate through each sub condition
    for (let i = 0; i<=max_sub_condition; i++){
      var condition_data = jsPsych.data.get().filter({type: 'stevens', run_type: 'test', sub_condition: i})
                                             .filterCustom(function(x){ //Don't include trials with no user input
                                                return x.rt != null;
                                             });                                
      var condition_values = condition_data.values()[0];
      var max_trial_num = condition_data.last(1).values()[0].trial_num; //The last trial of this sub-condition
                                                                        //has the last trial num
      // Iterate through each trial of a given sub condition                                                               
      for (let j = 0; j<=max_trial_num; j++){
        //Data for a given trial of a sub condition
        var trial_data = condition_data.filter({trial_num: j});
        //Take the last trial's estimated mid since we want the most recent value
        var last_estimated_mid = trial_data.last(1).values()[0].estimated_mid;
        var last_num_adjustments = trial_data.last(1).values()[0].num_adjustments;
        var average_rt = trial_data.filterCustom(function(x){ return x.key_press != 81 }) //Don't use the exit trial rt
                                   .select('rt')
                                   .mean();
                                              
        var row = [this.condition_name];

        row.push(j+1);
        row.push(condition_values.sub_condition);
        row.push(condition_values.balanced_sub_condition);
        row.push(condition_values.high_ref);
        row.push(last_estimated_mid);
        row.push(condition_values.low_ref);
        row.push(last_num_adjustments);
        row.push(condition_values.trials_per_round);
        row.push(condition_values.error);
        row.push(average_rt);
        row.push(condition_values.num_points);
        row.push(condition_values.mean);
        row.push(condition_values.SD);
        row.push(condition_values.num_SD);
        row.push(condition_values.round_type);
        row.push(condition_values.step_size);
        row.push(condition_values.point_color);
        row.push(condition_values.background_color);
        row.push(condition_values.text_color);
        row.push(condition_values.axis_color);
        row.push(condition_values.point_size);
        row.push(condition_values.regen_rate);

        data.push(row);
      }
    }

    // Append each row
    data.forEach(function(row){
      csv += row.join(',');
      csv += "\n";
    });

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = this.condition_name + "_stevens_trial_results.csv";
    hiddenElement.click();
  }

  /**
   * When called, will save aggregated trial data into a CSV.     
   */
  export_summary_data() {
    var csv = 'ROUND_TYPE,NUM_TRIALS,HIGH_REF,ESTIMATED_MIDPOINT,LOW_REF\n';

    var data = [];
    
    // Organize each row of the csv
    for (let i = 0; i<this.sub_conditions_constants.length; i++){
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

  /**
   * Performs the necessary D3 operations to plot distributions depending on graph type.
   */
  plot_distributions() {

    var left_dataset = prepare_coordinates(left_coordinates, distribution_size);
    var right_dataset = prepare_coordinates(right_coordinates, distribution_size);
    var middle_dataset = prepare_coordinates(middle_coordinates, distribution_size);

    var datasets = [left_dataset, middle_dataset, right_dataset];

    switch(this.graph_type){
      case "scatter":
        this.plot_scatter(datasets);
        break;
      case "strip":
        this.plot_strip(datasets);
        break;
    }
  }

  /**
   * Plots distributions using scatter plots. 
   *
   * @ param  datasets   {array}
   */
  plot_scatter(datasets) {

    var height = window.innerHeight/1.5; 
    var width = height/2;

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

    var count = 0;
    // Create/append the SVG for both graphs: 
    for (var data of datasets){
      
      if (count > 0){
        var chart = d3.select("#graph") // Insert into the div w/ id = "graph"
                    .append("svg") 
                      .attr("width", width + 60) // Width and height of the SVG viewpoint
                      .attr("height", height)   // +40 is for buffer (points going -x)
                      .attr("style", "margin-left: 100px"); // For width in between graphs
      }
      else{
        var chart = d3.select("#graph") // Insert into the div w/ id = "graph"
                    .append("svg") 
                      .attr("width", width + 60) // Width and height of the SVG viewpoint
                      .attr("height", height);   // +40 is for buffer (points going -x)

      }

      // Creating transform SVG elements + append to SVG: 
      var yAxisElements = chart.append("g")
                                 .attr("transform", "translate(50, 10)")
                                 .call(y_axis);

      var xAxisTranslate = height/2 + 10;
      var xAxisElements = chart.append("g")
                                .attr("transform", "translate(50, " + xAxisTranslate  +")")
                                .call(x_axis)

      // Populating data: 
      chart.selectAll("circle") // Technically no circles inside div yet, but will be creating it
            .data(data)
              .enter()
              .append("circle") // Creating the circles for each entry in data set 
              .attr("cx", function (d) { // d is a subarray of the dataset i.e coordinates [5, 20]
                return xscale(d[0]) + 60; // +60 is for buffer (points going -x, even if they are positive)
              })
              .attr("cy", function (d) {
                return yscale(d[1]);
              })
              .attr("r", 2)
              .attr("r", trial_data.point_size).style("fill", trial_data.point_color);

      // Set axis color
      chart.selectAll("path")
           .attr("stroke", trial_data.axis_color);

      // Remove tick labels
      chart.selectAll("text").remove();   

      count++;
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
    var height = window.innerHeight * 0.25;

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
                      .attr("height", height)
                      .attr("style", "display: block");   

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
  