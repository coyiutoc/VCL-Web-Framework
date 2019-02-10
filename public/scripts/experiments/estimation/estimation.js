import {initialize_random_order} from "/scripts/experiment-properties/balancing/random_generator.js";

import {get_data, get_data_subset} from "/scripts/experiment-properties/data/data_controller.js";
import {prepare_coordinates,
        randomize_position,
        randomize_radius_position,
        force_greater_right_position} from "/scripts/helpers/experiment_helpers.js";

export default class Estimation {
    /**
     * Initializes a Estimation experiment object.
     *
     * @param  params          {object}    Parameters passed in from routing
     */
    constructor(params) {
        if (params.condition !== 'shape_estimation') {
            throw  Error("unexpected condition name " + params.condition);
        }
        this.condition_name = params.condition;

        if (params.range !== "estimation") {
            throw  Error("unexpected range " + params.range);
        }
        this.range = params.range;

        // ========================================
        // PARAMETER CHECKING
        if (params.graph_type !== "shapes") {
            throw Error("graph type: " + params.graph_type + " is not supported.")}
        else {
            this.graph_type = params.graph_type;
        }

        if (params.balancing !== "random") {
            throw Error("balancing: "+ params.balancing + " is not supported.") }
        else {
            this.balancing = params.balancing;
        }
        this.subject_id = params["subject_id"];
        this.subject_initials = params["subject_initials"];

        // ========================================
        // EXPERIMENT CONSTANTS

        this.MAX_STEP_INTERVAL = 10;
        this.SMALL_REF_RADIUS = 2;
        this.MID_REF_RADIUS = 4;
        this.LARGE_REF_RADIUS = 6;
        this.NUM_OF_SUB_CONDS = 36;

        this.SQUARE = "public/img/sample_square.png";
        this.CIRCLE = "public/img/sample_circle.png";
        this.TRIANGLE = "public/img/sample_triangle.png";
        // ========================================
        // EXPERIMENT VARIABLES

        this.input_count_array; // Array of length trials_per_round, each index representing num inputs per round
                                // for a given sub condition
        this.sub_conditions_constants;
        this.current_sub_condition_index;
        this.round_end = true;

        // ========================================
        // PRACTICE EXPERIMENT VARIABLES

        this.practice_conditions_constants;
        this.adjusted_midpoint_matrix = {};
        this.practice_trial_data = {};
        this.practice_end = false;

        // ========================================
        // TEST EXPERIMENT VARIABLES

        this.experiment_conditions_constants;
        this.sub_condition_order;

        // ========================================
        // CURRENT TRIAL DATA

        this.MAX_Y_POS_JITTER = 0.1; // y axis can be shifted away from default (0) by at most 0.1 * ImageHeight;
        this.middle_coordinates = "";
        this.distribution_size = "";
        this.trial_data = "";

        // ========================================
        // PREPARE EXPERIMENT

        // Extract raw constants
        this.raw_sub_conds = get_data(this);
        // Prepare experiment + practice data
        this.prepare_experiment();
        this.prepare_practice();
    }

    /**
     * Orders the input data according to balancing type and
     * initializes the Estimation object's variables.
     *
     */
    prepare_experiment() {
        let dataset = this.raw_sub_conds;

        switch(this.balancing) {
            case 'random':
                this.sub_condition_order = initialize_random_order(dataset.length);
                break;

            default:
                throw Error(this.balancing_type + " balancing type is not supported.");
        }

        var ordered_dataset = [];

        // Order the data set according to the randomly ordered array
        for (let i=0; i < this.sub_condition_order.length; i++) {
            ordered_dataset[i] = dataset[this.sub_condition_order[i]];
        }
        // Set experiment trials
        this.experiment_conditions_constants = ordered_dataset;
    }

    /**
     * Creates the practice dataset by taking the first FOUR subconditions.
     *
     */
    prepare_practice() {

        let dataset = this.raw_sub_conds;
        let practice_dataset = [];

        for (let i=0; i < 4; i++){
            practice_dataset[i] = dataset[i];
            this.practice_trial_data[i] = [];

            // Alternate the start ref to be low or high for each subcondition
            if (i%2 === 0) {
                practice_dataset[i]["start_ref"] = dataset[i]["low_ref"];
            } else {
                practice_dataset[i]["start_ref"] = dataset[i]["high_ref"];
            }
        }

        this.sub_conditions_constants = practice_dataset;
        this.current_sub_condition_index = 0;
        this.input_count_array = new Array(this.sub_conditions_constants[0].trials_per_round).fill(0);
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
     * Calculates exclusion criteria using standard deviation and variance.
     * Subcondition is flagged if:
     * - Standard deviation > 0.2
     * - Anchoring > 0.6
     *
     * @ return     HTML of subcondition data to print onto screen
     */
    calculate_exclusion_criteria() {

        let string = "";

        for (let i = 0; i < Object.keys(this.practice_trial_data).length; i++) {

            let subcondition_data = this.practice_trial_data[i];
            let std_dev = this.get_standard_deviation(subcondition_data);
            let anchoring_value = this.get_anchoring_value(subcondition_data);
            let mids = this.get_estimated_mids(subcondition_data);

            let rounded_mids = [];
            for (let mid of mids) {
                rounded_mids.push(mid.toFixed(3));
            }

            let anchoring_color = "BLACK";
            if (anchoring_value > 0.5) {
                anchoring_color = "RED";
            }

            let std_dev_color = "BLACK";
            if (std_dev > 0.2) {
                std_dev_color = "RED";
            }

            string += `
        <div align = "center" style = "text-align: left; float:left; width: 20vw">
        <font size = 2><b> Subcondition: ${i+1} </b>
        <br>
        Midpoint values: ${rounded_mids}
        <br>
        <font color = ${std_dev_color}> Standard Deviation: ${std_dev} </font>
        <br>
        <font color = ${anchoring_color}> Anchoring Value: ${anchoring_value} </font>
        <br>
        <br>
        </font>
        </div>
        `
        }

        return string;
    }

    /**
     * Calculates the standard deviation for the specified subcondition.
     *
     * @ return {double}  standard deviation
     */
    get_standard_deviation(subcondition_data) {

        let values = [];

        let estimated_mids = this.get_estimated_mids(subcondition_data);

        // Calculate mean:
        let mean = 0;
        for (let mid of estimated_mids) {
            mean += mid;
        }
        mean = mean / estimated_mids.length;

        // Calculate variance:
        let variance = 0;
        for (let mid of estimated_mids) {
            variance += Math.pow(mid - mean, 2);
        }
        variance = variance / (estimated_mids.length - 1);

        return Math.sqrt(variance).toFixed(3);
    }

    /**
     * Calculates the anchoring value for the specified subcondition.
     *
     * @ return {double} anchoring value
     */
    get_anchoring_value(subcondition_data) {

        let high_ref_trial_sum = 0;
        let low_ref_trial_sum = 0;

        let estimated_mids = this.get_estimated_mids(subcondition_data);

        // Iterate through each estimated mid (trial) of a given subcondition
        for (let i = 0; i < estimated_mids.length; i++) {
            // Evens have the low ref as their starter
            if (i % 2 === 0) {
                low_ref_trial_sum += estimated_mids[i];
            } else {
                high_ref_trial_sum += estimated_mids[i];
            }
        }

        return Math.abs(high_ref_trial_sum - low_ref_trial_sum).toFixed(3);
    }

    /**
     * Retrieves the estimated midpoints of each trial for the subcondition.
     *
     * @ return {array}  of estimated mids
     */
    get_estimated_mids(subcondition_data) {

        let estimated_mids = {};
        let result = [];

        for (let trial of subcondition_data) {
            if (trial.num_adjustments > 0) {
                estimated_mids[trial.num_adjustments] = trial.estimated_mid;
            }
        }

        for (let i = 1; i <= Object.keys(estimated_mids).length; i++) {
            result[i-1] = estimated_mids[i];
        }

        return result;
    }

    /**
     * Generates a Estimation object for use in the JsPsych timeline.
     *
     * @param  block_type {string}                             "test" or "practice"
     * @return trial {object}
     */
    generate_trial(block_type) {

        if ((block_type !== "test") && (block_type !== "practice")) {
            throw Error(block_type + " is not supported.")
        }

        // Initialize a variable for this so it is usable inside on_start
        let estimation_exp = this;
        let address = location.protocol + "//" + location.hostname + ":" + location.port + "/estimation_trial";

        return {
            type:'external-html-keyboard-response',
            url: address,
            choices: function(block_type){ // m = 77 (up), z = 90 (down), 32 = spacebar, 81 = q (exit button for debugging)

                if (block_type === "practice") {
                    return [77, 90, 81]; // Note disabled spacebar on practice to ensure they do all 4 inputs.
                } else {
                    return [77, 90, 32, 81];
                }

            },
            execute_script: true,
            response_ends_trial: true,
            data: {},
            on_start: function(trial){ // NOTE: on_start takes in trial var

                // Reset the variables to use the experiment if we have just ended
                // the practice trials
                // !!!! TODO: There should be a more elegant way to do this...
                //            JsPsych is likely operating async so difficult
                //            to set boolean outside this object.
                if (estimation_exp.practice_end == true){
                    estimation_exp.set_variables_to_experiment();
                    estimation_exp.practice_end = false;
                }

                // Set the constants to be used:
                var index = estimation_exp.current_sub_condition_index;
                var constants = estimation_exp.sub_conditions_constants[index];

                // Retrieve data from last trial:
                var last_estimation_trial = estimation_exp.get_last_trial(trial, block_type, index);

                // Handling saving the data:
                estimation_exp.handle_data_saving(trial, block_type, constants, estimated_correlation, last_estimation_trial, index);

                // Set the estimated correlation
                var estimated_correlation = estimation_exp.update_estimated_correlation(trial, constants, last_estimation_trial);

                console.log("round refreshes: " + trial.data.round_refreshes);
                console.log("trial/round num: " + trial.data.trial_num);
                console.log("num adjustments: " + trial.data.num_adjustments);
                console.log("input count per trial: " + stevens_exp.input_count_array);

                // Generate distributions
                let ref_shape = {};
                let mod_shape = {};

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
                    stevens_exp.right_coordinates = high_coordinates;
                    stevens_exp.left_coordinates = low_coordinates;
                }
                else{
                    stevens_exp.right_coordinates = low_coordinates;
                    stevens_exp.left_coordinates = high_coordinates;
                }

                stevens_exp.middle_coordinates = estimated_coordinates;
                stevens_exp.distribution_size = constants.num_points;
                stevens_exp.trial_data = trial.data;

                // Save trial data for practice so can calculate exclusion criteria
                if (trial.data.run_type === "practice") {
                    stevens_exp.practice_trial_data[index].push(trial.data);
                }

                console.log("[RIGHT] Correlation: " + trial.data.right_correlation);
                console.log("[MIDPOINT] Correlation: " + trial.data.estimated_mid);
                console.log("[LEFT] Correlation: " + trial.data.left_correlation);
            }
        };
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
     *       start_ref: ''
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
     *        */
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

            // If a round has just ended:
            // - increment the trial_num
            // - reset the refresh number (only applies for test trials)
            // - swap the start ref to be high/low depending on the previous round's start ref
            if (this.round_end == true && trial.data.run_type == "test"){

                trial.data.trial_num = last_stevens_trial.trial_num + 1;
                trial.data.num_adjustments = 0;
                trial.data.round_refreshes = 1;

                if (last_stevens_trial.start_ref === constants.high_ref) {
                    trial.data.start_ref = constants.low_ref;
                } else {
                    trial.data.start_ref = constants.high_ref;
                }

                this.round_end = false; //Reset flag
            }
            // Else trial_num, num_adjustments and start_ref is the same, but round_refresh ++
            else{
                trial.data.trial_num = last_stevens_trial.trial_num;
                trial.data.num_adjustments = last_stevens_trial.num_adjustments;
                trial.data.start_ref = last_stevens_trial.start_ref;
                trial.data.round_refreshes = last_stevens_trial.round_refreshes + 1;
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
            //estimated_correlation = Math.random() < 0.5 ? constants.low_ref : constants.high_ref;
            estimated_correlation = trial.data.start_ref;
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

            // Need to check that if hits either high or low ref, it DOESN'T count as a num_adjustment
            let is_unchanged = false;

            switch (last_trial.key_press){

                case trial.choices[0]: // up

                    estimated_correlation = Math.min(constants.high_ref, last_trial.estimated_mid + (Math.random() * last_trial.step_size));

                    // If they've hit the max (high_ref)
                    if (estimated_correlation === constants.high_ref) {
                        is_unchanged = true;
                    }
                    break;

                case trial.choices[1]: // down

                    estimated_correlation = Math.max(constants.low_ref, last_trial.estimated_mid - (Math.random() * last_trial.step_size));

                    // If they've hit the min (low_ref)
                    if (estimated_correlation === constants.low_ref) {
                        is_unchanged = true;
                    }
                    break;
            }

            // For valid changes (i.e not going beyond max or below min), can then
            // increment num_adjustments
            if (!is_unchanged){
                trial.data.num_adjustments = last_trial.num_adjustments + 1;
                this.input_count_array[trial.data.trial_num]++;
            }

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
     * Determines whether the round can end or not. A round can end ONLY if:
     * - test     : there has been at least 1 input from the user on the given round
     * - practice : user has done 4 adjustments in that given round
     *
     * @param  block_type {string}  "test" or "practice"
     *
     * @return {boolean}            True if sub condition should end.
     */
    end_round(block_type) {

        let last_trial = jsPsych.data.get().last(1).values()[0];

        // If there is no num_adjustment count, we shouldn't end round
        if (block_type === "test") {
            return !(last_trial.num_adjustments === 0);
        }
        // For practice, only end round when they have done 4 inputs
        else {
            return (last_trial.num_adjustments === 4);
        }
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

    // {
    //  base_shape: "circle",
    //  mod_shape: "rectangle",
    //  base_size : 2,
    //  min_size : 1.2,
    //  max_size: 3.0,
    //  max_step_size: 0.01,
    //  start_low: true ,
    //  line_color: '#000000',
    //  fill_color: '#4a77dd'
    // }
    plot_trial(sub_cond, trial_num) {
        let estimation_exp = this;
        const address = location.protocol + "//" + location.hostname + ":" + location.port;

        let width = window.innerWidth * 0.8;
        let height = window.innerHeight * 0.3;

        let graph = d3.select("#graph") // Insert into the div w/ id = "graph"
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("style", "display: block");

        let ref_img_path = address + '/img/sample_' + sub_cond.base_shape;
        let ref_x = 0;
        let ref_y = Math.floor(Math.random() * estimation_exp.MAX_Y_POS_JITTER * sub_cond.base_size);
        let ref_obj = {
            'xlink:href':ref_img_path,
            x: ref_x,
            y: ref_y,
            width: sub_cond.base_size,
            height: sub_cond.base_size
        };

        let mod_img_path = address + '/img/sample_' + sub_cond.mod_shape;
        let mod_x = 0;
        let mod_y = Math.floor(Math.random() * estimation_exp.MAX_Y_POS_JITTER * sub_cond.base_size);
        // the size of the modifiable shape start from min_size for trial 0 and 2, max_size for 1 and 3;
        let mod_size = (trial_num % 2 === 1)? sub_cond.max_size: sub_cond.min_size;
        let mod_obj = {
            'xlink:href':mod_img_path,
            x: mod_x,
            y: mod_y,
            width: mod_size,
            height: mod_size
        };

        if (math.floor(Math.random()) % 2 === 1) {
            graph.append('svg:image').attr(mod_obj);
            graph.append('svg:image').attr(ref_obj);
        } else {
            graph.append('svg:image').attr(ref_obj);
            graph.append('svg:image').attr(mod_obj);
        }

    }

    plot_trials = (sub_conds) => {
        sub_conds.forEach((sub_cond) => {
            let trial_nums = [0, 1, 2, 3];
            trial_nums.forEach((num) => {
                this.plot_trial(sub_cond, num);
            });
        });
    };
}
  