import {EXPERIMENT_BASES, EXPERIMENT_CONDITIONS, create_condition_dataset} from "/scripts/experiment-properties/data/data_controller.js";
export {CUSTOM_TRIAL_STRUCTURE_CONDITIONS, get_subconditions};

var CUSTOM_TRIAL_STRUCTURE_CONDITIONS = {
	foundational : [],
    design : [
    	"distractor_diamond_square_red_hue",
    	"distractor_diamond_square_red_lum",
    	"distractor_diamond_square_red_chrom",
    	"distractor_diamond_square_yellow_hue",
    	"distractor_diamond_square_yellow_lum",
    	"distractor_diamond_square_yellow_chrom",
    	"distractor_diamond_square_blue_hue",
    	"distractor_diamond_square_blue_lum",
    	"distractor_diamond_square_blue_chrom",
    	"distractor_diamond_square_green_hue",
    	"distractor_diamond_square_green_lum",
    	"distractor_diamond_square_green_chrom"
    ],
    estimation: [
    	"shape_estimation",
    	"line_length",
    	"rectangle_square",
    	"rectangle_rotated_square_solid",
    	"rectangle_rotated_square_outline",
    	"triangle"
    ],
    custom : [
    	"distractor_multi",
    	"distractor_blue_shades",
    	"distractor_red_shades",
    	"distractor_yellow_shades",
    	"distractor_control_shades"
    ]
}

/**
 * Controls which helper method to access depending on condition name.
 *
 * @param {object}   experiment
 */
function get_subconditions(experiment) {

	if (is_distractor_diamond_square(experiment.condition_name)){
		return generate_distractor_diamond_square_subconditions(experiment);
	} 
	else if (experiment.condition_name === "distractor_multi"){
		return generate_distractor_multi_subconditions(experiment);
	}
	else if (experiment.condition_name === "distractor_blue_shades"   ||
		     experiment.condition_name === "distractor_red_shades"    ||
		     experiment.condition_name === "distractor_yellow_shades" ||
		     experiment.condition_name === "distractor_control_shades"){
		return generate_distractor_shades_subconditions(experiment);
	}
	else if (experiment.constructor.name === "Estimation"){
		return generate_estimation_subconditions(experiment);
	}
}

/**
 * Checks if the condition name is a "distractor_diamond_square" one.
 *
 * @param   {object}   experiment
 * @return  {boolean}
 */
function is_distractor_diamond_square(condition_name) {

	let array = condition_name.split("_");
	if (array[0] === "distractor" && array[1] === "diamond" && array[2] === "square") {
		return true;
	}
	return false;
}

////////////////////////////////////////////////////////////////////////////////////////
// GENERATORS HERE 
////////////////////////////////////////////////////////////////////////////////////////

/**
 * Generates subconditions for distractor_diamond_square conditions
 *
 * @param   {object}   experiment
 */
function generate_distractor_diamond_square_subconditions(experiment) {

	let array = experiment.condition_name.split("_");
	if (array.length !== 5) throw new Error(experiment.condition_name + " is not a valid distractor_diamond_square condition.");
	
	let square_name = array[0] + "_" + array[2] + "_" + array[3] + "_" + array[4];
	let experiment_name = experiment.constructor.name;
	let trial_structure = experiment.trial_structure;

	let subconditions = create_condition_dataset(EXPERIMENT_BASES[experiment_name][trial_structure], EXPERIMENT_CONDITIONS[experiment_name][square_name]);

	for (let c of subconditions) {
		c["dist_shape"] = "diamond";

		// Overwrite to opposing colors when dist_color = white
		if (c["dist_color"] === "WHITE"){
			// If RED
			if (c["target_color"] === "#cd4c32"){
				c["dist_color"] = "#007ebc";
			} 
			// If BLUE
			else if (c["target_color"] === "#007ebc"){
				c["dist_color"] = "#cd4c32";
			}
			// If YELLOW
			else if (c["target_color"] === "#dbc667"){
				c["dist_color"] = "#20874a";
			}
			// If GREEN
			else {
				c["dist_color"] = "#dbc667";
			}
		}
	}

	return subconditions;
}

/**
 * Generates subconditions for distractor_multi condition.
 *
 * @param   {object}   experiment
 */
function generate_distractor_multi_subconditions(experiment) {

	let condition_name = experiment.condition_name;
	let experiment_name = experiment.constructor.name;
	let subconditions = EXPERIMENT_CONDITIONS[experiment_name][condition_name];

	// Using the first 12 subconditions from the JND design:
	let jnd_base_subconditions = EXPERIMENT_BASES[experiment_name]["design"].slice(1,13);

	let dataset = create_condition_dataset(jnd_base_subconditions, subconditions);

	let result = []

	// Doing each set 4 times
	for (let i = 0; i < 4; i++) {
		result = result.concat(dataset);
	}

	return result;
}

/**
 * Generates subconditions for distractor_shade conditions.
 *
 * @param   {object}   experiment
 */
function generate_distractor_shades_subconditions(experiment) {

	let condition_name = experiment.condition_name;
	let experiment_name = experiment.constructor.name;
	let subconditions = EXPERIMENT_CONDITIONS[experiment_name][condition_name];

	// Using the first 12 subconditions from the JND design:
	if (experiment_name === "JND"){
		let jnd_base_subconditions = EXPERIMENT_BASES["JND"]["design"].slice(1,13);

		let dataset = create_condition_dataset(jnd_base_subconditions, subconditions);

		return dataset;
	} else {
		let stevens_base_subconditions = EXPERIMENT_BASES["Stevens"]["design"].slice(1,5);

		let dataset = create_condition_dataset(stevens_base_subconditions, subconditions);

		return dataset;
	}
}

/**
 * Generates subconditions for any Estimation condition.
 *
 * @param   {object}   experiment
 */
function generate_estimation_subconditions(experiment){

	const TRIALS_PER_ROUND = 4;
	const MAX_STEP_SIZE = 0.05;
	const FILL_COLOR = '#0000FF';
	const OUTLINE_COLOR = '#0000FF';
	const MATCH_SIZES = {
    "2": {
        min_size: 1.2,
        max_size: 3
    },
    "4": {
        min_size: 3.1,
        max_size: 5.3
    },
    "6": {
        min_size: 5.0,
        max_size: 6.5
    }
	};


	let condition = experiment.condition_name;
    let result = [];
    let curr_cond = EXPERIMENT_BASES["Estimation"][condition];
    let ref_shapes = curr_cond.ref_shapes;
    let mod_shapes = curr_cond.mod_shapes;
    ref_shapes.types.forEach((ref_shape, index)=>{
        ref_shapes.sizes.forEach((size)=>{
            let condition = {};
            condition.ref_shape = ref_shape;
            condition.ref_size = size;
            condition.ref_rotate_by = ref_shapes.rotate_by[index];
            condition.ref_fill = ref_shapes.fill;
            condition.ref_outline = ref_shapes.outline;
            condition.max_step_size = MAX_STEP_SIZE;
            condition.trials_per_round = TRIALS_PER_ROUND;
            mod_shapes.types[index].forEach((mod_shape)=>{
                mod_shapes.rotate_by[index].forEach((angle)=>{
                    let curr_sub_cond = {};
                    Object.assign(curr_sub_cond, condition);
                    curr_sub_cond.mod_shape = mod_shape;
                    curr_sub_cond.mod_min_size = MATCH_SIZES[size.toString()].min_size;
                    curr_sub_cond.mod_max_size = MATCH_SIZES[size.toString()].min_size;
                    curr_sub_cond.mod_rotate_by = angle;
                    curr_sub_cond.mod_fill = mod_shapes.fill;
                    curr_sub_cond.mod_outline = mod_shapes.outline;
                    curr_sub_cond.width_height_ratio = mod_shapes.width_height_ratio;
                    result.push(curr_sub_cond);
                });
            });
        });
    });
    console.log(JSON.stringify(result));
    return result;
};
