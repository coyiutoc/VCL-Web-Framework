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
        this.TRIALS_PER_COND = 4;
        this.SQUARE = "public/img/sample_square.png";
        this.CIRCLE = "public/img/sample_circle.png";
        this.TRIANGLE = "public/img/sample_triangle.png";
        this.MAX_Y_POS_JITTER = 0.1; // y axis can be shifted away from default (0) by at most 0.1 * ImageHeight;
        this.MAX_STEP_SIZE = 0.01; // how much can the size of shapes can be changed at one keypress

        // ========================================
        // EXPERIMENT VARIABLES

        this.input_count_array= [0, 0, 0, 0];
        // input_count_array has length equals to trials_per_round, each index representing num inputs per round
        // for a given sub condition

        this.sub_conditions_constants; // array of sub-conditions
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
        this.trial_data = {};

        this.results = []; // trials are pushed to results at the end of trial;
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

        let ordered_dataset = [];
        // Order the data set according to the randomly ordered array
        for (let i = 0; i < this.sub_condition_order.length; i++) {
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

        for (let i = 0; i < 4; i++){
            practice_dataset[i] = dataset[i];
            this.practice_trial_data[i] = [];
        }
        // set variables to practice
        this.practice_conditions_constants = practice_dataset;
        this.sub_conditions_constants = practice_dataset;
        this.current_sub_condition_index = 0;
        this.current_practice_condition_index=0;
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
        this.current_sub_condition_index = 0;
        this.input_count_array = new Array(this.sub_conditions_constants[0].trials_per_round).fill(0);
    }

    /**
     * Generates a Estimation object for use in the JsPsych timeline.
     *
     * @param  block_type {string}     "test" or "practice"
     * @return trial {object}
     */
    generate_trial(block_type) {
        if ((block_type !== "test") && (block_type !== "practice")) {
            throw Error(block_type + " is not supported.")
        }

        // Initialize a variable for this so it is usable inside on_start
        var estimation_exp = this;
        var address = location.protocol + "//" + location.hostname + ":" + location.port + "/estimation_trial";

        let trial = {
            type:'external-html-keyboard-response',
            url: address,
            choices: [32, 81],  // 32 = spacebar, 81 = q (exit button for debugging)
            execute_script: true,
            response_ends_trial: true,
            data: {
                trial_num: 0,
                estimated_radius: -1,
                adjustments: [], // array of numbers representing the adjustments made to the shape
                is_ref_left: false, // is the reference shape on the left
                sub_condition_index: 0,
                block_type: block_type
            },
            on_start: function(trial) {
                // Set the constants to be used:
                let index = estimation_exp.current_sub_condition_index;
                trial.data.sub_condition_index = index;
                trial.data.trial_num = estimation_exp.current_trial_num;

                console.log(JSON.stringify(trial.data));

                estimation_exp.curr_trial_data = trial.data;
                // Save trial data for practice so can calculate exclusion criteria
                if (trial.data.run_type === "practice") {
                    estimation_exp.practice_trial_data[index].push(trial.data);
                }
            },
            on_finish: function(data) { // NOTE: on_finish takes in data var
                // save data here
                let curr_trail_data = JSON.parse(JSON.stringify((data)));
                estimation_exp.results.push(curr_trail_data);
                estimation_exp.update_curr_trial_number(data);
                estimation_exp.update_curr_cond_idx(data);
                console.log("RESULTS: " + JSON.stringify(estimation_exp.results));
            }
        };
        return trial;
    }

    update_curr_trial_number(trial_data) {
        if (trial_data.trial_num === this.TRIALS_PER_COND - 1) {
            this.current_trial_num  = 0;
        } else {
            this.current_trial_num++;
        }
    }

    update_curr_cond_idx(trial_data) {
        if (trial_data.trial_num === this.TRIALS_PER_COND - 1) {
            this.current_sub_condition_index++;
        }
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
     * @param block_type {string}               "test" or "practice"
     * @param constants {array}
     * @param last_trial {object}
     * @param index {int}
     */
    handle_data_saving(trial, block_type, constants, last_trial, index) {
        trial.data = Object.assign({}, trial.data, constants);

        trial.data.sub_condition = index;
        trial.data.balanced_sub_condition = this.sub_condition_order[index];

        // trial.trial_duration = trial.data.regen_rate;

        // If trial is still part of same sub-condition, carry over constants from
        // the previous trial
        if (last_trial){

            trial.data.step_size = last_trial.step_size;
            trial.data.right_correlation = last_trial.right_correlation;
            trial.data.left_correlation = last_trial.left_correlation;
            trial.data.high_ref_is_right = last_trial.high_ref_is_right;

            // If a round has just ended:
            // - increment the trial_num
            // - reset the refresh number (only applies for test trials)
            // - swap the start ref to be high/low depending on the previous round's start ref
            if (this.round_end === true && trial.data.run_type === "test"){

                trial.data.trial_num = last_trial.trial_num + 1;
                trial.data.num_adjustments = 0;
                trial.data.round_refreshes = 1;

                this.round_end = false; //Reset flag
            }
            // Else trial_num, num_adjustments and start_ref is the same, but round_refresh ++
            else{
                trial.data.trial_num = last_trial.trial_num;
                trial.data.num_adjustments = last_trial.num_adjustments;
                trial.data.start_ref = last_trial.start_ref;
                trial.data.round_refreshes = last_trial.round_refreshes + 1;
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
     * Retrieves the last stevens trial depending on block_type for a
     * given sub condition index.
     * If this is the first trial of a given block_type, returns null.
     *
     * @param  trial {object}
     * @param  block_type {string}          "test" or "practice"
     * @param  index {int}
     * @return last_stevens_trial {object}
     */
    get_last_trial(trial, block_type, index) {
        let last_stevens_trial;
        trial.data.type = "estimation";

        // Set trial run_type depending on block type
        // (we need to set trial's run_type so we can do the filter in the
        // next if block)
        if (block_type === "test"){
            trial.data.run_type = "test";
        }
        else{
            trial.data.run_type = "practice";
        }

        // Retrieve previous stevens trial if it exists
        if (block_type === "practice" && jsPsych.data.get().filter({type: "estimation", run_type: "practice", sub_condition: index}).last(1).values()[0]){
            last_stevens_trial = jsPsych.data.get().filter({type: "estimation", run_type: "practice", sub_condition: index}).last(1).values()[0];
        }
        else if (block_type === "test" && jsPsych.data.get().filter({type: "estimation", run_type: "test", sub_condition: index}).last(1).values()[0]){
            last_stevens_trial = jsPsych.data.get().filter({type: "estimation", run_type: "test", sub_condition: index}).last(1).values()[0];
        }
        else{
            last_stevens_trial = null;
        }
        return last_stevens_trial;
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
            return !(last_trial.adjustments.length === 0);
        }
        // For practice, only end round when they have done 4 inputs
        else {
            return (last_trial.adjustments.length >= 4);
        }
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

        let width = window.innerWidth;
        let height = window.innerHeight;

        let chart = d3.select("#graph") // Insert into the div w/ id = "graph"
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("style", "display: block");

        let left_x = window.innerWidth * 0.2;
        let right_x = window.innerWidth * 0.8;
        let base_y = window.innerHeight * 0.5;

        let ref_x = 0;
        let ref_y = Math.random() * estimation_exp.MAX_Y_POS_JITTER * sub_cond.base_size;
        let ref_size = sub_cond.base_size * 50;
        let mod_x = 0;
        let mod_y = Math.random() * (window.innerHeight / 2) * estimation_exp.MAX_Y_POS_JITTER * sub_cond.base_size;
        // the size of the modifiable shape start from min_size for trial 0 and 2, max_size for 1 and 3;
        let mod_size = (trial_num % 2 === 1)? sub_cond.max_size: sub_cond.min_size * 50;

        if (Math.floor(Math.random()) < 0.5) {
            this.plot_shape(sub_cond.base_shape, chart, ref_size , base_y + ref_y, left_x + ref_x, true);
            this.plot_shape(sub_cond.mod_shape, chart, mod_size, base_y + mod_y, right_x + mod_x, false);
            this.trial_data.is_ref_left = true;
        } else {
            this.plot_shape(sub_cond.mod_shape, chart, ref_size, base_y + mod_y, left_x + mod_x, false);
            this.plot_shape(sub_cond.base_shape, chart, mod_size, base_y + ref_y, right_x + ref_x, true);
            this.trial_data.is_ref_left = false;
        }

    }


    plot_trials(){
        this.plot_trial(this.sub_conditions_constants[this.current_sub_condition_index], this.trial_data.trial_num);
    }


    plot_shape(shape, chart, radius, y_pos, x_pos, is_ref) {
        switch (shape) {
            case "circle":
                this.plot_circle(chart, radius, y_pos, x_pos, is_ref);
                break;
            case "triangle":
                this.plot_triangle(chart, radius, y_pos, x_pos, is_ref);
                break;
            case "rectangle":
                this.plot_rectangle(chart, radius, y_pos, x_pos, is_ref);
                break;
        }
    }
    /**
     * D3 code for plotting a circle.
     *
     * @param  chart      {object}
     * @param  radius     {number}
     * @param  y_pos      {number}
     * @param  x_pos      {number}
     */
    plot_circle(chart, radius, y_pos, x_pos, is_ref) {
        chart.append("circle")
            .attr("cx", x_pos)
            .attr("cy", y_pos)
            .attr("r", radius)
            .attr("id", "circle_shape")
            .attr("is_ref", is_ref)
            .style("fill", "blue");
        let exp = this;
        if (is_ref === false) {
            d3.select("body")
                .on("keydown", function () {
                    let event = d3.event;
                    if (event.key === "m" || event.key === 'z') {
                        let sign = event.key === "m" ? 1 : -1;
                        let change = Math.random() * 10 * exp.MAX_STEP_SIZE;
                        let new_radius = radius + sign * change;
                        exp.curr_trial_data.adjustments.push(change * sign);
                        d3.select("#circle_shape")
                            .attr("r", new_radius);
                    }
                });
        }
    }

    /**
     * D3 code for plotting a square.
     *
     * @param  chart      {svg object}
     *         radius     {double}
     *         max_radius {double}     Largest radius of the given trial
     *         diff       {double}     Difference between max and min radius of given trial
     */
    plot_rectangle(chart, radius ,y_pos, x_pos, is_ref) {
        var rect = chart.append("rect")
            .attr("id", "rect_shape")
            .attr("x", x_pos)
            .attr("y", y_pos)
            .attr("width", radius)
            .attr("height", radius)
            .attr("fill", "blue");
        let exp = this;
        if (is_ref === false) {
                d3.select("body")
                    .on("keydown", function () {
                        let event = d3.event;
                        console.log("d3 event fired");
                        console.log(d3.event);
                        if (event.key === "m" || event.key === 'z') {
                            let sign = event.key === "m" ? 1 : -1;
                            let change = Math.random() * 1000 * exp.MAX_STEP_SIZE;
                            let new_radius = radius + sign * change;
                            radius = new_radius;
                            exp.curr_trial_data.adjustments.push(change * sign);
                            d3.select("#rect_shape")
                                .attr("width", new_radius)
                                .attr("height", new_radius);
                        }
                    });
        }

    }

    /**
     * D3 code for plotting a triangle.
     *
     * @param  chart      {svg object}
     *         radius     {double}
     *         max_radius {double}     Largest radius of the given trial
     *         diff       {double}     Difference between max and min radius of given trial
     */
    plot_triangle(chart, radius, y_pos, x_pos, is_ref) {

        let translation = 0;
        let estimation_exp = this;

        let poly = [{"x":(0.5*radius + translation), "y":(0.5*radius + translation)},
            {"x":(0.5*radius + translation), "y":(1.5*radius + translation)},
            {"x":(1.5*radius + translation), "y":(1.5*radius + translation)}];

        chart.selectAll("polygon")
            .data([poly])
            .enter().append("polygon")
            .attr("points",function(d) {
                return d.map(function(d) { return [d.x, d.y].join(","); }).join(" ");})
            .attr("fill", estimation_exp.curr_trial_data.fill_color);

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
        /*
        let string = "";

        for (let i = 0; i < Object.keys(this.practice_trial_data).length; i++) {

          let subcondition_data = this.practice_trial_data[i];
          let mids = this.get_estimated_mids(subcondition_data);

          let std_dev = this.get_standard_deviation(mids);
          let anchoring_value = this.get_anchoring_value(mids);

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
        */
        return "";
    }

}