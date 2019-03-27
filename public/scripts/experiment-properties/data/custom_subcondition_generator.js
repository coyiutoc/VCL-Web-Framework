import {EXPERIMENT_BASES, EXPERIMENT_CONDITIONS, create_condition_dataset} from "/scripts/experiment-properties/data/data_controller.js";

export var CUSTOM_CONDITIONS = {
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
    estimation: [],
    custom : [
    	"distractor_multi",
    	"distractor_blue_shades",
    	"distractor_red_shades",
    	"distractor_yellow_shades",
    	"distractor_control_shades"
    ]
}

export function get_subconditions(experiment) {

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
}

function is_distractor_diamond_square(condition_name) {

	let array = condition_name.split("_");
	if (array[0] === "distractor" && array[1] === "diamond" && array[2] === "square") {
		return true;
	}
	return false;
}

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

function generate_distractor_shades_subconditions(experiment) {

	let condition_name = experiment.condition_name;
	let experiment_name = experiment.constructor.name;
	let subconditions = EXPERIMENT_CONDITIONS[experiment_name][condition_name];

	// Using the first 12 subconditions from the JND design:
	let jnd_base_subconditions = EXPERIMENT_BASES[experiment_name]["design"].slice(1,13);

	let dataset = create_condition_dataset(jnd_base_subconditions, subconditions);

	return dataset;
}
