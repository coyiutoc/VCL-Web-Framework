import {initialize_random_order} from "/scripts/experiment-properties/balancing/random_generator.js";
import {get_data} from "/scripts/experiment-properties/data/data_controller.js";
import {randomize_position,
        randomize_radius_position,
        force_greater_right_position} from "/scripts/helpers/experiment_helpers.js";

export default class Estimation {
    /**
     * Initializes a Estimation experiment object.
     *
     * @param  params          {object}    Parameters passed in from routing
     */
    constructor(params) {
        // Validate fields of params
        if (params.condition !== 'shape_estimation'
            && params.condition !== 'line_length'
            && params.condition !== 'rectangle_square'
            && params.condition !== 'triangle'
            && params.condition !== 'rectangle_rotated_square_solid'
            && params.condition !== 'rectangle_rotated_square_outline'
            && params.condition !== 'square'
            && params.condition !== 'line_rotated'
            && params.condition !== 'line_curve'
            && params.condition !== 'curve'
            && params.condition !== 'triangle_fan')
        {
            throw  Error("unexpected condition name " + params.condition);
        }

        this.condition_name = params.condition;
        if (params.trial_structure !== "estimation") {
            throw  Error("unexpected trial structure " + params.trial_structure);
        }
        this.range = params.range;
        this.trial_structure = params.trial_structure;
        if (params.graph_type !== "shapes" && params.graph_type !== "line") {
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
        this.X_DISTANCE_BETWEEN_SHAPES = 12;
        this.Y_DIVIATION_FROM_X_AXIS = 3;
        this.MAX_STEP_INTERVAL = 10;
        this.ROUNDS_PER_COND = 4;
        this.MAX_Y_POS_JITTER = 0.1; // y axis can be shifted away from default (window / 2) by at most 0.1 * ImageHeight;
        this.MAX_STEP_SIZE = 0.05; // how much can the size of shapes can be changed at one keypress

        // PIXELS_PER_CM is defined in estimation_experiment.html
        if (PIXELS_PER_CM) {
            this.PIXEL_TO_CM = PIXELS_PER_CM;
        } else {
            // 1cm is 37.7952755906 pixels
            this.PIXEL_TO_CM = 37.7952755906;
            throw Error("PIXELS_PER_CM is not defined");
        }

        // Margin from top and bottom of screen is set to at least 5cm
        this.MARGIN = 5;
        // ========================================
        // EXPERIMENT VARIABLES
        this.input_count_array= [0, 0, 0, 0];
        this.curr_round_num = 0;
        this.curr_condition_index = 0; // pointing to positions in this.curr_conditions_constants
        this.is_practice = true;
        // input_count_array has length equals to trials_per_round, each index representing num inputs per round
        // for a given sub condition
        this.curr_conditions_constants; // array of sub-conditions currently running
        this.raw_sub_conds; // subconditions in estimation_data.js

        this.curr_condition_index; // pointing to positions in this.curr_conditions_constants
        this.round_end = true;

        // ========================================
        // PRACTICE EXPERIMENT VARIABLES

        this.adjusted_midpoint_matrix = {};
        this.practice_trial_data = [];
        this.practice_end = false;

        // ========================================
        // TEST EXPERIMENT VARIABLES
        this.sub_condition_order;

        // ========================================
        // CURRENT TRIAL DATA
        this.trial_data = {};

        this.results = []; // trials are pushed to results at the end of trial;
        // ========================================
        // PREPARE EXPERIMENT

        // Extract raw constants
        // this.raw_sub_conds = generate_estimation_experiment_data(params.condition);
        this.raw_sub_conds = get_data(this);
        // console.log("raw sub conds");
        // Prepare experiment + practice data
        this.practice_conditions_constants = [];
        this.curr_conditions_constants = []; // array of sub-conditions currently running

        this.experiment_conditions_constants = [];
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
        console.log("experiment_conditions_constants");
        console.log(JSON.stringify(this.experiment_conditions_constants));
    }

    /**
     * Creates the practice dataset by taking the first FOUR subconditions.
     *
     */
    prepare_practice() {
        let dataset = this.raw_sub_conds;
        let practice_dataset = [];

        for (let i = 0; i < 1; i++){
            practice_dataset[i] = dataset[i];
            this.practice_trial_data[i] = [];
        }
        // set variables to practice
        this.practice_conditions_constants = practice_dataset;
        this.curr_conditions_constants = practice_dataset;
        this.curr_condition_index = 0;
        this.current_practice_condition_index = 0;
        this.input_count_array = new Array(this.curr_conditions_constants[0].trials_per_round).fill(0);
        this.is_practice = true;
    }

    /**
     * Resets all relevant variables to use that of the experiment.
     * (input_count_array, curr_conditions_constants, and curr_condition_index
     * are shared variables between the practice and test trials).
     *
     * This function is called once all the practice trials have run.
     */
    set_variables_to_experiment() {
        console.log("set_variables_to_experiment");
        this.curr_conditions_constants = this.experiment_conditions_constants;
        this.curr_condition_index = 0;
        this.curr_round_num = 0;
        this.input_count_array = new Array(this.curr_conditions_constants[0].trials_per_round).fill(0);
        this.is_practice = false;
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

        let group = {};
        let is_ref_left = false;
        let ready = {
            type: 'html-keyboard-response',
            choices: [32],
            stimulus: "",
            on_start: function(trial) {
                is_ref_left = Math.random() > 0.5;
                trial.stimulus = is_ref_left? "<div align = 'center'><font size = 20>" +
                    "<p>The Modifiable shape will be on the right<p>" +
                    "<br> <br> <p><b>Press space to continue.</b></p></font></div>" :
                    "<div align = 'center'><font size = 20>" +
                    "<p>The Modifiable shape will be on the left<p>" +
                    "<br> <br> <p><b>Press space to continue.</b></p></font></div>" ;
            },
            data: {type: 'instruction'}
        };
        let trial = {
            type:'external-html-keyboard-response',
            url: address,
            choices: [32, 81],  // 32 = spacebar, 81 = q (exit button for debugging)
            execute_script: true,
            response_ends_trial: true,
            data: {
                round_num: 0,
                estimated_size: -1,
                adjustments: [], // array of numbers representing the adjustments made to the shape
                sub_condition_index: 0,
                block_type: block_type
            },
            on_start: function(trial) {
                console.log("====================on_start=======================");
                // Set the constants to be used:
                trial.data.sub_condition_index = estimation_exp.curr_condition_index;
                trial.data.round_num = estimation_exp.curr_round_num;
                trial.data = Object.assign(estimation_exp.curr_conditions_constants[estimation_exp.curr_condition_index],
                    trial.data);
                trial.data.is_ref_left = is_ref_left; // is the reference shape on the left
                estimation_exp.curr_trial_data = trial.data;
                // Save trial data for practice so can calculate exclusion criteria
                if (trial.data.run_type === "practice") {
                    estimation_exp.practice_trial_data[estimation_exp.curr_condition_index].push(trial.data);
                }
                // console.log(JSON.stringify(trial));
            },
            on_finish: function(data) { // NOTE: on_finish takes in data var
                // save data here
                console.log("====================on_finish=======================");
                let curr_trail_data = JSON.parse(JSON.stringify((data)));
                estimation_exp.results.push(curr_trail_data);
                estimation_exp.update_curr_round_number(data);
                estimation_exp.update_curr_cond_idx(data);
                estimation_exp.update_input_array(data);
            }
        };
        group.timeline = [ready, trial];
        console.log(JSON.stringify(group));
        return group;
    }

    /**
     * Set the current trial's number of inputs in the input_count_array
     * @param data {object} the trial.data object from jsPsych
     * */
    update_input_array(data) {
        if (data.round_num < 0 || data.round_num > 3) {
            throw Error("trail number : " + data.round_num + " is out of range");
        }
        this.input_count_array[data.round_num] = data.adjustments.length;
    }

    /**
     * Update the current round number
     * @param trial_data {object} the trial.data object from jsPsych
     * */
    update_curr_round_number(trial_data) {
        if (trial_data.round_num === this.ROUNDS_PER_COND - 1) {
            this.curr_round_num  = 0;
        } else {
            this.curr_round_num++;
        }
    }

    /**
     * Update the index of the condition that is being referred to
     * @param trial_data {object} the trail.data object from jsPsych
     * */
    update_curr_cond_idx(trial_data) {
        if (trial_data.round_num === this.ROUNDS_PER_COND - 1) {
            this.curr_condition_index++;
        }
    }

    /**
     * plot a trial
     * @param sub_cond {object} a sub_condition object, refer to estimation_data.js for details
     * @param round_num {number} current round number
     */
    plot_trial(sub_cond, round_num) {
        let estimation_exp = this;

        let width = window.innerWidth;
        let height = window.innerHeight;

        let mid_width = width / 2;
        let mid_height = height / 2;

        let chart = d3.select("#graph") // Insert into the div w/ id = "graph"
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("style", "display: block");

        let left_x = mid_width - this.X_DISTANCE_BETWEEN_SHAPES * this.PIXEL_TO_CM / 2;
        let right_x = mid_width + this.X_DISTANCE_BETWEEN_SHAPES * this.PIXEL_TO_CM / 2;

        let ref_size = sub_cond.ref_size * estimation_exp.PIXEL_TO_CM ;
        let ref_y = estimation_exp.calculate_y_position(ref_size);

        // the size of the modifiable shape start from mod_min_size for trial 0 and 2, mod_max_size for 1 and 3;
        let mod_size = (round_num % 2 === 1)?
            sub_cond.mod_max_size * estimation_exp.PIXEL_TO_CM  : sub_cond.mod_min_size * estimation_exp.PIXEL_TO_CM;
        let mod_y = estimation_exp.calculate_y_position(mod_size);

        this.curr_trial_data.is_ref_smaller = (round_num % 2 === 1);

        if (this.curr_trial_data.is_ref_left) {
            this.plot_shape(sub_cond.ref_shape, chart, ref_size , ref_y, left_x, true, sub_cond.ref_outline, sub_cond.ref_fill);
            this.plot_shape(sub_cond.mod_shape, chart, mod_size, mod_y, right_x, false, sub_cond.mod_outline, sub_cond.mod_fill);
            this.curr_trial_data.is_ref_left = true;
        } else {
            this.plot_shape(sub_cond.mod_shape, chart, mod_size, mod_y, left_x, false, sub_cond.mod_outline, sub_cond.mod_fill);
            this.plot_shape(sub_cond.ref_shape, chart, ref_size, ref_y, right_x, true, sub_cond.ref_outline, sub_cond.ref_fill);
            this.curr_trial_data.is_ref_left = false;
        }
    }

    /**
     * calculate the y value of the position where the shape should be plotted
     * @param radius the radius of the shape
     * @returns {number}
     */
    calculate_y_position(radius) {
        let estimation_exp = this;
        // y_margin is the distance from
        let y_margin = estimation_exp.MARGIN * estimation_exp.PIXEL_TO_CM;
        // pick a random position inside the screen such the the shapes will not be displayed outside of the border
        let range = [y_margin + radius / 2, window.innerHeight - y_margin - radius / 2];
        console.log("radius: " + radius);
        console.log(JSON.stringify(range));
        let y_pos = Math.random() * (range[1] - range[0]) + range[0];
        return y_pos;
    }

    /**
     * function to display the experiment trials
     */
    plot_trials(){
        console.log("plot_trials with index = " + this.curr_condition_index +
            "round number" + this.curr_round_num);
        this.plot_trial(this.curr_conditions_constants[this.curr_condition_index], this.curr_round_num);
    }

    /**
     * plot a shape
     *
     * @param shape {string}
     * @param chart {object}
     * @param radius {number}
     * @param y_pos {number}
     * @param x_pos {number}
     * @param is_ref {boolean} if the shape is a reference shape or a modifiable shape
     * @param outline {string} outline color
     * @param fill {string} fill color
     */
    plot_shape(shape, chart, radius, y_pos, x_pos, is_ref, outline, fill) {
        switch (shape) {
            case "circle":
                this.plot_circle(chart, radius, y_pos, x_pos, is_ref, outline, fill);
                break;
            case "triangle":
                this.plot_triangle(chart, radius, y_pos, x_pos, is_ref, outline, fill);
                break;
            case "square":
                this.plot_square(chart, radius, y_pos, x_pos, is_ref, outline, fill);
                break;
            case "line":
                this.plot_line(chart, radius, y_pos, x_pos, is_ref, outline);
                break;
            case "rectangle":
                this.plot_rectangle(chart, radius, y_pos, x_pos, is_ref, outline, fill);
                break;
            case "curve_left":
                this.plot_curve(chart, radius, y_pos, x_pos, is_ref, outline, true);
                break;
            case "curve_right":
                this.plot_curve(chart, radius, y_pos, x_pos, is_ref, outline, false);
                break;
            case "fan":
                this.plot_fan(chart, radius, y_pos, x_pos, is_ref, outline, fill)
        }
    }

    /**
     * D3 code for plotting a circle.
     *
     * @param chart {object}
     * @param diameter {number}
     * @param y_pos {number}
     * @param x_pos {number}
     * @param is_ref {boolean} if the shape is a reference shape or a modifiable shape
     * @param outline {string}
     * @param fill {string}
     */
    plot_circle(chart, diameter, y_pos, x_pos, is_ref, outline, fill) {
        let exp = this;
        let radius = diameter / 2;
        chart.append("circle")
            .attr("cx", x_pos)
            .attr("cy", y_pos)
            .attr("r", diameter / 2)
            .attr("id", "circle_shape")
            .attr("is_ref", is_ref)
            .attr("fill", fill)
            .attr("stroke", outline);
        if (is_ref === false) {
            d3.select("body")
                .on("keydown", function () {
                    let event = d3.event;
                    // console.log(event);
                    if (event.key === "m" || event.key === "z") {
                        diameter = exp.calculate_size_change(event.key, diameter);
                        radius = diameter / 2;
                        d3.select("#circle_shape")
                            .attr("r", radius);
                    }
                });
        }
    }

    /**
     *
     * @param exp {object} an Experiment object
     * @param radius {number}
     * @param shape_id {string}
     * @param shape_type {string}
     */
    static append_adjustments_listener(exp, radius, shape_id, shape_type) {
        d3.select("body")
            .on("keydown", function () {
                let event = d3.event;
                // console.log(event);
                if (event.key === "m" || event.key === "z") {
                    let sign = event.key === "m" ? 1 : -1;
                    let change = Math.random() * exp.PIXEL_TO_CM * exp.MAX_STEP_SIZE / 2;
                    // divided by 2 because we are changing radius (which is half of diameter)
                    // for example when we do this for squares we will be chaning width and height
                    let new_radius = radius + sign * change;
                    console.log(new_radius);
                    exp.curr_trial_data.adjustments.push(change * sign / exp.PIXEL_TO_CM );
                    exp.curr_trial_data.estimated_size = new_radius / exp.PIXEL_TO_CM ;
                    radius = new_radius;
                    d3.select(shape_id)
                        .attr("r", new_radius);
                }
            });
    }

    /**
     *
     * @param chart {object}
     * @param width {number}
     * @param y_pos {number}
     * @param x_pos {number}
     * @param is_ref {boolean} if the shape is a reference shape or a modifiable shape,
     *                         is_ref === true if the shape is a reference shape
     * @param outline {string}
     * @param fill {string}
     */
    plot_square(chart, width, y_pos, x_pos, is_ref, outline, fill) {
        let exp = this;
        chart.append("rect")
            .attr("id", is_ref? "square_shape_ref": "square_shape_mod")
            .attr("x", x_pos - width / 2)
            .attr("y", y_pos - width / 2) // the x and y attributes for square
                                          // refers to the position of the upper left corner
                                          // however x_pos and y_pos specifies the center of the shape
            .attr("width", width)
            .attr("height", width)
            .attr("fill", fill)
            .attr("stroke", outline);
        if (is_ref === true) {
            let transform = "rotate(";
            transform = transform + exp.curr_trial_data.ref_rotate_by.toString();
            transform = transform + " " + (x_pos).toString();
            transform = transform + " " + (y_pos).toString();
            transform = transform + ")";
            d3.select("#square_shape_ref").attr("transform", transform);
        } else {
            let transform = "rotate(";
            transform = transform + exp.curr_trial_data.mod_rotate_by.toString();
            transform = transform + " " + (x_pos).toString();
            transform = transform + " " + (y_pos).toString();
            transform = transform + ")";
            d3.select("#square_shape_mod").attr("transform", transform);
        }
        if (is_ref === false) {
            d3.select("body")
                .on("keydown", () => {
                    let event = d3.event;
                    if (event.key === "m" || event.key === "z") {
                        width = exp.calculate_size_change(event.key, width);
                        d3.select("#square_shape_mod")
                            .attr("width", width)
                            .attr("height", width);
                    }
                });
        }

    }

    /**
     *
     * @param chart {object}
     * @param radius {number}
     * @param y_pos {number}
     * @param x_pos {number}
     * @param is_ref {boolean} if the shape is a reference shape or a modifiable shape,
     *                         is_ref === true if the shape is a reference shape
     * @param outline
     * @param fill
     */
    plot_triangle(chart, radius, y_pos, x_pos, is_ref, outline, fill) {
        let exp = this;
        // for equilateral triangles, height = side * sqrt(3) / 2;
        let short_side = radius;
        let long_side = radius;
        let height = 0, width = 0;

        let poly = [];
        if (!is_ref) {
            if (exp.curr_trial_data.side_to_bottom) {
                // TODO: the plotting should be more abstract, refactor this
                if (exp.condition_name === 'triangle_fan' && exp.curr_trial_data.side_to_bottom !== 1) {
                   long_side = radius;
                   width = radius * Math.sqrt(3);
                   height = long_side / 2;
                   poly = [
                        {"x":(x_pos), "y":(-0.5 * height + y_pos)},
                        {"x":(-0.5 * width + x_pos), "y":(0.5 * height + y_pos)},
                        {"x":(0.5 * width + x_pos), "y":(0.5 * height + y_pos)}];
                } else {
                    long_side = short_side * exp.curr_trial_data.side_to_bottom;
                    height = Math.sqrt(Math.pow(long_side, 2) - Math.pow(short_side / 2, 2));
                    width = short_side;
                    poly = [
                        {"x":(x_pos), "y":(-0.5 * height + y_pos)},
                        {"x":(-0.5 * width + x_pos), "y":(0.5 * height + y_pos)},
                        {"x":(0.5 * width + x_pos), "y":(0.5 * height + y_pos)}];

                }
            } else {
                height = radius * Math.sqrt(3)/2;
                poly = [
                    {"x":x_pos, "y":(-0.5 * height + y_pos)},
                    {"x":(-0.5 * radius + x_pos), "y":(0.5 * height + y_pos)},
                    {"x":(0.5 * radius + x_pos), "y":(0.5 * height + y_pos)}];
            }
        } else {
            height = radius * Math.sqrt(3)/2;
            poly = [
                {"x":x_pos, "y":(-0.5 * height + y_pos)},
                {"x":(-0.5 * radius + x_pos), "y":(0.5 * height + y_pos)},
                {"x":(0.5 * radius + x_pos), "y":(0.5 * height + y_pos)}];
        }
        chart.append("polygon")
            .attr("points",function() {
                return poly.map(function(d) { return [d.x, d.y].join(","); }).join(" ");})
            .attr("fill", fill)
            .attr("stroke", outline)
            .attr("id", is_ref? "triangle_shape_ref" : "triangle_shape_mod");

        if (is_ref === false) {
            d3.select("body")
                .on("keydown", function () {
                    let event = d3.event;
                    if (event.key === "m" || event.key === "z") {
                        // decide the amount of change;
                        radius = exp.calculate_size_change(event.key, radius);
                        // plot the changed shape
                        short_side = radius;
                        if (exp.condition_name === 'triangle_fan' && exp.curr_trial_data.side_to_bottom !== 1) {
                            long_side = radius;
                            width = radius * Math.sqrt(3);
                            height = long_side / 2;
                            poly = [
                                {"x":(x_pos), "y":(-0.5 * height + y_pos)},
                                {"x":(-0.5 * width + x_pos), "y":(0.5 * height + y_pos)},
                                {"x":(0.5 * width + x_pos), "y":(0.5 * height + y_pos)}];
                        } else if (exp.curr_trial_data.side_to_bottom) {
                            long_side = short_side * exp.curr_trial_data.side_to_bottom;
                            height = Math.sqrt(Math.pow(long_side, 2) - Math.pow(short_side / 2, 2));
                            width = short_side;
                            if (exp.curr_trial_data.mod_rotate_by) {
                                poly = [
                                    {"x":(0.5 * height + x_pos), "y":(y_pos)},
                                    {"x":(-0.5 * height + x_pos), "y":(-0.5 * width + y_pos)},
                                    {"x":(-0.5 * height + x_pos), "y":(0.5 * width + y_pos)}];
                            } else {
                                poly = [
                                    {"x":(x_pos), "y":(-0.5 * height + y_pos)},
                                    {"x":(-0.5 * width + x_pos), "y":(0.5 * height + y_pos)},
                                    {"x":(0.5 * width + x_pos), "y":(0.5 * height + y_pos)}];
                            }
                        } else {
                            height = short_side * Math.sqrt(3)/2;
                            poly = [
                                {"x":x_pos, "y":(-0.5 * height + y_pos)},
                                {"x":(-0.5 * short_side + x_pos), "y":(0.5 * height + y_pos)},
                                {"x":(0.5 * short_side + x_pos), "y":(0.5 * height + y_pos)}];
                        }
                        chart.select("#triangle_shape_mod")
                            .attr("points",function() {
                                return poly.map(function(d) { return [d.x, d.y].join(","); }).join(" ");});
                    }
                });
        }
    }

    /**
     *
     * @param chart {object}
     * @param size {number}
     * @param y_pos {number}
     * @param x_pos {number}
     * @param is_ref {boolean}
     * @param outline {string}
     * @param fill {string}
     */
    plot_rectangle(chart, size, y_pos, x_pos, is_ref, outline, fill) {
        let exp = this;
        let short_side = size;
        let long_side = size;
        let height = 0, width = 0;
        if (exp.curr_trial_data.side_to_bottom) {
            long_side = short_side * exp.curr_trial_data.side_to_bottom;
        }
        width = short_side;
        height = long_side;
        chart.append("rect")
            .attr("id", is_ref? "rect_shape_ref": "rect_shape_mod")
            .attr("x", x_pos - width / 2)
            .attr("y", y_pos - height / 2) // the x and y attributes for square
            // refers to the position of the upper left corner
            // however x_pos and y_pos specifies the center of the shape
            .attr("width", width)
            .attr("height", height)
            .attr("fill", fill)
            .attr("stroke", outline);
        if (is_ref === false && exp.curr_trial_data.mod_rotate_by) {
            let transform = "rotate(";
            transform = transform + exp.curr_trial_data.mod_rotate_by.toString();
            transform = transform + " " + (x_pos).toString();
            transform = transform + " " + (y_pos).toString();
            transform = transform + ")";
            console.log(transform);
            d3.select("#rect_shape_mod").attr("transform", transform);
        }

        if (is_ref === false) {
            d3.select("body")
                .on("keydown", function () {
                    let event = d3.event;
                    if (event.key === "m" || event.key === "z") {
                        size = exp.calculate_size_change(event.key, size);
                        let short_side = size;
                        let long_side = exp.curr_trial_data.side_to_bottom * short_side;
                        let new_width = 0, new_height = 0;
                        new_width = short_side;
                        new_height = long_side;
                        d3.select("#rect_shape_mod")
                            .attr("width", new_width)
                            .attr("height", new_height);
                    }
                });
        }

    }

    /**
     *
     * @param chart
     * @param chord
     * @param y_pos
     * @param x_pos
     * @param is_ref
     * @param outline
     * @param curve_left
     */
    plot_curve(chart, chord, y_pos, x_pos, is_ref, outline, curve_left) {
        let exp = this;
        let curr_trial_data = this.curr_trial_data;
        // calculate the radius of circle, assume the central angle corresponding to the curve is 60 degrees
        let r = (chord / 2) / Math.sin(curr_trial_data.mod_central_angle * Math.PI / 360);
        let M = [x_pos, y_pos - chord / 2];
        let A = [r, r, 0, 0, curve_left? 1 : 0, x_pos, y_pos + chord / 2];
        chart.append("path")
            .style("stroke", outline)
            .style("stroke-width", 2)
            .style("fill", "white")
            .attr("id", is_ref? "curve_ref" : "curve_mod")
            .attr("d", "M " + M.join(" ") + " A " + A.join(" "));
        if (is_ref === false) {
            d3.select("body")
                .on("keydown", function () {
                    let event = d3.event;
                    if (event.key === "m" || event.key === "z") {
                        chord = exp.calculate_size_change(event.key, chord);
                        r = (chord / 2) / Math.sin(curr_trial_data.mod_central_angle * Math.PI / 360);
                        M = [x_pos, y_pos - chord / 2];
                        A = [r, r, 0, 0, curve_left? 1 : 0, x_pos, y_pos + chord / 2];
                        d3.select("#curve_mod")
                            .attr("d",  "M " + M.join(" ") + " A " + A.join(" "));
                    }
                });
        }
    }

    /**
     *
     * @param chart
     * @param radius
     * @param y_pos
     * @param x_pos
     * @param is_ref
     * @param outline
     * @param fill
     */
    plot_fan(chart, radius, y_pos, x_pos, is_ref, outline, fill) {
        let exp = this;
        // calculate the radius of circle, assume the central angle corresponding to the curve is 60 degrees
        let chord = radius;
        let M = [x_pos, y_pos];
        let L = [x_pos - chord / 2, y_pos + Math.sqrt(3) * chord / 2];
        let A = [radius, radius, 0, 0, 0, x_pos + chord / 2, y_pos + Math.sqrt(3) * chord / 2];
        chart.append("path")
            .style("stroke", outline)
            .style("stroke-width", 2)
            .style("fill", fill)
            .attr("id", is_ref? "fan_ref" : "fan_mod")
            .attr("d", "M " + M.join(" ") + " L " + L.join(" ")+ " A " + A.join(" ") + " z");
        if (is_ref === false) {
            d3.select("body")
                .on("keydown", function () {
                    let event = d3.event;
                    if (event.key === "m" || event.key === "z") {
                        radius = exp.calculate_size_change(event.key, radius);
                        chord = radius;
                        M = [x_pos, y_pos];
                        L = [x_pos - chord / 2, y_pos + Math.sqrt(3) * chord / 2];
                        A = [radius, radius, 0, 0, 0, x_pos + chord / 2, y_pos + Math.sqrt(3) * chord / 2];
                        d3.select("#fan_mod")
                            .attr("d",  "M " + M.join(" ") + " L " + L.join(" ") + " A " + A.join(" ") + " z");
                    }
                });
        }
    }

    /**
     *
     * @param chart {object}
     * @param width {number}
     * @param y_pos {number}
     * @param x_pos {number}
     * @param is_ref {boolean}
     * @param outline
     */
    plot_line(chart, width, y_pos, x_pos, is_ref, outline) {
        let exp = this;
        let x1, x2, y1, y2;
        x1 = x_pos;
        x2 = x_pos;
        y1 = y_pos + width / 2;
        y2 = y_pos - width / 2;
        chart.append("line")
            .style("stroke", outline)
            .style("stroke-width", 2)
            .attr("id", is_ref? "line_shape_ref": "line_shape_mod")
            .attr("x1", x1)
            .attr("x2", x2)
            .attr("y1", y1)
            .attr("y2", y2);
        if (is_ref === true) {
            let transform = "rotate(";
            transform = transform + exp.curr_trial_data.ref_rotate_by.toString();
            transform = transform + " " + (x_pos).toString();
            transform = transform + " " + (y_pos).toString();
            transform = transform + ")";
            d3.select("#line_shape_ref").attr("transform", transform);
        } else {
            let transform = "rotate(";
            transform = transform + exp.curr_trial_data.mod_rotate_by.toString();
            transform = transform + " " + (x_pos).toString();
            transform = transform + " " + (y_pos).toString();
            transform = transform + ")";
            d3.select("#line_shape_mod").attr("transform", transform);
        }
        if (is_ref === false) {
            d3.select("body")
                .on("keydown", function () {
                    let event = d3.event;
                    if (event.key === "m" || event.key === "z") {
                        width = exp.calculate_size_change(event.key, width);
                        x1 = x_pos;
                        x2 = x_pos;
                        y1 = y_pos - width / 2;
                        y2 = y_pos + width / 2;
                        d3.select("#line_shape_mod")
                            .attr("x1", x1)
                            .attr("x2", x2)
                            .attr("y1", y1)
                            .attr("y2", y2)
                    }
                });
        }
    }

    /**
     *
     * @param event_key m to increase the size and z to decrease the size
     * @param size the previous size of the shape
     * @returns number
     */
    calculate_size_change(event_key, size) {
        let sign = event_key === "m" ? 1 : -1;
        let change = Math.random() * this.PIXEL_TO_CM * this.MAX_STEP_SIZE;
        let new_radius = size + sign * change;
        size = new_radius;
        this.curr_trial_data.adjustments.push(change * sign / this.PIXEL_TO_CM);
        this.curr_trial_data.estimated_size = new_radius / this.PIXEL_TO_CM;
        return size;
    }

    /*
    * Saves experiment data as csv
    * */
    export_trial_data() {
        let trial_data = jsPsych.data.get().filterCustom(function (row) {
            return row.block_type === "practice" || row.block_type === "test";
        })
        // These are variables forced on by jsPsych
            .ignore('stimulus')
            .ignore('key_press')
            .ignore('choices')
            .ignore('trial_type')
            .ignore('trial_index')
            .ignore('time_elapsed')
            .ignore('internal_node_id')
            .ignore('rt');

        let fileName = "S" + this.subject_id + "_" + this.condition_name + "_shape_estimation_trial_results.csv";

        trial_data.localSave('csv', fileName);
    }
}
